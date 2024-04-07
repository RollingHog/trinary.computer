/*
   * Trinary core library
   *
   * Copyright 2008 Alexander Obukhov, Trinary Group
   *
   * http://trinary.ru
   *
   * Released under the MIT license
   *
   */
trinary.setunws = {
  defaults: {
    core: null
  },
  power: function () {
    trinary.setunws.init(), trinary.setunws.uiss.setRoot(), trinary.setunws.uiss.viewOriginal()
  },
  run: function () {
    trinary.setunws.ui.allocate()
  },
  init: function () {
    trinary.setunws.defaults.core = trinary.setunws.core
  }
}

trinary.setunws.core = {
  mode: {
    "step-by-step": "-",
    "set-up-code": "-",
    "c-k": "0",
    "mb-fk-vp": "0",
    "command-from-panel": "0"
  },
  "stop-at": "",
  code: "",
  button: {
    stop: {
      label: "\u041e\u0441\u0442\u0430\u043d\u043e\u0432",
      action: "stop"
    },
    start: {
      label: "\u041f\u0443\u0441\u043a",
      action: "start"
    },
    command: {
      label: "\u041a\u043e\u043c. \u041f\u0423",
      action: "execute"
    },
    boot: {
      label: "\u041d\u0430\u0447. \u043f\u0443\u0441\u043a",
      action: "boot"
    }
  },
  register: {
    p: {
      label: "\u03c6",
      size: 2,
      comment: '',
      value: "++",
    },
    s: {
      label: "S",
      size: 18,
      comment: 'регистр результата',
      value: "++++++++++++++++++"
    },
    r: {
      label: "R",
      size: 18,
      comment: 'регистр множителя',
      value: "++++++++++++++++++"
    },
    f: {
      label: "F",
      size: 5,
      comment: 'пятиразрядный регистр модификации',
      value: "+++++"
    },
    c: {
      label: "C",
      size: 5,
      comment: 'пятиразрядный регистр адреса команды',
      value: "+++++"
    },
    k: {
      label: "K",
      size: 9,
      comment: 'девятиразрядный регистр команды',
      value: "+++++++++"
    },
    w: {
      label: "\u03c9",
      size: 1,
      comment: 'определяет передачу управления при выполнении команд условного перехода',
      value: "+"
    },
    mb: {
      label: "\u0417\u043e\u043d\u0430 \u041c\u0411",
      size: 4,
      comment: 'адрес зоны магнитного барабана, к которой было последнее обращение',
      value: "++++"
    }
  },
  ft: [
    [],
    [],
    []
  ],
  mb: {},
  memory: {
    "----0": "+++++++++",
    "----+": "000000000",
    "---00": "000000000",
    "---0+": "000000000",
    "---+0": "000000000",
    "---++": "000000000",
    "--0-0": "000000000",
    "--0-+": "000000000",
    "--000": "000000000",
    "--00+": "000000000",
    "--0+0": "000000000",
    "--0++": "000000000",
    "--+-0": "000000000",
    "--+-+": "000000000",
    "--+00": "000000000",
    "--+0+": "000000000",
    "--++0": "000000000",
    "--+++": "000000000",
    "-0--0": "000000000",
    "-0--+": "000000000",
    "-0-00": "000000000",
    "-0-0+": "000000000",
    "-0-+0": "000000000",
    "-0-++": "000000000",
    "-00-0": "000000000",
    "-00-+": "000000000",
    "-0000": "000000000",
    "-000+": "000000000",
    "-00+0": "000000000",
    "-00++": "000000000",
    "-0+-0": "000000000",
    "-0+-+": "000000000",
    "-0+00": "000000000",
    "-0+0+": "000000000",
    "-0++0": "000000000",
    "-0+++": "000000000",
    "-+--0": "000000000",
    "-+--+": "000000000",
    "-+-00": "000000000",
    "-+-0+": "000000000",
    "-+-+0": "000000000",
    "-+-++": "000000000",
    "-+0-0": "000000000",
    "-+0-+": "000000000",
    "-+000": "000000000",
    "-+00+": "000000000",
    "-+0+0": "000000000",
    "-+0++": "000000000",
    "-++-0": "000000000",
    "-++-+": "000000000",
    "-++00": "000000000",
    "-++0+": "000000000",
    "-+++0": "000000000",
    "-++++": "000000000",
    "0---0": "000000000",
    "0---+": "000000000",
    "0--00": "000000000",
    "0--0+": "000000000",
    "0--+0": "000000000",
    "0--++": "000000000",
    "0-0-0": "000000000",
    "0-0-+": "000000000",
    "0-000": "000000000",
    "0-00+": "000000000",
    "0-0+0": "000000000",
    "0-0++": "000000000",
    "0-+-0": "000000000",
    "0-+-+": "000000000",
    "0-+00": "000000000",
    "0-+0+": "000000000",
    "0-++0": "000000000",
    "0-+++": "000000000",
    "00--0": "000000000",
    "00--+": "000000000",
    "00-00": "000000000",
    "00-0+": "000000000",
    "00-+0": "000000000",
    "00-++": "000000000",
    "000-0": "000000000",
    "000-+": "000000000",
    "00000": "000000000",
    "0000+": "000000000",
    "000+0": "000000000",
    "000++": "000000000",
    "00+-0": "000000000",
    "00+-+": "000000000",
    "00+00": "000000000",
    "00+0+": "000000000",
    "00++0": "000000000",
    "00+++": "000000000",
    "0+--0": "000000000",
    "0+--+": "000000000",
    "0+-00": "000000000",
    "0+-0+": "000000000",
    "0+-+0": "000000000",
    "0+-++": "000000000",
    "0+0-0": "000000000",
    "0+0-+": "000000000",
    "0+000": "000000000",
    "0+00+": "000000000",
    "0+0+0": "000000000",
    "0+0++": "000000000",
    "0++-0": "000000000",
    "0++-+": "000000000",
    "0++00": "000000000",
    "0++0+": "000000000",
    "0+++0": "000000000",
    "0++++": "000000000",
    "+---0": "000000000",
    "+---+": "000000000",
    "+--00": "000000000",
    "+--0+": "000000000",
    "+--+0": "000000000",
    "+--++": "000000000",
    "+-0-0": "000000000",
    "+-0-+": "000000000",
    "+-000": "000000000",
    "+-00+": "000000000",
    "+-0+0": "000000000",
    "+-0++": "000000000",
    "+-+-0": "000000000",
    "+-+-+": "000000000",
    "+-+00": "000000000",
    "+-+0+": "000000000",
    "+-++0": "000000000",
    "+-+++": "000000000",
    "+0--0": "000000000",
    "+0--+": "000000000",
    "+0-00": "000000000",
    "+0-0+": "000000000",
    "+0-+0": "000000000",
    "+0-++": "000000000",
    "+00-0": "000000000",
    "+00-+": "000000000",
    "+0000": "000000000",
    "+000+": "000000000",
    "+00+0": "000000000",
    "+00++": "000000000",
    "+0+-0": "000000000",
    "+0+-+": "000000000",
    "+0+00": "000000000",
    "+0+0+": "000000000",
    "+0++0": "000000000",
    "+0+++": "000000000",
    "++--0": "000000000",
    "++--+": "000000000",
    "++-00": "000000000",
    "++-0+": "000000000",
    "++-+0": "000000000",
    "++-++": "000000000",
    "++0-0": "000000000",
    "++0-+": "000000000",
    "++000": "000000000",
    "++00+": "000000000",
    "++0+0": "000000000",
    "++0++": "000000000",
    "+++-0": "000000000",
    "+++-+": "000000000",
    "+++00": "000000000",
    "+++0+": "000000000",
    "++++0": "000000000",
    "+++++": "000000000"
  },
  symbols: {
    "+-0": ["A", "6", "\u0410", "6"],
    "+-+": ["B", "7", "\u0412", "7"],
    "+0-": ["\u0421", "8", "\u0421", "8"],
    "+00": ["D", "9", "\u0414", "9"],
    "+0+": ["E", " ", "\u0415", " "],
    "--+": ["_", "_", "_", "_"],
    "-00": ["G", "/", "\u0429", "\u042e"],
    "-0+": ["H", ".", "\u041d", ","],
    "-+0": ["J", "+", "\u041b", "+"],
    "-++": ["I", "V", "\u042b", "\u042d"],
    "0--": ["K", "W", "\u041a", "\u0416"],
    "0-0": ["L", "X", "\u0413", "\u0425"],
    "0-+": ["M", "Y", "\u041c", "\u0423"],
    "00-": ["N", "Z", "\u0426", "\u0426"],
    "000": ["P", "0", "\u0420", "0"],
    "00+": ["Q", "1", "\u0419", "1"],
    "0+-": ["R", "2", "\u042f", "2"],
    "0+0": ["S", "3", "\u042c", "3"],
    "0++": ["T", "4", "\u0422", "4"],
    "+--": ["U", "5", "\u041f", "5"],
    "+++": ["(", ")", "\u0429", "\u0424"],
    "-+-": ["=", "*", "=", "*"]
  },
  codes: {
    A: "+-0",
    6: "+-0",
    "\u0410": "+-0",
    B: "+-+",
    7: "+-+",
    "\u0412": "+-+",
    "\u0421": "+0-",
    8: "+0-",
    D: "+00",
    9: "+00",
    "\u0414": "+00",
    E: "+0+",
    " ": "+0+",
    "\u0415": "+0+",
    F: "--+",
    "-": "--+",
    "\u0411": "--+",
    G: "-00",
    "/": "-00",
    "\u0429": "+++",
    "\u042e": "-00",
    H: "-0+",
    ".": "-0+",
    "\u041d": "-0+",
    ",": "-0+",
    J: "-+0",
    "+": "-+0",
    "\u041b": "-+0",
    I: "-++",
    V: "-++",
    "\u042b": "-++",
    "\u042d": "-++",
    K: "0--",
    W: "0--",
    "\u041a": "0--",
    "\u0416": "0--",
    L: "0-0",
    X: "0-0",
    "\u0413": "0-0",
    "\u0425": "0-0",
    M: "0-+",
    Y: "0-+",
    "\u041c": "0-+",
    "\u0423": "0-+",
    N: "00-",
    Z: "00-",
    "\u0426": "00-",
    P: "000",
    0: "000",
    "\u0420": "000",
    Q: "00+",
    1: "00+",
    "\u0419": "00+",
    R: "0+-",
    2: "0+-",
    "\u042f": "0+-",
    S: "0+0",
    3: "0+0",
    "\u042c": "0+0",
    T: "0++",
    4: "0++",
    "\u0422": "0++",
    U: "+--",
    5: "+--",
    "\u041f": "+--",
    "(": "+++",
    ")": "+++",
    "\u0424": "+++",
    "=": "-+-",
    "*": "-+-",
    _: "--+"
  },
  printer: {
    data: ""
  }
}

