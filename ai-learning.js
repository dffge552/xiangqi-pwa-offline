/**
 * ai-learning.js
 * ============================================================
 * "AI 对局学习" 附加模块 —— 让 AI 总结输棋对局并从中学习
 * ============================================================
 *
 * 设计说明（请务必读一下，理解这个功能到底"学习"了什么）：
 *
 * 本项目的 AI 走子是靠本地 Pikafish（NNUE 引擎）计算出来的。Pikafish 的神经网络权重
 * 是训练好并打包成 pikafish.nnue 的，在浏览器/离线 PWA 环境里，我们既没有训练数据，
 * 也没有算力去重新训练这个神经网络——所以"修改引擎本身的棋力"是做不到的，任何声称能
 * 在网页里现场重新训练 NNUE 的方案都是不诚实的。
 *
 * 真正可行、并且已经在这个项目里天然存在的"学习空间"是：AI 对战难度（easy/medium/
 * hard/expert）并不是每步都下 Pikafish 认为最佳的一手，而是从 MultiPV 给出的前三个
 * 候选里按概率随机选（AI_MOVE_SELECTION_CONFIG），用来模拟"新手偶尔失误"。这些"故意
 * 犯的错"正是 AI 输棋的主要来源。
 *
 * 所以这个模块做的"学习"是：
 *   1. 在 AI 每一步选择走法时（selectMoveByProbability），记录下"当时的局面 + AI 选
 *      的这步 + 引擎认为最好的一步 + 两者的分数差距（centipawn 损失）"。
 *   2. 当这盘棋最终判定为 AI 落败（被将死 / 困毙 / 长将判负）时，从这盘棋 AI 自己的
 *      "随机失误"里挑出损失分数最大的几步，记成"教训"，永久存到 localStorage。
 *   3. 以后只要再次搜索到完全相同的局面，并且随机选择又刚好选中了那步"历史上导致
 *      过输棋的坏棋"，就有一定概率（随着同一个坑踩的次数增多而提高）主动改走引擎认为
 *      最好的那一步，从而避免在同一个"陷阱"里反复吃亏。
 *   4. 界面上提供一个悬浮的"🧠 AI 学习"按钮，可以看到历史战绩、学到的教训列表，
 *      也可以随时清空重来。
 *
 * 换句话说：这不是"神经网络在线学习"，而是一个基于真实对局数据、针对具体局面的
 * "错题本 + 规避机制"，诚实、可解释，也确实会让 AI 在你已经战胜过它的具体陷阱里
 * 变得更难对付。
 *
 * 使用方式：在 index.html 的 </body> 之前加入：
 *   <script src="./ai-learning.js"></script>
 * 必须放在主逻辑的 <script> 之后，因为它依赖 gameState / CompleteXiangqiAI 等
 * 全局对象已经存在。
 */
