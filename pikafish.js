
var Pikafish = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  
  return (
function(moduleArg = {}) {
  var moduleRtn;

function g() {
  m.buffer != r.buffer && x();
  return r;
}
function aa() {
  m.buffer != r.buffer && x();
  return ba;
}
function ca() {
  m.buffer != r.buffer && x();
  return da;
}
function y() {
  m.buffer != r.buffer && x();
  return ea;
}
function z() {
  m.buffer != r.buffer && x();
  return fa;
}
function ia() {
  m.buffer != r.buffer && x();
  return ja;
}
var B = Object.assign({}, moduleArg), ka, la, ma = new Promise((a, b) => {
  ka = a;
  la = b;
}), na = "object" == typeof window, C = "function" == typeof importScripts, oa = "object" == typeof process && "object" == typeof process.Ma && "string" == typeof process.Ma.node, D = C && "em-pthread" == self.name;
B.Z || (B.Z = 0);
B.Z++;
(() => {
  var a = "undefined" != typeof ENVIRONMENT_IS_WASM_WORKER && ENVIRONMENT_IS_WASM_WORKER;
  "undefined" != typeof D && D || a || function(b) {
    function c(l, n, u) {
      var v = new XMLHttpRequest();
      v.open("GET", l, !0);
      v.responseType = "arraybuffer";
      v.onprogress = function(h) {
        var q = n;
        h.total && (q = h.total);
        if (h.loaded) {
          v.m ? B.K[l].loaded = h.loaded : (v.m = !0, B.K || (B.K = {}), B.K[l] = {loaded:h.loaded, total:q});
          var t = q = h = 0, A;
          for (A in B.K) {
            var J = B.K[A];
            h += J.total;
            q += J.loaded;
            t++;
          }
          h = Math.ceil(h * B.Z / t);
          B.setStatus && B.setStatus(`Downloading data... (${q}/${h})`);
        } else {
          !B.K && B.setStatus && B.setStatus("Downloading data...");
        }
      };
      v.onerror = function() {
        throw Error("NetworkError for: " + l);
      };
      v.onload = function() {
        if (200 == v.status || 304 == v.status || 206 == v.status || 0 == v.status && v.response) {
          u(v.response);
        } else {
          throw Error(v.statusText + " : " + v.responseURL);
        }
      };
      v.send(null);
    }
    function d(l) {
      console.error("package error:", l);
    }
    function e() {
      function l(h, q, t) {
        this.start = h;
        this.end = q;
        this.audio = t;
      }
      function n(h) {
        if (!h) {
          throw "Loading data file failed." + Error().stack;
        }
        if (h.constructor.name !== ArrayBuffer.name) {
          throw "bad input to processPackageData" + Error().stack;
        }
        h = new Uint8Array(h);
        l.prototype.N = h;
        h = b.files;
        for (var q = 0; q < h.length; ++q) {
          l.prototype.m[h[q].filename].onload();
        }
        B.removeRunDependency("datafile_emscripten/pikafish.data");
      }
      l.prototype = {m:{}, open:function(h, q) {
        this.name = q;
        this.m[q] = this;
        B.addRunDependency(`fp ${this.name}`);
      }, onload:function() {
        this.M(this.N.subarray(this.start, this.end));
      }, M:function(h) {
        B.FS_createDataFile(this.name, null, h, !0, !0, !0);
        B.removeRunDependency(`fp ${this.name}`);
        this.m[this.name] = null;
      }};
      for (var u = b.files, v = 0; v < u.length; ++v) {
        (new l(u[v].start, u[v].end, u[v].audio || 0)).open("GET", u[v].filename);
      }
      B.addRunDependency("datafile_emscripten/pikafish.data");
      B.ra || (B.ra = {});
      B.ra["emscripten/pikafish.data"] = {$a:!1};
      w ? (n(w), w = null) : p = n;
    }
    "object" === typeof window ? window.encodeURIComponent(window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/") : "undefined" === typeof process && "undefined" !== typeof location && encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
    "function" !== typeof B.locateFilePackage || B.locateFile || (B.locateFile = B.locateFilePackage, E("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"));
    var f = B.locateFile ? B.locateFile("pikafish.data", "") : "pikafish.data", k = b.remote_package_size, p = null, w = B.getPreloadedPackage ? B.getPreloadedPackage(f, k) : null;
    w || c(f, k, function(l) {
      p ? (p(l), p = null) : w = l;
    }, d);
    B.calledRun ? e() : (B.preRun || (B.preRun = []), B.preRun.push(e));
  }({files:[{filename:"/pikafish.nnue", start:0, end:4134154}], remote_package_size:4134154});
})();
B.sendCommand = B.sendCommand || null;
B.terminate = B.terminate || null;
B.onReceiveStdout = B.onReceiveStdout || (a => console.log(a));
B.onReceiveStderr = B.onReceiveStderr || (a => console.error(a));
B.onExit = B.onExit || (a => console.log("exited with code " + a));
B.noExitRuntime = !0;
B.preRun || (B.preRun = []);
B.preRun.push(function() {
  var a = "", b = 0;
  let c = "", d = "";
  const e = B.onReceiveStdout, f = B.onReceiveStderr;
  pa(function() {
    return b < a.length ? a.charCodeAt(b++) : null;
  }, function(p) {
    p && 10 != p ? c += String.fromCharCode(p) : (e(c), c = "");
  }, function(p) {
    p && 10 != p ? d += String.fromCharCode(p) : (f(d), d = "");
  });
  const k = B.cwrap("wasm_uci_execute", "void", []);
  B.sendCommand = function(p) {
    a = p + "\n";
    b = 0;
    k();
  };
  B.terminate = function() {
    B._emscripten_force_exit(0);
  };
});
var qa = Object.assign({}, B), ra = [], sa = "./this.program", ta = (a, b) => {
  throw b;
}, G = "", ua, va, wa;
if (na || C) {
  C ? G = self.location.href : "undefined" != typeof document && document.currentScript && (G = document.currentScript.src), _scriptName && (G = _scriptName), G.startsWith("blob:") ? G = "" : G = G.substr(0, G.replace(/[?#].*/, "").lastIndexOf("/") + 1), ua = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText;
  }, C && (wa = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  }), va = (a, b, c) => {
    var d = new XMLHttpRequest();
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = () => {
      200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
    };
    d.onerror = c;
    d.send(null);
  };
}
var xa = B.print || console.log.bind(console), E = B.printErr || console.error.bind(console);
Object.assign(B, qa);
qa = null;
B.arguments && (ra = B.arguments);
B.thisProgram && (sa = B.thisProgram);
B.quit && (ta = B.quit);
if (D) {
  var ya, za = !1;
  function a(...c) {
    console.error(c.join(" "));
  }
  B.printErr || (E = a);
  self.alert = function(...c) {
    postMessage({ha:"alert", text:c.join(" "), kb:Aa()});
  };
  B.instantiateWasm = (c, d) => new Promise(e => {
    ya = f => {
      f = new WebAssembly.Instance(f, Ba());
      d(f);
      e();
    };
  });
  self.onunhandledrejection = c => {
    throw c.reason || c;
  };
  function b(c) {
    try {
      var d = c.data, e = d.cmd;
      if ("load" === e) {
        let f = [];
        self.onmessage = k => f.push(k);
        self.startWorker = () => {
          postMessage({cmd:"loaded"});
          for (let k of f) {
            b(k);
          }
          self.onmessage = b;
        };
        for (const k of d.handlers) {
          if (!B[k] || B[k].proxy) {
            B[k] = (...p) => {
              postMessage({ha:"callHandler", cb:k, Pa:p});
            }, "print" == k && (xa = B[k]), "printErr" == k && (E = B[k]);
          }
        }
        m = d.wasmMemory;
        x();
        ya(d.wasmModule);
      } else if ("run" === e) {
        Ca(d.pthread_ptr, 0, 0, 1, 0, 0);
        Da(d.pthread_ptr);
        Ea();
        Fa();
        za ||= !0;
        try {
          Ga(d.start_routine, d.arg);
        } catch (f) {
          if ("unwind" != f) {
            throw f;
          }
        }
      } else {
        "cancel" === e ? Aa() && Ha(-1) : "setimmediate" !== d.target && ("checkMailbox" === e ? za && Ia() : e && (E(`worker: received unknown command ${e}`), E(d)));
      }
    } catch (f) {
      throw Ja(), f;
    }
  }
  self.onmessage = b;
}
var Ka;
B.wasmBinary && (Ka = B.wasmBinary);
var m, La, Ma = !1, Na, r, ba, da, ea, fa, ja;
function x() {
  var a = m.buffer;
  B.HEAP8 = r = new Int8Array(a);
  B.HEAP16 = da = new Int16Array(a);
  B.HEAPU8 = ba = new Uint8Array(a);
  B.HEAPU16 = new Uint16Array(a);
  B.HEAP32 = ea = new Int32Array(a);
  B.HEAPU32 = fa = new Uint32Array(a);
  B.HEAPF32 = new Float32Array(a);
  B.HEAPF64 = ja = new Float64Array(a);
}
if (!D) {
  if (B.wasmMemory) {
    m = B.wasmMemory;
  } else {
    if (m = new WebAssembly.Memory({initial:(B.INITIAL_MEMORY || 67108864) / 65536, maximum:19200, shared:!0}), !(m.buffer instanceof SharedArrayBuffer)) {
      throw E("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), oa && E("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");
    }
  }
  x();
}
var Oa = [], Pa = [], Qa = [], Ra = [];
function Sa() {
  D || (B.noFSInit || Ta || pa(), Ua = !1, Va(Pa));
}
var H = 0, Wa = null, Xa = null;
function Ya() {
  H++;
  B.monitorRunDependencies?.(H);
}
function Za() {
  H--;
  B.monitorRunDependencies?.(H);
  if (0 == H && (null !== Wa && (clearInterval(Wa), Wa = null), Xa)) {
    var a = Xa;
    Xa = null;
    a();
  }
}
function $a(a) {
  B.onAbort?.(a);
  a = "Aborted(" + a + ")";
  E(a);
  Ma = !0;
  Na = 1;
  a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
  la(a);
  throw a;
}
var ab = a => a.startsWith("data:application/octet-stream;base64,"), bb;
bb = "pikafish.wasm";
if (!ab(bb)) {
  var cb = bb;
  bb = B.locateFile ? B.locateFile(cb, G) : G + cb;
}
function db(a) {
  if (a == bb && Ka) {
    return new Uint8Array(Ka);
  }
  if (wa) {
    return wa(a);
  }
  throw "both async and sync fetching of the wasm failed";
}
function eb(a) {
  return Ka || !na && !C || "function" != typeof fetch ? Promise.resolve().then(() => db(a)) : fetch(a, {credentials:"same-origin"}).then(b => {
    if (!b.ok) {
      throw `failed to load wasm binary file at '${a}'`;
    }
    return b.arrayBuffer();
  }).catch(() => db(a));
}
function fb(a, b, c) {
  return eb(a).then(d => WebAssembly.instantiate(d, b)).then(c, d => {
    E(`failed to asynchronously prepare wasm: ${d}`);
    $a(d);
  });
}
function gb(a, b) {
  var c = bb;
  return Ka || "function" != typeof WebAssembly.instantiateStreaming || ab(c) || "function" != typeof fetch ? fb(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    E(`wasm streaming compile failed: ${e}`);
    E("falling back to ArrayBuffer instantiation");
    return fb(c, a, b);
  }));
}
function Ba() {
  hb = {__pthread_create_js:ib, __syscall_fcntl64:jb, __syscall_ftruncate64:kb, __syscall_getcwd:lb, __syscall_ioctl:mb, __syscall_openat:nb, _emscripten_get_now_is_monotonic:ob, _emscripten_init_main_thread_js:pb, _emscripten_notify_mailbox_postmessage:qb, _emscripten_receive_on_main_thread_js:rb, _emscripten_thread_cleanup:sb, _emscripten_thread_mailbox_await:Da, _emscripten_thread_set_strongref:tb, _localtime_js:ub, _mktime_js:vb, _tzset_js:wb, abort:xb, emscripten_check_blocking_allowed:yb, emscripten_date_now:zb, 
  emscripten_exit_with_live_runtime:Ab, emscripten_get_now:Bb, emscripten_num_logical_cores:Cb, emscripten_resize_heap:Db, environ_get:Eb, environ_sizes_get:Fb, exit:Gb, fd_close:Hb, fd_read:Ib, fd_seek:Jb, fd_write:Kb, memory:m || B.wasmMemory, strftime_l:Lb};
  return {env:hb, wasi_snapshot_preview1:hb};
}
var I, Mb;
function Nb(a) {
  this.name = "ExitStatus";
  this.message = `Program terminated with exit(${a})`;
  this.status = a;
}
var Ob = a => {
  a.terminate();
  a.onmessage = () => {
  };
}, Rb = a => {
  0 == K.length && (Pb(), Qb(K[0]));
  var b = K.pop();
  if (!b) {
    return 6;
  }
  L.push(b);
  M[a.H] = b;
  b.H = a.H;
  b.postMessage({cmd:"run", start_routine:a.Fa, arg:a.va, pthread_ptr:a.H}, a.Ka);
  return 0;
}, Sb = 0, N = (a, b, ...c) => {
  for (var d = c.length, e = Tb(), f = Ub(8 * d), k = f >> 3, p = 0; p < c.length; p++) {
    var w = c[p];
    ia()[k + p] = w;
  }
  a = Vb(a, 0, d, f, b);
  Wb(e);
  return a;
};
function Xb(a) {
  if (D) {
    return N(0, 1, a);
  }
  Na = a;
  if (!(Yb || 0 < Sb)) {
    for (var b of L) {
      Ob(b);
    }
    for (b of K) {
      Ob(b);
    }
    K = [];
    L = [];
    M = [];
    B.onExit?.(a);
    Ma = !0;
  }
  ta(a, new Nb(a));
}
var Zb = a => {
  a instanceof Nb || "unwind" == a || ta(1, a);
};
function $b(a) {
  if (D) {
    return N(1, 0, a);
  }
  Gb(a);
}
var Gb = a => {
  Na = a;
  if (D) {
    throw $b(a), "unwind";
  }
  Xb(a);
}, K = [], L = [], ac = [], M = {};
function bc() {
  for (var a = 1 + navigator.hardwareConcurrency; a--;) {
    Pb();
  }
  Oa.unshift(() => {
    Ya("loading-workers");
    cc(() => Za("loading-workers"));
  });
}
var ec = a => {
  var b = a.H;
  delete M[b];
  K.push(a);
  L.splice(L.indexOf(a), 1);
  a.H = 0;
  dc(b);
};
function Fa() {
  ac.forEach(a => a());
}
var Qb = a => new Promise(b => {
  a.onmessage = f => {
    f = f.data;
    var k = f.cmd;
    if (f.targetThread && f.targetThread != Aa()) {
      var p = M[f.targetThread];
      p ? p.postMessage(f, f.transferList) : E(`Internal error! Worker sent a message "${k}" to target pthread ${f.targetThread}, but that thread no longer exists!`);
    } else {
      if ("checkMailbox" === k) {
        Ia();
      } else if ("spawnThread" === k) {
        Rb(f);
      } else if ("cleanupThread" === k) {
        ec(M[f.thread]);
      } else if ("killThread" === k) {
        f = f.thread, k = M[f], delete M[f], Ob(k), dc(f), L.splice(L.indexOf(k), 1), k.H = 0;
      } else if ("cancelThread" === k) {
        M[f.thread].postMessage({cmd:"cancel"});
      } else if ("loaded" === k) {
        a.loaded = !0, b(a);
      } else if ("alert" === k) {
        alert(`Thread ${f.threadId}: ${f.text}`);
      } else if ("setimmediate" === f.target) {
        a.postMessage(f);
      } else if ("callHandler" === k) {
        B[f.handler](...f.args);
      } else {
        k && E(`worker sent an unknown command ${k}`);
      }
    }
  };
  a.onerror = f => {
    E(`${"worker sent an error!"} ${f.filename}:${f.lineno}: ${f.message}`);
    throw f;
  };
  var c = [], d = ["onExit", "onAbort", "print", "printErr"], e;
  for (e of d) {
    B.hasOwnProperty(e) && c.push(e);
  }
  a.postMessage({cmd:"load", handlers:c, wasmMemory:m, wasmModule:La});
});
function cc(a) {
  D ? a() : Promise.all(K.map(Qb)).then(a);
}
function Pb() {
  var a = _scriptName;
  B.mainScriptUrlOrBlob && (a = B.mainScriptUrlOrBlob, "string" != typeof a && (a = URL.createObjectURL(a)));
  a = new Worker(a, {name:"em-pthread"});
  K.push(a);
}
var Va = a => {
  for (; 0 < a.length;) {
    a.shift()(B);
  }
}, Ea = () => {
  var a = Aa(), b = z()[a + 52 >> 2];
  a = z()[a + 56 >> 2];
  fc(b, b - a);
  Wb(b);
}, gc = [], hc, Ga = (a, b) => {
  Sb = 0;
  var c = gc[a];
  c || (a >= gc.length && (gc.length = a + 1), gc[a] = c = hc.get(a));
  a = c(b);
  Yb || 0 < Sb ? Na = a : Ha(a);
}, Yb = B.noExitRuntime || !0;
function ic(a, b, c, d) {
  return D ? N(2, 1, a, b, c, d) : ib(a, b, c, d);
}
var ib = (a, b, c, d) => {
  if ("undefined" == typeof SharedArrayBuffer) {
    return E("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;
  }
  var e = [];
  if (D && 0 === e.length) {
    return ic(a, b, c, d);
  }
  a = {Fa:c, H:a, va:d, Ka:e};
  return D ? (a.ha = "spawnThread", postMessage(a, e), 0) : Rb(a);
};
function O() {
  var a = y()[+jc >> 2];
  jc += 4;
  return a;
}
var kc = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, P = a => {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = kc(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, lc = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.substr(0, b.length - 1);
  return a + b;
}, mc = a => {
  if ("/" === a) {
    return "/";
  }
  a = P(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}, nc = () => {
  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
    return a => (a.set(crypto.getRandomValues(new Uint8Array(a.byteLength))), a);
  }
  $a("initRandomDevice");
}, oc = a => (oc = nc())(a), pc = (...a) => {
  for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
    c = 0 <= d ? a[d] : "/";
    if ("string" != typeof c) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!c) {
      return "";
    }
    b = c + "/" + b;
    c = "/" === c.charAt(0);
  }
  b = kc(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, qc = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, rc = (a, b) => {
  for (var c = b + NaN, d = b; a[d] && !(d >= c);) {
    ++d;
  }
  if (16 < d - b && a.buffer && qc) {
    return qc.decode(a.buffer instanceof SharedArrayBuffer ? a.slice(b, d) : a.subarray(b, d));
  }
  for (c = ""; b < d;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        c += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var k = a[b++] & 63;
        e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | k : (e & 7) << 18 | f << 12 | k << 6 | a[b++] & 63;
        65536 > e ? c += String.fromCharCode(e) : (e -= 65536, c += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      c += String.fromCharCode(e);
    }
  }
  return c;
}, sc = [], tc = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, uc = (a, b, c, d) => {
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var k = a.charCodeAt(f);
    if (55296 <= k && 57343 >= k) {
      var p = a.charCodeAt(++f);
      k = 65536 + ((k & 1023) << 10) | p & 1023;
    }
    if (127 >= k) {
      if (c >= d) {
        break;
      }
      b[c++] = k;
    } else {
      if (2047 >= k) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | k >> 6;
      } else {
        if (65535 >= k) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | k >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          b[c++] = 240 | k >> 18;
          b[c++] = 128 | k >> 12 & 63;
        }
        b[c++] = 128 | k >> 6 & 63;
      }
      b[c++] = 128 | k & 63;
    }
  }
  b[c] = 0;
  return c - e;
};
function vc(a, b) {
  var c = Array(tc(a) + 1);
  a = uc(a, c, 0, c.length);
  b && (c.length = a);
  return c;
}
var wc = [];
function xc(a, b) {
  wc[a] = {input:[], o:[], C:b};
  yc(a, zc);
}
var zc = {open(a) {
  var b = wc[a.node.U];
  if (!b) {
    throw new Q(43);
  }
  a.j = b;
  a.seekable = !1;
}, close(a) {
  a.j.C.S(a.j);
}, S(a) {
  a.j.C.S(a.j);
}, read(a, b, c, d) {
  if (!a.j || !a.j.C.ja) {
    throw new Q(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var k = a.j.C.ja(a.j);
    } catch (p) {
      throw new Q(29);
    }
    if (void 0 === k && 0 === e) {
      throw new Q(6);
    }
    if (null === k || void 0 === k) {
      break;
    }
    e++;
    b[c + f] = k;
  }
  e && (a.node.timestamp = Date.now());
  return e;
}, write(a, b, c, d) {
  if (!a.j || !a.j.C.ca) {
    throw new Q(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.j.C.ca(a.j, b[c + e]);
    }
  } catch (f) {
    throw new Q(29);
  }
  d && (a.node.timestamp = Date.now());
  return e;
}}, Ac = {ja() {
  a: {
    if (!sc.length) {
      var a = null;
      "undefined" != typeof window && "function" == typeof window.prompt ? (a = window.prompt("Input: "), null !== a && (a += "\n")) : "function" == typeof readline && (a = readline(), null !== a && (a += "\n"));
      if (!a) {
        a = null;
        break a;
      }
      sc = vc(a, !0);
    }
    a = sc.shift();
  }
  return a;
}, ca(a, b) {
  null === b || 10 === b ? (xa(rc(a.o, 0)), a.o = []) : 0 != b && a.o.push(b);
}, S(a) {
  a.o && 0 < a.o.length && (xa(rc(a.o, 0)), a.o = []);
}, ya() {
  return {Ua:25856, Wa:5, Ta:191, Va:35387, Sa:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, za() {
  return 0;
}, Aa() {
  return [24, 80];
}}, Bc = {ca(a, b) {
  null === b || 10 === b ? (E(rc(a.o, 0)), a.o = []) : 0 != b && a.o.push(b);
}, S(a) {
  a.o && 0 < a.o.length && (E(rc(a.o, 0)), a.o = []);
}};
function Cc(a, b) {
  var c = a.g ? a.g.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.g, a.g = new Uint8Array(b), 0 < a.l && a.g.set(c.subarray(0, a.l), 0));
}
var R = {v:null, B() {
  return R.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new Q(63);
  }
  R.v || (R.v = {dir:{node:{F:R.h.F, s:R.h.s, O:R.h.O, T:R.h.T, ta:R.h.ta, Y:R.h.Y, ua:R.h.ua, sa:R.h.sa, V:R.h.V}, stream:{G:R.i.G}}, file:{node:{F:R.h.F, s:R.h.s}, stream:{G:R.i.G, read:R.i.read, write:R.i.write, fa:R.i.fa, ba:R.i.ba, pa:R.i.pa}}, link:{node:{F:R.h.F, s:R.h.s, R:R.h.R}, stream:{}}, ga:{node:{F:R.h.F, s:R.h.s}, stream:Dc}});
  c = Ec(a, b, c, d);
  S(c.mode) ? (c.h = R.v.dir.node, c.i = R.v.dir.stream, c.g = {}) : 32768 === (c.mode & 61440) ? (c.h = R.v.file.node, c.i = R.v.file.stream, c.l = 0, c.g = null) : 40960 === (c.mode & 61440) ? (c.h = R.v.link.node, c.i = R.v.link.stream) : 8192 === (c.mode & 61440) && (c.h = R.v.ga.node, c.i = R.v.ga.stream);
  c.timestamp = Date.now();
  a && (a.g[b] = c, a.timestamp = c.timestamp);
  return c;
}, ab(a) {
  return a.g ? a.g.subarray ? a.g.subarray(0, a.l) : new Uint8Array(a.g) : new Uint8Array(0);
}, h:{F(a) {
  var b = {};
  b.Ya = 8192 === (a.mode & 61440) ? a.id : 1;
  b.fb = a.id;
  b.mode = a.mode;
  b.hb = 1;
  b.uid = 0;
  b.bb = 0;
  b.U = a.U;
  S(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.l : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.Qa = new Date(a.timestamp);
  b.gb = new Date(a.timestamp);
  b.Xa = new Date(a.timestamp);
  b.wa = 4096;
  b.Ra = Math.ceil(b.size / b.wa);
  return b;
}, s(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  if (void 0 !== b.size && (b = b.size, a.l != b)) {
    if (0 == b) {
      a.g = null, a.l = 0;
    } else {
      var c = a.g;
      a.g = new Uint8Array(b);
      c && a.g.set(c.subarray(0, Math.min(b, a.l)));
      a.l = b;
    }
  }
}, O() {
  throw Fc[44];
}, T(a, b, c, d) {
  return R.createNode(a, b, c, d);
}, ta(a, b, c) {
  if (S(a.mode)) {
    try {
      var d = Gc(b, c);
    } catch (f) {
    }
    if (d) {
      for (var e in d.g) {
        throw new Q(55);
      }
    }
  }
  delete a.parent.g[a.name];
  a.parent.timestamp = Date.now();
  a.name = c;
  b.g[c] = a;
  b.timestamp = a.parent.timestamp;
  a.parent = b;
}, Y(a, b) {
  delete a.g[b];
  a.timestamp = Date.now();
}, ua(a, b) {
  var c = Gc(a, b), d;
  for (d in c.g) {
    throw new Q(55);
  }
  delete a.g[b];
  a.timestamp = Date.now();
}, sa(a) {
  var b = [".", ".."], c;
  for (c of Object.keys(a.g)) {
    b.push(c);
  }
  return b;
}, V(a, b, c) {
  a = R.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, R(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new Q(28);
  }
  return a.link;
}}, i:{read(a, b, c, d, e) {
  var f = a.node.g;
  if (e >= a.node.l) {
    return 0;
  }
  a = Math.min(a.node.l - e, d);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write(a, b, c, d, e, f) {
  b.buffer === g().buffer && (f = !1);
  if (!d) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.g || a.g.subarray)) {
    if (f) {
      return a.g = b.subarray(c, c + d), a.l = d;
    }
    if (0 === a.l && 0 === e) {
      return a.g = b.slice(c, c + d), a.l = d;
    }
    if (e + d <= a.l) {
      return a.g.set(b.subarray(c, c + d), e), d;
    }
  }
  Cc(a, e + d);
  if (a.g.subarray && b.subarray) {
    a.g.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.g[e + f] = b[c + f];
    }
  }
  a.l = Math.max(a.l, e + d);
  return d;
}, G(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.l);
  if (0 > b) {
    throw new Q(28);
  }
  return b;
}, fa(a, b, c) {
  Cc(a.node, b + c);
  a.node.l = Math.max(a.node.l, b + c);
}, ba(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new Q(43);
  }
  a = a.node.g;
  if (e & 2 || a.buffer !== g().buffer) {
    if (0 < c || c + b < a.length) {
      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
    }
    c = !0;
    $a();
    b = void 0;
    if (!b) {
      throw new Q(48);
    }
    g().set(a, b);
  } else {
    c = !1, b = a.byteOffset;
  }
  return {jb:b, Oa:c};
}, pa(a, b, c, d) {
  R.i.write(a, b, 0, d, c, !1);
  return 0;
}}}, Hc = (a, b, c) => {
  var d = `al ${a}`;
  va(a, e => {
    b(new Uint8Array(e));
    d && Za(d);
  }, () => {
    if (c) {
      c();
    } else {
      throw `Loading data file "${a}" failed.`;
    }
  });
  d && Ya(d);
}, Ic = B.preloadPlugins || [], Jc = (a, b, c, d) => {
  "undefined" != typeof Browser && Browser.eb();
  var e = !1;
  Ic.forEach(f => {
    !e && f.canHandle(b) && (f.handle(a, b, c, d), e = !0);
  });
  return e;
}, Lc = (a, b, c, d, e, f, k, p, w, l) => {
  function n(h) {
    function q(t) {
      l?.();
      p || Kc(a, b, t, d, e, w);
      f?.();
      Za(v);
    }
    Jc(h, u, q, () => {
      k?.();
      Za(v);
    }) || q(h);
  }
  var u = b ? pc(P(a + "/" + b)) : a, v = `cp ${u}`;
  Ya(v);
  "string" == typeof c ? Hc(c, n, k) : n(c);
}, Mc = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, Nc = null, Oc = {}, Pc = [], Qc = 1, T = null, Ua = !0, Q = class {
  constructor(a) {
    this.name = "ErrnoError";
    this.u = a;
  }
}, Fc = {}, Rc = class {
  constructor() {
    this.m = {};
    this.node = null;
  }
  get flags() {
    return this.m.flags;
  }
  set flags(a) {
    this.m.flags = a;
  }
  get position() {
    return this.m.position;
  }
  set position(a) {
    this.m.position = a;
  }
}, Sc = class {
  constructor(a, b, c, d) {
    a ||= this;
    this.parent = a;
    this.B = a.B;
    this.P = null;
    this.id = Qc++;
    this.name = b;
    this.mode = c;
    this.h = {};
    this.i = {};
    this.U = d;
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read(a) {
    a ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write(a) {
    a ? this.mode |= 146 : this.mode &= -147;
  }
  get Ca() {
    return S(this.mode);
  }
  get Ba() {
    return 8192 === (this.mode & 61440);
  }
};
function U(a, b = {}) {
  a = pc(a);
  if (!a) {
    return {path:"", node:null};
  }
  b = Object.assign({ia:!0, da:0}, b);
  if (8 < b.da) {
    throw new Q(32);
  }
  a = a.split("/").filter(k => !!k);
  for (var c = Nc, d = "/", e = 0; e < a.length; e++) {
    var f = e === a.length - 1;
    if (f && b.parent) {
      break;
    }
    c = Gc(c, a[e]);
    d = P(d + "/" + a[e]);
    c.P && (!f || f && b.ia) && (c = c.P.root);
    if (!f || b.$) {
      for (f = 0; 40960 === (c.mode & 61440);) {
        if (c = Tc(d), d = pc(lc(d), c), c = U(d, {da:b.da + 1}).node, 40 < f++) {
          throw new Q(32);
        }
      }
    }
  }
  return {path:d, node:c};
}
function Uc(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.B.oa, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function Vc(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % T.length;
}
function Gc(a, b) {
  var c = S(a.mode) ? (c = Wc(a, "x")) ? c : a.h.O ? 0 : 2 : 54;
  if (c) {
    throw new Q(c);
  }
  for (c = T[Vc(a.id, b)]; c; c = c.L) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.h.O(a, b);
}
function Ec(a, b, c, d) {
  a = new Sc(a, b, c, d);
  b = Vc(a.parent.id, a.name);
  a.L = T[b];
  return T[b] = a;
}
function S(a) {
  return 16384 === (a & 61440);
}
function Xc(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Wc(a, b) {
  if (Ua) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function Yc(a, b) {
  try {
    return Gc(a, b), 20;
  } catch (c) {
  }
  return Wc(a, "wx");
}
function V(a) {
  a = Pc[a];
  if (!a) {
    throw new Q(8);
  }
  return a;
}
function Zc(a, b = -1) {
  a = Object.assign(new Rc(), a);
  if (-1 == b) {
    a: {
      for (b = 0; 4096 >= b; b++) {
        if (!Pc[b]) {
          break a;
        }
      }
      throw new Q(33);
    }
  }
  a.D = b;
  return Pc[b] = a;
}
function $c(a, b = -1) {
  a = Zc(a, b);
  a.i?.Za?.(a);
  return a;
}
var Dc = {open(a) {
  a.i = Oc[a.node.U].i;
  a.i.open?.(a);
}, G() {
  throw new Q(70);
}};
function yc(a, b) {
  Oc[a] = {i:b};
}
function ad(a, b) {
  var c = "/" === b;
  if (c && Nc) {
    throw new Q(10);
  }
  if (!c && b) {
    var d = U(b, {ia:!1});
    b = d.path;
    d = d.node;
    if (d.P) {
      throw new Q(10);
    }
    if (!S(d.mode)) {
      throw new Q(54);
    }
  }
  b = {type:a, ib:{}, oa:b, Da:[]};
  a = a.B(b);
  a.B = b;
  b.root = a;
  c ? Nc = a : d && (d.P = b, d.B && d.B.Da.push(b));
}
function bd(a, b, c) {
  var d = U(a, {parent:!0}).node;
  a = mc(a);
  if (!a || "." === a || ".." === a) {
    throw new Q(28);
  }
  var e = Yc(d, a);
  if (e) {
    throw new Q(e);
  }
  if (!d.h.T) {
    throw new Q(63);
  }
  return d.h.T(d, a, b, c);
}
function W(a) {
  return bd(a, 16895, 0);
}
function cd(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  return bd(a, b | 8192, c);
}
function dd(a, b) {
  if (!pc(a)) {
    throw new Q(44);
  }
  var c = U(b, {parent:!0}).node;
  if (!c) {
    throw new Q(44);
  }
  b = mc(b);
  var d = Yc(c, b);
  if (d) {
    throw new Q(d);
  }
  if (!c.h.V) {
    throw new Q(63);
  }
  c.h.V(c, b, a);
}
function ed(a) {
  var b = U(a, {parent:!0}).node;
  if (!b) {
    throw new Q(44);
  }
  var c = mc(a);
  a = Gc(b, c);
  a: {
    try {
      var d = Gc(b, c);
    } catch (f) {
      d = f.u;
      break a;
    }
    var e = Wc(b, "wx");
    d = e ? e : S(d.mode) ? 31 : 0;
  }
  if (d) {
    throw new Q(d);
  }
  if (!b.h.Y) {
    throw new Q(63);
  }
  if (a.P) {
    throw new Q(10);
  }
  b.h.Y(b, c);
  b = Vc(a.parent.id, a.name);
  if (T[b] === a) {
    T[b] = a.L;
  } else {
    for (b = T[b]; b;) {
      if (b.L === a) {
        b.L = a.L;
        break;
      }
      b = b.L;
    }
  }
}
function Tc(a) {
  a = U(a).node;
  if (!a) {
    throw new Q(44);
  }
  if (!a.h.R) {
    throw new Q(28);
  }
  return pc(Uc(a.parent), a.h.R(a));
}
function fd(a, b) {
  a = "string" == typeof a ? U(a, {$:!0}).node : a;
  if (!a.h.s) {
    throw new Q(63);
  }
  a.h.s(a, {mode:b & 4095 | a.mode & -4096, timestamp:Date.now()});
}
function gd(a, b) {
  if (0 > b) {
    throw new Q(28);
  }
  a = "string" == typeof a ? U(a, {$:!0}).node : a;
  if (!a.h.s) {
    throw new Q(63);
  }
  if (S(a.mode)) {
    throw new Q(31);
  }
  if (32768 !== (a.mode & 61440)) {
    throw new Q(28);
  }
  var c = Wc(a, "w");
  if (c) {
    throw new Q(c);
  }
  a.h.s(a, {size:b, timestamp:Date.now()});
}
function hd(a, b, c) {
  if ("" === a) {
    throw new Q(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    var e = a;
  } else {
    a = P(a);
    try {
      e = U(a, {$:!(b & 131072)}).node;
    } catch (f) {
    }
  }
  d = !1;
  if (b & 64) {
    if (e) {
      if (b & 128) {
        throw new Q(20);
      }
    } else {
      e = bd(a, c, 0), d = !0;
    }
  }
  if (!e) {
    throw new Q(44);
  }
  8192 === (e.mode & 61440) && (b &= -513);
  if (b & 65536 && !S(e.mode)) {
    throw new Q(54);
  }
  if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : S(e.mode) && ("r" !== Xc(b) || b & 512) ? 31 : Wc(e, Xc(b)) : 44)) {
    throw new Q(c);
  }
  b & 512 && !d && gd(e, 0);
  b &= -131713;
  e = Zc({node:e, path:Uc(e), flags:b, seekable:!0, position:0, i:e.i, La:[], error:!1});
  e.i.open && e.i.open(e);
  !B.logReadFiles || b & 1 || (jd ||= {}, a in jd || (jd[a] = 1));
  return e;
}
function kd(a) {
  if (null === a.D) {
    throw new Q(8);
  }
  a.aa && (a.aa = null);
  try {
    a.i.close && a.i.close(a);
  } catch (b) {
    throw b;
  } finally {
    Pc[a.D] = null;
  }
  a.D = null;
}
function ld(a, b, c) {
  if (null === a.D) {
    throw new Q(8);
  }
  if (!a.seekable || !a.i.G) {
    throw new Q(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new Q(28);
  }
  a.position = a.i.G(a, b, c);
  a.La = [];
}
function md(a, b, c, d, e, f) {
  if (0 > d || 0 > e) {
    throw new Q(28);
  }
  if (null === a.D) {
    throw new Q(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new Q(8);
  }
  if (S(a.node.mode)) {
    throw new Q(31);
  }
  if (!a.i.write) {
    throw new Q(28);
  }
  a.seekable && a.flags & 1024 && ld(a, 0, 2);
  var k = "undefined" != typeof e;
  if (!k) {
    e = a.position;
  } else if (!a.seekable) {
    throw new Q(70);
  }
  b = a.i.write(a, b, c, d, e, f);
  k || (a.position += b);
  return b;
}
function pa(a, b, c) {
  Ta = !0;
  B.stdin = a || B.stdin;
  B.stdout = b || B.stdout;
  B.stderr = c || B.stderr;
  B.stdin ? X("/dev", "stdin", B.stdin) : dd("/dev/tty", "/dev/stdin");
  B.stdout ? X("/dev", "stdout", null, B.stdout) : dd("/dev/tty", "/dev/stdout");
  B.stderr ? X("/dev", "stderr", null, B.stderr) : dd("/dev/tty1", "/dev/stderr");
  hd("/dev/stdin", 0);
  hd("/dev/stdout", 1);
  hd("/dev/stderr", 1);
}
var Ta;
function nd(a, b) {
  a = "string" == typeof a ? a : Uc(a);
  for (b = b.split("/").reverse(); b.length;) {
    var c = b.pop();
    if (c) {
      var d = P(a + "/" + c);
      try {
        W(d);
      } catch (e) {
      }
      a = d;
    }
  }
  return d;
}
function od(a, b, c, d) {
  a = P(("string" == typeof a ? a : Uc(a)) + "/" + b);
  c = Mc(c, d);
  return bd(a, (void 0 !== c ? c : 438) & 4095 | 32768, 0);
}
function Kc(a, b, c, d, e, f) {
  var k = b;
  a && (a = "string" == typeof a ? a : Uc(a), k = b ? P(a + "/" + b) : a);
  a = Mc(d, e);
  k = bd(k, (void 0 !== a ? a : 438) & 4095 | 32768, 0);
  if (c) {
    if ("string" == typeof c) {
      b = Array(c.length);
      d = 0;
      for (e = c.length; d < e; ++d) {
        b[d] = c.charCodeAt(d);
      }
      c = b;
    }
    fd(k, a | 146);
    b = hd(k, 577);
    md(b, c, 0, c.length, 0, f);
    kd(b);
    fd(k, a);
  }
}
function X(a, b, c, d) {
  a = P(("string" == typeof a ? a : Uc(a)) + "/" + b);
  b = Mc(!!c, !!d);
  X.na || (X.na = 64);
  var e = X.na++ << 8 | 0;
  yc(e, {open(f) {
    f.seekable = !1;
  }, close() {
    d?.buffer?.length && d(10);
  }, read(f, k, p, w) {
    for (var l = 0, n = 0; n < w; n++) {
      try {
        var u = c();
      } catch (v) {
        throw new Q(29);
      }
      if (void 0 === u && 0 === l) {
        throw new Q(6);
      }
      if (null === u || void 0 === u) {
        break;
      }
      l++;
      k[p + n] = u;
    }
    l && (f.node.timestamp = Date.now());
    return l;
  }, write(f, k, p, w) {
    for (var l = 0; l < w; l++) {
      try {
        d(k[p + l]);
      } catch (n) {
        throw new Q(29);
      }
    }
    w && (f.node.timestamp = Date.now());
    return l;
  }});
  return cd(a, b, e);
}
function pd(a) {
  if (!(a.Ba || a.Ca || a.link || a.g)) {
    if ("undefined" != typeof XMLHttpRequest) {
      throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    }
    if (ua) {
      try {
        a.g = vc(ua(a.url), !0), a.l = a.g.length;
      } catch (b) {
        throw new Q(29);
      }
    } else {
      throw Error("Cannot load without read() or XMLHttpRequest.");
    }
  }
}
function qd(a, b, c, d, e) {
  class f {
    constructor() {
      this.N = !1;
      this.m = [];
      this.M = void 0;
      this.ka = this.la = 0;
    }
    get(n) {
      if (!(n > this.length - 1 || 0 > n)) {
        var u = n % this.qa;
        return this.M(n / this.qa | 0)[u];
      }
    }
    Ea(n) {
      this.M = n;
    }
    ma() {
      var n = new XMLHttpRequest();
      n.open("HEAD", c, !1);
      n.send(null);
      if (!(200 <= n.status && 300 > n.status || 304 === n.status)) {
        throw Error("Couldn't load " + c + ". Status: " + n.status);
      }
      var u = Number(n.getResponseHeader("Content-length")), v, h = (v = n.getResponseHeader("Accept-Ranges")) && "bytes" === v;
      n = (v = n.getResponseHeader("Content-Encoding")) && "gzip" === v;
      var q = 1048576;
      h || (q = u);
      var t = this;
      t.Ea(A => {
        var J = A * q, ha = (A + 1) * q - 1;
        ha = Math.min(ha, u - 1);
        if ("undefined" == typeof t.m[A]) {
          var Jd = t.m;
          if (J > ha) {
            throw Error("invalid range (" + J + ", " + ha + ") or no bytes requested!");
          }
          if (ha > u - 1) {
            throw Error("only " + u + " bytes available! programmer error!");
          }
          var F = new XMLHttpRequest();
          F.open("GET", c, !1);
          u !== q && F.setRequestHeader("Range", "bytes=" + J + "-" + ha);
          F.responseType = "arraybuffer";
          F.overrideMimeType && F.overrideMimeType("text/plain; charset=x-user-defined");
          F.send(null);
          if (!(200 <= F.status && 300 > F.status || 304 === F.status)) {
            throw Error("Couldn't load " + c + ". Status: " + F.status);
          }
          J = void 0 !== F.response ? new Uint8Array(F.response || []) : vc(F.responseText || "", !0);
          Jd[A] = J;
        }
        if ("undefined" == typeof t.m[A]) {
          throw Error("doXHR failed!");
        }
        return t.m[A];
      });
      if (n || !u) {
        q = u = 1, q = u = this.M(0).length, xa("LazyFiles on gzip forces download of the whole file when length is accessed");
      }
      this.la = u;
      this.ka = q;
      this.N = !0;
    }
    get length() {
      this.N || this.ma();
      return this.la;
    }
    get qa() {
      this.N || this.ma();
      return this.ka;
    }
  }
  if ("undefined" != typeof XMLHttpRequest) {
    if (!C) {
      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
    }
    var k = new f();
    var p = void 0;
  } else {
    p = c, k = void 0;
  }
  var w = od(a, b, d, e);
  k ? w.g = k : p && (w.g = null, w.url = p);
  Object.defineProperties(w, {l:{get:function() {
    return this.g.length;
  }}});
  var l = {};
  Object.keys(w.i).forEach(n => {
    var u = w.i[n];
    l[n] = (...v) => {
      pd(w);
      return u(...v);
    };
  });
  l.read = (n, u, v, h, q) => {
    pd(w);
    n = n.node.g;
    if (q >= n.length) {
      u = 0;
    } else {
      h = Math.min(n.length - q, h);
      if (n.slice) {
        for (var t = 0; t < h; t++) {
          u[v + t] = n[q + t];
        }
      } else {
        for (t = 0; t < h; t++) {
          u[v + t] = n.get(q + t);
        }
      }
      u = h;
    }
    return u;
  };
  l.ba = () => {
    pd(w);
    $a();
    throw new Q(48);
  };
  w.i = l;
  return w;
}
var Y = {}, jd, rd = a => a ? rc(aa(), a) : "", jc = void 0;
function jb(a, b, c) {
  if (D) {
    return N(3, 1, a, b, c);
  }
  jc = c;
  try {
    var d = V(a);
    switch(b) {
      case 0:
        var e = O();
        if (0 > e) {
          break;
        }
        for (; Pc[e];) {
          e++;
        }
        return $c(d, e).D;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = O(), d.flags |= e, 0;
      case 12:
        return e = O(), ca()[e + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (f) {
    if ("undefined" == typeof Y || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.u;
  }
}
function kb(a, b, c) {
  if (D) {
    return N(4, 1, a, b, c);
  }
  b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
  try {
    if (isNaN(b)) {
      return 61;
    }
    var d = V(a);
    if (0 === (d.flags & 2097155)) {
      throw new Q(28);
    }
    gd(d.node, b);
    return 0;
  } catch (e) {
    if ("undefined" == typeof Y || "ErrnoError" !== e.name) {
      throw e;
    }
    return -e.u;
  }
}
var sd = (a, b) => {
  uc(a, aa(), b, 17);
};
function lb(a, b) {
  if (D) {
    return N(5, 1, a, b);
  }
  try {
    if (0 === b) {
      return -28;
    }
    var c = tc("/") + 1;
    if (b < c) {
      return -68;
    }
    uc("/", aa(), a, b);
    return c;
  } catch (d) {
    if ("undefined" == typeof Y || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.u;
  }
}
function mb(a, b, c) {
  if (D) {
    return N(6, 1, a, b, c);
  }
  jc = c;
  try {
    var d = V(a);
    switch(b) {
      case 21509:
        return d.j ? 0 : -59;
      case 21505:
        if (!d.j) {
          return -59;
        }
        if (d.j.C.ya) {
          a = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var e = O();
          y()[e >> 2] = 25856;
          y()[e + 4 >> 2] = 5;
          y()[e + 8 >> 2] = 191;
          y()[e + 12 >> 2] = 35387;
          for (var f = 0; 32 > f; f++) {
            g()[e + f + 17] = a[f] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return d.j ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!d.j) {
          return -59;
        }
        if (d.j.C.za) {
          for (e = O(), y(), y(), y(), y(), a = [], f = 0; 32 > f; f++) {
            a.push(g()[e + f + 17]);
          }
        }
        return 0;
      case 21519:
        if (!d.j) {
          return -59;
        }
        e = O();
        return y()[e >> 2] = 0;
      case 21520:
        return d.j ? -28 : -59;
      case 21531:
        e = O();
        if (!d.i.xa) {
          throw new Q(59);
        }
        return d.i.xa(d, b, e);
      case 21523:
        if (!d.j) {
          return -59;
        }
        d.j.C.Aa && (f = [24, 80], e = O(), ca()[e >> 1] = f[0], ca()[e + 2 >> 1] = f[1]);
        return 0;
      case 21524:
        return d.j ? 0 : -59;
      case 21515:
        return d.j ? 0 : -59;
      default:
        return -28;
    }
  } catch (k) {
    if ("undefined" == typeof Y || "ErrnoError" !== k.name) {
      throw k;
    }
    return -k.u;
  }
}
function nb(a, b, c, d) {
  if (D) {
    return N(7, 1, a, b, c, d);
  }
  jc = d;
  try {
    b = rd(b);
    var e = b;
    if ("/" === e.charAt(0)) {
      b = e;
    } else {
      var f = -100 === a ? "/" : V(a).path;
      if (0 == e.length) {
        throw new Q(44);
      }
      b = P(f + "/" + e);
    }
    var k = d ? O() : 0;
    return hd(b, c, k).D;
  } catch (p) {
    if ("undefined" == typeof Y || "ErrnoError" !== p.name) {
      throw p;
    }
    return -p.u;
  }
}
var ob = () => 1, pb = a => {
  Ca(a, !C, 1, !na, 2097152, !1);
  Fa();
}, Da = a => {
  "function" === typeof Atomics.Na && (Atomics.Na(y(), a >> 2, a).value.then(Ia), a += 128, Atomics.store(y(), a >> 2, 1));
}, Ia = () => {
  var a = Aa();
  if (a && (Da(a), a = td, !Ma)) {
    try {
      if (a(), !(Yb || 0 < Sb)) {
        try {
          D ? Ha(Na) : Gb(Na);
        } catch (b) {
          Zb(b);
        }
      }
    } catch (b) {
      Zb(b);
    }
  }
}, qb = (a, b) => {
  a == b ? setTimeout(Ia) : D ? postMessage({targetThread:a, cmd:"checkMailbox"}) : (a = M[a]) && a.postMessage({cmd:"checkMailbox"});
}, ud = [], rb = (a, b, c, d, e) => {
  ud.length = d;
  b = e >> 3;
  for (c = 0; c < d; c++) {
    ud[c] = ia()[b + c];
  }
  return (0,vd[a])(...ud);
}, sb = a => {
  D ? postMessage({cmd:"cleanupThread", thread:a}) : ec(M[a]);
}, tb = () => {
}, wd = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), xd = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], yd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
function ub(a, b, c) {
  a = new Date(1e3 * (b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN));
  y()[c >> 2] = a.getSeconds();
  y()[c + 4 >> 2] = a.getMinutes();
  y()[c + 8 >> 2] = a.getHours();
  y()[c + 12 >> 2] = a.getDate();
  y()[c + 16 >> 2] = a.getMonth();
  y()[c + 20 >> 2] = a.getFullYear() - 1900;
  y()[c + 24 >> 2] = a.getDay();
  b = (wd(a.getFullYear()) ? xd : yd)[a.getMonth()] + a.getDate() - 1 | 0;
  y()[c + 28 >> 2] = b;
  y()[c + 36 >> 2] = -(60 * a.getTimezoneOffset());
  b = (new Date(a.getFullYear(), 6, 1)).getTimezoneOffset();
  var d = (new Date(a.getFullYear(), 0, 1)).getTimezoneOffset();
  a = (b != d && a.getTimezoneOffset() == Math.min(d, b)) | 0;
  y()[c + 32 >> 2] = a;
}
function vb(a) {
  var b = new Date(y()[a + 20 >> 2] + 1900, y()[a + 16 >> 2], y()[a + 12 >> 2], y()[a + 8 >> 2], y()[a + 4 >> 2], y()[a >> 2], 0), c = y()[a + 32 >> 2], d = b.getTimezoneOffset(), e = (new Date(b.getFullYear(), 6, 1)).getTimezoneOffset(), f = (new Date(b.getFullYear(), 0, 1)).getTimezoneOffset(), k = Math.min(f, e);
  0 > c ? y()[a + 32 >> 2] = Number(e != f && k == d) : 0 < c != (k == d) && (e = Math.max(f, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? k : e) - d)));
  y()[a + 24 >> 2] = b.getDay();
  c = (wd(b.getFullYear()) ? xd : yd)[b.getMonth()] + b.getDate() - 1 | 0;
  y()[a + 28 >> 2] = c;
  y()[a >> 2] = b.getSeconds();
  y()[a + 4 >> 2] = b.getMinutes();
  y()[a + 8 >> 2] = b.getHours();
  y()[a + 12 >> 2] = b.getDate();
  y()[a + 16 >> 2] = b.getMonth();
  y()[a + 20 >> 2] = b.getYear();
  a = b.getTime();
  a = isNaN(a) ? -1 : a / 1e3;
  zd((I = a, 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0));
  return a >>> 0;
}
var wb = (a, b, c, d) => {
  var e = (new Date()).getFullYear(), f = new Date(e, 0, 1), k = new Date(e, 6, 1);
  e = f.getTimezoneOffset();
  var p = k.getTimezoneOffset(), w = Math.max(e, p);
  z()[a >> 2] = 60 * w;
  y()[b >> 2] = Number(e != p);
  a = l => l.toLocaleTimeString(void 0, {hour12:!1, timeZoneName:"short"}).split(" ")[1];
  f = a(f);
  k = a(k);
  p < e ? (sd(f, c), sd(k, d)) : (sd(f, d), sd(k, c));
}, xb = () => {
  $a("");
}, yb = () => {
}, zb = () => Date.now(), Ab = () => {
  Sb += 1;
  throw "unwind";
}, Bb;
Bb = () => performance.timeOrigin + performance.now();
var Cb = () => navigator.hardwareConcurrency, Db = a => {
  var b = aa().length;
  a >>>= 0;
  if (a <= b || 1258291200 < a) {
    return !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + .2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math;
    d = Math.max(a, d);
    a: {
      e = (e.min.call(e, 1258291200, d + (65536 - d % 65536) % 65536) - m.buffer.byteLength + 65535) / 65536;
      try {
        m.grow(e);
        x();
        var f = 1;
        break a;
      } catch (k) {
      }
      f = void 0;
    }
    if (f) {
      return !0;
    }
  }
  return !1;
}, Ad = {}, Cd = () => {
  if (!Bd) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:sa || "./this.program"}, b;
    for (b in Ad) {
      void 0 === Ad[b] ? delete a[b] : a[b] = Ad[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    Bd = c;
  }
  return Bd;
}, Bd;
function Eb(a, b) {
  if (D) {
    return N(8, 1, a, b);
  }
  var c = 0;
  Cd().forEach((d, e) => {
    var f = b + c;
    e = z()[a + 4 * e >> 2] = f;
    for (f = 0; f < d.length; ++f) {
      g()[e++] = d.charCodeAt(f);
    }
    g()[e] = 0;
    c += d.length + 1;
  });
  return 0;
}
function Fb(a, b) {
  if (D) {
    return N(9, 1, a, b);
  }
  var c = Cd();
  z()[a >> 2] = c.length;
  var d = 0;
  c.forEach(e => d += e.length + 1);
  z()[b >> 2] = d;
  return 0;
}
function Hb(a) {
  if (D) {
    return N(10, 1, a);
  }
  try {
    var b = V(a);
    kd(b);
    return 0;
  } catch (c) {
    if ("undefined" == typeof Y || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.u;
  }
}
function Ib(a, b, c, d) {
  if (D) {
    return N(11, 1, a, b, c, d);
  }
  try {
    a: {
      var e = V(a);
      a = b;
      for (var f, k = b = 0; k < c; k++) {
        var p = z()[a >> 2], w = z()[a + 4 >> 2];
        a += 8;
        var l = e, n = g(), u = f;
        if (0 > w || 0 > u) {
          throw new Q(28);
        }
        if (null === l.D) {
          throw new Q(8);
        }
        if (1 === (l.flags & 2097155)) {
          throw new Q(8);
        }
        if (S(l.node.mode)) {
          throw new Q(31);
        }
        if (!l.i.read) {
          throw new Q(28);
        }
        var v = "undefined" != typeof u;
        if (!v) {
          u = l.position;
        } else if (!l.seekable) {
          throw new Q(70);
        }
        var h = l.i.read(l, n, p, w, u);
        v || (l.position += h);
        var q = h;
        if (0 > q) {
          var t = -1;
          break a;
        }
        b += q;
        if (q < w) {
          break;
        }
        "undefined" != typeof f && (f += q);
      }
      t = b;
    }
    z()[d >> 2] = t;
    return 0;
  } catch (A) {
    if ("undefined" == typeof Y || "ErrnoError" !== A.name) {
      throw A;
    }
    return A.u;
  }
}
function Jb(a, b, c, d, e) {
  if (D) {
    return N(12, 1, a, b, c, d, e);
  }
  b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
  try {
    if (isNaN(b)) {
      return 61;
    }
    var f = V(a);
    ld(f, b, d);
    Mb = [f.position >>> 0, (I = f.position, 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
    y()[e >> 2] = Mb[0];
    y()[e + 4 >> 2] = Mb[1];
    f.aa && 0 === b && 0 === d && (f.aa = null);
    return 0;
  } catch (k) {
    if ("undefined" == typeof Y || "ErrnoError" !== k.name) {
      throw k;
    }
    return k.u;
  }
}
function Kb(a, b, c, d) {
  if (D) {
    return N(13, 1, a, b, c, d);
  }
  try {
    a: {
      var e = V(a);
      a = b;
      for (var f, k = b = 0; k < c; k++) {
        var p = z()[a >> 2], w = z()[a + 4 >> 2];
        a += 8;
        var l = md(e, g(), p, w, f);
        if (0 > l) {
          var n = -1;
          break a;
        }
        b += l;
        "undefined" != typeof f && (f += l);
      }
      n = b;
    }
    z()[d >> 2] = n;
    return 0;
  } catch (u) {
    if ("undefined" == typeof Y || "ErrnoError" !== u.name) {
      throw u;
    }
    return u.u;
  }
}
var Dd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ed = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Fd = (a, b) => {
  g().set(a, b);
}, Gd = (a, b, c, d) => {
  function e(h, q, t) {
    for (h = "number" == typeof h ? h.toString() : h || ""; h.length < q;) {
      h = t[0] + h;
    }
    return h;
  }
  function f(h, q) {
    return e(h, q, "0");
  }
  function k(h, q) {
    function t(J) {
      return 0 > J ? -1 : 0 < J ? 1 : 0;
    }
    var A;
    0 === (A = t(h.getFullYear() - q.getFullYear())) && 0 === (A = t(h.getMonth() - q.getMonth())) && (A = t(h.getDate() - q.getDate()));
    return A;
  }
  function p(h) {
    switch(h.getDay()) {
      case 0:
        return new Date(h.getFullYear() - 1, 11, 29);
      case 1:
        return h;
      case 2:
        return new Date(h.getFullYear(), 0, 3);
      case 3:
        return new Date(h.getFullYear(), 0, 2);
      case 4:
        return new Date(h.getFullYear(), 0, 1);
      case 5:
        return new Date(h.getFullYear() - 1, 11, 31);
      case 6:
        return new Date(h.getFullYear() - 1, 11, 30);
    }
  }
  function w(h) {
    var q = h.I;
    for (h = new Date((new Date(h.J + 1900, 0, 1)).getTime()); 0 < q;) {
      var t = h.getMonth(), A = (wd(h.getFullYear()) ? Dd : Ed)[t];
      if (q > A - h.getDate()) {
        q -= A - h.getDate() + 1, h.setDate(1), 11 > t ? h.setMonth(t + 1) : (h.setMonth(0), h.setFullYear(h.getFullYear() + 1));
      } else {
        h.setDate(h.getDate() + q);
        break;
      }
    }
    t = new Date(h.getFullYear() + 1, 0, 4);
    q = p(new Date(h.getFullYear(), 0, 4));
    t = p(t);
    return 0 >= k(q, h) ? 0 >= k(t, h) ? h.getFullYear() + 1 : h.getFullYear() : h.getFullYear() - 1;
  }
  var l = z()[d + 40 >> 2];
  d = {Ia:y()[d >> 2], Ha:y()[d + 4 >> 2], W:y()[d + 8 >> 2], ea:y()[d + 12 >> 2], X:y()[d + 16 >> 2], J:y()[d + 20 >> 2], A:y()[d + 24 >> 2], I:y()[d + 28 >> 2], lb:y()[d + 32 >> 2], Ga:y()[d + 36 >> 2], Ja:l ? rd(l) : ""};
  c = rd(c);
  l = {"%c":"%a %b %d %H:%M:%S %Y", "%D":"%m/%d/%y", "%F":"%Y-%m-%d", "%h":"%b", "%r":"%I:%M:%S %p", "%R":"%H:%M", "%T":"%H:%M:%S", "%x":"%m/%d/%y", "%X":"%H:%M:%S", "%Ec":"%c", "%EC":"%C", "%Ex":"%m/%d/%y", "%EX":"%H:%M:%S", "%Ey":"%y", "%EY":"%Y", "%Od":"%d", "%Oe":"%e", "%OH":"%H", "%OI":"%I", "%Om":"%m", "%OM":"%M", "%OS":"%S", "%Ou":"%u", "%OU":"%U", "%OV":"%V", "%Ow":"%w", "%OW":"%W", "%Oy":"%y"};
  for (var n in l) {
    c = c.replace(new RegExp(n, "g"), l[n]);
  }
  var u = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), v = "January February March April May June July August September October November December".split(" ");
  l = {"%a":h => u[h.A].substring(0, 3), "%A":h => u[h.A], "%b":h => v[h.X].substring(0, 3), "%B":h => v[h.X], "%C":h => f((h.J + 1900) / 100 | 0, 2), "%d":h => f(h.ea, 2), "%e":h => e(h.ea, 2, " "), "%g":h => w(h).toString().substring(2), "%G":w, "%H":h => f(h.W, 2), "%I":h => {
    h = h.W;
    0 == h ? h = 12 : 12 < h && (h -= 12);
    return f(h, 2);
  }, "%j":h => {
    for (var q = 0, t = 0; t <= h.X - 1; q += (wd(h.J + 1900) ? Dd : Ed)[t++]) {
    }
    return f(h.ea + q, 3);
  }, "%m":h => f(h.X + 1, 2), "%M":h => f(h.Ha, 2), "%n":() => "\n", "%p":h => 0 <= h.W && 12 > h.W ? "AM" : "PM", "%S":h => f(h.Ia, 2), "%t":() => "\t", "%u":h => h.A || 7, "%U":h => f(Math.floor((h.I + 7 - h.A) / 7), 2), "%V":h => {
    var q = Math.floor((h.I + 7 - (h.A + 6) % 7) / 7);
    2 >= (h.A + 371 - h.I - 2) % 7 && q++;
    if (q) {
      53 == q && (t = (h.A + 371 - h.I) % 7, 4 == t || 3 == t && wd(h.J) || (q = 1));
    } else {
      q = 52;
      var t = (h.A + 7 - h.I - 1) % 7;
      (4 == t || 5 == t && wd(h.J % 400 - 1)) && q++;
    }
    return f(q, 2);
  }, "%w":h => h.A, "%W":h => f(Math.floor((h.I + 7 - (h.A + 6) % 7) / 7), 2), "%y":h => (h.J + 1900).toString().substring(2), "%Y":h => h.J + 1900, "%z":h => {
    h = h.Ga;
    var q = 0 <= h;
    h = Math.abs(h) / 60;
    return (q ? "+" : "-") + String("0000" + (h / 60 * 100 + h % 60)).slice(-4);
  }, "%Z":h => h.Ja, "%%":() => "%"};
  c = c.replace(/%%/g, "\x00\x00");
  for (n in l) {
    c.includes(n) && (c = c.replace(new RegExp(n, "g"), l[n](d)));
  }
  c = c.replace(/\0\0/g, "%");
  n = vc(c, !1);
  if (n.length > b) {
    return 0;
  }
  Fd(n, a);
  return n.length - 1;
}, Lb = (a, b, c, d) => Gd(a, b, c, d), Hd = a => {
  var b = tc(a) + 1, c = Ub(b);
  uc(a, aa(), c, b);
  return c;
}, Id = (a, b, c, d) => {
  var e = {string:l => {
    var n = 0;
    null !== l && void 0 !== l && 0 !== l && (n = Hd(l));
    return n;
  }, array:l => {
    var n = Ub(l.length);
    g().set(l, n);
    return n;
  }};
  a = B["_" + a];
  var f = [], k = 0;
  if (d) {
    for (var p = 0; p < d.length; p++) {
      var w = e[c[p]];
      w ? (0 === k && (k = Tb()), f[p] = w(d[p])) : f[p] = d[p];
    }
  }
  c = a(...f);
  return c = function(l) {
    0 !== k && Wb(k);
    return "string" === b ? rd(l) : "boolean" === b ? !!l : l;
  }(c);
};
D ? Yb = !1 : bc();
[44].forEach(a => {
  Fc[a] = new Q(a);
  Fc[a].stack = "<generic error, no stack>";
});
T = Array(4096);
ad(R, "/");
W("/tmp");
W("/home");
W("/home/web_user");
(function() {
  W("/dev");
  yc(259, {read:() => 0, write:(d, e, f, k) => k});
  cd("/dev/null", 259);
  xc(1280, Ac);
  xc(1536, Bc);
  cd("/dev/tty", 1280);
  cd("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (b = oc(a).byteLength);
    return a[--b];
  };
  X("/dev", "random", c);
  X("/dev", "urandom", c);
  W("/dev/shm");
  W("/dev/shm/tmp");
})();
(function() {
  W("/proc");
  var a = W("/proc/self");
  W("/proc/self/fd");
  ad({B() {
    var b = Ec(a, "fd", 16895, 73);
    b.h = {O(c, d) {
      var e = V(+d);
      c = {parent:null, B:{oa:"fake"}, h:{R:() => e.path}};
      return c.parent = c;
    }};
    return b;
  }}, "/proc/self/fd");
})();
B.FS_createPath = nd;
B.FS_createDataFile = Kc;
B.FS_createPreloadedFile = Lc;
B.FS_unlink = ed;
B.FS_createLazyFile = qd;
B.FS_createDevice = X;
var vd = [Xb, $b, ic, jb, kb, lb, mb, nb, Eb, Fb, Hb, Ib, Jb, Kb], hb, Z = function() {
  function a(c, d) {
    Z = c.exports;
    ac.push(Z._emscripten_tls_init);
    hc = Z.__indirect_function_table;
    Pa.unshift(Z.__wasm_call_ctors);
    La = d;
    Za("wasm-instantiate");
    return Z;
  }
  var b = Ba();
  Ya("wasm-instantiate");
  if (B.instantiateWasm) {
    try {
      return B.instantiateWasm(b, a);
    } catch (c) {
      E(`Module.instantiateWasm callback failed with error: ${c}`), la(c);
    }
  }
  gb(b, function(c) {
    a(c.instance, c.module);
  }).catch(la);
  return {};
}(), Kd = B._main = (a, b) => (Kd = B._main = Z.__main_argc_argv)(a, b);
B._wasm_uci_execute = () => (B._wasm_uci_execute = Z.wasm_uci_execute)();
var Aa = () => (Aa = Z.pthread_self)(), Ca = (a, b, c, d, e, f) => (Ca = Z._emscripten_thread_init)(a, b, c, d, e, f), Ja = () => (Ja = Z._emscripten_thread_crashed)(), Vb = (a, b, c, d, e) => (Vb = Z._emscripten_run_on_main_thread_js)(a, b, c, d, e), dc = a => (dc = Z._emscripten_thread_free_data)(a), Ha = a => (Ha = Z._emscripten_thread_exit)(a), td = () => (td = Z._emscripten_check_mailbox)(), zd = a => (zd = Z._emscripten_tempret_set)(a), fc = (a, b) => (fc = Z.emscripten_stack_set_limits)(a, 
b), Wb = a => (Wb = Z._emscripten_stack_restore)(a), Ub = a => (Ub = Z._emscripten_stack_alloc)(a), Tb = () => (Tb = Z.emscripten_stack_get_current)();
B.dynCall_iijii = (a, b, c, d, e, f) => (B.dynCall_iijii = Z.dynCall_iijii)(a, b, c, d, e, f);
B.dynCall_jiji = (a, b, c, d, e) => (B.dynCall_jiji = Z.dynCall_jiji)(a, b, c, d, e);
B.dynCall_viijii = (a, b, c, d, e, f, k) => (B.dynCall_viijii = Z.dynCall_viijii)(a, b, c, d, e, f, k);
B.dynCall_iiiiij = (a, b, c, d, e, f, k) => (B.dynCall_iiiiij = Z.dynCall_iiiiij)(a, b, c, d, e, f, k);
B.dynCall_iiiiijj = (a, b, c, d, e, f, k, p, w) => (B.dynCall_iiiiijj = Z.dynCall_iiiiijj)(a, b, c, d, e, f, k, p, w);
B.dynCall_iiiiiijj = (a, b, c, d, e, f, k, p, w, l) => (B.dynCall_iiiiiijj = Z.dynCall_iiiiiijj)(a, b, c, d, e, f, k, p, w, l);
B.addRunDependency = Ya;
B.removeRunDependency = Za;
B.FS_createPath = nd;
B.FS_createLazyFile = qd;
B.FS_createDevice = X;
B.cwrap = (a, b, c, d) => {
  var e = !c || c.every(f => "number" === f || "boolean" === f);
  return "string" !== b && e && !d ? B["_" + a] : (...f) => Id(a, b, c, f);
};
B.FS_createPreloadedFile = Lc;
B.FS_createDataFile = Kc;
B.FS_unlink = ed;
var Ld;
Xa = function Md() {
  Ld || Nd();
  Ld || (Xa = Md);
};
function Od(a = []) {
  var b = Kd;
  a.unshift(sa);
  var c = a.length, d = Ub(4 * (c + 1)), e = d;
  a.forEach(k => {
    z()[e >> 2] = Hd(k);
    e += 4;
  });
  z()[e >> 2] = 0;
  try {
    var f = b(c, d);
    Gb(f, !0);
  } catch (k) {
    Zb(k);
  }
}
function Nd() {
  var a = ra;
  function b() {
    if (!Ld && (Ld = !0, B.calledRun = !0, !Ma)) {
      Sa();
      D || Va(Qa);
      ka(B);
      if (B.onRuntimeInitialized) {
        B.onRuntimeInitialized();
      }
      Pd && Od(a);
      if (!D) {
        if (B.postRun) {
          for ("function" == typeof B.postRun && (B.postRun = [B.postRun]); B.postRun.length;) {
            var c = B.postRun.shift();
            Ra.unshift(c);
          }
        }
        Va(Ra);
      }
    }
  }
  if (!(0 < H)) {
    if (D) {
      ka(B), Sa(), startWorker(B);
    } else {
      if (B.preRun) {
        for ("function" == typeof B.preRun && (B.preRun = [B.preRun]); B.preRun.length;) {
          Oa.unshift(B.preRun.shift());
        }
      }
      Va(Oa);
      0 < H || (B.setStatus ? (B.setStatus("Running..."), setTimeout(function() {
        setTimeout(function() {
          B.setStatus("");
        }, 1);
        b();
      }, 1)) : b());
    }
  }
}
if (B.preInit) {
  for ("function" == typeof B.preInit && (B.preInit = [B.preInit]); 0 < B.preInit.length;) {
    B.preInit.pop()();
  }
}
var Pd = !0;
B.noInitialRun && (Pd = !1);
Nd();
moduleRtn = ma;



  return moduleRtn;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Pikafish;
else if (typeof define === 'function' && define['amd'])
  define([], () => Pikafish);
var isPthread = globalThis.self?.name === 'em-pthread';
// When running as a pthread, construct a new instance on startup
isPthread && Pikafish();