trinary.setunws.console = {
  data: "",
  buffer: "",
  stack: [],
  warn: console.warn,
  error: console.error,
  info: console.info,
  pc: 0,
  log: function (e) {
    trinary.setunws.console.data += e.join(""), trinary.setunws.console.pc != trinary.setunws.processor.pc && (trinary.setunws.console.pc = trinary.setunws.processor.pc, trinary.setunws.console.stack.push(trinary.setunws.console.data), trinary.setunws.console.data = ""), trinary.setunws.console.stack.length > 10 && trinary.setunws.console.stack.shift()
  },
  clear: function () {
    trinary.setunws.console.data = "", trinary.setunws.console.stack = []
  }
}

trinary.setunws.ft = {
  load: function (e, t) {
    if (isset(e) || (e = 1), 1 == e || 2 == e) {
      if (isset(t)) {
        t = t.replace(/\u0446/gi, "z").replace(/\u0443/gi, "y").replace(/\u0445/gi, "x").replace(/\u0436/gi, "w").replace(/\u0447/gi, "4").replace(/\n/g, " ");
        var n = trinary.core.detectBase(t);
        t = t.split(" ");
        var i = [];
        if (9 == n)
          for (var r = 0; r < t.length; r++) i.push(trinary.setunws.ft.tr923(t[r]));
        else
          for (var r = 0; r < t.length; r++) i.push(trinary.core.grow(t[r].substr(0, 9), 9));
        return trinary.setunws.core.ft[e] = i, i
      }
      console.warn("FT:load. Data empty")
    } else console.error("FT:load. Wrong device id")
  },
  read: function (e) {
    var t = [];
    if (isset(e) || (e = 1), isset(trinary.setunws.core.ft[e]))
      for (var n = trinary.setunws.core.ft[e], i = n.length, r = 0; i > r; r++)
        if (t.push(n.shift()), r >= 53) {
          break
        }
    return t
  },
  tr923: function (e) {
    return isset(e) ? trinary.core.nonaryToTrinary(e.substr(0, 5)).substr(1) : void console.warn("tr923: empty data")
  }
}, trinary.setunws.mb = {
  write: function (e, t) {
    isset(t) ? (e = trinary.core.align(e.substr(0, 4), 4), trinary.setunws.core.register.mb.value = e, trinary.setunws.core.mb[e] = t) : console.warn("MB write zone: empty data", arguments.calle)
  },
  read: function (e) {
    var t = [];
    return isset(e) && isset(trinary.setunws.core.mb[e]) ? (trinary.setunws.core.register.mb.value = e, t = trinary.setunws.core.mb[e]) : console.warn("MB read zone: wrong zone address"), t
  }
}, trinary.setunws.memory = {
  __memory_address_start: -121,
  __memory_address_end: 122,
  read: function (e) {
    return isset(e) ? trinary.setunws.memory.service.readWriteCell(e) : void console.warn("memory read: empty address")
  },
  write: function (e, t) {
    if (isset(e)) {
      if (isset(t)) return trinary.setunws.memory.service.readWriteCell(e, t);
      console.warn("memory write: empty value")
    } else console.warn("memory write: empty address")
  },
  zone: {
    read: function (e) {
      isset(e) || (e = "0");
      for (var t, n, i = trinary.core.trinaryToDecimal(e + "---0"), r = 0, o = []; ;)
        if (t = trinary.core.align(trinary.core.decimalToTrinary(i), 5), n = isset(trinary.setunws.core.memory[t]) ? trinary.setunws.core.memory[t] : trinary.setunws.memory.service.formater("0"), o.push(n), i += "+" == t.charAt(4) ? 2 : 1, r++, r >= 54) break;
      return o
    },
    write: function (e, t) {
      if (isset(t)) {
        isset(e) || (e = "0");
        var n, i, r = trinary.core.trinaryToDecimal(e + "---0"),
          o = 54;
        for (var s in t)
          if (n = trinary.core.align(trinary.core.decimalToTrinary(r), 5), i = trinary.setunws.memory.service.formater(t[s]), trinary.setunws.core.memory[n] = i, r += "+" == n.charAt(4) ? 2 : 1, o -= 1, 0 >= o) break
      } else console.warn("Memory write zone: empty data", arguments.callee)
    }
  },
  reset: function () {
    trinary.setunws.memory.service.writeData()
  },
  service: {
    readWriteCell: function (e, t) {
      if (isset(e)) {
        if (isset(e.charAt(4)) && "-" == e.charAt(4)) {
          var n, i, r = e.substr(0, 4),
            o = r + "0",
            s = r + "+";
          if (isset(t)) {
            t = trinary.core.grow(t, 18);
            var a = t.substr(0, 9),
              l = t.substr(9, 9);
            n = trinary.setunws.memory.service.cell(o, a), i = trinary.setunws.memory.service.cell(s, l)
          } else n = trinary.setunws.memory.service.cell(o), i = trinary.setunws.memory.service.cell(s);
          t = n + i
        } else t = trinary.setunws.memory.service.cell(e, t);
        return t
      }
      console.warn("memory_cell: empty address")
    },
    cell: function (e, t) {
      return isset(e) && isset(trinary.setunws.core.memory[e]) ? (isset(t) && (trinary.setunws.core.memory[e] = trinary.setunws.memory.service.formater(t)), trinary.setunws.core.memory[e]) : void 0
    },
    formater: function (e) {
      return isset(e) || (e = "0"), "number" == typeof e && (e = e.toString()), trinary.core.align(trinary.core.validate(e.substr(0, 9)), 9)
    },
    writeData: function (e) {
      "array" != typeof e && (e = []);
      for (var t, n, i = trinary.setunws.memory.__memory_address_start; i < trinary.setunws.memory.__memory_address_end; i++) t = trinary.core.align(trinary.core.decimalToTrinary(i), 5), "-" != t.charAt(4) && (n = isset(e[t]) ? e[t] : 0, trinary.setunws.core.memory[t] = trinary.setunws.memory.service.formater(n))
    }
  }
}, trinary.setunws.operation = {
  boot: function () {
    var e = 1,
      t = trinary.setunws.core.ft[e];
    trinary.setunws.operation.reset(), trinary.setunws.core.ft[e] = t;
    var n = trinary.setunws.ft.read(e);
    trinary.setunws.memory.zone.write("0", n), trinary.setunws.core.register.c.value = "0000+", trinary.setunws.processor.start()
  },
  reset: function () {
    trinary.setunws.processor.reset(), trinary.setunws.state.reset(), trinary.setunws.registers.reset(), trinary.setunws.memory.reset(), trinary.setunws.console.clear()
  },
  start: function () {
    trinary.setunws.processor.__stop = !1, "+" == trinary.setunws.core.mode["step-by-step"] ? trinary.setunws.processor.step() : trinary.setunws.processor.start()
  },
  step: function () {
    trinary.setunws.processor.step()
  },
  stop: function () {
    trinary.setunws.processor.__stop = !0
  },
  setcell: function (e, t) {
    trinary.setunws.memory.write(e, t)
  },
  stepByStep: {
    on: function () {
      trinary.setunws.core.mode["step-by-step"] = "+"
    },
    off: function () {
      trinary.setunws.core.mode["step-by-step"] = "-"
    }
  },
  setStopAddress: function (e) {
    isset(e) ? trinary.setunws.core["stop-at"] = e : console.warn("Action setStopAddress: empty address")
  },
  setModeStepByStep: function (e) {
    isset(e) ? trinary.setunws.core.mode["step-by-step"] = e : console.warn("Action setModeStepByStep: empty value")
  },
  changeModeSetUpCode: function () {
    var e = trinary.setunws.core.mode;
    return e["set-up-code"] = "+" == e["set-up-code"] ? "-" : "+"
  },
  getModeSetUpCode: function () {
    return trinary.setunws.core.mode["set-up-code"]
  },
  setModeCK: function (e) {
    isset(e) ? trinary.setunws.core.mode["c-k"] = e : console.warn("Action setModeCK: empty value")
  },
  setModeMbFkVp: function (e) {
    isset(e) ? trinary.setunws.core.mode["mb-fk-vp"] = e : console.warn("Action setModeMbFkVp: empty value")
  },
  setCode: function (e) {
    return isset(e) ? trinary.setunws.core.code = e : void console.warn("Action setCode: empty value")
  },
  execute: function (e) {
    isset(e) ? (trinary.setunws.core.register.k.value = trinary.core.align(e.substr(0, 9), 9), "+" == trinary.setunws.core.mode["step-by-step"] ? trinary.setunws.core.mode["command-from-panel"] = "+" : (trinary.setunws.processor.decode(), trinary.setunws.processor.execute(), trinary.setunws.processor.start())) : console.warn("Action execute: empty command")
  }
}, trinary.setunws.output = {
  data: null,
  output: function (e) {
    var t = "",
      n = 0,
      i = "";
    if (isset(e)) {
      e = e.join("");
      for (var r = 0; r < e.length; r++)
        if (i += e.charAt(r), i.length >= 3) {
          if ("++0" === i) n = 0;
          else if ("++-" === i) n = 1;
          else if ("-0-" === i) t += "\n";
          else {
            if ("---" === i) break;
            isset(trinary.setunws.core.symbols[i]) && (t += trinary.setunws.core.symbols[i][n])
          }
          i = ""
        }
    } else console.warn("Output: empty data", arguments.calle);
    return trinary.setunws.output.data = t, t
  },
  text2code: function (e) {
    isset(e) || (e = "", console.warn("text2code: empty text"));
    for (var t, n = "", i = 0; i < e.length; i++) t = e[i], isset(trinary.setunws.core.codes[t]) && (n += trinary.setunws.core.codes[t]);
    return n
  }
}, trinary.setunws.processor = {
  __stop: !1,
  delay: 0,
  pc: 0,
  timer: null,
  running: !1,
  time: {
    start: null,
    end: null
  },
  start: function () {
    trinary.setunws.processor.time.start = new Date, trinary.setunws.processor.cycle0()
  },
  cycle0: function () {
    trinary.setunws.processor.timer = setTimeout("trinary.setunws.processor.cycle1()", 10)
  },
  cycle1: function () {
    for (var e = 10; e > 0;) 1 != trinary.setunws.processor.__stop ? (trinary.setunws.processor.cycle(), trinary.setunws.processor.running = !0, trinary.setunws.processor.pc % 10 == 0 && trinary.setunws.ui.update()) : (trinary.setunws.processor.running = !1, trinary.setunws.ui.update(), e = 0), e--;
    1 != trinary.setunws.processor.__stop && trinary.setunws.processor.cycle0()
  },
  cycle: function () {
    var e = trinary.setunws.core.register.c.value.charAt(4),
      t = trinary.setunws.core.register.c.value;
    if (trinary.setunws.console.log(["<", trinary.setunws.processor.pc, "> ", trinary.core.trinaryToNonary(t), "[", t, "]\xa0(\u03c9):", trinary.setunws.core.register.w.value, " "]), "-" === e) {
      var n = trinary.setunws.core.register.c.value.substr(0, 4),
        i = n + "0",
        r = n + "+";
      trinary.setunws.core.register.k.value = trinary.setunws.core.memory[i], trinary.setunws.processor.stop() || (trinary.setunws.processor.decode(), trinary.setunws.processor.execute(), trinary.setunws.processor.execute(), trinary.setunws.core.register.k.value = trinary.setunws.core.memory[r], trinary.setunws.processor.decode(), trinary.setunws.processor.stop() || trinary.setunws.processor.execute())
    } else trinary.setunws.core.register.k.value = trinary.setunws.core.memory[trinary.setunws.core.register.c.value], trinary.setunws.processor.decode(), trinary.setunws.processor.stop() || trinary.setunws.processor.execute();
    var o = "0" === e ? "+" : "+" === e ? "+-" : "++";
    if (trinary.setunws.core.register.c.value == t) {
      var s = null;
      s = "+++++" == trinary.setunws.core.register.c.value ? "----0" : "0++++" == trinary.setunws.core.register.c.value ? "+---0" : "-++++" == trinary.setunws.core.register.c.value ? "0---0" : trinary.core.sum(trinary.setunws.core.register.c.value, o), trinary.setunws.core.register.c.value = trinary.core.align(s, 5)
    }
    t = trinary.setunws.core.register.c.value, trinary.setunws.processor.pc++, trinary.setunws.console.log(["-> ", trinary.core.trinaryToNonary(t), "[", t, "]"])
  },
  execute: function () {
    isset(trinary.setunws.processor.commands[trinary.setunws.state.command.code]) ? trinary.setunws.processor.commands[trinary.setunws.state.command.code]() : trinary.setunws.trinary.setunws.console.warn("Processor: execute, wrong command code", p.state.command.code)
  },
  step: function () {
    "+" == trinary.setunws.core.mode["command-from-panel"] ? (trinary.setunws.core.mode["command-from-panel"] = "0", trinary.setunws.processor.decode(), trinary.setunws.processor.execute()) : trinary.setunws.processor.cycle(), trinary.setunws.processor.running = !1, trinary.setunws.ui.update()
  },
  reset: function () {
    trinary.setunws.processor.__stop = !1, trinary.setunws.processor.pc = 0, trinary.setunws.processor.timer = null, trinary.setunws.processor.running = !1, trinary.setunws.processor.time.start = null, trinary.setunws.processor.time.end = null
  },
  decode: function () {
    var e = trinary.core.align(trinary.setunws.core.register.k.value.substr(0, 9), 9);
    trinary.setunws.state.command.value = e, trinary.setunws.state.command.code = e.substr(5, 3);
    var t = e.substr(8, 1);
    trinary.setunws.state.command.flag = t;
    var n = e.substr(0, 5),
      i = trinary.setunws.core.register.f.value;
    i = trinary.core.tryteMultiplyTrit(i, t);
    var r = trinary.core.sum(n, i);
    r = trinary.core.align(r, 5), trinary.setunws.state.command.address = r.substr(-5);
    var o = "+" == trinary.setunws.core.mode["set-up-code"] ? !0 : !1;
    trinary.setunws.state.keying = o;
    var s = isset(trinary.setunws.core.code) ? trinary.setunws.core.code : "";
    trinary.setunws.state.cell = o ? s : trinary.setunws.memory.read(trinary.setunws.state.command.address), trinary.setunws.processor.__stop = !1; {
      var a = trinary.setunws.processor.tooltip[trinary.setunws.state.command.code];
      trinary.setunws.core.register.c.value, trinary.setunws.core.register.k.value
    }
    trinary.setunws.console.log([trinary.core.trinaryToNonary(trinary.setunws.state.command.code), " [", trinary.setunws.state.command.code, "] ", a.name, "; ", a.content, " "]), trinary.setunws.console.log(["A:\xa0\xa0", n, "\xa0+\xa0\u03c0\u0444:", trinary.setunws.state.command.flag, "\xa0x\xa0F:", trinary.setunws.core.register.f.value, " "]), trinary.setunws.console.log(["A*:\xa0", trinary.setunws.state.command.address, "\xa0\xa0\xa0\xa00x9:", trinary.core.trinaryToNonary(trinary.setunws.state.command.address), " "]), trinary.setunws.console.log(["(A*):", trinary.setunws.state.cell, "\xa0\xa0\xa00x9:", trinary.core.trinaryToNonary(trinary.setunws.state.cell), " "])
  },
  stop: function () {
    return "-" == trinary.setunws.core.mode["c-k"] && trinary.setunws.core["stop-at"] == trinary.setunws.core.register.c.value ? trinary.setunws.processor.__stop = !0 : "+" == trinary.setunws.core.mode["c-k"] && trinary.setunws.core["stop-at"] == trinary.setunws.state.command.address && ("0" == trinary.setunws.core.mode["mb-fk-vp"] ? trinary.setunws.processor.__stop = !0 : "-" != trinary.setunws.core.mode["mb-fk-vp"] || "-0+" != trinary.setunws.state.command.code && "-0-" != trinary.setunws.state.command.code ? "+" == trinary.setunws.core.mode["mb-fk-vp"] && "-00" == trinary.setunws.state.command.code && (trinary.setunws.processor.__stop = !0) : trinary.setunws.processor.__stop = !0), trinary.setunws.processor.__stop
  }
}, trinary.setunws.processor.commands = {
  "+00": function () {
    trinary.setunws.core.register.s.value = trinary.core.grow(trinary.setunws.state.cell, 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.console.log(["(S):", trinary.setunws.core.register.s.value, "  (\u03c9):", trinary.setunws.core.register.w.value])
  },
  "+0+": function () {
    var e = trinary.setunws.core.register.s.value,
      t = trinary.core.grow(trinary.setunws.state.cell, 18),
      n = trinary.core.sum(e, t);
    trinary.setunws.core.register.s.value = trinary.core.align(n.substr(-18), 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.core.register.p.value = trinary.core.align(n.substr(-20, 2), 2), trinary.setunws.console.log(["(A*):", t, "(S):", e, " (A*)+(S):", n, "  (\u03c9):", trinary.setunws.core.register.w.value]), n.length > 18 && (trinary.setunws.processor.__stop = !0, trinary.setunws.console.warn("Overflow! -> S:", n, " \u03c6:", trinary.setunws.core.register.p.value))
  },
  "+0-": function () {
    var e = trinary.core.grow(trinary.setunws.state.cell, 18),
      t = trinary.setunws.core.register.s.value,
      n = trinary.core.inverse(e),
      i = trinary.core.sum(t, n);
    trinary.setunws.core.register.s.value = trinary.core.align(i.substr(-18), 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.core.register.p.value = trinary.core.align(i.substr(-20, 2), 2), trinary.setunws.console.log(["(S):", t, " (A*):", e, " (S)-(A*):", i, " => (S): ", trinary.setunws.core.register.s.value, "  (\u03c9):", trinary.setunws.core.register.w.value]), i.length > 18 && (trinary.setunws.processor.__stop = !0, trinary.setunws.console.warn("Overflow! -> S:", i, " \u03c6:", trinary.setunws.core.register.p.value))
  },
  "++0": function () {
    var e = trinary.setunws.core.register.r.value = trinary.setunws.core.register.s.value,
      t = trinary.core.grow(trinary.setunws.state.cell, 18),
      n = trinary.core.align(trinary.core.multiplication(t, e), 36),
      i = n.substr(2, 18),
      r = n.substr(0, 2);
    trinary.setunws.core.register.s.value = i, trinary.setunws.core.register.w.value = trinary.core.sign(i), trinary.setunws.core.register.p.value = r, trinary.setunws.console.log([" (R):", e, " (A*):", t, " (A*)*(R):", n, " -> S:", i, " (\u03c9):", trinary.setunws.core.register.w.value]), "00" != r && (trinary.setunws.processor.__stop = !0, trinary.setunws.console.warn("Overflow! -> R:", n, " \u03c6:", trinary.setunws.core.register.p.value))
  },
  "+++": function () {
    var e = trinary.setunws.core.register.s.value,
      t = trinary.core.grow(trinary.setunws.state.cell, 18),
      n = trinary.setunws.core.register.r.value,
      i = trinary.core.align(trinary.core.multiplication(t, n), 36),
      r = i.substr(2, 18),
      o = i.substr(0, 2);
    "00" != o && (trinary.setunws.processor.__stop = !0, trinary.setunws.console.warn("Overflow! -> AR:", i, " \u03c6:", o));
    var s = trinary.core.align(trinary.core.sum(e, r), 20);
    trinary.setunws.core.register.s.value = trinary.core.align(s.substr(-18), 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.core.register.p.value = trinary.core.align(s.substr(-20, 2), 2), trinary.setunws.console.log(["(S):", e, " (A*):", t, " (R):", n, " (A*)*(R):", i, " [(A*)*(R)]18:", r, " (S)+(A*)*(R):", s, " (\u03c9):", trinary.setunws.core.register.w.value]), "00" != trinary.setunws.core.register.p.value && (trinary.setunws.processor.__stop = !0, trinary.setunws.console.warn("Overflow! -> S:", s, " \u03c6:", trinary.setunws.core.register.p.value))
  },
  "++-": function () {
    var e = trinary.core.grow(trinary.setunws.state.cell, 18),
      t = trinary.setunws.core.register.s.value,
      n = trinary.setunws.core.register.r.value,
      i = trinary.core.align(trinary.core.multiplication(t, n), 36),
      r = i.substr(2, 18),
      o = i.substr(0, 2);
    "00" != o && (trinary.setunws.processor.__stop = !0, trinary.setunws.console.warn("Overflow! -> SR:", i, " \u03c6:", o));
    var s = trinary.core.align(trinary.core.sum(e, r), 20);
    trinary.setunws.core.register.s.value = trinary.core.align(s.substr(-18), 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.core.register.p.value = trinary.core.align(s.substr(-20, 2), 2), trinary.setunws.console.log([" (A*):", e, " (S):", t, " (R):", n, " (S)*(R):", i, " [(S)*(R)]18:", r, " (A*)+(S)*(R):", s, " -> (S):", trinary.setunws.core.register.s.value, " (\u03c9):", trinary.setunws.core.register.w.value]), "00" != o && (trinary.setunws.processor.__stop = !0, trinary.setunws.console.warn("Overflow! -> (A*)+(S)*(R):", s, " \u03c6:", o))
  },
  "+-0": function () {
    var e = trinary.core.grow(trinary.setunws.state.cell, 18),
      t = trinary.setunws.core.register.s.value,
      n = trinary.setunws.core.register.s.value = trinary.core.bitwiseMultiplication(e, t);
    trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.console.log(["(A*):", e, " (S):", t, " (A*)x(S):", n, "  (\u03c9):", trinary.setunws.core.register.w.value])
  },
  "+-+": function () {
    trinary.setunws.core.register.r.value = trinary.core.grow(trinary.setunws.state.cell, 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.r.value), trinary.setunws.console.log(["(R):", trinary.setunws.core.register.r.value, "  (\u03c9):", trinary.setunws.core.register.w.value])
  },
  "+--": function () {
    trinary.setunws.core.register.r.value = trinary.core.grow(trinary.setunws.state.cell, 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.r.value), trinary.setunws.processor.__stop = !0, trinary.setunws.console.log(["(R):", trinary.setunws.core.register.r.value, " (\u03c9):", trinary.setunws.core.register.w.value]), trinary.setunws.console.log(["STOPED!"])
  },
  "0+0": function () {
    "0" === trinary.setunws.core.register.w.value && (trinary.setunws.core.register.c.value = trinary.setunws.state.command.address, trinary.setunws.console.log(["(C) <- ", trinary.setunws.core.register.c.value]))
  },
  "0++": function () {
    "+" == trinary.setunws.core.register.w.value && (trinary.setunws.core.register.c.value = trinary.setunws.state.command.address, trinary.setunws.console.log(["(C) <- ", trinary.setunws.core.register.c.value]))
  },
  "0+-": function () {
    "-" == trinary.setunws.core.register.w.value && (trinary.setunws.core.register.c.value = trinary.setunws.state.command.address, trinary.setunws.console.log(["(C) <- ", trinary.setunws.core.register.c.value]))
  },
  "000": function () {
    trinary.setunws.core.register.c.value = trinary.setunws.state.command.address, trinary.setunws.console.log(["(C) <- ", trinary.setunws.core.register.c.value])
  },
  "00+": function () {
    var e = trinary.setunws.state.command.address,
      t = trinary.core.grow(trinary.setunws.core.register.c.value, 9);
    trinary.setunws.memory.write(e, t), trinary.setunws.console.log(["(C):", trinary.setunws.core.register.c.value, " => A*:", e, " (A*):", trinary.setunws.memory.read(e)])
  },
  "00-": function () {
    var e = trinary.setunws.state.command.address,
      t = trinary.core.grow(trinary.setunws.core.register.f.value, 9);
    trinary.setunws.memory.write(e, t), trinary.setunws.core.register.w.value = trinary.core.sign(t), trinary.setunws.console.log(["(F):", t, " -> A*:", e, " (A*):", trinary.setunws.memory.read(e), " (\u03c9):", trinary.setunws.core.register.w.value])
  },
  "0-0": function () {
    var e = trinary.setunws.state.cell.substr(0, 5);
    trinary.setunws.core.register.f.value = e, trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.f.value), trinary.setunws.console.log(["(A*):", trinary.setunws.state.cell, "-> F:", e])
  },
  "0-+": function () {
    var e = trinary.setunws.state.cell.substr(0, 5),
      t = trinary.setunws.core.register.c.value,
      n = trinary.core.align(trinary.core.sum(e, t), 5);
    trinary.setunws.core.register.f.value = n.substr(0, 5), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.f.value), trinary.setunws.console.log(["(A*):", e, " (C):", t, " (A*)+(C):", n, " -> (F):", trinary.setunws.core.register.f.value, " (\u03c9):", trinary.setunws.core.register.w.value]), n.length > 5 && trinary.setunws.console.error("overflow:", n)
  },
  "0--": function () {
    var e = trinary.setunws.core.register.f.value,
      t = trinary.setunws.state.cell,
      n = trinary.core.align(trinary.core.sum(e, t.substr(0, 5)), 5);
    trinary.setunws.core.register.f.value = n.substr(0, 5), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.f.value), trinary.setunws.console.log(["(F):", e, " (A*):", t, " (F)+(A*):", n, " -> (F):", trinary.setunws.core.register.f.value, " (\u03c9):", trinary.setunws.core.register.w.value]), n.length > 5 && trinary.setunws.console.error("overflow:", n)
  },
  "-+0": function () {
    var e = trinary.setunws.state.cell.substr(0, 5),
      t = trinary.setunws.core.register.s.value,
      n = trinary.core.shift(trinary.setunws.core.register.s.value, e);
    trinary.setunws.core.register.s.value = trinary.core.align(n, 18), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.console.log(["N:", e, " 0x10:", trinary.core.trinaryToDecimal(e), " (S):", t, " -> ", n, " (S):", trinary.setunws.core.register.s.value, " (\u03c9):", trinary.setunws.core.register.w.value])
  },
  "-++": function () {
    if (trinary.setunws.state.keying) {
      var e = trinary.setunws.core.code;
      trinary.setunws.console.log(["Keying!"]), "-" === trinary.setunws.state.command.address.charAt(4) ? trinary.setunws.memory.write(trinary.setunws.state.command.address, e) : trinary.setunws.memory.write(trinary.setunws.state.command.address, e.substr(0, 9)), trinary.setunws.core.register.w.value = trinary.core.sign(e)
    } else "-" === trinary.setunws.state.command.address.charAt(4) ? trinary.setunws.memory.write(trinary.setunws.state.command.address, trinary.setunws.core.register.s.value) : trinary.setunws.memory.write(trinary.setunws.state.command.address, trinary.setunws.core.register.s.value.substr(0, 9)), trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.console.log(["A*:", trinary.setunws.state.command.address, " (S):", trinary.setunws.core.register.s.value, " (A*):", trinary.setunws.memory.read(trinary.setunws.state.command.address), " (\u03c9):", trinary.setunws.core.register.w.value])
  },
  "-+-": function () {
    var e = trinary.core.normalize(trinary.setunws.core.register.s.value, 18),
      t = e.N,
      n = e.normalize;
    if (trinary.setunws.console.log(["S:", trinary.setunws.core.register.s.value, " N:", t, " normalize:", n]), "-" === trinary.setunws.state.command.address.charAt(4)) {
      var i = trinary.core.align(n, 18);
      trinary.setunws.memory.write(trinary.setunws.state.command.address, i)
    } else {
      var i = n.substr(0, 9);
      trinary.setunws.memory.write(trinary.setunws.state.command.address, i)
    }
    trinary.setunws.core.register.s.value = trinary.core.align(t, 5) + "0000000000000", trinary.setunws.core.register.w.value = trinary.core.sign(trinary.setunws.core.register.s.value), trinary.setunws.console.log(["(A*):", i, " (S):", trinary.setunws.core.register.s.value, " (\u03c9):", trinary.setunws.core.register.w.value])
  },
  "-00": function () {
    var e = trinary.setunws.state.command.address.charAt(0),
      t = trinary.setunws.state.command.address.substr(1, 4);
    if (trinary.setunws.console.log(["code:", t, " zone:", e]), "000+" === t) trinary.setunws.console.log(["FT-1 -> MemBank :", e]), trinary.setunws.memory.zone.write(e, trinary.setunws.ft.read(1));
    else if ("00+0" === t) trinary.setunws.console.log("FT-2 -> MemBank :", e), trinary.setunws.memory.zone.write(e, trinary.setunws.ft.read(2));
    else if ("000-" === t) trinary.setunws.console.log(["UNDER CONSTRUCTION"]);
    else if ("00-0" === t) trinary.setunws.console.log(["UNDER CONSTRUCTION"]);
    else if ("0-00" === t) {
      trinary.setunws.console.log(["PRINTER!"]);
      var n = trinary.setunws.memory.zone.read(e);
      trinary.setunws.console.log([n.length]), trinary.setunws.core.printer.data = trinary.setunws.output.output(n)
    }
  },
  "-0+": function () {
    var e = trinary.setunws.state.command.address.charAt(0),
      t = trinary.setunws.memory.zone.read(e),
      n = trinary.setunws.state.command.address.substr(1, 4);
    trinary.setunws.mb.write(n, t), trinary.setunws.console.log(["\u0424[" + e + "] -> M[" + n + "] data:", t])
  },
  "-0-": function () {
    var e = trinary.setunws.state.command.address.substr(1, 4),
      t = trinary.setunws.mb.read(e),
      n = trinary.setunws.state.command.address.charAt(0);
    trinary.setunws.memory.zone.write(n, t), trinary.setunws.console.log(["M[" + e + "] -> \u0424[" + n + "] data:", t])
  },
  "--0": function () {
    trinary.setunws.processor.__stop = !0, trinary.setunws.console.log(["This command not used"])
  },
  "--+": function () {
    trinary.setunws.processor.__stop = !0, trinary.setunws.console.log(["This command not used"])
  },
  "---": function () {
    trinary.setunws.processor.__stop = !0, trinary.setunws.console.log(["This command not used"])
  }
}, trinary.setunws.processor.tooltip = {
  "+00": {
    nonary: "30",
    name: "\u041f\u043e\u0441\u044b\u043b\u043a\u0430\xa0\u0432\xa0S\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(A*)=>(S)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "+0+": {
    nonary: "33",
    name: "\u0421\u043b\u043e\u0436\u0435\u043d\u0438\u0435\xa0\u0432\xa0S\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(S)+(A*)=>(S)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "+0-": {
    nonary: "3\u0445",
    name: "\u0412\u044b\u0447\u0438\u0442\u0430\u043d\u0438\u0435\xa0\u0432\xa0S\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(S)-(A*)=>(S)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "++0": {
    nonary: "40",
    name: "\u0423\u043c\u043d\u043e\u0436\u0435\u043d\u0438\u0435\xa00\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(S)=>(R);\xa0(A*)(R)=>(S)\xa0\xa0"
  },
  "+++": {
    nonary: "43",
    name: "\u0423\u043c\u043d\u043e\u0436\u0435\u043d\u0438\u0435\xa0+\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(S)+(A*)(R)=>(S)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "++-": {
    nonary: "4\u0445",
    name: "\u0423\u043c\u043d\u043e\u0436\u0435\u043d\u0438\u0435\xa0-\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(A*)+(S)(R)=>(S)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "+-0": {
    nonary: "20",
    name: "\u041f\u043e\u0440\u0430\u0437\u0440\u044f\u0434\u043d\u043e\u0435\xa0\u0443\u043c\u043d\u043e\u0436\u0435\u043d\u0438\u0435",
    content: "(A*)[x](S)=>(S)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "+-+": {
    nonary: "23",
    name: "\u041f\u043e\u0441\u044b\u043b\u043a\u0430\xa0\u0432\xa0R\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(A*)=>(R)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "+--": {
    nonary: "2\u0445",
    name: "\u041e\u0441\u0442\u0430\u043d\u043e\u0432\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "\u0421\u0442\u043e\u043f;\xa0(A*)=>(R)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "0+0": {
    nonary: "10",
    name: "\u0423\u0441\u043b\u043e\u0432\u043d\u044b\u0439\xa0\u043f\u0435\u0440\u0435\u0445\u043e\u0434\xa00\xa0\xa0\xa0",
    content: "A*=>(C)\xa0\u043f\u0440\u0438\xa0w=0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "0++": {
    nonary: "13",
    name: "\u0423\u0441\u043b\u043e\u0432\u043d\u044b\u0439\xa0\u043f\u0435\u0440\u0435\u0445\u043e\u0434\xa0+\xa0\xa0\xa0",
    content: "A*=>(C)\xa0\u043f\u0440\u0438\xa0w=+\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "0+-": {
    nonary: "1\u0445",
    name: "\u0423\u0441\u043b\u043e\u0432\u043d\u044b\u0439\xa0\u043f\u0435\u0440\u0435\u0445\u043e\u0434\xa0-\xa0\xa0\xa0",
    content: "A*=>(C)\xa0\u043f\u0440\u0438\xa0w=-\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "000": {
    nonary: "00",
    name: "\u0411\u0435\u0437\u0443\u0441\u043b\u043e\u0432\u043d\u044b\u0439\xa0\u043f\u0435\u0440\u0435\u0445\u043e\u0434\xa0\xa0",
    content: "A*=>(C)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "00+": {
    nonary: "03",
    name: "\u0417\u0430\u043f\u0438\u0441\u044c\xa0\u0438\u0437\xa0C\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(C)=>(A*)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "00-": {
    nonary: "0\u0445",
    name: "\u0417\u0430\u043f\u0438\u0441\u044c\xa0\u0438\u0437\xa0F\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(F)=>(A*)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "0-0": {
    nonary: "\u04460",
    name: "\u041f\u043e\u0441\u044b\u043b\u043a\u0430\xa0\u0432\xa0F\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(A*)=>(F)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "0--": {
    nonary: "\u04463",
    name: "\u0421\u043b\u043e\u0436\u0435\u043d\u0438\u0435\xa0\u0432\xa0F\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(F)+(A*)=>(F)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "0-+": {
    nonary: "\u0446\u0445",
    name: "\u0421\u043b\u043e\u0436\u0435\u043d\u0438\u0435\xa0\u0432\xa0F\xa0c\xa0(C)\xa0\xa0\xa0",
    content: "(C)+(A*)=>F\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "-+0": {
    nonary: "\u04430",
    name: "\u0421\u0434\u0432\u0438\u0433\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "\u0421\u0434\u0432\u0438\u0433\xa0(S)\xa0\u043d\u0430\xa0(A*)=>(S)\xa0\xa0"
  },
  "-++": {
    nonary: "\u04433",
    name: "\u0417\u0430\u043f\u0438\u0441\u044c\xa0\u0438\u0437\xa0S\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(S)=>(A*)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "-+-": {
    nonary: "\u0443\u0445",
    name: "\u041d\u043e\u0440\u043c\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "\u041d\u043e\u0440\u043c.(S)=>(A*);\xa0(N)=>(S)"
  },
  "-00": {
    nonary: "\u04450",
    name: "\u0412\u044b\u0432\u043e\u0434-\u0432\u0432\u043e\u0434\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "\u0412\u0432\u043e\u0434\xa0\u0432\xa0\u0424\u0430*.\xa0\u0412\u044b\u0432\u043e\u0434\xa0\u0438\u0437\xa0\u0424\u0430*"
  },
  "-0+": {
    nonary: "\u04453",
    name: "\u0417\u0430\u043f\u0438\u0441\u044c\xa0\u043d\u0430\xa0\u041c\u0411\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(\u0424\u0430*)=>(\u041c\u0434*)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "-0-": {
    nonary: "\u0445\u0445",
    name: "\u0421\u0447\u0438\u0442\u044b\u0432\u0430\u043d\u0438\u0435\xa0\u0441\xa0\u041c\u0411\xa0\xa0\xa0\xa0\xa0\xa0",
    content: "(\u041c\u0434*)=>(\u0424\u0430*)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "--0": {
    nonary: "\u04360",
    name: "\u041d\u0435\xa0\u0437\u0430\u0434\u0435\u0439\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u0430\xa0\xa0\xa0\xa0\xa0",
    content: "\u0421\u0442\u043e\u043f\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "--+": {
    nonary: "\u04363",
    name: "\u041d\u0435\xa0\u0437\u0430\u0434\u0435\u0439\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u0430\xa0\xa0\xa0\xa0\xa0",
    content: "\u0421\u0442\u043e\u043f\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  },
  "---": {
    nonary: "\u0436\u0445",
    name: "\u041d\u0435\xa0\u0437\u0430\u0434\u0435\u0439\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u0430\xa0\xa0\xa0\xa0\xa0",
    content: "\u0421\u0442\u043e\u043f\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  }
}, trinary.setunws.registers = {
  register_update: function (e) {
    isset(e) || (e = []);
    var t, n;
    for (var i in trinary.asetunws.core.register) t = trinary.setunws.core.register[i], n = isset(e[i]) ? e[i] : "0", trinary.setunws.core.register[i].value = trinary.core.align(n, t.size)
  },
  reset: function () {
    var e, t;
    for (var n in trinary.setunws.core.register) e = trinary.setunws.core.register[n], t = trinary.core.align("0", e.size), trinary.setunws.core.register[n].value = t
  }
}, trinary.setunws.state = {
  cell: "",
  keying: !1,
  command: {
    address: null,
    code: null,
    flag: null,
    value: null
  },
  reset: function () {
    trinary.setunws.state.cell = "", trinary.setunws.state.keying = !1, trinary.setunws.state.command = {
      address: null,
      code: null,
      flag: null,
      value: null
    }
  }
}, trinary.setunws.ui = {
  update: function () { },
  deallocate: function () { }
}, trinary.setunws.uiss = {
  root: null,
  setRoot: function () {
    trinary.setunws.uiss.root = $("<div>", {
      id: "setunws"
    })
  },
  viewOriginal: function () {
    trinary.setunws.ui.deallocate(), trinary.setunws.ui = trinary.setunws.uiss.original
  },
  viewTerminal: function () {
    trinary.setunws.ui.deallocate(), trinary.setunws.ui = trinary.setunws.uiss.terminal
  }
}, trinary.setunws.uiss.original = {
  root: null,
  svg: null,
  allocate: function () {
    with (trinary.setunws.uiss.root.attr("class", "original"), trinary.setunws.uiss.original.root = $("<div>"), trinary.setunws.uiss.root.append(trinary.setunws.uiss.original.root), trinary.setunws.uiss.original) pult.init(), ft.init(1), root.append(ft.device[1].instance), ft.init(2), root.append(ft.device[2].instance), printer.init(), root.append(printer.instance), registers.init(), pult.append(registers), clock.init(), pult.append(clock), control.Address.init(), pult.append(control.Address), control.Code.init(), pult.append(control.Code), control.Command.init(), pult.append(control.Command), control.Buttons.init(), pult.append(control.Buttons), control.mode.StepByStep.init(), pult.append(control.mode.StepByStep), control.mode.CK.init(), pult.append(control.mode.CK), control.mode.MbFkVp.init(), pult.append(control.mode.MbFkVp), control.mode.SetUpCode.init(), pult.append(control.mode.SetUpCode), dispose()
  },
  deallocate: function () {
    trinary.setunws.uiss.root.html("")
  },
  dispose: function () {
    with (trinary.setunws.core.register) k.instance.setTransform("translate(0, 0)"), f.instance.setTransform("translate(0, 50)"), c.instance.setTransform("translate(0, 100)"), w.instance.setTransform("translate(138, 50)"), s.instance.setTransform("translate(230, 0)"), r.instance.setTransform("translate(270, 50)"), mb.instance.setTransform("translate(292, 100)");
    with (trinary.setunws.uiss.original) with (clock.instance.setTransform("translate(230,75)"), control) Command.instance.setTransform("translate(10, 170)"), Code.instance.setTransform("translate(300, 170)"), Address.instance.setTransform("translate(10, 250)"), Buttons.instance.setTransform("translate(275, 250)"), mode.StepByStep.instance.setTransform("translate(500,245)"), mode.CK.instance.setTransform("translate(130,220)"), mode.MbFkVp.instance.setTransform("translate(130,270)"), mode.SetUpCode.instance.setTransform("translate(220,170)")
  },
  update: function () {
    trinary.setunws.uiss.original.registers.update(), trinary.setunws.uiss.original.ft.update(), trinary.setunws.uiss.original.printer.print()
  }
}, trinary.setunws.uiss.original.pult = {
  instance: null,
  init: function () {
    var e = trinary.setunws.uiss.root,
      t = e.width(),
      n = trinary.setunws.uiss.original.svg = SVG.create("svg");
    n.attr({
      width: t,
      height: t / 2
    }), $(trinary.setunws.uiss.original.root).append(n.instance);
    var i = trinary.setunws.uiss.original.pult.instance = trinary.setunws.uiss.original.widget.panel({
      "class": "pult"
    });
    n.append(i), i.scale(t / 650), e.css("height", "auto"), $(window).resize(function () {
      var t = e.width();
      n.attr({
        width: t,
        height: t / 2
      }), i.scale(t / 650)
    })
  },
  append: function (e) {
    var t = null != e.instance ? e.instance : e;
    trinary.setunws.uiss.original.pult.instance.append(t)
  }
}, trinary.setunws.uiss.original.registers = {
  instance: null,
  instances: {},
  init: function () {
    var e = trinary.setunws.uiss.original.widget,
      t = trinary.setunws.core.register,
      n = e.panel({
        "class": "registers"
      });
    for (register in t)
      if ("p" != register) {
        var i = t[register],
          r = e.panel({
            "class": "register",
            name: register
          }),
          o = trinary.setunws.uiss.original.widget.indicatorsSet(i);
        o.setTransform("translate(30)");
        var s = e.label({
          x: 14,
          y: 22
        });
        if (s.text(i.label), "s" == register) {
          o.setTransform("translate(70)");
          var a = trinary.setunws.uiss.original.widget.indicatorsSet(t.p, {
            labelPrefix: t.p.label + " ",
            noGrouped: !0
          });
          a.setTransform("translate(30)"), r.append(a)
        }
        r.append(o), r.append(s), i.instance = r, n.append(r)
      }
    trinary.setunws.uiss.original.registers.instance = n
  },
  read: function () {
    trinary.setunws.uiss.original.registers.update()
  },
  update: function () {
    for (name in trinary.setunws.core.register)
      for (var e = trinary.setunws.core.register[name], t = 0; t < e.size; t++) {
        var n = trinary.setunws.core.register[name].indicator[t];
        if (null != n) {
          var i = e.value.charAt(t);
          n.attr("value", i)
        }
      }
  }
}, trinary.setunws.uiss.original.control = {
  Address: {
    instance: null,
    switcher: [],
    init: function () {
      var e = trinary.setunws.uiss.original.widget.switchers({
        name: "setAddress",
        size: 5,
        label: "\u0410\u0434\u0440\u0435\u0441 \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0430"
      });
      trinary.setunws.uiss.original.control.Address.instance = e.instance, trinary.setunws.uiss.original.control.Address.switcher = e.switcher
    }
  },
  Command: {
    instance: null,
    switcher: [],
    init: function () {
      var e = trinary.setunws.uiss.original.widget.switchers({
        name: "command",
        size: 9,
        label: "\u041d\u0430\u0431\u043e\u0440 \u043a\u043e\u043c\u0430\u043d\u0434\u044b"
      });
      trinary.setunws.uiss.original.control.Command.instance = e.instance, trinary.setunws.uiss.original.control.Command.switcher = e.switcher
    }
  },
  Code: {
    instance: null,
    switcher: [],
    init: function () {
      var e = trinary.setunws.uiss.original.widget.switchers({
        name: "setCode",
        size: 18,
        action: "setCode"
      }),
        t = trinary.setunws.uiss.original.control.Code;
      t.instance = e.instance, t.switcher = e.switcher, t.instance.onclick = function () {
        trinary.setunws.uiss.original.actions.Set.code()
      }
    }
  },
  Buttons: {
    instance: null,
    init: function () {
      var e = trinary.setunws.core.button,
        t = 0,
        n = SVG.create("g"),
        i = null;
      for (button in e) i = e[button], i.instance = trinary.setunws.uiss.original.widget.button(i), i.instance.attr("name", button), i.instance.setTransform("translate(" + t + ")"), n.append(i.instance), t += 50, i.instance.parent = i, i.instance.onclick = function () {
        "disabled" != this.attr("disabled") && trinary.setunws.uiss.original.actions[this.parent.action] && trinary.setunws.uiss.original.actions[this.parent.action]()
      };
      return e.boot.instance.attr("disabled", "disabled"), trinary.setunws.uiss.original.control.Buttons.instance = n, n
    }
  }
}, trinary.setunws.uiss.original.control.mode = {
  StepByStep: {
    instance: null,
    init: function () {
      var e = trinary.setunws.core.mode["step-by-step"],
        t = trinary.setunws.uiss.original.widget.panel({
          "class": "modeswitcher"
        });
      t.attr("value", e);
      var n = trinary.setunws.uiss.original.widget.bulb();
      n.setTransform("translate(5,5)");
      var i = trinary.setunws.uiss.original.widget.switcher({
        position: "reverse-horizontal"
      });
      i.setTransform("translate(25,5)");
      var r = trinary.setunws.uiss.original.widget.label({
        x: 0,
        y: 25
      }),
        o = SVG.create("tspan", {
          x: 10,
          dy: "0em"
        });
      o.text("\u041e\u0434\u043d\u043e\u0442\u0430\u043a\u0442\u043d\u044b\u0439");
      var s = SVG.create("tspan", {
        x: 10,
        dy: "1em"
      });
      return s.text("\u0440\u0435\u0436\u0438\u043c"), r.append(o), r.append(s), t.append(n), t.append(i), t.append(r), t.onclick = function () {
        this.attr("value", "+" == this.attr("value") ? "-" : "+"), trinary.setunws.uiss.original.actions.Set.stepByStep()
      }, trinary.setunws.uiss.original.control.mode.StepByStep.instance = t, t
    },
    change: function () {
      trinary.setunws.uiss.original.control.mode.StepByStep.instance.attr("value"), trinary.setunws.uiss.original.control.mode.SetUpCode.instance.attr("value")
    }
  },
  CK: {
    instance: null,
    init: function () {
      var e = trinary.setunws.uiss.original.widget.triSwitcher({
        labelMinus: "C",
        labelZero: "",
        labelPlus: "K"
      });
      e.onclick = function () {
        trinary.setunws.uiss.original.actions.Set.ck()
      }, trinary.setunws.uiss.original.control.mode.CK.instance = e
    }
  },
  MbFkVp: {
    instance: null,
    init: function () {
      var e = trinary.setunws.uiss.original.widget.triSwitcher({
        labelMinus: "\u041c\u0411",
        labelZero: "\u0424\u041a",
        labelPlus: "\u0412\u041f"
      });
      e.onclick = function () {
        trinary.setunws.uiss.original.actions.Set.mbfkvp()
      }, trinary.setunws.uiss.original.control.mode.MbFkVp.instance = e
    }
  },
  SetUpCode: {
    instance: null,
    init: function () {
      var e = trinary.setunws.uiss.original.widget.biSwitcher({
        label: "\u041d\u0430\u0431\u043e\u0440 \u043a\u043e\u0434\u0430"
      });
      e.attr("value", trinary.setunws.operation.getModeSetUpCode()), e.onclick = function () {
        trinary.setunws.uiss.original.control.mode.SetUpCode.change()
      }, trinary.setunws.uiss.original.control.mode.SetUpCode.instance = e
    },
    change: function () {
      var e = trinary.setunws.operation.changeModeSetUpCode();
      trinary.setunws.uiss.original.control.mode.SetUpCode.instance.attr("value", e)
    }
  }
}, trinary.setunws.uiss.original.ft = {
  device: [],
  init: function (e) {
    trinary.setunws.uiss.original.ft.device[e] = [];
    var t = trinary.setunws.uiss.original.ft.device[e],
      n = t.instance = $("<ft>", {
        name: e
      });
    return t.label = $("<label>"), t.label.html("\u0424\u0422-" + e), t.input = $("<textarea>", {
      name: "input"
    }), t.button = $("<button>", {
      name: "load"
    }), t.button.html("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043b\u0435\u043d\u0442\u0443"), n.append(t.label), n.append(t.input), n.append(t.button), t.button.click(function () {
      trinary.setunws.uiss.original.ft.load(e)
    }), t.input.dblclick(function () {
      this.select()
    }), n
  },
  update: function () {
    var e = trinary.setunws.core.ft;
    for (var t in e)
      if (null != trinary.setunws.uiss.original.ft.device[t]) {
        var n = "";
        for (line in e[t]) n += e[t][line] + "\n";
        trinary.setunws.uiss.original.ft.device[t].input.val(n)
      }
  },
  load: function (e) {
    var t = trinary.setunws.uiss.original.ft.device[e].input.val();
    e && t && (trinary.setunws.ft.load(e, t), trinary.setunws.uiss.original.ft.update(), 1 == e && trinary.setunws.core.button.boot.instance.attr("disabled", ""))
  }
}, trinary.setunws.uiss.original.memory = {
  instance: null,
  cells: {},
  init: function () {
    var e = trinary.setunws.core.memory,
      t = $("<memory>"),
      n = $("<label>");
    n.html("\u041e\u0417\u0423"), t.append(n);
    var i = 0,
      r = trinary.setunws.uiss.original.memory.cells;
    for (address in e) {
      if (i % 54 == 0) {
        var o = $("<bank>");
        t.append(o)
      }
      r[address] = trinary.setunws.uiss.original.widget.cell(address, e[address]), r[address].input.blur(function () {
        trinary.setunws.uiss.original.memory.updateCell(this.name, this.value)
      }), o.append(r[address].instance), i++
    }
    return trinary.setunws.uiss.original.memory.instance = t, t
  },
  updateCell: function (e, t) {
    var n = trinary.setunws.uiss.original.memory.cells[e];
    t = trinary.setunws.memory.write(e, t), n.input.val(t), n.tooltip.html(trinary.core.trinaryToNonary(e) + ":" + trinary.core.trinaryToNonary(t))
  },
  update: function () {
    var e = trinary.setunws.core.memory;
    for (address in e) trinary.setunws.uiss.original.memory.updateCell(address, e[address])
  },
  read: function () {
    trinary.setunws.uiss.original.refresh_cell()
  },
  cell: function (e) {
    return;
  },
  highlight: function (e, t) { },
  clearhighlight: function (e) { }
}, trinary.setunws.uiss.original.printer = {
  instance: null,
  output: null,
  init: function () {
    var e = trinary.setunws.uiss.original.printer.instance = $('<div class="printer"></div>'),
      t = trinary.setunws.uiss.original.printer.output = $('<div class="output"></div>'),
      n = $("<label>");
    return n.html("\u041f\u0440\u0438\u043d\u0442\u0435\u0440 \u042d\u0423\u041c-46"), e.append(n), e.append(t), e
  },
  print: function () {
    trinary.setunws.uiss.original.printer.output.html(trinary.setunws.uiss.original.printer.output.html() + "\n" + trinary.setunws.core.printer.data)
  }
}, trinary.setunws.uiss.original.actions = {
  boot: function () {
    trinary.setunws.core.button.boot.instance.attr("disabled", "disabled"), trinary.setunws.core.button.start.instance.attr("disabled", ""), trinary.setunws.operation.boot(), trinary.setunws.uiss.original.update()
  },
  step: function () {
    var e = trinary.setunws.core.button.start;
    e.instance.attr("disabled", "disabled"), trinary.setunws.uiss.original.memory.highlight(trinary.setunws.core.register.c.value, "before"), trinary.setunws.operation.step(), trinary.setunws.uiss.original.update(), trinary.setunws.uiss.original.memory.highlight(trinary.setunws.core.register.c.value, "now"), e.instance.attr("disabled", "")
  },
  start: function () {
    var e = trinary.setunws.core.button.start;
    e.instance.attr("disabled", "disabled"), trinary.setunws.uiss.original.memory.highlight(trinary.setunws.core.register.c.value, "before"), trinary.setunws.operation.start(), trinary.setunws.uiss.original.update(), trinary.setunws.uiss.original.memory.highlight(trinary.setunws.core.register.c.value, "now"), e.instance.attr("disabled", "")
  },
  execute: function () {
    var e = "",
      t = trinary.setunws.uiss.original.control.Command.switcher;
    for (i in t) e += t[i].attr("value");
    trinary.setunws.operation.execute(e), trinary.setunws.uiss.original.update(), "+" == trinary.setunws.core.mode["step-by-step"]
  },
  stop: function () {
    trinary.setunws.operation.stop()
  },
  Set: {
    code: function () {
      var e = trinary.setunws.uiss.original.control.Code,
        t = "";
      for (i in e.switcher) t += e.switcher[i].attr("value");
      t = trinary.setunws.operation.setCode(t)
    },
    ck: function () {
      var e = trinary.setunws.uiss.original.control.mode.CK.instance.attr("value");
      trinary.setunws.operation.setModeCK(e);
      var t = trinary.setunws.core["c-k"];
      t = "+" == t ? "K" : "-" == t ? "C" : "\u0441\u043d\u044f\u0442"
    },
    mbfkvp: function () {
      var e = trinary.setunws.uiss.original.control.mode.MbFkVp.instance.attr("value");
      trinary.setunws.operation.setModeMbFkVp(e);
      var t = trinary.setunws.core["mb-fk-vp"];
      t = "+" == t ? "\u0412\u041f" : "-" == t ? "\u041c\u0411" : "\u0424\u041a"
    },
    stepByStep: function () {
      var e = trinary.setunws.uiss.original.control.mode.StepByStep.instance.attr("value");
      trinary.setunws.operation.setModeStepByStep(e), trinary.setunws.uiss.original.control.mode.StepByStep.change()
    }
  }
}, trinary.setunws.uiss.original.log = {
  instance: null,
  output: null,
  init: function () {
    var e = (trinary.setunws.uiss.original.log.instance = $("<console>"), trinary.setunws.uiss.original.log.output = $("<output>"), $("<label>"));
    e.html("\u041a\u043e\u043d\u0441\u043e\u043b\u044c")
  },
  write: function () {
    trinary.setunws.uiss.original.log.output
  },
  clear: function () {
    trinary.setunws.uiss.original.log.output.html("")
  }
}, trinary.setunws.uiss.original.widget = {
  panel: function (e) {
    return SVG.create("g", e)
  },
  label: function (e) {
    return SVG.create("text", e)
  },
  bulb: function () {
    var e = SVG.create("g", {
      "class": "bulb"
    }),
      t = SVG.create("circle", {
        cx: 0,
        cy: 0,
        r: 7
      }),
      n = SVG.create("ellipse", {
        cx: 0,
        cy: 0,
        rx: 5,
        ry: 5,
        "class": "glass"
      });
    return e.append(t), e.append(n), e
  },
  indicator: function (e) {
    var t = SVG.create("g", {
      "class": "indicator"
    }),
      n = trinary.setunws.uiss.original.widget.bulb();
    n.setTransform("translate(0,10)");
    var i = trinary.setunws.uiss.original.widget.bulb();
    i.setTransform("translate(0,26)");
    var r = SVG.create("text", {
      x: 0,
      y: 40
    });
    return r.text(e.label), t.append(n), t.append(i), t.append(r), t
  },
  indicatorsSet: function (e, t) {
    (null == t || "undefined" == typeof t) && (t = {});
    var n, i, r = 0,
      o = 0,
      s = SVG.create("g", {
        "class": "indicators-set"
      });
    e.indicator = [];
    for (var a = void 0 == t.labelPrefix ? "" : t.labelPrefix, l = void 0 == t.noGrouped ? 5 : 0, c = 17, u = c + l, h = 0; h < e.size; h++) n = trinary.setunws.uiss.original.widget.indicator({
      label: a + (h + 1).toString()
    }), n.setTransform("translate(" + r + ",0)"), 9 == o && (o = 0, r += l), r += o++ % 2 == 0 ? u : c, i = null != e.value && e.value[h] ? e.value[h] : "0", n.attr("value", i), e.indicator[h] = n, s.append(n);
    return s
  },
  switcher: function (e) {
    null == e && (e = {});
    var t = SVG.create("g", {
      "class": "switcher",
      value: "0"
    }),
      n = SVG.create("g");
    null != e.position && ("horizontal" == e.position ? n.setTransform("rotate(90)") : "reverse-horizontal" == e.position && n.setTransform("rotate(-90)"));
    var i = SVG.create("g", {
      transform: "translate(-3, -10)"
    });
    i.append(SVG.create("rect", {
      "class": "place",
      x: 0,
      y: 0,
      height: "20",
      width: "6",
      rx: "1"
    })), n.append(i);
    var i = SVG.create("g", {
      "class": "position",
      name: "+"
    });
    i.append(SVG.create("circle", {
      cx: 0,
      cy: 0,
      r: "3"
    })), i.append(SVG.create("polyline", {
      points: "-4,0 -5,-8 5,-8 4,0"
    })), i.append(SVG.create("ellipse", {
      cx: 0,
      cy: -8,
      rx: 4,
      ry: 2.5
    })), n.append(i);
    var i = SVG.create("g", {
      "class": "position",
      name: "0"
    });
    i.append(SVG.create("ellipse", {
      cx: 0,
      cy: 0,
      rx: "5",
      ry: "4"
    })), i.append(SVG.create("ellipse", {
      cx: 0,
      cy: 0,
      rx: "3",
      ry: "2"
    })), n.append(i);
    var i = SVG.create("g", {
      "class": "position",
      name: "-",
      transform: "rotate(180)"
    });
    if (i.append(SVG.create("circle", {
      cx: 0,
      cy: 0,
      r: "3"
    })), i.append(SVG.create("polyline", {
      points: "-4,0 -5,-8 5,-8 4,0"
    })), i.append(SVG.create("ellipse", {
      cx: 0,
      cy: -8,
      rx: 4,
      ry: 2.5
    })), n.append(i), t.append(n), null != e && null != e.label) {
      var r = SVG.create("text", {
        x: 0,
        y: 20
      });
      r.text(e.label), t.append(r)
    }
    return t
  },
  switchers: function (e) {
    null == e && (e = {});
    var t, n, i = SVG.create("g", {
      "class": "switcher-set"
    }),
      r = 0,
      o = 0,
      s = {};
    s.switcher = [];
    for (var a = 0; a < e.size; a++) t = trinary.setunws.uiss.original.widget.switcher({
      label: a + 1
    }), t.setTransform("translate(" + r + ",0)"), 9 == o && (o = 0, r += 5), r += o++ % 2 == 0 ? 23 : 16, t.attr("value", n), t.onclick = function () {
      var e = this.attr("value"),
        t = this.attr("prev");
      null == t && (t = 0), "+" == e || "-" == e ? (this.attr("value", "0"), this.attr("prev", e)) : "+" == t ? (this.attr("value", "-"), this.attr("prev", "0")) : (this.attr("value", "+"), this.attr("prev", "0"))
    }, s.switcher[a] = t, i.append(t);
    if (null != e.label) {
      var l = SVG.create("text", {
        x: 0,
        y: 35
      });
      l.text(e.label), i.append(l)
    }
    return i.setTransform("translate(5)"), s.instance = i, s
  },
  biSwitcher: function (e) {
    null == e && (e = {});
    var t = SVG.create("g", {
      "class": "switcher bi-switcher"
    });
    t.attr("value", "-");
    var n = trinary.setunws.uiss.original.widget.bulb(),
      i = trinary.setunws.uiss.original.widget.switcher({
        position: "reverse-horizontal"
      });
    if (i.setTransform("translate(20)"), t.append(n), t.append(i), null != e.label) {
      var r = SVG.create("text");
      r.text(e.label), r.setTransform("translate(0,20)"), t.append(r)
    }
    return t.onclick = function () {
      var e = this.attr("value");
      this.attr("value", "-" == e ? "+" : "-")
    }, t
  },
  triSwitcher: function (e) {
    null == e && (e = {});
    var t = SVG.create("g", {
      "class": "switcher tri-switcher"
    }),
      n = trinary.setunws.uiss.original.widget.bulb(),
      i = trinary.setunws.uiss.original.widget.bulb(),
      r = trinary.setunws.uiss.original.widget.switcher({
        position: "horizontal"
      }),
      o = SVG.create("text", {
        x: 0,
        y: 20
      }),
      s = SVG.create("text", {
        x: 25,
        y: 20
      }),
      a = SVG.create("text", {
        x: 50,
        y: 20
      });
    return t.attr("value", 0), n.attr("value", "-"), i.attr("value", "+"), i.setTransform("translate(50)"), r.setTransform("translate(25)"), e.labelMinus && o.text(e.labelMinus), e.labelZero && s.text(e.labelZero), e.labelPlus && a.text(e.labelPlus), t.append(n), t.append(r), t.append(i), t.append(o), t.append(s), t.append(a), r.onclick = function () {
      var e = t.attr("value"),
        n = t.attr("prev");
      null == n && (n = 0), "+" == e || "-" == e ? (t.attr("value", "0"), t.attr("prev", e)) : "+" == n ? (t.attr("value", "-"), t.attr("prev", "0")) : (t.attr("value", "+"), t.attr("prev", "0"))
    }, t
  },
  cell: function (e, t) {
    var n = {};
    return n.address = e, n.instance = $("<cell>"), n.label = $("<label>", {}, e), n.input = $("<input>", {
      name: e,
      value: t
    }), n.tooltip = $("<label>", {}, trinary.core.trinaryToNonary(e) + ":" + trinary.core.trinaryToNonary(t)), n.instance.append(n.label), n.instance.append(n.input), n.instance.append(n.tooltip), n
  },
  button: function (e) {
    var t = SVG.create("g", {
      "class": "button"
    }),
      n = SVG.create("circle", {
        cx: 0,
        cy: 0,
        r: 6
      });
    if (t.append(n), "undefined" != typeof e && null != e.label) {
      var i = SVG.create("text", {
        x: 0,
        y: 20
      });
      i.text(e.label), t.append(i)
    }
    return t
  }
}, trinary.setunws.uiss.original.clock = {
  instance: null,
  init: function (e) {
    null == e && (e = {});
    var t = trinary.setunws.uiss.original.widget.panel({
      "class": "clock"
    });
    t.append(SVG.create("circle", {
      cx: 0,
      cy: 0,
      r: 35,
      "class": "border"
    })), t.append(SVG.create("circle", {
      cx: 0,
      cy: 0,
      r: 33
    }));
    var n = 27,
      i = 1,
      r = Math.PI * (2 / 12),
      o = .5 * -Math.PI,
      s = SVG.create("g"),
      a = SVG.create("polyline", {
        points: "0,0 0,-1.5 12,-1.5, 12,-4 18,0 12,4 12,1.5 0,1.5 0,0"
      }),
      l = SVG.create("polyline", {
        points: "0,0 0,-1 17,-1, 17,-3 23,0 17,3 17,1 0,1 0,0"
      });
    for (t.append(a), t.append(l), t.append(s), t.append(SVG.create("circle", {
      cx: 0,
      cy: 0,
      r: 3
    })), t.append(SVG.create("circle", {
      cx: 0,
      cy: 0,
      r: 1
    })), i; 12 >= i; i++) {
      var c = SVG.create("text", {
        x: Math.cos(i * r + o) * n,
        y: Math.sin(i * r + o) * n
      });
      c.text(i), s.append(c)
    }
    setInterval(function (e, t) {
      var n = new Date,
        i = 360 * n.getMinutes() / 60 - 90;
      t.setTransform("rotate(" + i + ")");
      var r = n.getHours();
      r > 12 && (r -= 12);
      var i = 360 * (r + n.getMinutes() / 60) / 12 - 90;
      e.setTransform("rotate(" + i + ")")
    }, 1e3, a, l), trinary.setunws.uiss.original.clock.instance = t
  }
}, trinary.setunws.uiss.terminal = {
  registers: [],
  cells: [],
  printer: null,
  cache: {
    cells: {},
    ft: {}
  },
  instance: {
    register: null,
    memory: {
      "-": $("textarea"),
      0: $("textarea"),
      "+": $("textarea")
    },
    ft: {
      1: null,
      2: null
    },
    console: $("div", {
      "class": "console"
    }),
    control: {
      boot: $("a", {
        href: "#"
      }),
      start: $("a", {
        href: "#"
      }),
      stop: $("a", {
        href: "#"
      }),
      step: $("a", {
        href: "#"
      })
    }
  },
  update: function () {
    var e = trinary.setunws.uiss.terminal.dump;
    e.log(), trinary.setunws.uiss.terminal.printer.update(), e.register(), e.memory(), e.ft(1), e.ft(2)
  },
  allocate: function () {
    var e = trinary.setunws.uiss.root,
      t = trinary.setunws.uiss.terminal,
      n = $("<div>", {
        "class": "control"
      });
    e.append(n), t.instance.control.boot.html("\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u0443\u0441\u043a"), t.instance.control.start.html("\u041f\u0443\u0441\u043a"), t.instance.control.step.html("\u0422\u0430\u043a\u0442"), t.instance.control.stop.html("\u041e\u0441\u0442\u0430\u043d\u043e\u0432"), t.instance.control.boot.click(function () {
      trinary.setunws.operation.boot(), trinary.setunws.uiss.terminal.update()
    }), t.instance.control.start.click(function () {
      trinary.setunws.operation.start()
    }), t.instance.control.step.click(function () {
      trinary.setunws.operation.step()
    }), t.instance.control.stop.click(function () {
      trinary.setunws.operation.stop()
    }), n.append(t.instance.control.boot), n.append(t.instance.control.start), n.append(t.instance.control.step), n.append(t.instance.control.stop);
    var i = $("<div>", {
      "class": "registers"
    }),
      r = $("<h4>");
    r.html("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u044b"), i.append(r);
    var o = trinary.setunws.uiss.terminal.registers,
      s = $("<ul>");
    i.append(s), e.append(i);
    for (var a in trinary.setunws.core.register) {
      var l = trinary.setunws.uiss.terminal.widget.register(a);
      s.append($("<li>").append(l)), o.push(l)
    }
    trinary.setunws.uiss.terminal.printer = trinary.setunws.uiss.terminal.widget.printer(), e.append(trinary.setunws.uiss.terminal.printer), t.instance.ft[1] = t.widget.ft(1), t.instance.ft[2] = t.widget.ft(2), e.append(t.instance.ft[1]), e.append(t.instance.ft[2]), t.cache.ft[1] = "", t.cache.ft[2] = "";
    var i = $("<div>", {
      "class": "memory"
    }),
      r = $("<h4>");
    r.html("\u041e\u0417\u0423"), i.append(r);
    var c = trinary.setunws.uiss.terminal.cells,
      u = 0;
    for (var h in trinary.setunws.core.memory) {
      (0 == u || 54 == u || 108 == u) && (s = $("<ul>", {
        "class": "bank"
      }), i.append(s)), trinary.setunws.uiss.terminal.cache.cells[h] = "";
      var l = trinary.setunws.uiss.terminal.widget.cell(h);
      s.append(l), c.push(l), u++
    }
    e.append(i), e.append("<h4>\u041a\u043e\u043d\u0441\u043e\u043b\u044c</h4>"), e.append(t.instance.console)
  },
  deallocate: function () {
    trinary.setunws.uiss.root.html("")
  },
  updateTextNode: function (e, t) {
    null == e.firstChild ? e.appendChild(document.createTextNode(t)) : e.firstChild.data = t
  },
  widget: {
    register: function (e) {
      var t = $("<label>");
      t.html(trinary.setunws.core.register[e].label + ": ");
      var n = $("<dfn>");
      return t.append(n), n = n[0], t.update = function () {
        trinary.setunws.uiss.terminal.updateTextNode(n, trinary.setunws.core.register[e].value)
      }, t.update(), t.attr("name", e), t
    },
    cell: function (e) {
      var t = $("<li>"),
        n = $("<label>");
      n.html(e + ": ");
      var i = $("<dfn>");
      t.append(n), t.append(i), i = i[0];
      var r = $("<label>", {
        "class": "non"
      });
      r.html(trinary.core.trinaryToNonary(e) + ": ");
      var o = $("<dfn>");
      return t.append(r), t.append(o), o = o[0], t.update = function () {
        var t = trinary.setunws.core.memory[e];
        trinary.setunws.uiss.terminal.cache.cells[e] != t && (trinary.setunws.uiss.terminal.cache.cells[e] = t, trinary.setunws.uiss.terminal.updateTextNode(i, t), trinary.setunws.uiss.terminal.updateTextNode(o, trinary.core.trinaryToNonary(t)))
      }, t.update(), t.attr("name", name), t
    },
    printer: function () {
      var e = $("<div>", {
        "class": "printer"
      }),
        t = $("<div>", {
          "class": "output"
        });
      e.html("<h4>\u042d\u0423\u041c</h4>"), e.append(t);
      var n = t[0];
      return e.update = function () {
        n.textContent = trinary.setunws.core.printer.data
      }, e
    },
    ft: function (e) {
      var t = $("<div>", {
        "class": "ft",
        name: e
      }),
        n = $("<h4>");
      n.html("\u0424\u0422-" + e);
      var i = $("<textarea>", {
        name: "input"
      }),
        r = $("<button>", {
          name: "load"
        });
      r.html("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043b\u0435\u043d\u0442\u0443"), t.append(n), t.append(i), t.append(r);
      var o = i[0];
      return t.update = function () {
        var t = trinary.setunws.core.ft[e].join("\n");
        trinary.setunws.uiss.terminal.cache.ft[e] != t && (o.value = t, trinary.setunws.uiss.terminal.cache.ft[e] = t)
      }, r.click(function () {
        trinary.setunws.ft.load(e, i.val()), t.update()
      }), i.dblclick(function () {
        this.select()
      }), t
    }
  },
  dump: {
    register: function () {
      for (var e = trinary.setunws.uiss.terminal.registers, t = 0; t < e.length; t++) e[t].update()
    },
    mode: function () {
      var e = "";
      for (var t in trinary.setunws.core.register) {
        var n = trinary.setunws.core.register[t];
        e += t + ": " + n.value + "\n"
      }
      e += "\n";
      for (var t in trinary.setunws.core.mode) {
        var i = trinary.setunws.core.mode[t];
        e += t + ": " + i + "\n"
      }
      e += "\n", e += "printer: " + trinary.setunws.core.printer.data, trinary.setunws.uiss.terminal.instance.register.val(e)
    },
    memory: function () {
      for (var e = trinary.setunws.uiss.terminal.cells, t = 0; t < e.length; t++) e[t].update()
    },
    ft: function (e) {
      var t = "";
      for (var n in trinary.setunws.core.ft[e]) {
        var i = trinary.setunws.core.ft[e][n];
        t += i + " | ", t += trinary.core.trinaryToNonary(i) + "\n"
      }
      trinary.setunws.uiss.terminal.instance.ft[e].val(t)
    },
    log: function () {
      trinary.setunws.uiss.terminal.updateTextNode(trinary.setunws.uiss.terminal.instance.console[0], trinary.setunws.console.stack.join("\n"))
    }
  }
}, window.AceEditorController = function () {
  function e(e, t) {
    var n = ace.edit(e);
    n.setTheme("ace/theme/github"), n.getSession().setMode("ace/mode/markdown"), $("#" + e).parents("form:first").submit(function () {
      $("#" + t).val(n.getValue())
    })
  }
  return e
}(), window.CommentsController = function (e) {
  var t = {};
  t.form = null;
  var n = "#comment_form",
    i = "#comment_parent_id";
  return t.initialize = function () {
    var r = $("#comments .comment-actions:first").detach();
    r.show(), $("#comments [data-reply] .media-content").each(function () {
      $(this).after(r.clone())
    }), $(e).on("click", "#comments .comment-reply", function (e) {
      $(".comment-actions").show();
      var r = $(this),
        o = r.parents("[data-reply]:first").attr("data-reply"),
        s = r.parent();
      s.hide();
      var a = t.form.clone(),
        l = a.find("textarea");
      $(n).remove(), s.after(a), a.find(i).val(o), l.focus(), e.preventDefault(), AceEditorController("editor", "comment_content")
    }), $(e).on("ajax:success", "#comment_form", function (e, t) {
      $(".comment-actions").show();
      var n = $(t);
      n.find(".media-content").after(r.clone()), $(this).replaceWith(n)
    }), $(e).on("ajax:error", "#comment_form", function (e, t) {
      $(this).replaceWith(t.responseText)
    }), $(e).on("submit", "#new_comment", function (e) {
      $(this).find("button").attr("disabled", "disabled"), $(this).fadeOut(1e3), e.preventDefault()
    }), t.form = $(n).clone(), AceEditorController("editor", "comment_content")
  }, t
}(document),
  function () {
    function e() {
      var e = 8,
        t = 6,
        n = $("#encodesource").val();
      $(".encoded-results").css("display", "block");
      var i = Thencoder.getFreq(n),
        r = Thencoder.getBinaryTree(i),
        o = Thencoder.getTrinaryTree(i),
        s = Thencoder.getPrefixCodes(r),
        a = Thencoder.getPrefixCodes(o);
      $("#statistics-symbols").html(Thencoder.statistics.symlist(i, s, a)), $("#src_symbols_qty").html(n.length), $("#bin_src_size").html(n.length * e), $("#tri_src_size").html(n.length * t);
      var l = {
        binary: Thencoder.getEncodedSize(s),
        trinary: Thencoder.getEncodedSize(a)
      };
      $("#bin_encoded_size").html(l.binary), $("#tri_encoded_size").html(l.trinary), $("#bin_ratio").html(Math.round(1e4 * l.binary / (n.length * e)) / 100 + "%"), $("#tri_ratio").html(Math.round(1e4 * l.trinary / (n.length * t)) / 100 + "%"), $("#btree").html('<div id="bintree"></div>'), $("#ttree").html('<div id="tritree"></div>');
      var c;
      c = new Thencoder.structure.Tree;
      var u = c.grow(r),
        h = new Gardener,
        d = h.tree(u);
      d.grow(), d.plant("#bintree"), c = new Thencoder.structure.Tree;
      var g = c.grow(o),
        f = h.tree(g);
      f.grow(), f.plant("#tritree")
    }
    trinary.ThencoderController = {
      initialize: function (t) {
        $(t).click(function () {
          e()
        })
      }
    }
  }(trinary), $(function () {
    new trinary.coder.Translator("[data-behavior=trinary-translator]")
    // $("time[data-type!=tz]").timeago()
  });