(function () {
    'use strict';

    // ---------------------------------------------------------------------
    // 0. 基本配置
    // ---------------------------------------------------------------------
    const LESSONS_KEY = 'xiangqiAI_lessons_v1';
    const HISTORY_KEY = 'xiangqiAI_gameHistory_v1';
    const SETTINGS_KEY = 'xiangqiAI_learningSettings_v1';

    const MAX_LESSONS = 300;          // 教训本最多保留多少条，超过后淘汰最不重要的
    const MAX_GAMES = 60;             // 对局历史最多保留多少局
    const MISTAKE_CP_THRESHOLD = 40;  // 分数差距小于这个值(centipawn)不算"值得记录的失误"
    const MAX_LESSONS_PER_GAME = 3;   // 每局最多提炼几条教训

    function loadJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            console.warn('[AI学习] 读取本地存储失败:', key, e);
            return fallback;
        }
    }

    function saveJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('[AI学习] 写入本地存储失败（可能是存储已满）:', key, e);
        }
    }

    // 只取棋盘 + 走子方，忽略吃子计数/回合数，得到一个稳定的"局面签名"
    function positionKey(fen) {
        if (!fen || typeof fen !== 'string') return null;
        const parts = fen.split(' ');
        if (parts.length < 2) return null;
        return parts[0] + ' ' + parts[1];
    }

    function colorName(c) {
        if (c === 'red') return '红方';
        if (c === 'black') return '黑方';
        return c || '未知';
    }

    // ---------------------------------------------------------------------
    // 1. 核心学习对象
    // ---------------------------------------------------------------------
    const AILearning = {
        lessons: loadJSON(LESSONS_KEY, []),
        games: loadJSON(HISTORY_KEY, []),
        settings: loadJSON(SETTINGS_KEY, { learningEnabled: true }),
        currentGame: null,

        // ---- 对局生命周期 ----
        _ensureGame(aiColor, difficulty) {
            if (!this.currentGame) {
                this.currentGame = {
                    id: 'g_' + Date.now(),
                    date: new Date().toISOString(),
                    aiColor: aiColor || null,
                    difficulty: difficulty || null,
                    decisions: [],
                    finished: false
                };
                console.log('[AI学习] 🎬 开始记录新对局:', this.currentGame.id);
            }
        },

        recordDecision(info) {
            // 如果这一步的"回合序号"比上一次记录的还小，说明棋局被重开了，开一局新的记录
            if (this.currentGame && this.currentGame.decisions.length > 0) {
                const last = this.currentGame.decisions[this.currentGame.decisions.length - 1];
                if (typeof info.moveNumber === 'number' && info.moveNumber < last.moveNumber) {
                    console.log('[AI学习] 🔄 检测到棋局重新开始，重置对局记录');
                    this.currentGame = null;
                }
            }
            this._ensureGame(info.aiColor, info.difficulty);
            this.currentGame.decisions.push(info);
        },

        // result: 'ai_win' | 'ai_loss' | 'draw'
        finishGame(result) {
            if (!this.currentGame || this.currentGame.finished) return;
            this.currentGame.finished = true;

            let mistakes = [];
            if (result === 'ai_loss') {
                mistakes = this._extractMistakes(this.currentGame);
                if (mistakes.length > 0) {
                    this._absorbLessons(mistakes, this.currentGame);
                }
            }

            const summary = {
                id: this.currentGame.id,
                date: this.currentGame.date,
                result,
                aiColor: this.currentGame.aiColor,
                difficulty: this.currentGame.difficulty,
                totalAIMoves: this.currentGame.decisions.length,
                mistakes
            };

            this.games.unshift(summary);
            if (this.games.length > MAX_GAMES) this.games.length = MAX_GAMES;
            saveJSON(HISTORY_KEY, this.games);

            console.log('[AI学习] 🏁 对局结束，结果:', result, '本局提炼教训:', mistakes.length);

            if (result === 'ai_loss') {
                this._showLossReport(summary);
            }

            this.currentGame = null;
        },

        // ---- 从一局输棋对局里挑出"AI 自己造成的最大失误" ----
        _extractMistakes(game) {
            const n = game.decisions.length;
            const candidates = game.decisions
                .filter(d => !d.isCheckResponse && d.cpGap >= MISTAKE_CP_THRESHOLD && d.selectedMove !== d.bestMove)
                .map(d => {
                    // 越接近棋局末尾的失误，跟"直接导致落败"的关系通常越大，权重略微调高
                    const recencyWeight = 1 + (n > 0 ? d.moveNumber / n : 0);
                    return Object.assign({}, d, { severity: d.cpGap * recencyWeight });
                });

            candidates.sort((a, b) => b.severity - a.severity);
            return candidates.slice(0, MAX_LESSONS_PER_GAME);
        },

        _absorbLessons(mistakes, game) {
            mistakes.forEach(m => {
                const key = positionKey(m.fenBefore);
                if (!key) return;

                let entry = this.lessons.find(l => l.key === key && l.badMove === m.selectedMove);
                if (entry) {
                    entry.hits += 1;
                    entry.lastSeen = game.date;
                    entry.cpGap = Math.max(entry.cpGap, m.cpGap);
                    entry.betterMove = m.bestMove || entry.betterMove;
                } else {
                    entry = {
                        key,
                        badMove: m.selectedMove,
                        betterMove: m.bestMove,
                        cpGap: m.cpGap,
                        hits: 1,
                        firstSeen: game.date,
                        lastSeen: game.date,
                        aiColor: game.aiColor,
                        difficulty: game.difficulty
                    };
                    this.lessons.unshift(entry);
                }
            });

            if (this.lessons.length > MAX_LESSONS) {
                // 淘汰时优先保留"被撞见次数多 * 分数差距大"的教训
                this.lessons.sort((a, b) => (b.hits * b.cpGap) - (a.hits * a.cpGap));
                this.lessons.length = MAX_LESSONS;
            }

            saveJSON(LESSONS_KEY, this.lessons);
        },

        // 给定当前局面 FEN 和 AI 打算选择的走法，查是否命中"历史教训"
        findLesson(fen, move) {
            if (!this.settings.learningEnabled) return null;
            const key = positionKey(fen);
            if (!key) return null;
            return this.lessons.find(l => l.key === key && l.badMove === move) || null;
        },

        stats() {
            const total = this.games.length;
            const losses = this.games.filter(g => g.result === 'ai_loss').length;
            const wins = this.games.filter(g => g.result === 'ai_win').length;
            const draws = total - losses - wins;
            return { total, wins, losses, draws, lessonCount: this.lessons.length };
        },

        clearAll() {
            this.lessons = [];
            this.games = [];
            this.currentGame = null;
            localStorage.removeItem(LESSONS_KEY);
            localStorage.removeItem(HISTORY_KEY);
            console.log('[AI学习] 🗑️ 已清空全部学习记录');
        },

        setLearningEnabled(enabled) {
            this.settings.learningEnabled = !!enabled;
            saveJSON(SETTINGS_KEY, this.settings);
        },

        // ---- 输棋后的小结弹窗 ----
        _showLossReport(summary) {
            try {
                showLearningReportModal(summary);
            } catch (e) {
                console.warn('[AI学习] 展示战报失败:', e);
            }
        }
    };

    window.AILearning = AILearning; // 方便调试，也允许其它脚本读取状态

    // ---------------------------------------------------------------------
    // 2. 挂钩 CompleteXiangqiAI.selectMoveByProbability
    //    —— 这是 AI 按概率在"最佳/次优/第三优"之间做选择的地方，
    //       也是记录决策数据 + 应用"规避教训"的最佳位置
    // ---------------------------------------------------------------------
    function patchMoveSelection() {
        if (typeof CompleteXiangqiAI === 'undefined' || !CompleteXiangqiAI.prototype.selectMoveByProbability) {
            console.warn('[AI学习] 未找到 CompleteXiangqiAI.selectMoveByProbability，学习模块未挂载');
            return false;
        }

        const originalSelect = CompleteXiangqiAI.prototype.selectMoveByProbability;

        CompleteXiangqiAI.prototype.selectMoveByProbability = function (multiPVResults, difficulty) {
            let result = originalSelect.call(this, multiPVResults, difficulty);

            // 少于2个候选、或被将军强制应将时，没有"选择"可言，不记录也不干预
            if (!multiPVResults || multiPVResults.length < 2 || !result || !result.selectedMove || result.isCheckResponse) {
                return result;
            }

            try {
                const board = typeof this.getCurrentBoard === 'function' ? this.getCurrentBoard() : null;
                const fen = (this.translator && typeof this.translator.boardToFEN === 'function' && board)
                    ? this.translator.boardToFEN(board)
                    : null;

                if (!fen) return result;

                const sorted = multiPVResults.slice().sort((a, b) => b.score - a.score);
                const best = sorted[0];
                const aiColor = typeof this.getCurrentAIColor === 'function' ? this.getCurrentAIColor() : null;
                const moveNumber = (typeof gameState !== 'undefined' && Array.isArray(gameState.gameRecord))
                    ? gameState.gameRecord.length
                    : 0;

                // ---- (a) 如果这个局面曾经因为选中同一步棋而输过棋，尝试主动规避 ----
                const lesson = AILearning.findLesson(fen, result.selectedMove.move);
                if (lesson && best) {
                    // 同一个坑踩得越多次，越坚决不再踩
                    const avoidChance = Math.min(0.9, 0.5 + lesson.hits * 0.2);
                    if (Math.random() < avoidChance) {
                        console.log(`[AI学习] ⚠️ 识别到历史失误局面，规避 ${lesson.badMove} → 改走 ${best.move}（此坑已踩 ${lesson.hits} 次）`);
                        result = Object.assign({}, result, {
                            selectedMove: best,
                            selectionType: 'learned-avoid',
                            reason: `根据历史对局教训，主动规避曾导致落败的 ${lesson.badMove}`,
                            avoidedLesson: lesson
                        });
                    }
                }

                // ---- (b) 无论是否规避，都记录这一步的决策，供本局结束后复盘 ----
                const selectedScore = result.selectedMove.score;
                const bestScore = best ? best.score : selectedScore;
                const cpGap = (typeof bestScore === 'number' && typeof selectedScore === 'number')
                    ? Math.max(0, bestScore - selectedScore)
                    : 0;

                AILearning.recordDecision({
                    fenBefore: fen,
                    aiColor,
                    difficulty,
                    moveNumber,
                    selectedMove: result.selectedMove.move,
                    bestMove: best ? best.move : null,
                    selectedScore,
                    bestScore,
                    cpGap,
                    selectionType: result.selectionType,
                    isCheckResponse: false
                });
            } catch (e) {
                console.warn('[AI学习] 处理走法决策时出错，已忽略，不影响正常下棋:', e);
            }

            return result;
        };

        console.log('[AI学习] ✅ 已挂载到 selectMoveByProbability');
        return true;
    }

    // ---------------------------------------------------------------------
    // 3. 挂钩对局结束的三个入口：将死 / 困毙 / 长将判负
    // ---------------------------------------------------------------------
    function determineResultFromLoser(loserColor) {
        const isBattle = (typeof gameState !== 'undefined' && gameState.isAIBattle === true);
        if (!isBattle) return null; // 非人机对战（比如双人对战/摆盘），不产生学习数据

        const aiColor =
            (typeof gameAI !== 'undefined' && gameAI && gameAI.gameMode && gameAI.gameMode.aiColor) ||
            (typeof currentAIMode !== 'undefined' && currentAIMode && currentAIMode.aiColor) ||
            null;

        if (!aiColor) return null;
        return (loserColor === aiColor) ? 'ai_loss' : 'ai_win';
    }

    function patchGameEndHooks() {
        // 将死
        if (typeof window.showCheckmateMessage === 'function') {
            const orig = window.showCheckmateMessage;
            window.showCheckmateMessage = function (checkmatedPlayer) {
                try {
                    const result = determineResultFromLoser(checkmatedPlayer);
                    if (result) AILearning.finishGame(result);
                } catch (e) {
                    console.warn('[AI学习] 处理将死结果失败:', e);
                }
                return orig.apply(this, arguments);
            };
        } else {
            console.warn('[AI学习] 未找到 showCheckmateMessage，将死场景不会被记录');
        }

        // 困毙（象棋规则里无子可动 = 负，不是和棋）
        if (typeof window.showStalemateMessage === 'function') {
            const orig = window.showStalemateMessage;
            window.showStalemateMessage = function (stalematedPlayer) {
                try {
                    const result = determineResultFromLoser(stalematedPlayer);
                    if (result) AILearning.finishGame(result);
                } catch (e) {
                    console.warn('[AI学习] 处理困毙结果失败:', e);
                }
                return orig.apply(this, arguments);
            };
        }

        // 长将/长捉判负
        if (typeof window.handlePerpetualCheckLoss === 'function') {
            const orig = window.handlePerpetualCheckLoss;
            window.handlePerpetualCheckLoss = function (cycleResult) {
                try {
                    const loser = cycleResult && cycleResult.perpetualCheckPlayer;
                    const result = determineResultFromLoser(loser);
                    if (result) AILearning.finishGame(result);
                } catch (e) {
                    console.warn('[AI学习] 处理长将判负结果失败:', e);
                }
                return orig.apply(this, arguments);
            };
        }

        console.log('[AI学习] ✅ 已挂载对局结束监听（将死/困毙/长将判负）');
    }

    // ---------------------------------------------------------------------
    // 4. 界面：悬浮按钮 + 学习面板 + 输棋战报弹窗
    // ---------------------------------------------------------------------
    function injectStyles() {
        if (document.getElementById('ai-learning-styles')) return;
        const style = document.createElement('style');
        style.id = 'ai-learning-styles';
        style.textContent = `
            #ai-learning-fab {
                position: fixed;
                right: 16px;
                bottom: 16px;
                z-index: 9998;
                background: #6a1b9a;
                color: #fff;
                border: none;
                border-radius: 24px;
                padding: 10px 16px;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            #ai-learning-fab:hover { background: #4a148c; }
            .ai-learning-overlay {
                position: fixed; inset: 0; background: rgba(0,0,0,0.55);
                z-index: 9999; display: flex; align-items: center; justify-content: center;
                padding: 20px;
            }
            .ai-learning-panel {
                background: #fff; border-radius: 12px; padding: 24px;
                width: 100%; max-width: 460px; max-height: 82vh; overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0,0,0,0.35);
                font-family: -apple-system, "PingFang TC", "Microsoft JhengHei", sans-serif;
            }
            .ai-learning-panel h2 { margin: 0 0 12px 0; font-size: 20px; color: #4a148c; }
            .ai-learning-stats { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
            .ai-learning-stat-box {
                flex: 1; min-width: 70px; background: #f3e5f5; border-radius: 8px;
                padding: 8px; text-align: center;
            }
            .ai-learning-stat-box .num { font-size: 20px; font-weight: bold; color: #6a1b9a; }
            .ai-learning-stat-box .label { font-size: 12px; color: #666; }
            .ai-learning-lesson {
                border: 1px solid #eee; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px;
                font-size: 13px; line-height: 1.6; background: #fafafa;
            }
            .ai-learning-lesson .badmove { color: #c62828; font-weight: bold; }
            .ai-learning-lesson .bettermove { color: #2e7d32; font-weight: bold; }
            .ai-learning-empty { color: #888; font-size: 13px; padding: 12px 0; text-align: center; }
            .ai-learning-btn-row { display: flex; gap: 10px; margin-top: 16px; }
            .ai-learning-btn {
                flex: 1; padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;
            }
            .ai-learning-btn.primary { background: #6a1b9a; color: #fff; }
            .ai-learning-btn.danger { background: #fff; color: #c62828; border: 1px solid #c62828; }
            .ai-learning-toggle-row {
                display: flex; align-items: center; justify-content: space-between;
                background: #f5f5f5; border-radius: 8px; padding: 10px 12px; margin-bottom: 14px;
                font-size: 13px;
            }
            .ai-learning-report-title { font-size: 22px; margin-bottom: 8px; }
            .ai-learning-report-title.loss { color: #c62828; }
            .ai-learning-note { font-size: 12px; color: #888; margin-top: 14px; line-height: 1.6; }
        `;
        document.head.appendChild(style);
    }

    function formatLessonLine(l) {
        return `局面：${colorName(l.aiColor)}方走子 · 难度「${l.difficulty || '未知'}」<br>
                本来打算走 <span class="badmove">${l.badMove}</span>（曾在此输掉 ${l.hits} 次），
                更好的选择是 <span class="bettermove">${l.betterMove || '（暂无记录）'}</span>，
                分差约 ${Math.round(l.cpGap)} 分`;
    }

    function closePanel() {
        const el = document.getElementById('ai-learning-overlay');
        if (el) el.remove();
    }

    function renderLearningPanel() {
        closePanel();
        const stats = AILearning.stats();

        const overlay = document.createElement('div');
        overlay.className = 'ai-learning-overlay';
        overlay.id = 'ai-learning-overlay';
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closePanel(); });

        const lessonsHtml = AILearning.lessons.length
            ? AILearning.lessons.slice(0, 20).map(l => `<div class="ai-learning-lesson">${formatLessonLine(l)}</div>`).join('')
            : `<div class="ai-learning-empty">还没有学到教训 —— 去赢 AI 几盘试试？😉</div>`;

        overlay.innerHTML = `
            <div class="ai-learning-panel">
                <h2>🧠 AI 学习记录</h2>
                <div class="ai-learning-stats">
                    <div class="ai-learning-stat-box"><div class="num">${stats.total}</div><div class="label">总对局</div></div>
                    <div class="ai-learning-stat-box"><div class="num">${stats.wins}</div><div class="label">AI 获胜</div></div>
                    <div class="ai-learning-stat-box"><div class="num">${stats.losses}</div><div class="label">AI 落败</div></div>
                    <div class="ai-learning-stat-box"><div class="num">${stats.lessonCount}</div><div class="label">学到的教训</div></div>
                </div>
                <div class="ai-learning-toggle-row">
                    <span>启用"规避历史失误"</span>
                    <label>
                        <input type="checkbox" id="ai-learning-enable-toggle" ${AILearning.settings.learningEnabled ? 'checked' : ''}/>
                    </label>
                </div>
                <div id="ai-learning-lessons-list">${lessonsHtml}</div>
                <div class="ai-learning-btn-row">
                    <button class="ai-learning-btn danger" id="ai-learning-clear-btn">清空学习记录</button>
                    <button class="ai-learning-btn primary" id="ai-learning-close-btn">关闭</button>
                </div>
                <div class="ai-learning-note">
                    说明：这里记录的是 AI 在对战中因难度设定而"随机选择次优/第三优走法"所造成的失误，
                    并非重新训练了 Pikafish 引擎本身。当同一个局面 + 同一步坏棋再次出现时，
                    AI 会有较高概率主动改走更好的一手，从而不会在你已经赢过的陷阱里反复吃亏。
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById('ai-learning-close-btn').addEventListener('click', closePanel);
        document.getElementById('ai-learning-clear-btn').addEventListener('click', () => {
            if (confirm('确定要清空全部学习记录吗？此操作不可恢复。')) {
                AILearning.clearAll();
                renderLearningPanel();
            }
        });
        document.getElementById('ai-learning-enable-toggle').addEventListener('change', (e) => {
            AILearning.setLearningEnabled(e.target.checked);
        });
    }

    function showLearningReportModal(summary) {
        closePanel();
        const overlay = document.createElement('div');
        overlay.className = 'ai-learning-overlay';
        overlay.id = 'ai-learning-overlay';
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closePanel(); });

        const mistakes = summary.mistakes || [];
        const mistakesHtml = mistakes.length
            ? mistakes.map((m, i) => `
                <div class="ai-learning-lesson">
                    第 ${m.moveNumber} 手附近：AI（${colorName(summary.aiColor)}方）走了
                    <span class="badmove">${m.selectedMove}</span>，
                    引擎认为更好的走法是 <span class="bettermove">${m.bestMove}</span>，
                    损失约 ${Math.round(m.cpGap)} 分。<br/>
                    <small>已记入教训本，下次遇到相同局面会尽量规避。</small>
                </div>`).join('')
            : `<div class="ai-learning-empty">这局 AI 基本都在走它认为最好的棋，输棋更可能是搜索深度/難度设定本身偏弱，本局暂无可提炼的具体失误。</div>`;

        overlay.innerHTML = `
            <div class="ai-learning-panel">
                <div class="ai-learning-report-title loss">📉 AI 复盘小结：这局我（AI）输了</div>
                <div>难度：${summary.difficulty || '未知'} ｜ AI 执${colorName(summary.aiColor)}</div>
                <div id="ai-learning-mistakes-list" style="margin-top:12px;">${mistakesHtml}</div>
                <div class="ai-learning-btn-row">
                    <button class="ai-learning-btn primary" id="ai-learning-report-close-btn">知道了，继续对局</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.getElementById('ai-learning-report-close-btn').addEventListener('click', closePanel);
    }

    function injectFab() {
        if (document.getElementById('ai-learning-fab')) return;
        const btn = document.createElement('button');
        btn.id = 'ai-learning-fab';
        btn.innerHTML = '🧠 AI 学习';
        btn.addEventListener('click', renderLearningPanel);
        document.body.appendChild(btn);
    }

    // ---------------------------------------------------------------------
    // 5. 启动
    // ---------------------------------------------------------------------
    function init() {
        injectStyles();
        injectFab();
        patchMoveSelection();
        patchGameEndHooks();
        console.log('[AI学习] 模块初始化完成');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
