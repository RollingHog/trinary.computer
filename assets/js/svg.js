/*
 * SVG JS Library
 *
 * Copyright 2008 Alexander Obukhov, Trinary Group
 *
 * http://trinary.ru
 *
 * Released under the MIT license
 *
 * $Date: 2008-10-28 08:00:00 +0300 (Mon, 28 Oct 2008) $
 * $Rev: 5 $
 */
var SVG = window.SVG = {
    _NS: "http://www.w3.org/2000/svg",
    _regexp: {
        istext: /text|tspan|tref/i,
        translate: /translate\(([-\d\.]+),?\s*([-\d\.]*?)\)/i,
        rotate: /rotate\(([\d\.]+),?.*?\)/i,
        scale: /scale\(([\d\.]+),?.*?\)/i
    },
    create: function(e, t) {
        var n = {};
        n.instance = document.createElementNS(SVG._NS, e), n.create = SVG.create, n.append = SVG._append, n.attr = SVG._attr, n.translate = SVG._translate, n.scale = SVG._scale, n.rotate = SVG._rotate, n.text = SVG._text, n.setTransform = function(e) {
            this.attr("transform", e)
        }, "object" == typeof t && n.attr(t);
        for (var i = ["onclick"], r = 0; r < i.length; r++) {
            var o = i[r];
            n[o] = function() {}, n.instance[o] = function() {
                n[o]()
            }
        }
        return n
    },
    _append: function(e, t) {
        if ("string" == typeof e) {
            var n = this.create(e, t);
            return this.append(n), n
        }
        this.instance.appendChild(e.instance)
    },
    _text: function(e) {
        this.append({
            instance: document.createTextNode(e)
        })
    },
    _attr: function(e, t) {
        if ("object" == typeof e)
            for (key in e) this.instance.setAttribute(key, e[key]);
        else if ("string" == typeof e) {
            if ("undefined" == typeof t) return this.instance.getAttribute(e);
            this.instance.setAttribute(e, t)
        }
    },
    _translate: function(e, t) {
        var n = SVG._regexp.translate,
            i = null,
            r = 0,
            o = 0,
            s = this.attr("transform");
        if (null != s) {
            var a = n.exec(s);
            null != a && (r = "" != a[1] ? parseFloat(a[1]) : 0, o = "" != a[2] ? parseFloat(a[2]) : 0)
        }
        return "number" == typeof e && ("number" != typeof t && (t = 0), i = "translate(" + e + "," + t + ")", null != s && (i = n.test(s) ? s.replace(n, i) : s + " " + i), this.attr("transform", i)), {
            x: r,
            y: o
        }
    },
    _scale: function(e) {
        var t = SVG._regexp.scale,
            n = null,
            i = 1,
            r = this.attr("transform");
        if (null != r) {
            var o = t.exec(r);
            null != o && (i = "" != o[1] ? parseFloat(o[1]) : 1)
        }
        return "number" == typeof e && (n = "scale(" + e + ")", null != r && (n = t.test(r) ? r.replace(t, n) : r + " " + n), this.attr("transform", n)), {
            scale: i
        }
    },
    _rotate: function(e) {
        var t = SVG._regexp.rotate,
            n = null,
            i = 0,
            r = this.attr("transform");
        if (null != r) {
            var o = t.exec(r);
            null != o && (i = "" != o[1] ? parseFloat(o[1]) : 0)
        }
        return "number" == typeof e && (n = "rotate(" + e + ")", null != r && (n = t.test(r) ? r.replace(t, n) : r + " " + n), this.attr("transform", n)), {
            angle: i
        }
    }
};
console.assert = function(e) {
        if (e) console.log("Passed");
        else {
            for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
            console.error(t)
        }
    }, JSONW = {}, "undefined" != typeof JSON ? JSONW = JSON : JSONW.parse = function() {
        var e, t, n, i, r = {
                '"': '"',
                "\\": "\\",
                "/": "/",
                b: "\b",
                f: "\f",
                n: "\n",
                r: "\r",
                t: "	"
            },
            o = function(t) {
                throw {
                    name: "SyntaxError",
                    message: t,
                    at: e,
                    text: n
                }
            },
            s = function(i) {
                return i && i !== t && o("Expected '" + i + "' instead of '" + t + "'"), t = n.charAt(e), e += 1, t
            },
            a = function() {
                var e, n = "";
                for ("-" === t && (n = "-", s("-")); t >= "0" && "9" >= t;) n += t, s();
                if ("." === t)
                    for (n += "."; s() && t >= "0" && "9" >= t;) n += t;
                if ("e" === t || "E" === t)
                    for (n += t, s(), ("-" === t || "+" === t) && (n += t, s()); t >= "0" && "9" >= t;) n += t, s();
                return e = +n, isNaN(e) ? void o("Bad number") : e
            },
            l = function() {
                var e, n, i, a = "";
                if ('"' === t)
                    for (; s();) {
                        if ('"' === t) return s(), a;
                        if ("\\" === t)
                            if (s(), "u" === t) {
                                for (i = 0, n = 0; 4 > n && (e = parseInt(s(), 16), isFinite(e)); n += 1) i = 16 * i + e;
                                a += String.fromCharCode(i)
                            } else {
                                if ("string" != typeof r[t]) break;
                                a += r[t]
                            }
                        else a += t
                    }
                o("Bad string")
            },
            c = function() {
                for (; t && " " >= t;) s()
            },
            u = function() {
                switch (t) {
                    case "t":
                        return s("t"), s("r"), s("u"), s("e"), !0;
                    case "f":
                        return s("f"), s("a"), s("l"), s("s"), s("e"), !1;
                    case "n":
                        return s("n"), s("u"), s("l"), s("l"), null
                }
                o("Unexpected '" + t + "'")
            },
            h = function() {
                var e = [];
                if ("[" === t) {
                    if (s("["), c(), "]" === t) return s("]"), e;
                    for (; t;) {
                        if (e.push(i()), c(), "]" === t) return s("]"), e;
                        s(","), c()
                    }
                }
                o("Bad array")
            },
            d = function() {
                var e, n = {};
                if ("{" === t) {
                    if (s("{"), c(), "}" === t) return s("}"), n;
                    for (; t;) {
                        if (e = l(), c(), s(":"), Object.hasOwnProperty.call(n, e) && o('Duplicate key "' + e + '"'), n[e] = i(), c(), "}" === t) return s("}"), n;
                        s(","), c()
                    }
                }
                o("Bad object")
            };
        return i = function() {
                switch (c(), t) {
                    case "{":
                        return d();
                    case "[":
                        return h();
                    case '"':
                        return l();
                    case "-":
                        return a();
                    default:
                        return t >= "0" && "9" >= t ? a() : u()
                }
            },
            function(r, s) {
                var a;
                return n = r, e = 0, t = " ", a = i(), c(), t && o("Syntax error"), "function" == typeof s ? function l(e, t) {
                    var n, i, r = e[t];
                    if (r && "object" == typeof r)
                        for (n in r) Object.hasOwnProperty.call(r, n) && (i = l(r, n), void 0 !== i ? r[n] = i : delete r[n]);
                    return s.call(e, t, r)
                }({
                    "": a
                }, "") : a
            }
    }(), "undefined" == typeof console && (window.console = {}, console.log = function() {}), window.logger = function() {}, logger.info = function() {
        window.console && console.log[console.firebug ? "apply" : "call"](console, Array.prototype.slice.call(arguments))
    }, logger.error = function() {
        var e = Array.prototype.slice.call(arguments);
        e.unshift("ERROR"), window.console && console.log[console.firebug ? "apply" : "call"](console, e)
    }, logger.logargs = function(e) {
        logger.info(e, arguments.callee.caller.arguments)
    },
    function() {
        function e(e) {
            var t = function(e, t) {
                    return r("", e, t)
                },
                o = n;
            e && (n[e] || (n[e] = {}), o = n[e]), o.define && o.define.packaged || (i.original = o.define, o.define = i, o.define.packaged = !0), o.require && o.require.packaged || (r.original = o.require, o.require = t, o.require.packaged = !0)
        }
        var t = "ace",
            n = function() {
                return this
            }();
        if (t || "undefined" == typeof requirejs) {
            var i = function(e, t, n) {
                    return "string" != typeof e ? void(i.original ? i.original.apply(window, arguments) : (console.error("dropping module because define wasn't a string."), console.trace())) : (2 == arguments.length && (n = t), i.modules || (i.modules = {}, i.payloads = {}), i.payloads[e] = n, i.modules[e] = null, void 0)
                },
                r = function(e, t, n) {
                    if ("[object Array]" === Object.prototype.toString.call(t)) {
                        for (var i = [], o = 0, a = t.length; a > o; ++o) {
                            var l = s(e, t[o]);
                            if (!l && r.original) return r.original.apply(window, arguments);
                            i.push(l)
                        }
                        n && n.apply(null, i)
                    } else {
                        if ("string" == typeof t) {
                            var c = s(e, t);
                            return !c && r.original ? r.original.apply(window, arguments) : (n && n(), c)
                        }
                        if (r.original) return r.original.apply(window, arguments)
                    }
                },
                o = function(e, t) {
                    if (-1 !== t.indexOf("!")) {
                        var n = t.split("!");
                        return o(e, n[0]) + "!" + o(e, n[1])
                    }
                    if ("." == t.charAt(0)) {
                        var i = e.split("/").slice(0, -1).join("/");
                        for (t = i + "/" + t; - 1 !== t.indexOf(".") && r != t;) {
                            var r = t;
                            t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
                        }
                    }
                    return t
                },
                s = function(e, t) {
                    t = o(e, t);
                    var n = i.modules[t];
                    if (!n) {
                        if (n = i.payloads[t], "function" == typeof n) {
                            var s = {},
                                a = {
                                    id: t,
                                    uri: "",
                                    exports: s,
                                    packaged: !0
                                },
                                l = function(e, n) {
                                    return r(t, e, n)
                                },
                                c = n(l, s, a);
                            s = c || a.exports, i.modules[t] = s, delete i.payloads[t]
                        }
                        n = i.modules[t] = s || n
                    }
                    return n
                };
            e(t)
        }
    }(), ace.define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/multi_select", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/config"], function(e, t) {
        e("./lib/fixoldbrowsers");
        var n = e("./lib/dom"),
            i = e("./lib/event"),
            r = e("./editor").Editor,
            o = e("./edit_session").EditSession,
            s = e("./undomanager").UndoManager,
            a = e("./virtual_renderer").VirtualRenderer,
            l = e("./multi_select").MultiSelect;
        e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./mode/folding/fold_mode"), e("./theme/textmate"), t.config = e("./config"), t.require = e, t.edit = function(e) {
            if ("string" == typeof e) {
                var o = e,
                    e = document.getElementById(o);
                if (!e) throw new Error("ace.edit can't find div #" + o)
            }
            if (e.env && e.env.editor instanceof r) return e.env.editor;
            var s = t.createEditSession(n.getInnerText(e));
            e.innerHTML = "";
            var c = new r(new a(e));
            new l(c), c.setSession(s);
            var u = {
                document: s,
                editor: c,
                onResize: c.resize.bind(c, null)
            };
            return i.addListener(window, "resize", u.onResize), c.on("destroy", function() {
                i.removeListener(window, "resize", u.onResize)
            }), e.env = c.env = u, c
        }, t.createEditSession = function(e, t) {
            var n = new o(e, t);
            return n.setUndoManager(new s), n
        }, t.EditSession = o, t.UndoManager = s
    }), ace.define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function(e) {
        e("./regexp"), e("./es5-shim")
    }), ace.define("ace/lib/regexp", ["require", "exports", "module"], function() {
        function e(e) {
            return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "")
        }

        function t(e, t, n) {
            if (Array.prototype.indexOf) return e.indexOf(t, n);
            for (var i = n || 0; i < e.length; i++)
                if (e[i] === t) return i;
            return -1
        }
        var n = {
                exec: RegExp.prototype.exec,
                test: RegExp.prototype.test,
                match: String.prototype.match,
                replace: String.prototype.replace,
                split: String.prototype.split
            },
            i = void 0 === n.exec.call(/()??/, "")[1],
            r = function() {
                var e = /^/g;
                return n.test.call(e, ""), !e.lastIndex
            }();
        r && i || (RegExp.prototype.exec = function(o) {
            var s, a, l = n.exec.apply(this, arguments);
            if ("string" == typeof o && l) {
                if (!i && l.length > 1 && t(l, "") > -1 && (a = RegExp(this.source, n.replace.call(e(this), "g", "")), n.replace.call(o.slice(l.index), a, function() {
                        for (var e = 1; e < arguments.length - 2; e++) void 0 === arguments[e] && (l[e] = void 0)
                    })), this._xregexp && this._xregexp.captureNames)
                    for (var c = 1; c < l.length; c++) s = this._xregexp.captureNames[c - 1], s && (l[s] = l[c]);
                !r && this.global && !l[0].length && this.lastIndex > l.index && this.lastIndex--
            }
            return l
        }, r || (RegExp.prototype.test = function(e) {
            var t = n.exec.call(this, e);
            return t && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--, !!t
        }))
    }), ace.define("ace/lib/es5-shim", ["require", "exports", "module"], function() {
        function e() {}

        function t(e) {
            try {
                return Object.defineProperty(e, "sentinel", {}), "sentinel" in e
            } catch (t) {}
        }

        function n(e) {
            return e = +e, e !== e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
        }
        Function.prototype.bind || (Function.prototype.bind = function(t) {
            var n = this;
            if ("function" != typeof n) throw new TypeError("Function.prototype.bind called on incompatible " + n);
            var i = h.call(arguments, 1),
                r = function() {
                    if (this instanceof r) {
                        var e = n.apply(this, i.concat(h.call(arguments)));
                        return Object(e) === e ? e : this
                    }
                    return n.apply(t, i.concat(h.call(arguments)))
                };
            return n.prototype && (e.prototype = n.prototype, r.prototype = new e, e.prototype = null), r
        });
        var i, r, o, s, a, l = Function.prototype.call,
            c = Array.prototype,
            u = Object.prototype,
            h = c.slice,
            d = l.bind(u.toString),
            g = l.bind(u.hasOwnProperty);
        if ((a = g(u, "__defineGetter__")) && (i = l.bind(u.__defineGetter__), r = l.bind(u.__defineSetter__), o = l.bind(u.__lookupGetter__), s = l.bind(u.__lookupSetter__)), 2 != [1, 2].splice(0).length)
            if (function() {
                    function e(e) {
                        var t = new Array(e + 2);
                        return t[0] = t[1] = 0, t
                    }
                    var t, n = [];
                    return n.splice.apply(n, e(20)), n.splice.apply(n, e(26)), t = n.length, n.splice(5, 0, "XXX"), t + 1 == n.length, t + 1 == n.length ? !0 : void 0
                }()) {
                var f = Array.prototype.splice;
                Array.prototype.splice = function(e, t) {
                    return arguments.length ? f.apply(this, [void 0 === e ? 0 : e, void 0 === t ? this.length - e : t].concat(h.call(arguments, 2))) : []
                }
            } else Array.prototype.splice = function(e, t) {
                var n = this.length;
                e > 0 ? e > n && (e = n) : void 0 == e ? e = 0 : 0 > e && (e = Math.max(n + e, 0)), n > e + t || (t = n - e);
                var i = this.slice(e, e + t),
                    r = h.call(arguments, 2),
                    o = r.length;
                if (e === n) o && this.push.apply(this, r);
                else {
                    var s = Math.min(t, n - e),
                        a = e + s,
                        l = a + o - s,
                        c = n - a,
                        u = n - s;
                    if (a > l)
                        for (var d = 0; c > d; ++d) this[l + d] = this[a + d];
                    else if (l > a)
                        for (d = c; d--;) this[l + d] = this[a + d];
                    if (o && e === u) this.length = u, this.push.apply(this, r);
                    else
                        for (this.length = u + o, d = 0; o > d; ++d) this[e + d] = r[d]
                }
                return i
            };
        Array.isArray || (Array.isArray = function(e) {
            return "[object Array]" == d(e)
        });
        var p = Object("a"),
            m = "a" != p[0] || !(0 in p);
        if (Array.prototype.forEach || (Array.prototype.forEach = function(e) {
                var t = _(this),
                    n = m && "[object String]" == d(this) ? this.split("") : t,
                    i = arguments[1],
                    r = -1,
                    o = n.length >>> 0;
                if ("[object Function]" != d(e)) throw new TypeError;
                for (; ++r < o;) r in n && e.call(i, n[r], r, t)
            }), Array.prototype.map || (Array.prototype.map = function(e) {
                var t = _(this),
                    n = m && "[object String]" == d(this) ? this.split("") : t,
                    i = n.length >>> 0,
                    r = Array(i),
                    o = arguments[1];
                if ("[object Function]" != d(e)) throw new TypeError(e + " is not a function");
                for (var s = 0; i > s; s++) s in n && (r[s] = e.call(o, n[s], s, t));
                return r
            }), Array.prototype.filter || (Array.prototype.filter = function(e) {
                var t, n = _(this),
                    i = m && "[object String]" == d(this) ? this.split("") : n,
                    r = i.length >>> 0,
                    o = [],
                    s = arguments[1];
                if ("[object Function]" != d(e)) throw new TypeError(e + " is not a function");
                for (var a = 0; r > a; a++) a in i && (t = i[a], e.call(s, t, a, n) && o.push(t));
                return o
            }), Array.prototype.every || (Array.prototype.every = function(e) {
                var t = _(this),
                    n = m && "[object String]" == d(this) ? this.split("") : t,
                    i = n.length >>> 0,
                    r = arguments[1];
                if ("[object Function]" != d(e)) throw new TypeError(e + " is not a function");
                for (var o = 0; i > o; o++)
                    if (o in n && !e.call(r, n[o], o, t)) return !1;
                return !0
            }), Array.prototype.some || (Array.prototype.some = function(e) {
                var t = _(this),
                    n = m && "[object String]" == d(this) ? this.split("") : t,
                    i = n.length >>> 0,
                    r = arguments[1];
                if ("[object Function]" != d(e)) throw new TypeError(e + " is not a function");
                for (var o = 0; i > o; o++)
                    if (o in n && e.call(r, n[o], o, t)) return !0;
                return !1
            }), Array.prototype.reduce || (Array.prototype.reduce = function(e) {
                var t = _(this),
                    n = m && "[object String]" == d(this) ? this.split("") : t,
                    i = n.length >>> 0;
                if ("[object Function]" != d(e)) throw new TypeError(e + " is not a function");
                if (!i && 1 == arguments.length) throw new TypeError("reduce of empty array with no initial value");
                var r, o = 0;
                if (arguments.length >= 2) r = arguments[1];
                else
                    for (;;) {
                        if (o in n) {
                            r = n[o++];
                            break
                        }
                        if (++o >= i) throw new TypeError("reduce of empty array with no initial value")
                    }
                for (; i > o; o++) o in n && (r = e.call(void 0, r, n[o], o, t));
                return r
            }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(e) {
                var t = _(this),
                    n = m && "[object String]" == d(this) ? this.split("") : t,
                    i = n.length >>> 0;
                if ("[object Function]" != d(e)) throw new TypeError(e + " is not a function");
                if (!i && 1 == arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
                var r, o = i - 1;
                if (arguments.length >= 2) r = arguments[1];
                else
                    for (;;) {
                        if (o in n) {
                            r = n[o--];
                            break
                        }
                        if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value")
                    }
                do o in this && (r = e.call(void 0, r, n[o], o, t)); while (o--);
                return r
            }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function(e) {
                var t = m && "[object String]" == d(this) ? this.split("") : _(this),
                    i = t.length >>> 0;
                if (!i) return -1;
                var r = 0;
                for (arguments.length > 1 && (r = n(arguments[1])), r = r >= 0 ? r : Math.max(0, i + r); i > r; r++)
                    if (r in t && t[r] === e) return r;
                return -1
            }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(e) {
                var t = m && "[object String]" == d(this) ? this.split("") : _(this),
                    i = t.length >>> 0;
                if (!i) return -1;
                var r = i - 1;
                for (arguments.length > 1 && (r = Math.min(r, n(arguments[1]))), r = r >= 0 ? r : i - Math.abs(r); r >= 0; r--)
                    if (r in t && e === t[r]) return r;
                return -1
            }), Object.getPrototypeOf || (Object.getPrototypeOf = function(e) {
                return e.__proto__ || (e.constructor ? e.constructor.prototype : u)
            }), !Object.getOwnPropertyDescriptor) {
            var v = "Object.getOwnPropertyDescriptor called on a non-object: ";
            Object.getOwnPropertyDescriptor = function(e, t) {
                if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError(v + e);
                if (g(e, t)) {
                    var n, i, r;
                    if (n = {
                            enumerable: !0,
                            configurable: !0
                        }, a) {
                        var l = e.__proto__;
                        e.__proto__ = u;
                        var i = o(e, t),
                            r = s(e, t);
                        if (e.__proto__ = l, i || r) return i && (n.get = i), r && (n.set = r), n
                    }
                    return n.value = e[t], n
                }
            }
        }
        if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(e) {
                return Object.keys(e)
            }), !Object.create) {
            var y;
            y = null === Object.prototype.__proto__ ? function() {
                return {
                    __proto__: null
                }
            } : function() {
                var e = {};
                for (var t in e) e[t] = null;
                return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
            }, Object.create = function(e, t) {
                var n;
                if (null === e) n = y();
                else {
                    if ("object" != typeof e) throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
                    var i = function() {};
                    i.prototype = e, n = new i, n.__proto__ = e
                }
                return void 0 !== t && Object.defineProperties(n, t), n
            }
        }
        if (Object.defineProperty) {
            var w = t({}),
                A = "undefined" == typeof document || t(document.createElement("div"));
            if (!w || !A) var C = Object.defineProperty
        }
        if (!Object.defineProperty || C) {
            var F = "Property description must be an object: ",
                E = "Object.defineProperty called on non-object: ",
                b = "getters & setters can not be defined on this javascript engine";
            Object.defineProperty = function(e, t, n) {
                if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError(E + e);
                if ("object" != typeof n && "function" != typeof n || null === n) throw new TypeError(F + n);
                if (C) try {
                    return C.call(Object, e, t, n)
                } catch (l) {}
                if (g(n, "value"))
                    if (a && (o(e, t) || s(e, t))) {
                        var c = e.__proto__;
                        e.__proto__ = u, delete e[t], e[t] = n.value, e.__proto__ = c
                    } else e[t] = n.value;
                else {
                    if (!a) throw new TypeError(b);
                    g(n, "get") && i(e, t, n.get), g(n, "set") && r(e, t, n.set)
                }
                return e
            }
        }
        Object.defineProperties || (Object.defineProperties = function(e, t) {
            for (var n in t) g(t, n) && Object.defineProperty(e, n, t[n]);
            return e
        }), Object.seal || (Object.seal = function(e) {
            return e
        }), Object.freeze || (Object.freeze = function(e) {
            return e
        });
        try {
            Object.freeze(function() {})
        } catch (x) {
            Object.freeze = function(e) {
                return function(t) {
                    return "function" == typeof t ? t : e(t)
                }
            }(Object.freeze)
        }
        if (Object.preventExtensions || (Object.preventExtensions = function(e) {
                return e
            }), Object.isSealed || (Object.isSealed = function() {
                return !1
            }), Object.isFrozen || (Object.isFrozen = function() {
                return !1
            }), Object.isExtensible || (Object.isExtensible = function(e) {
                if (Object(e) === e) throw new TypeError;
                for (var t = ""; g(e, t);) t += "?";
                e[t] = !0;
                var n = g(e, t);
                return delete e[t], n
            }), !Object.keys) {
            var D = !0,
                B = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                k = B.length;
            for (var S in {
                    toString: null
                }) D = !1;
            Object.keys = function R(e) {
                if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.keys called on a non-object");
                var R = [];
                for (var t in e) g(e, t) && R.push(t);
                if (D)
                    for (var n = 0, i = k; i > n; n++) {
                        var r = B[n];
                        g(e, r) && R.push(r)
                    }
                return R
            }
        }
        Date.now || (Date.now = function() {
            return (new Date).getTime()
        });
        var $ = "    \n\f\r  \u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029";
        if (!String.prototype.trim || $.trim()) {
            $ = "[" + $ + "]";
            var T = new RegExp("^" + $ + $ + "*"),
                L = new RegExp($ + $ + "*$");
            String.prototype.trim = function() {
                return String(this).replace(T, "").replace(L, "")
            }
        }
        var _ = function(e) {
            if (null == e) throw new TypeError("can't convert " + e + " to object");
            return Object(e)
        }
    }), ace.define("ace/lib/dom", ["require", "exports", "module"], function(e, t) {
        if ("undefined" != typeof document) {
            var n = "http://www.w3.org/1999/xhtml";
            t.getDocumentHead = function(e) {
                return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement
            }, t.createElement = function(e, t) {
                return document.createElementNS ? document.createElementNS(t || n, e) : document.createElement(e)
            }, t.hasCssClass = function(e, t) {
                var n = e.className.split(/\s+/g);
                return -1 !== n.indexOf(t)
            }, t.addCssClass = function(e, n) {
                t.hasCssClass(e, n) || (e.className += " " + n)
            }, t.removeCssClass = function(e, t) {
                for (var n = e.className.split(/\s+/g);;) {
                    var i = n.indexOf(t);
                    if (-1 == i) break;
                    n.splice(i, 1)
                }
                e.className = n.join(" ")
            }, t.toggleCssClass = function(e, t) {
                for (var n = e.className.split(/\s+/g), i = !0;;) {
                    var r = n.indexOf(t);
                    if (-1 == r) break;
                    i = !1, n.splice(r, 1)
                }
                return i && n.push(t), e.className = n.join(" "), i
            }, t.setCssClass = function(e, n, i) {
                i ? t.addCssClass(e, n) : t.removeCssClass(e, n)
            }, t.hasCssString = function(e, t) {
                var n, i = 0;
                if (t = t || document, t.createStyleSheet && (n = t.styleSheets)) {
                    for (; i < n.length;)
                        if (n[i++].owningElement.id === e) return !0
                } else if (n = t.getElementsByTagName("style"))
                    for (; i < n.length;)
                        if (n[i++].id === e) return !0;
                return !1
            }, t.importCssString = function(e, i, r) {
                if (r = r || document, i && t.hasCssString(i, r)) return null;
                var o;
                r.createStyleSheet ? (o = r.createStyleSheet(), o.cssText = e, i && (o.owningElement.id = i)) : (o = r.createElementNS ? r.createElementNS(n, "style") : r.createElement("style"), o.appendChild(r.createTextNode(e)), i && (o.id = i), t.getDocumentHead(r).appendChild(o))
            }, t.importCssStylsheet = function(e, n) {
                if (n.createStyleSheet) n.createStyleSheet(e);
                else {
                    var i = t.createElement("link");
                    i.rel = "stylesheet", i.href = e, t.getDocumentHead(n).appendChild(i)
                }
            }, t.getInnerWidth = function(e) {
                return parseInt(t.computedStyle(e, "paddingLeft"), 10) + parseInt(t.computedStyle(e, "paddingRight"), 10) + e.clientWidth
            }, t.getInnerHeight = function(e) {
                return parseInt(t.computedStyle(e, "paddingTop"), 10) + parseInt(t.computedStyle(e, "paddingBottom"), 10) + e.clientHeight
            }, void 0 !== window.pageYOffset ? (t.getPageScrollTop = function() {
                return window.pageYOffset
            }, t.getPageScrollLeft = function() {
                return window.pageXOffset
            }) : (t.getPageScrollTop = function() {
                return document.body.scrollTop
            }, t.getPageScrollLeft = function() {
                return document.body.scrollLeft
            }), t.computedStyle = window.getComputedStyle ? function(e, t) {
                return t ? (window.getComputedStyle(e, "") || {})[t] || "" : window.getComputedStyle(e, "") || {}
            } : function(e, t) {
                return t ? e.currentStyle[t] : e.currentStyle
            }, t.scrollbarWidth = function(e) {
                var n = t.createElement("ace_inner");
                n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
                var i = t.createElement("ace_outer"),
                    r = i.style;
                r.position = "absolute", r.left = "-10000px", r.overflow = "hidden", r.width = "200px", r.minWidth = "0px", r.height = "150px", r.display = "block", i.appendChild(n);
                var o = e.documentElement;
                o.appendChild(i);
                var s = n.offsetWidth;
                r.overflow = "scroll";
                var a = n.offsetWidth;
                return s == a && (a = i.clientWidth), o.removeChild(i), s - a
            }, t.setInnerHtml = function(e, t) {
                var n = e.cloneNode(!1);
                return n.innerHTML = t, e.parentNode.replaceChild(n, e), n
            }, "textContent" in document.documentElement ? (t.setInnerText = function(e, t) {
                e.textContent = t
            }, t.getInnerText = function(e) {
                return e.textContent
            }) : (t.setInnerText = function(e, t) {
                e.innerText = t
            }, t.getInnerText = function(e) {
                return e.innerText
            }), t.getParentWindow = function(e) {
                return e.defaultView || e.parentWindow
            }
        }
    }), ace.define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent", "ace/lib/dom"], function(e, t) {
        function n(e, t, n) {
            var a = 0;
            if (a = !r.isOpera || "KeyboardEvent" in window || !r.isMac ? 0 | (t.ctrlKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.metaKey ? 8 : 0) : 0 | (t.metaKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.ctrlKey ? 8 : 0), !r.isMac && o) {
                if ((o[91] || o[92]) && (a |= 8), o.altGr) {
                    if (3 == (3 & a)) return;
                    o.altGr = 0
                }
                if (18 === n || 17 === n) {
                    var l = t.location || t.keyLocation;
                    if (17 === n && 1 === l) s = t.timeStamp;
                    else if (18 === n && 3 === a && 2 === l) {
                        var c = -s;
                        s = t.timeStamp, c += s, 3 > c && (o.altGr = !0)
                    }
                }
            }
            if (n in i.MODIFIER_KEYS) {
                switch (i.MODIFIER_KEYS[n]) {
                    case "Alt":
                        a = 2;
                        break;
                    case "Shift":
                        a = 4;
                        break;
                    case "Ctrl":
                        a = 1;
                        break;
                    default:
                        a = 8
                }
                n = 0
            }
            return 8 & a && (91 === n || 93 === n) && (n = 0), a || 13 !== n || !t.location && 3 !== t.keyLocation || (e(t, a, -n), !t.defaultPrevented) ? a || n in i.FUNCTION_KEYS || n in i.PRINTABLE_KEYS ? e(t, a, n) : !1 : void 0
        } {
            var i = e("./keys"),
                r = e("./useragent");
            e("./dom")
        }
        t.addListener = function(e, t, n) {
            if (e.addEventListener) return e.addEventListener(t, n, !1);
            if (e.attachEvent) {
                var i = function() {
                    n.call(e, window.event)
                };
                n._wrapper = i, e.attachEvent("on" + t, i)
            }
        }, t.removeListener = function(e, t, n) {
            return e.removeEventListener ? e.removeEventListener(t, n, !1) : void(e.detachEvent && e.detachEvent("on" + t, n._wrapper || n))
        }, t.stopEvent = function(e) {
            return t.stopPropagation(e), t.preventDefault(e), !1
        }, t.stopPropagation = function(e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        }, t.preventDefault = function(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        }, t.getButton = function(e) {
            return "dblclick" == e.type ? 0 : "contextmenu" == e.type || e.ctrlKey && r.isMac ? 2 : e.preventDefault ? e.button : {
                1: 0,
                2: 2,
                4: 1
            }[e.button]
        }, t.capture = function(e, n, i) {
            function r(e) {
                n && n(e), i && i(e), t.removeListener(document, "mousemove", n, !0), t.removeListener(document, "mouseup", r, !0), t.removeListener(document, "dragstart", r, !0)
            }
            t.addListener(document, "mousemove", n, !0), t.addListener(document, "mouseup", r, !0), t.addListener(document, "dragstart", r, !0)
        }, t.addMouseWheelListener = function(e, n) {
            if ("onmousewheel" in e) {
                var i = 8;
                t.addListener(e, "mousewheel", function(e) {
                    void 0 !== e.wheelDeltaX ? (e.wheelX = -e.wheelDeltaX / i, e.wheelY = -e.wheelDeltaY / i) : (e.wheelX = 0, e.wheelY = -e.wheelDelta / i), n(e)
                })
            } else "onwheel" in e ? t.addListener(e, "wheel", function(e) {
                e.wheelX = 5 * (e.deltaX || 0), e.wheelY = 5 * (e.deltaY || 0), n(e)
            }) : t.addListener(e, "DOMMouseScroll", function(e) {
                e.axis && e.axis == e.HORIZONTAL_AXIS ? (e.wheelX = 5 * (e.detail || 0), e.wheelY = 0) : (e.wheelX = 0, e.wheelY = 5 * (e.detail || 0)), n(e)
            })
        }, t.addMultiMouseDownListener = function(e, n, i, o) {
            var s, a, l, c = 0,
                u = {
                    2: "dblclick",
                    3: "tripleclick",
                    4: "quadclick"
                };
            t.addListener(e, "mousedown", function(e) {
                if (0 != t.getButton(e) ? c = 0 : e.detail > 1 ? (c++, c > 4 && (c = 1)) : c = 1, r.isIE) {
                    var n = Math.abs(e.clientX - s) > 5 || Math.abs(e.clientY - a) > 5;
                    n && (c = 1), 1 == c && (s = e.clientX, a = e.clientY)
                }
                if (i[o]("mousedown", e), c > 4) c = 0;
                else if (c > 1) return i[o](u[c], e)
            }), r.isOldIE && t.addListener(e, "dblclick", function(e) {
                c = 2, l && clearTimeout(l), l = setTimeout(function() {
                    l = null
                }, n[c - 1] || 600), i[o]("mousedown", e), i[o](u[c], e)
            })
        };
        var o = null,
            s = 0;
        if (t.addCommandKeyListener = function(e, i) {
                var s = t.addListener;
                if (r.isOldGecko || r.isOpera && !("KeyboardEvent" in window)) {
                    var a = null;
                    s(e, "keydown", function(e) {
                        a = e.keyCode
                    }), s(e, "keypress", function(e) {
                        return n(i, e, a)
                    })
                } else {
                    var l = null;
                    s(e, "keydown", function(e) {
                        o[e.keyCode] = !0;
                        var t = n(i, e, e.keyCode);
                        return l = e.defaultPrevented, t
                    }), s(e, "keypress", function(e) {
                        l && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && (t.stopEvent(e), l = null)
                    }), s(e, "keyup", function(e) {
                        o[e.keyCode] = null
                    }), o || (o = Object.create(null), s(window, "focus", function() {
                        o = Object.create(null)
                    }))
                }
            }, window.postMessage && !r.isOldIE) {
            var a = 1;
            t.nextTick = function(e, n) {
                n = n || window;
                var i = "zero-timeout-message-" + a;
                t.addListener(n, "message", function r(o) {
                    o.data == i && (t.stopPropagation(o), t.removeListener(n, "message", r), e())
                }), n.postMessage(i, "*")
            }
        }
        t.nextFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame, t.nextFrame = t.nextFrame ? t.nextFrame.bind(window) : function(e) {
            setTimeout(e, 17)
        }
    }), ace.define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], function(e, t) {
        var n = e("./oop"),
            i = function() {
                var e = {
                    MODIFIER_KEYS: {
                        16: "Shift",
                        17: "Ctrl",
                        18: "Alt",
                        224: "Meta"
                    },
                    KEY_MODS: {
                        ctrl: 1,
                        alt: 2,
                        option: 2,
                        shift: 4,
                        meta: 8,
                        command: 8,
                        cmd: 8
                    },
                    FUNCTION_KEYS: {
                        8: "Backspace",
                        9: "Tab",
                        13: "Return",
                        19: "Pause",
                        27: "Esc",
                        32: "Space",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "Left",
                        38: "Up",
                        39: "Right",
                        40: "Down",
                        44: "Print",
                        45: "Insert",
                        46: "Delete",
                        96: "Numpad0",
                        97: "Numpad1",
                        98: "Numpad2",
                        99: "Numpad3",
                        100: "Numpad4",
                        101: "Numpad5",
                        102: "Numpad6",
                        103: "Numpad7",
                        104: "Numpad8",
                        105: "Numpad9",
                        "-13": "NumpadEnter",
                        112: "F1",
                        113: "F2",
                        114: "F3",
                        115: "F4",
                        116: "F5",
                        117: "F6",
                        118: "F7",
                        119: "F8",
                        120: "F9",
                        121: "F10",
                        122: "F11",
                        123: "F12",
                        144: "Numlock",
                        145: "Scrolllock"
                    },
                    PRINTABLE_KEYS: {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        61: "=",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        107: "+",
                        109: "-",
                        110: ".",
                        188: ",",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'"
                    }
                };
                for (var t in e.FUNCTION_KEYS) {
                    var i = e.FUNCTION_KEYS[t].toLowerCase();
                    e[i] = parseInt(t, 10)
                }
                return n.mixin(e, e.MODIFIER_KEYS), n.mixin(e, e.PRINTABLE_KEYS), n.mixin(e, e.FUNCTION_KEYS), e.enter = e["return"], e.escape = e.esc, e.del = e["delete"], e[173] = "-", e
            }();
        n.mixin(t, i), t.keyCodeToString = function(e) {
            return (i[e] || String.fromCharCode(e)).toLowerCase()
        }
    }), ace.define("ace/lib/oop", ["require", "exports", "module"], function(e, t) {
        t.inherits = function() {
            var e = function() {};
            return function(t, n) {
                e.prototype = n.prototype, t.super_ = n.prototype, t.prototype = new e, t.prototype.constructor = t
            }
        }(), t.mixin = function(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }, t.implement = function(e, n) {
            t.mixin(e, n)
        }
    }), ace.define("ace/lib/useragent", ["require", "exports", "module"], function(e, t) {
        if (t.OS = {
                LINUX: "LINUX",
                MAC: "MAC",
                WINDOWS: "WINDOWS"
            }, t.getOS = function() {
                return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS
            }, "object" == typeof navigator) {
            var n = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
                i = navigator.userAgent;
            t.isWin = "win" == n, t.isMac = "mac" == n, t.isLinux = "linux" == n, t.isIE = ("Microsoft Internet Explorer" == navigator.appName || navigator.appName.indexOf("MSAppHost") >= 0) && parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = window.controllers && "Gecko" === window.navigator.product, t.isOldGecko = t.isGecko && parseInt((navigator.userAgent.match(/rv\:(\d+)/) || [])[1], 10) < 4, t.isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera), t.isWebKit = parseFloat(i.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(i.split(" Chrome/")[1]) || void 0, t.isAIR = i.indexOf("AdobeAIR") >= 0, t.isIPad = i.indexOf("iPad") >= 0, t.isTouchPad = i.indexOf("TouchPad") >= 0
        }
    }), ace.define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config"], function(e, t) {
        e("./lib/fixoldbrowsers");
        var n = e("./lib/oop"),
            i = e("./lib/dom"),
            r = e("./lib/lang"),
            o = e("./lib/useragent"),
            s = e("./keyboard/textinput").TextInput,
            a = e("./mouse/mouse_handler").MouseHandler,
            l = e("./mouse/fold_handler").FoldHandler,
            c = e("./keyboard/keybinding").KeyBinding,
            u = e("./edit_session").EditSession,
            h = e("./search").Search,
            d = e("./range").Range,
            g = e("./lib/event_emitter").EventEmitter,
            f = e("./commands/command_manager").CommandManager,
            p = e("./commands/default_commands").commands,
            m = e("./config"),
            v = function(e, t) {
                var n = e.getContainerElement();
                this.container = n, this.renderer = e, this.commands = new f(o.isMac ? "mac" : "win", p), this.textInput = new s(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.keyBinding = new c(this), this.$mouseHandler = new a(this), new l(this), this.$blockScrolling = 0, this.$search = (new h).set({
                    wrap: !0
                }), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = r.delayedCall(function() {
                    this._signal("input", {}), this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart()
                }.bind(this)), this.on("change", function(e, t) {
                    t._$emitInputEvent.schedule(31)
                }), this.setSession(t || new u("")), m.resetOptions(this), m._emit("editor", this)
            };
        (function() {
            n.implement(this, g), this.$initOperationListeners = function() {
                function e(e) {
                    return e[e.length - 1]
                }
                this.selections = [], this.commands.on("exec", function(t) {
                    this.startOperation(t);
                    var n = t.command;
                    if ("fileJump" == n.group) {
                        var i = this.prevOp;
                        i && "fileJump" == i.command.group || (this.lastFileJumpPos = e(this.selections))
                    } else this.lastFileJumpPos = null
                }.bind(this), !0), this.commands.on("afterExec", function(e) {
                    var t = e.command;
                    return "fileJump" == t.group && this.lastFileJumpPos && !this.curOp.selectionChanged ? void this.selection.fromJSON(this.lastFileJumpPos) : void this.endOperation(e)
                }.bind(this), !0), this.$opResetTimer = r.delayedCall(this.endOperation.bind(this)), this.on("change", function() {
                    this.curOp || this.startOperation(), this.curOp.docChanged = !0
                }.bind(this), !0), this.on("changeSelection", function() {
                    this.curOp || this.startOperation(), this.curOp.selectionChanged = !0
                }.bind(this), !0)
            }, this.curOp = null, this.prevOp = {}, this.startOperation = function(e) {
                if (this.curOp) {
                    if (!e || this.curOp.command) return;
                    this.prevOp = this.curOp
                }
                e || (this.previousCommand = null, e = {}), this.$opResetTimer.schedule(), this.curOp = {
                    command: e.command || {},
                    args: e.args
                }, this.selections.push(this.selection.toJSON())
            }, this.endOperation = function() {
                this.curOp && (this.prevOp = this.curOp, this.curOp = null)
            }, this.$historyTracker = function(e) {
                if (this.$mergeUndoDeltas) {
                    var t = this.prevOp,
                        n = ["backspace", "del", "insertstring"],
                        i = t.command && e.command.name == t.command.name;
                    if ("insertstring" == e.command.name) {
                        var r = e.args;
                        void 0 === this.mergeNextCommand && (this.mergeNextCommand = !0), i = i && this.mergeNextCommand && (!/\s/.test(r) || /\s/.test(t.args)), this.mergeNextCommand = !0
                    } else i = i && -1 !== n.indexOf(e.command.name);
                    "always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3 && (i = !1), i ? this.session.mergeUndoDeltas = !0 : -1 !== n.indexOf(e.command.name) && (this.sequenceStartTime = Date.now())
                }
            }, this.setKeyboardHandler = function(e) {
                if (e)
                    if ("string" == typeof e) {
                        this.$keybindingId = e;
                        var t = this;
                        m.loadModule(["keybinding", e], function(n) {
                            t.$keybindingId == e && t.keyBinding.setKeyboardHandler(n && n.handler)
                        })
                    } else this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e);
                else this.keyBinding.setKeyboardHandler(null)
            }, this.getKeyboardHandler = function() {
                return this.keyBinding.getKeyboardHandler()
            }, this.setSession = function(e) {
                if (this.session != e) {
                    if (this.session) {
                        var t = this.session;
                        this.session.removeEventListener("change", this.$onDocumentChange), this.session.removeEventListener("changeMode", this.$onChangeMode), this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.session.removeEventListener("changeTabSize", this.$onChangeTabSize), this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode), this.session.removeEventListener("onChangeFold", this.$onChangeFold), this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker), this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation), this.session.removeEventListener("changeOverwrite", this.$onCursorChange), this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange), this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);
                        var n = this.session.getSelection();
                        n.removeEventListener("changeCursor", this.$onCursorChange), n.removeEventListener("changeSelection", this.$onSelectionChange)
                    }
                    this.session = e, this.$onDocumentChange = this.onDocumentChange.bind(this), e.addEventListener("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.addEventListener("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.addEventListener("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.addEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.addEventListener("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.addEventListener("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.addEventListener("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.addEventListener("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.addEventListener("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.addEventListener("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull(), this._emit("changeSession", {
                        session: e,
                        oldSession: t
                    })
                }
            }, this.getSession = function() {
                return this.session
            }, this.setValue = function(e, t) {
                return this.session.doc.setValue(e), t ? 1 == t ? this.navigateFileEnd() : -1 == t && this.navigateFileStart() : this.selectAll(), e
            }, this.getValue = function() {
                return this.session.getValue()
            }, this.getSelection = function() {
                return this.selection
            }, this.resize = function(e) {
                this.renderer.onResize(e)
            }, this.setTheme = function(e) {
                this.renderer.setTheme(e)
            }, this.getTheme = function() {
                return this.renderer.getTheme()
            }, this.setStyle = function(e) {
                this.renderer.setStyle(e)
            }, this.unsetStyle = function(e) {
                this.renderer.unsetStyle(e)
            }, this.getFontSize = function() {
                return this.getOption("fontSize") || i.computedStyle(this.container, "fontSize")
            }, this.setFontSize = function(e) {
                this.setOption("fontSize", e)
            }, this.$highlightBrackets = function() {
                if (this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null), !this.$highlightPending) {
                    var e = this;
                    this.$highlightPending = !0, setTimeout(function() {
                        e.$highlightPending = !1;
                        var t = e.session.findMatchingBracket(e.getCursorPosition());
                        if (t) var n = new d(t.row, t.column, t.row, t.column + 1);
                        else if (e.session.$mode.getMatching) var n = e.session.$mode.getMatching(e.session);
                        n && (e.session.$bracketHighlight = e.session.addMarker(n, "ace_bracket", "text"))
                    }, 50)
                }
            }, this.focus = function() {
                var e = this;
                setTimeout(function() {
                    e.textInput.focus()
                }), this.textInput.focus()
            }, this.isFocused = function() {
                return this.textInput.isFocused()
            }, this.blur = function() {
                this.textInput.blur()
            }, this.onFocus = function() {
                this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus"))
            }, this.onBlur = function() {
                this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur"))
            }, this.$cursorChange = function() {
                this.renderer.updateCursor()
            }, this.onDocumentChange = function(e) {
                var t, n = e.data,
                    i = n.range;
                t = i.start.row == i.end.row && "insertLines" != n.action && "removeLines" != n.action ? i.end.row : 1 / 0, this.renderer.updateLines(i.start.row, t), this._emit("change", e), this.$cursorChange()
            }, this.onTokenizerUpdate = function(e) {
                var t = e.data;
                this.renderer.updateLines(t.first, t.last)
            }, this.onScrollTopChange = function() {
                this.renderer.scrollToY(this.session.getScrollTop())
            }, this.onScrollLeftChange = function() {
                this.renderer.scrollToX(this.session.getScrollLeft())
            }, this.onCursorChange = function() {
                this.$cursorChange(), this.$blockScrolling || this.renderer.scrollCursorIntoView(), this.$highlightBrackets(), this.$updateHighlightActiveLine(), this._emit("changeSelection")
            }, this.$updateHighlightActiveLine = function() {
                var e, t = this.getSession();
                if (this.$highlightActiveLine && ("line" == this.$selectionStyle && this.selection.isMultiLine() || (e = this.getCursorPosition()), this.renderer.$maxLines && 1 === this.session.getLength() && (e = !1)), t.$highlightLineMarker && !e) t.removeMarker(t.$highlightLineMarker.id), t.$highlightLineMarker = null;
                else if (!t.$highlightLineMarker && e) {
                    var n = new d(e.row, e.column, e.row, 1 / 0);
                    n.id = t.addMarker(n, "ace_active-line", "screenLine"), t.$highlightLineMarker = n
                } else e && (t.$highlightLineMarker.start.row = e.row, t.$highlightLineMarker.end.row = e.row, t.$highlightLineMarker.start.column = e.column, t._emit("changeBackMarker"))
            }, this.onSelectionChange = function() {
                var e = this.session;
                if (e.$selectionMarker && e.removeMarker(e.$selectionMarker), e.$selectionMarker = null, this.selection.isEmpty()) this.$updateHighlightActiveLine();
                else {
                    var t = this.selection.getRange(),
                        n = this.getSelectionStyle();
                    e.$selectionMarker = e.addMarker(t, "ace_selection", n)
                }
                var i = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
                this.session.highlight(i), this._emit("changeSelection")
            }, this.$getSelectionHighLightRegexp = function() {
                var e = this.session,
                    t = this.getSelectionRange();
                if (!t.isEmpty() && !t.isMultiLine()) {
                    var n = t.start.column - 1,
                        i = t.end.column + 1,
                        r = e.getLine(t.start.row),
                        o = r.length,
                        s = r.substring(Math.max(n, 0), Math.min(i, o));
                    if (!(n >= 0 && /^[\w\d]/.test(s) || o >= i && /[\w\d]$/.test(s)) && (s = r.substring(t.start.column, t.end.column), /^[\w\d]+$/.test(s))) {
                        var a = this.$search.$assembleRegExp({
                            wholeWord: !0,
                            caseSensitive: !0,
                            needle: s
                        });
                        return a
                    }
                }
            }, this.onChangeFrontMarker = function() {
                this.renderer.updateFrontMarkers()
            }, this.onChangeBackMarker = function() {
                this.renderer.updateBackMarkers()
            }, this.onChangeBreakpoint = function() {
                this.renderer.updateBreakpoints()
            }, this.onChangeAnnotation = function() {
                this.renderer.setAnnotations(this.session.getAnnotations())
            }, this.onChangeMode = function(e) {
                this.renderer.updateText(), this._emit("changeMode", e)
            }, this.onChangeWrapLimit = function() {
                this.renderer.updateFull()
            }, this.onChangeWrapMode = function() {
                this.renderer.onResize(!0)
            }, this.onChangeFold = function() {
                this.$updateHighlightActiveLine(), this.renderer.updateFull()
            }, this.getSelectedText = function() {
                return this.session.getTextRange(this.getSelectionRange())
            }, this.getCopyText = function() {
                var e = this.getSelectedText();
                return this._signal("copy", e), e
            }, this.onCopy = function() {
                this.commands.exec("copy", this)
            }, this.onCut = function() {
                this.commands.exec("cut", this)
            }, this.onPaste = function(e) {
                this.$readOnly || (this._emit("paste", e), this.insert(e))
            }, this.execCommand = function(e, t) {
                this.commands.exec(e, this, t)
            }, this.insert = function(e) {
                var t = this.session,
                    n = t.getMode(),
                    i = this.getCursorPosition();
                if (this.getBehavioursEnabled()) {
                    var r = n.transformAction(t.getState(i.row), "insertion", this, t, e);
                    r && (e !== r.text && (this.session.mergeUndoDeltas = !1, this.$mergeNextCommand = !1), e = r.text)
                }
                if ("  " == e && (e = this.session.getTabString()), this.selection.isEmpty()) {
                    if (this.session.getOverwrite()) {
                        var o = new d.fromPoints(i, i);
                        o.end.column += e.length, this.session.remove(o)
                    }
                } else {
                    var o = this.getSelectionRange();
                    i = this.session.remove(o), this.clearSelection()
                }
                if ("\n" == e || "\r\n" == e) {
                    var s = t.getLine(i.row);
                    if (i.column > s.search(/\S|$/)) {
                        var a = s.substr(i.column).search(/\S|$/);
                        t.doc.removeInLine(i.row, i.column, i.column + a)
                    }
                }
                this.clearSelection(); {
                    var l = i.column,
                        c = t.getState(i.row),
                        s = t.getLine(i.row),
                        u = n.checkOutdent(c, s, e);
                    t.insert(i, e)
                }
                if (r && r.selection && this.selection.setSelectionRange(2 == r.selection.length ? new d(i.row, l + r.selection[0], i.row, l + r.selection[1]) : new d(i.row + r.selection[0], r.selection[1], i.row + r.selection[2], r.selection[3])), t.getDocument().isNewLine(e)) {
                    var h = n.getNextLineIndent(c, s.slice(0, i.column), t.getTabString());
                    t.insert({
                        row: i.row + 1,
                        column: 0
                    }, h)
                }
                u && n.autoOutdent(c, t, i.row)
            }, this.onTextInput = function(e) {
                this.keyBinding.onTextInput(e)
            }, this.onCommandKey = function(e, t, n) {
                this.keyBinding.onCommandKey(e, t, n)
            }, this.setOverwrite = function(e) {
                this.session.setOverwrite(e)
            }, this.getOverwrite = function() {
                return this.session.getOverwrite()
            }, this.toggleOverwrite = function() {
                this.session.toggleOverwrite()
            }, this.setScrollSpeed = function(e) {
                this.setOption("scrollSpeed", e)
            }, this.getScrollSpeed = function() {
                return this.getOption("scrollSpeed")
            }, this.setDragDelay = function(e) {
                this.setOption("dragDelay", e)
            }, this.getDragDelay = function() {
                return this.getOption("dragDelay")
            }, this.setSelectionStyle = function(e) {
                this.setOption("selectionStyle", e)
            }, this.getSelectionStyle = function() {
                return this.getOption("selectionStyle")
            }, this.setHighlightActiveLine = function(e) {
                this.setOption("highlightActiveLine", e)
            }, this.getHighlightActiveLine = function() {
                return this.getOption("highlightActiveLine")
            }, this.setHighlightGutterLine = function(e) {
                this.setOption("highlightGutterLine", e)
            }, this.getHighlightGutterLine = function() {
                return this.getOption("highlightGutterLine")
            }, this.setHighlightSelectedWord = function(e) {
                this.setOption("highlightSelectedWord", e)
            }, this.getHighlightSelectedWord = function() {
                return this.$highlightSelectedWord
            }, this.setAnimatedScroll = function(e) {
                this.renderer.setAnimatedScroll(e)
            }, this.getAnimatedScroll = function() {
                return this.renderer.getAnimatedScroll()
            }, this.setShowInvisibles = function(e) {
                this.renderer.setShowInvisibles(e)
            }, this.getShowInvisibles = function() {
                return this.renderer.getShowInvisibles()
            }, this.setDisplayIndentGuides = function(e) {
                this.renderer.setDisplayIndentGuides(e)
            }, this.getDisplayIndentGuides = function() {
                return this.renderer.getDisplayIndentGuides()
            }, this.setShowPrintMargin = function(e) {
                this.renderer.setShowPrintMargin(e)
            }, this.getShowPrintMargin = function() {
                return this.renderer.getShowPrintMargin()
            }, this.setPrintMarginColumn = function(e) {
                this.renderer.setPrintMarginColumn(e)
            }, this.getPrintMarginColumn = function() {
                return this.renderer.getPrintMarginColumn()
            }, this.setReadOnly = function(e) {
                this.setOption("readOnly", e)
            }, this.getReadOnly = function() {
                return this.getOption("readOnly")
            }, this.setBehavioursEnabled = function(e) {
                this.setOption("behavioursEnabled", e)
            }, this.getBehavioursEnabled = function() {
                return this.getOption("behavioursEnabled")
            }, this.setWrapBehavioursEnabled = function(e) {
                this.setOption("wrapBehavioursEnabled", e)
            }, this.getWrapBehavioursEnabled = function() {
                return this.getOption("wrapBehavioursEnabled")
            }, this.setShowFoldWidgets = function(e) {
                this.setOption("showFoldWidgets", e)
            }, this.getShowFoldWidgets = function() {
                return this.getOption("showFoldWidgets")
            }, this.setFadeFoldWidgets = function(e) {
                this.setOption("fadeFoldWidgets", e)
            }, this.getFadeFoldWidgets = function() {
                return this.getOption("fadeFoldWidgets")
            }, this.remove = function(e) {
                this.selection.isEmpty() && ("left" == e ? this.selection.selectLeft() : this.selection.selectRight());
                var t = this.getSelectionRange();
                if (this.getBehavioursEnabled()) {
                    var n = this.session,
                        i = n.getState(t.start.row),
                        r = n.getMode().transformAction(i, "deletion", this, n, t);
                    if (0 == t.end.column) {
                        var o = n.getTextRange(t);
                        if ("\n" == o[o.length - 1]) {
                            var s = n.getLine(t.end.row);
                            /^\s+$/.test(s) && (t.end.column = s.length)
                        }
                    }
                    r && (t = r)
                }
                this.session.remove(t), this.clearSelection()
            }, this.removeWordRight = function() {
                this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
            }, this.removeWordLeft = function() {
                this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
            }, this.removeToLineStart = function() {
                this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection()
            }, this.removeToLineEnd = function() {
                this.selection.isEmpty() && this.selection.selectLineEnd();
                var e = this.getSelectionRange();
                e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection()
            }, this.splitLine = function() {
                this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
                var e = this.getCursorPosition();
                this.insert("\n"), this.moveCursorToPosition(e)
            }, this.transposeLetters = function() {
                if (this.selection.isEmpty()) {
                    var e = this.getCursorPosition(),
                        t = e.column;
                    if (0 !== t) {
                        var n, i, r = this.session.getLine(e.row);
                        t < r.length ? (n = r.charAt(t) + r.charAt(t - 1), i = new d(e.row, t - 1, e.row, t + 1)) : (n = r.charAt(t - 1) + r.charAt(t - 2), i = new d(e.row, t - 2, e.row, t)), this.session.replace(i, n)
                    }
                }
            }, this.toLowerCase = function() {
                var e = this.getSelectionRange();
                this.selection.isEmpty() && this.selection.selectWord();
                var t = this.getSelectionRange(),
                    n = this.session.getTextRange(t);
                this.session.replace(t, n.toLowerCase()), this.selection.setSelectionRange(e)
            }, this.toUpperCase = function() {
                var e = this.getSelectionRange();
                this.selection.isEmpty() && this.selection.selectWord();
                var t = this.getSelectionRange(),
                    n = this.session.getTextRange(t);
                this.session.replace(t, n.toUpperCase()), this.selection.setSelectionRange(e)
            }, this.indent = function() {
                var e = this.session,
                    t = this.getSelectionRange();
                if (t.start.row < t.end.row) {
                    var n = this.$getSelectedRows();
                    return void e.indentRows(n.first, n.last, " ")
                }
                if (t.start.column < t.end.column) {
                    var i = e.getTextRange(t);
                    if (!/^\s+$/.test(i)) {
                        var n = this.$getSelectedRows();
                        return void e.indentRows(n.first, n.last, "  ")
                    }
                }
                var o = e.getLine(t.start.row),
                    s = t.start,
                    a = e.getTabSize(),
                    l = e.documentToScreenColumn(s.row, s.column);
                if (this.session.getUseSoftTabs()) var c = a - l % a,
                    u = r.stringRepeat(" ", c);
                else {
                    for (var c = l % a;
                        " " == o[t.start.column] && c;) t.start.column--, c--;
                    this.selection.setSelectionRange(t), u = "  "
                }
                return this.insert(u)
            }, this.blockIndent = function() {
                var e = this.$getSelectedRows();
                this.session.indentRows(e.first, e.last, " ")
            }, this.blockOutdent = function() {
                var e = this.session.getSelection();
                this.session.outdentRows(e.getRange())
            }, this.sortLines = function() {
                var e = this.$getSelectedRows(),
                    t = this.session,
                    n = [];
                for (r = e.first; r <= e.last; r++) n.push(t.getLine(r));
                n.sort(function(e, t) {
                    return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0
                });
                for (var i = new d(0, 0, 0, 0), r = e.first; r <= e.last; r++) {
                    var o = t.getLine(r);
                    i.start.row = r, i.end.row = r, i.end.column = o.length, t.replace(i, n[r - e.first])
                }
            }, this.toggleCommentLines = function() {
                var e = this.session.getState(this.getCursorPosition().row),
                    t = this.$getSelectedRows();
                this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last)
            }, this.toggleBlockComment = function() {
                var e = this.getCursorPosition(),
                    t = this.session.getState(e.row),
                    n = this.getSelectionRange();
                this.session.getMode().toggleBlockComment(t, this.session, n, e)
            }, this.getNumberAt = function(e, t) {
                var n = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
                n.lastIndex = 0;
                for (var i = this.session.getLine(e); n.lastIndex < t;) {
                    var r = n.exec(i);
                    if (r.index <= t && r.index + r[0].length >= t) {
                        var o = {
                            value: r[0],
                            start: r.index,
                            end: r.index + r[0].length
                        };
                        return o
                    }
                }
                return null
            }, this.modifyNumber = function(e) {
                var t = this.selection.getCursor().row,
                    n = this.selection.getCursor().column,
                    i = new d(t, n - 1, t, n),
                    r = this.session.getTextRange(i);
                if (!isNaN(parseFloat(r)) && isFinite(r)) {
                    var o = this.getNumberAt(t, n);
                    if (o) {
                        var s = o.value.indexOf(".") >= 0 ? o.start + o.value.indexOf(".") + 1 : o.end,
                            a = o.start + o.value.length - s,
                            l = parseFloat(o.value);
                        l *= Math.pow(10, a), e *= s !== o.end && s > n ? Math.pow(10, o.end - n - 1) : Math.pow(10, o.end - n), l += e, l /= Math.pow(10, a);
                        var c = l.toFixed(a),
                            u = new d(t, o.start, t, o.end);
                        this.session.replace(u, c), this.moveCursorTo(t, Math.max(o.start + 1, n + c.length - o.value.length))
                    }
                }
            }, this.removeLines = function() {
                var e, t = this.$getSelectedRows();
                e = 0 === t.first || t.last + 1 < this.session.getLength() ? new d(t.first, 0, t.last + 1, 0) : new d(t.first - 1, this.session.getLine(t.first - 1).length, t.last, this.session.getLine(t.last).length), this.session.remove(e), this.clearSelection()
            }, this.duplicateSelection = function() {
                var e = this.selection,
                    t = this.session,
                    n = e.getRange(),
                    i = e.isBackwards();
                if (n.isEmpty()) {
                    var r = n.start.row;
                    t.duplicateLines(r, r)
                } else {
                    var o = i ? n.start : n.end,
                        s = t.insert(o, t.getTextRange(n), !1);
                    n.start = o, n.end = s, e.setSelectionRange(n, i)
                }
            }, this.moveLinesDown = function() {
                this.$moveLines(function(e, t) {
                    return this.session.moveLinesDown(e, t)
                })
            }, this.moveLinesUp = function() {
                this.$moveLines(function(e, t) {
                    return this.session.moveLinesUp(e, t)
                })
            }, this.moveText = function(e, t, n) {
                return this.session.moveText(e, t, n)
            }, this.copyLinesUp = function() {
                this.$moveLines(function(e, t) {
                    return this.session.duplicateLines(e, t), 0
                })
            }, this.copyLinesDown = function() {
                this.$moveLines(function(e, t) {
                    return this.session.duplicateLines(e, t)
                })
            }, this.$moveLines = function(e) {
                var t = this.selection;
                if (!t.inMultiSelectMode || this.inVirtualSelectionMode) {
                    var n = t.toOrientedRange(),
                        i = this.$getSelectedRows(n),
                        r = e.call(this, i.first, i.last);
                    n.moveBy(r, 0), t.fromOrientedRange(n)
                } else {
                    var o = t.rangeList.ranges;
                    t.rangeList.detach(this.session);
                    for (var s = o.length; s--;) {
                        for (var a = s, i = o[s].collapseRows(), l = i.end.row, c = i.start.row; s--;) {
                            var i = o[s].collapseRows();
                            if (!(c - i.end.row <= 1)) break;
                            c = i.end.row
                        }
                        s++;
                        for (var r = e.call(this, c, l); a >= s;) o[a].moveBy(r, 0), a--
                    }
                    t.fromOrientedRange(t.ranges[0]), t.rangeList.attach(this.session)
                }
            }, this.$getSelectedRows = function() {
                var e = this.getSelectionRange().collapseRows();
                return {
                    first: e.start.row,
                    last: e.end.row
                }
            }, this.onCompositionStart = function() {
                this.renderer.showComposition(this.getCursorPosition())
            }, this.onCompositionUpdate = function(e) {
                this.renderer.setCompositionText(e)
            }, this.onCompositionEnd = function() {
                this.renderer.hideComposition()
            }, this.getFirstVisibleRow = function() {
                return this.renderer.getFirstVisibleRow()
            }, this.getLastVisibleRow = function() {
                return this.renderer.getLastVisibleRow()
            }, this.isRowVisible = function(e) {
                return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow()
            }, this.isRowFullyVisible = function(e) {
                return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow()
            }, this.$getVisibleRowCount = function() {
                return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
            }, this.$moveByPage = function(e, t) {
                var n = this.renderer,
                    i = this.renderer.layerConfig,
                    r = e * Math.floor(i.height / i.lineHeight);
                this.$blockScrolling++, 1 == t ? this.selection.$moveSelection(function() {
                    this.moveCursorBy(r, 0)
                }) : 0 == t && (this.selection.moveCursorBy(r, 0), this.selection.clearSelection()), this.$blockScrolling--;
                var o = n.scrollTop;
                n.scrollBy(0, r * i.lineHeight), null != t && n.scrollCursorIntoView(null, .5), n.animateScrolling(o)
            }, this.selectPageDown = function() {
                this.$moveByPage(1, !0)
            }, this.selectPageUp = function() {
                this.$moveByPage(-1, !0)
            }, this.gotoPageDown = function() {
                this.$moveByPage(1, !1)
            }, this.gotoPageUp = function() {
                this.$moveByPage(-1, !1)
            }, this.scrollPageDown = function() {
                this.$moveByPage(1)
            }, this.scrollPageUp = function() {
                this.$moveByPage(-1)
            }, this.scrollToRow = function(e) {
                this.renderer.scrollToRow(e)
            }, this.scrollToLine = function(e, t, n, i) {
                this.renderer.scrollToLine(e, t, n, i)
            }, this.centerSelection = function() {
                var e = this.getSelectionRange(),
                    t = {
                        row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2),
                        column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)
                    };
                this.renderer.alignCursor(t, .5)
            }, this.getCursorPosition = function() {
                return this.selection.getCursor()
            }, this.getCursorPositionScreen = function() {
                return this.session.documentToScreenPosition(this.getCursorPosition())
            }, this.getSelectionRange = function() {
                return this.selection.getRange()
            }, this.selectAll = function() {
                this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1
            }, this.clearSelection = function() {
                this.selection.clearSelection()
            }, this.moveCursorTo = function(e, t) {
                this.selection.moveCursorTo(e, t)
            }, this.moveCursorToPosition = function(e) {
                this.selection.moveCursorToPosition(e)
            }, this.jumpToMatching = function(e) {
                var t = this.getCursorPosition(),
                    n = this.session.getBracketRange(t);
                if (!n) {
                    if (n = this.find({
                            needle: /[{}()\[\]]/g,
                            preventScroll: !0,
                            start: {
                                row: t.row,
                                column: t.column - 1
                            }
                        }), !n) return;
                    var i = n.start;
                    i.row == t.row && Math.abs(i.column - t.column) < 2 && (n = this.session.getBracketRange(i))
                }
                i = n && n.cursor || i, i && (e ? n && n.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(i.row, i.column) : (this.clearSelection(), this.moveCursorTo(i.row, i.column)))
            }, this.gotoLine = function(e, t, n) {
                this.selection.clearSelection(), this.session.unfold({
                    row: e - 1,
                    column: t || 0
                }), this.$blockScrolling += 1, this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(e - 1, t || 0), this.$blockScrolling -= 1, this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, n)
            }, this.navigateTo = function(e, t) {
                this.clearSelection(), this.moveCursorTo(e, t)
            }, this.navigateUp = function(e) {
                if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                    var t = this.selection.anchor.getPosition();
                    return this.moveCursorToPosition(t)
                }
                this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(-e, 0)
            }, this.navigateDown = function(e) {
                if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                    var t = this.selection.anchor.getPosition();
                    return this.moveCursorToPosition(t)
                }
                this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(e, 0)
            }, this.navigateLeft = function(e) {
                if (this.selection.isEmpty())
                    for (e = e || 1; e--;) this.selection.moveCursorLeft();
                else {
                    var t = this.getSelectionRange().start;
                    this.moveCursorToPosition(t)
                }
                this.clearSelection()
            }, this.navigateRight = function(e) {
                if (this.selection.isEmpty())
                    for (e = e || 1; e--;) this.selection.moveCursorRight();
                else {
                    var t = this.getSelectionRange().end;
                    this.moveCursorToPosition(t)
                }
                this.clearSelection()
            }, this.navigateLineStart = function() {
                this.selection.moveCursorLineStart(), this.clearSelection()
            }, this.navigateLineEnd = function() {
                this.selection.moveCursorLineEnd(), this.clearSelection()
            }, this.navigateFileEnd = function() {
                var e = this.renderer.scrollTop;
                this.selection.moveCursorFileEnd(), this.clearSelection(), this.renderer.animateScrolling(e)
            }, this.navigateFileStart = function() {
                var e = this.renderer.scrollTop;
                this.selection.moveCursorFileStart(), this.clearSelection(), this.renderer.animateScrolling(e)
            }, this.navigateWordRight = function() {
                this.selection.moveCursorWordRight(), this.clearSelection()
            }, this.navigateWordLeft = function() {
                this.selection.moveCursorWordLeft(), this.clearSelection()
            }, this.replace = function(e, t) {
                t && this.$search.set(t);
                var n = this.$search.find(this.session),
                    i = 0;
                return n ? (this.$tryReplace(n, e) && (i = 1), null !== n && (this.selection.setSelectionRange(n), this.renderer.scrollSelectionIntoView(n.start, n.end)), i) : i
            }, this.replaceAll = function(e, t) {
                t && this.$search.set(t);
                var n = this.$search.findAll(this.session),
                    i = 0;
                if (!n.length) return i;
                this.$blockScrolling += 1;
                var r = this.getSelectionRange();
                this.clearSelection(), this.selection.moveCursorTo(0, 0);
                for (var o = n.length - 1; o >= 0; --o) this.$tryReplace(n[o], e) && i++;
                return this.selection.setSelectionRange(r), this.$blockScrolling -= 1, i
            }, this.$tryReplace = function(e, t) {
                var n = this.session.getTextRange(e);
                return t = this.$search.replace(n, t), null !== t ? (e.end = this.session.replace(e, t), e) : null
            }, this.getLastSearchOptions = function() {
                return this.$search.getOptions()
            }, this.find = function(e, t, i) {
                t || (t = {}), "string" == typeof e || e instanceof RegExp ? t.needle = e : "object" == typeof e && n.mixin(t, e);
                var r = this.selection.getRange();
                null == t.needle && (e = this.session.getTextRange(r) || this.$search.$options.needle, e || (r = this.session.getWordRange(r.start.row, r.start.column), e = this.session.getTextRange(r)), this.$search.set({
                    needle: e
                })), this.$search.set(t), t.start || this.$search.set({
                    start: r
                });
                var o = this.$search.find(this.session);
                return t.preventScroll ? o : o ? (this.revealRange(o, i), o) : (t.backwards ? r.start = r.end : r.end = r.start, void this.selection.setRange(r))
            }, this.findNext = function(e, t) {
                this.find({
                    skipCurrent: !0,
                    backwards: !1
                }, e, t)
            }, this.findPrevious = function(e, t) {
                this.find(e, {
                    skipCurrent: !0,
                    backwards: !0
                }, t)
            }, this.revealRange = function(e, t) {
                this.$blockScrolling += 1, this.session.unfold(e), this.selection.setSelectionRange(e), this.$blockScrolling -= 1;
                var n = this.renderer.scrollTop;
                this.renderer.scrollSelectionIntoView(e.start, e.end, .5), 0 != t && this.renderer.animateScrolling(n)
            }, this.undo = function() {
                this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
            }, this.redo = function() {
                this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
            }, this.destroy = function() {
                this.renderer.destroy(), this._emit("destroy", this)
            }, this.setAutoScrollEditorIntoView = function(e) {
                if (e !== !1) {
                    var t, n = this,
                        i = !1;
                    this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
                    var r = this.$scrollAnchor;
                    r.style.cssText = "position:absolute", this.container.insertBefore(r, this.container.firstChild);
                    var o = this.on("changeSelection", function() {
                            i = !0
                        }),
                        s = this.renderer.on("beforeRender", function() {
                            i && (t = n.renderer.container.getBoundingClientRect())
                        }),
                        a = this.renderer.on("afterRender", function() {
                            if (i && t && n.isFocused()) {
                                var e = n.renderer,
                                    o = e.$cursorLayer.$pixelPos,
                                    s = e.layerConfig,
                                    a = o.top - s.offset;
                                i = o.top >= 0 && a + t.top < 0 ? !0 : o.top < s.height && o.top + t.top + s.lineHeight > window.innerHeight ? !1 : null, null != i && (r.style.top = a + "px", r.style.left = o.left + "px", r.style.height = s.lineHeight + "px", r.scrollIntoView(i)), i = t = null
                            }
                        });
                    this.setAutoScrollEditorIntoView = function(e) {
                        e !== !0 && (delete this.setAutoScrollEditorIntoView, this.removeEventListener("changeSelection", o), this.renderer.removeEventListener("afterRender", a), this.renderer.removeEventListener("beforeRender", s))
                    }
                }
            }, this.$resetCursorStyle = function() {
                var e = this.$cursorStyle || "ace",
                    t = this.renderer.$cursorLayer;
                t && (t.setSmoothBlinking("smooth" == e), t.isBlinking = !this.$readOnly && "wide" != e)
            }
        }).call(v.prototype), m.defineOptions(v.prototype, "editor", {
            selectionStyle: {
                set: function(e) {
                    this.onSelectionChange(), this._emit("changeSelectionStyle", {
                        data: e
                    })
                },
                initialValue: "line"
            },
            highlightActiveLine: {
                set: function() {
                    this.$updateHighlightActiveLine()
                },
                initialValue: !0
            },
            highlightSelectedWord: {
                set: function() {
                    this.$onSelectionChange()
                },
                initialValue: !0
            },
            readOnly: {
                set: function(e) {
                    this.textInput.setReadOnly(e), this.$resetCursorStyle()
                },
                initialValue: !1
            },
            cursorStyle: {
                set: function() {
                    this.$resetCursorStyle()
                },
                values: ["ace", "slim", "smooth", "wide"],
                initialValue: "ace"
            },
            mergeUndoDeltas: {
                values: [!1, !0, "always"],
                initialValue: !0
            },
            behavioursEnabled: {
                initialValue: !0
            },
            wrapBehavioursEnabled: {
                initialValue: !0
            },
            hScrollBarAlwaysVisible: "renderer",
            vScrollBarAlwaysVisible: "renderer",
            highlightGutterLine: "renderer",
            animatedScroll: "renderer",
            showInvisibles: "renderer",
            showPrintMargin: "renderer",
            printMarginColumn: "renderer",
            printMargin: "renderer",
            fadeFoldWidgets: "renderer",
            showFoldWidgets: "renderer",
            showGutter: "renderer",
            displayIndentGuides: "renderer",
            fontSize: "renderer",
            fontFamily: "renderer",
            maxLines: "renderer",
            minLines: "renderer",
            scrollPastEnd: "renderer",
            fixedWidthGutter: "renderer",
            scrollSpeed: "$mouseHandler",
            dragDelay: "$mouseHandler",
            dragEnabled: "$mouseHandler",
            focusTimout: "$mouseHandler",
            firstLineNumber: "session",
            overwrite: "session",
            newLineMode: "session",
            useWorker: "session",
            useSoftTabs: "session",
            tabSize: "session",
            wrap: "session",
            foldStyle: "session"
        }), t.Editor = v
    }), ace.define("ace/lib/lang", ["require", "exports", "module"], function(e, t) {
        t.stringReverse = function(e) {
            return e.split("").reverse().join("")
        }, t.stringRepeat = function(e, t) {
            for (var n = ""; t > 0;) 1 & t && (n += e), (t >>= 1) && (e += e);
            return n
        };
        var n = /^\s\s*/,
            i = /\s\s*$/;
        t.stringTrimLeft = function(e) {
            return e.replace(n, "")
        }, t.stringTrimRight = function(e) {
            return e.replace(i, "")
        }, t.copyObject = function(e) {
            var t = {};
            for (var n in e) t[n] = e[n];
            return t
        }, t.copyArray = function(e) {
            for (var t = [], n = 0, i = e.length; i > n; n++) t[n] = e[n] && "object" == typeof e[n] ? this.copyObject(e[n]) : e[n];
            return t
        }, t.deepCopy = function(e) {
            if ("object" != typeof e) return e;
            var t = e.constructor();
            for (var n in e) t[n] = "object" == typeof e[n] ? this.deepCopy(e[n]) : e[n];
            return t
        }, t.arrayToMap = function(e) {
            for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = 1;
            return t
        }, t.createMap = function(e) {
            var t = Object.create(null);
            for (var n in e) t[n] = e[n];
            return t
        }, t.arrayRemove = function(e, t) {
            for (var n = 0; n <= e.length; n++) t === e[n] && e.splice(n, 1)
        }, t.escapeRegExp = function(e) {
            return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
        }, t.escapeHTML = function(e) {
            return e.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
        }, t.getMatchOffsets = function(e, t) {
            var n = [];
            return e.replace(t, function(e) {
                n.push({
                    offset: arguments[arguments.length - 2],
                    length: e.length
                })
            }), n
        }, t.deferredCall = function(e) {
            var t = null,
                n = function() {
                    t = null, e()
                },
                i = function(e) {
                    return i.cancel(), t = setTimeout(n, e || 0), i
                };
            return i.schedule = i, i.call = function() {
                return this.cancel(), e(), i
            }, i.cancel = function() {
                return clearTimeout(t), t = null, i
            }, i
        }, t.delayedCall = function(e, t) {
            var n = null,
                i = function() {
                    n = null, e()
                },
                r = function(e) {
                    n && clearTimeout(n), n = setTimeout(i, e || t)
                };
            return r.delay = r, r.schedule = function(e) {
                null == n && (n = setTimeout(i, e || 0))
            }, r.call = function() {
                this.cancel(), e()
            }, r.cancel = function() {
                n && clearTimeout(n), n = null
            }, r.isPending = function() {
                return n
            }, r
        }
    }), ace.define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang"], function(e, t) {
        var n = e("../lib/event"),
            i = e("../lib/useragent"),
            r = e("../lib/dom"),
            o = e("../lib/lang"),
            s = i.isChrome < 18,
            a = function(e, t) {
                function a(e) {
                    if (!p) {
                        if (k) t = 0, n = e ? 0 : u.value.length - 1;
                        else var t = e ? 2 : 1,
                            n = 2;
                        try {
                            u.setSelectionRange(t, n)
                        } catch (i) {}
                    }
                }

                function l() {
                    p || (u.value = h, i.isWebKit && C.schedule())
                }

                function c() {
                    setTimeout(function() {
                        m && (u.style.cssText = m, m = ""), null == t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = !0, t.renderer.$moveTextAreaToCursor())
                    }, 0)
                }
                var u = r.createElement("textarea");
                u.className = "ace_text-input", i.isTouchPad && u.setAttribute("x-palm-disable-auto-cap", !0), u.wrap = "off", u.autocorrect = "off", u.autocapitalize = "off", u.spellcheck = !1, u.style.opacity = "0", e.insertBefore(u, e.firstChild);
                var h = "",
                    d = !1,
                    g = !1,
                    f = !1,
                    p = !1,
                    m = "",
                    v = !0;
                try {
                    var y = document.activeElement === u
                } catch (w) {}
                n.addListener(u, "blur", function() {
                    t.onBlur(), y = !1
                }), n.addListener(u, "focus", function() {
                    y = !0, t.onFocus(), a()
                }), this.focus = function() {
                    u.focus()
                }, this.blur = function() {
                    u.blur()
                }, this.isFocused = function() {
                    return y
                };
                var A = o.delayedCall(function() {
                        y && a(v)
                    }),
                    C = o.delayedCall(function() {
                        p || (u.value = h, y && a())
                    });
                i.isWebKit || t.addEventListener("changeSelection", function() {
                    t.selection.isEmpty() != v && (v = !v, A.schedule())
                }), l(), y && t.onFocus();
                var F = function(e) {
                    return 0 === e.selectionStart && e.selectionEnd === e.value.length
                };
                if (!u.setSelectionRange && u.createTextRange && (u.setSelectionRange = function(e, t) {
                        var n = this.createTextRange();
                        n.collapse(!0), n.moveStart("character", e), n.moveEnd("character", t), n.select()
                    }, F = function(e) {
                        try {
                            var t = e.ownerDocument.selection.createRange()
                        } catch (n) {}
                        return t && t.parentElement() == e ? t.text == e.value : !1
                    }), i.isOldIE) {
                    var E = !1,
                        b = function(e) {
                            if (!E) {
                                var t = u.value;
                                if (!p && t && t != h) return e && t == h[0] ? x.schedule() : ($(t), E = !0, l(), E = !1, void 0)
                            }
                        },
                        x = o.delayedCall(b);
                    n.addListener(u, "propertychange", b);
                    var D = {
                        13: 1,
                        27: 1
                    };
                    n.addListener(u, "keyup", function(e) {
                        return p && (!u.value || D[e.keyCode]) && setTimeout(O, 0), (u.value.charCodeAt(0) || 0) < 129 ? x.call() : void(p ? N() : M())
                    }), n.addListener(u, "keydown", function() {
                        x.schedule(50)
                    })
                }
                var B = function() {
                        d ? d = !1 : g ? g = !1 : F(u) ? (t.selectAll(), a()) : k && a(t.selection.isEmpty())
                    },
                    k = null;
                this.setInputHandler = function(e) {
                    k = e
                }, this.getInputHandler = function() {
                    return k
                };
                var S = !1,
                    $ = function(e) {
                        k && (e = k(e), k = null), f ? (a(), e && t.onPaste(e), f = !1) : e == h.charAt(0) ? S && t.execCommand("del", {
                            source: "ace"
                        }) : (e.substring(0, 2) == h ? e = e.substr(2) : e.charAt(0) == h.charAt(0) ? e = e.substr(1) : e.charAt(e.length - 1) == h.charAt(0) && (e = e.slice(0, -1)), e.charAt(e.length - 1) == h.charAt(0) && (e = e.slice(0, -1)), e && t.onTextInput(e)), S && (S = !1)
                    },
                    T = function() {
                        if (!p) {
                            var e = u.value;
                            $(e), l()
                        }
                    },
                    L = function(e) {
                        var i = t.getCopyText();
                        if (!i) return void n.preventDefault(e);
                        var r = e.clipboardData || window.clipboardData;
                        if (r && !s) {
                            var o = r.setData("Text", i);
                            o && (t.onCut(), n.preventDefault(e))
                        }
                        o || (d = !0, u.value = i, u.select(), setTimeout(function() {
                            d = !1, l(), a(), t.onCut()
                        }))
                    },
                    _ = function(e) {
                        var i = t.getCopyText();
                        if (!i) return void n.preventDefault(e);
                        var r = e.clipboardData || window.clipboardData;
                        if (r && !s) {
                            var o = r.setData("Text", i);
                            o && (t.onCopy(), n.preventDefault(e))
                        }
                        o || (g = !0, u.value = i, u.select(), setTimeout(function() {
                            g = !1, l(), a(), t.onCopy()
                        }))
                    },
                    R = function(e) {
                        var r = e.clipboardData || window.clipboardData;
                        if (r) {
                            var o = r.getData("Text");
                            o && t.onPaste(o), i.isIE && setTimeout(a), n.preventDefault(e)
                        } else u.value = "", f = !0
                    };
                n.addCommandKeyListener(u, t.onCommandKey.bind(t)), n.addListener(u, "select", B), n.addListener(u, "input", T), n.addListener(u, "cut", L), n.addListener(u, "copy", _), n.addListener(u, "paste", R), !("oncut" in u && "oncopy" in u && "onpaste" in u || !n.addListener(e, "keydown", function(e) {
                    if ((!i.isMac || e.metaKey) && e.ctrlKey) switch (e.keyCode) {
                        case 67:
                            _(e);
                            break;
                        case 86:
                            R(e);
                            break;
                        case 88:
                            L(e)
                    }
                }));
                var M = function() {
                        p || (p = {}, t.onCompositionStart(), setTimeout(N, 0), t.on("mousedown", O), t.selection.isEmpty() || (t.insert(""), t.session.markUndoGroup(), t.selection.clearSelection()), t.session.markUndoGroup())
                    },
                    N = function() {
                        if (p) {
                            var e = u.value.replace(/\x01/g, "");
                            if (p.lastValue !== e && (t.onCompositionUpdate(e), p.lastValue && t.undo(), p.lastValue = e, p.lastValue)) {
                                var n = t.selection.getRange();
                                t.insert(p.lastValue), t.session.markUndoGroup(), p.range = t.selection.getRange(), t.selection.setRange(n), t.selection.clearSelection()
                            }
                        }
                    },
                    O = function(e) {
                        var n = p;
                        p = !1;
                        var i = setTimeout(function() {
                            i = null;
                            var e = u.value.replace(/\x01/g, "");
                            p || (e == n.lastValue ? l() : !n.lastValue && e && (l(), $(e)))
                        });
                        k = function(e) {
                            return i && clearTimeout(i), e = e.replace(/\x01/g, ""), e == n.lastValue ? "" : (n.lastValue && i && t.undo(), e)
                        }, t.onCompositionEnd(), t.removeListener("mousedown", O), "compositionend" == e.type && n.range && t.selection.setRange(n.range)
                    },
                    I = o.delayedCall(N, 50);
                if (n.addListener(u, "compositionstart", M), i.isGecko ? n.addListener(u, "text", function() {
                        I.schedule()
                    }) : (n.addListener(u, "keyup", function() {
                        I.schedule()
                    }), n.addListener(u, "keydown", function() {
                        I.schedule()
                    })), n.addListener(u, "compositionend", O), this.getElement = function() {
                        return u
                    }, this.setReadOnly = function(e) {
                        u.readOnly = e
                    }, this.onContextMenu = function(e) {
                        S = !0, m || (m = u.style.cssText), u.style.cssText = "z-index:100000;" + (i.isIE ? "opacity:0.1;" : ""), a(t.selection.isEmpty()), t._emit("nativecontextmenu", {
                            target: t,
                            domEvent: e
                        });
                        var o = t.container.getBoundingClientRect(),
                            s = r.computedStyle(t.container),
                            l = o.top + (parseInt(s.borderTopWidth) || 0),
                            h = o.left + (parseInt(o.borderLeftWidth) || 0),
                            d = o.bottom - l - u.clientHeight,
                            g = function(e) {
                                u.style.left = e.clientX - h - 2 + "px", u.style.top = Math.min(e.clientY - l - 2, d) + "px"
                            };
                        g(e), "mousedown" == e.type && (t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = null), i.isWin && n.capture(t.container, g, c))
                    }, this.onContextMenuClose = c, !i.isGecko || i.isMac) {
                    var H = function(e) {
                        t.textInput.onContextMenu(e), c()
                    };
                    n.addListener(t.renderer.scroller, "contextmenu", H), n.addListener(u, "contextmenu", H)
                }
            };
        t.TextInput = a
    }), ace.define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/config"], function(e, t) {
        var n = e("../lib/event"),
            i = e("../lib/useragent"),
            r = e("./default_handlers").DefaultHandlers,
            o = e("./default_gutter_handler").GutterHandler,
            s = e("./mouse_event").MouseEvent,
            a = e("./dragdrop_handler").DragdropHandler,
            l = e("../config"),
            c = function(e) {
                this.editor = e, new r(this), new o(this), new a(this);
                var t = e.renderer.getMouseEventTarget();
                n.addListener(t, "click", this.onMouseEvent.bind(this, "click")), n.addListener(t, "mousemove", this.onMouseMove.bind(this, "mousemove")), n.addMultiMouseDownListener(t, [300, 300, 250], this, "onMouseEvent"), e.renderer.scrollBarV && (n.addMultiMouseDownListener(e.renderer.scrollBarV.inner, [300, 300, 250], this, "onMouseEvent"), n.addMultiMouseDownListener(e.renderer.scrollBarH.inner, [300, 300, 250], this, "onMouseEvent")), n.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel"));
                var i = e.renderer.$gutter;
                n.addListener(i, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), n.addListener(i, "click", this.onMouseEvent.bind(this, "gutterclick")), n.addListener(i, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), n.addListener(i, "mousemove", this.onMouseEvent.bind(this, "guttermousemove")), n.addListener(t, "mousedown", function() {
                    e.focus()
                }), n.addListener(i, "mousedown", function(t) {
                    return e.focus(), n.preventDefault(t)
                })
            };
        (function() {
            this.onMouseEvent = function(e, t) {
                this.editor._emit(e, new s(t, this.editor))
            }, this.onMouseMove = function(e, t) {
                var n = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
                n && n.length && this.editor._emit(e, new s(t, this.editor))
            }, this.onMouseWheel = function(e, t) {
                var n = new s(t, this.editor);
                n.speed = 2 * this.$scrollSpeed, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n)
            }, this.setState = function(e) {
                this.state = e
            }, this.captureMouse = function(e, t) {
                this.x = e.x, this.y = e.y, this.isMousePressed = !0;
                var r = this.editor.renderer;
                r.$keepTextAreaAtCursor && (r.$keepTextAreaAtCursor = null);
                var o = this,
                    s = function(e) {
                        o.x = e.clientX, o.y = e.clientY, t && t(e)
                    },
                    a = function(e) {
                        clearInterval(c), l(), o[o.state + "End"] && o[o.state + "End"](e), o.$clickSelection = null, null == r.$keepTextAreaAtCursor && (r.$keepTextAreaAtCursor = !0, r.$moveTextAreaToCursor()), o.isMousePressed = !1, o.onMouseEvent("mouseup", e)
                    },
                    l = function() {
                        o[o.state] && o[o.state]()
                    };
                if (i.isOldIE && "dblclick" == e.domEvent.type) return setTimeout(function() {
                    a(e)
                });
                n.capture(this.editor.container, s, a);
                var c = setInterval(l, 20)
            }
        }).call(c.prototype), l.defineOptions(c.prototype, "mouseHandler", {
            scrollSpeed: {
                initialValue: 2
            },
            dragDelay: {
                initialValue: 150
            },
            dragEnabled: {
                initialValue: !0
            },
            focusTimout: {
                initialValue: 0
            }
        }), t.MouseHandler = c
    }), ace.define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function(e, t) {
        function n(e) {
            e.$clickSelection = null;
            var t = e.editor;
            t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e));
            var n = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];
            n.forEach(function(t) {
                e[t] = this[t]
            }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange")
        }

        function i(e, t, n, i) {
            return Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2))
        }

        function r(e, t) {
            if (e.start.row == e.end.row) var n = 2 * t.column - e.start.column - e.end.column;
            else if (e.start.row != e.end.row - 1 || e.start.column || e.end.column) var n = 2 * t.row - e.start.row - e.end.row;
            else var n = t.column - 4;
            return 0 > n ? {
                cursor: e.start,
                anchor: e.end
            } : {
                cursor: e.end,
                anchor: e.start
            }
        }
        var o = (e("../lib/dom"), e("../lib/event"), e("../lib/useragent"), 0);
        (function() {
            this.onMouseDown = function(e) {
                var t = e.inSelection(),
                    n = e.getDocumentPosition();
                this.mousedownEvent = e;
                var i = this.editor,
                    r = e.getButton();
                if (0 !== r) {
                    var o = i.getSelectionRange(),
                        s = o.isEmpty();
                    return s && (i.moveCursorToPosition(n), i.selection.clearSelection()), void i.textInput.onContextMenu(e.domEvent)
                }
                return !t || i.isFocused() || (i.focus(), !this.$focusTimout || this.$clickSelection || i.inMultiSelectMode) ? (!t || this.$clickSelection || e.getShiftKey() || i.inMultiSelectMode ? this.startSelect(n) : t && (this.mousedownEvent.time = (new Date).getTime(), this.startSelect(n)), this.captureMouse(e), e.preventDefault()) : (this.mousedownEvent.time = (new Date).getTime(), this.setState("focusWait"), this.captureMouse(e), void 0)
            }, this.startSelect = function(e) {
                e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
                var t = this.editor;
                setTimeout(function() {
                    this.mousedownEvent.getShiftKey() ? t.selection.selectToPosition(e) : this.$clickSelection || (t.moveCursorToPosition(e), t.selection.clearSelection())
                }.bind(this), 0), t.renderer.scroller.setCapture && t.renderer.scroller.setCapture(), t.setStyle("ace_selecting"), this.setState("select")
            }, this.select = function() {
                var e, t = this.editor,
                    n = t.renderer.screenToTextCoordinates(this.x, this.y);
                if (this.$clickSelection) {
                    var i = this.$clickSelection.comparePoint(n);
                    if (-1 == i) e = this.$clickSelection.end;
                    else if (1 == i) e = this.$clickSelection.start;
                    else {
                        var o = r(this.$clickSelection, n);
                        n = o.cursor, e = o.anchor
                    }
                    t.selection.setSelectionAnchor(e.row, e.column)
                }
                t.selection.selectToPosition(n), t.renderer.scrollCursorIntoView()
            }, this.extendSelectionBy = function(e) {
                var t, n = this.editor,
                    i = n.renderer.screenToTextCoordinates(this.x, this.y),
                    o = n.selection[e](i.row, i.column);
                if (this.$clickSelection) {
                    var s = this.$clickSelection.comparePoint(o.start),
                        a = this.$clickSelection.comparePoint(o.end);
                    if (-1 == s && 0 >= a) t = this.$clickSelection.end, (o.end.row != i.row || o.end.column != i.column) && (i = o.start);
                    else if (1 == a && s >= 0) t = this.$clickSelection.start, (o.start.row != i.row || o.start.column != i.column) && (i = o.end);
                    else if (-1 == s && 1 == a) i = o.end, t = o.start;
                    else {
                        var l = r(this.$clickSelection, i);
                        i = l.cursor, t = l.anchor
                    }
                    n.selection.setSelectionAnchor(t.row, t.column)
                }
                n.selection.selectToPosition(i), n.renderer.scrollCursorIntoView()
            }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() {
                this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture()
            }, this.focusWait = function() {
                var e = i(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y),
                    t = (new Date).getTime();
                (e > o || t - this.mousedownEvent.time > this.$focusTimout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
            }, this.onDoubleClick = function(e) {
                var t = e.getDocumentPosition(),
                    n = this.editor,
                    i = n.session,
                    r = i.getBracketRange(t);
                return r ? (r.isEmpty() && (r.start.column--, r.end.column++), this.$clickSelection = r, this.setState("select"), void 0) : (this.$clickSelection = n.selection.getWordRange(t.row, t.column), void this.setState("selectByWords"))
            }, this.onTripleClick = function(e) {
                var t = e.getDocumentPosition(),
                    n = this.editor;
                this.setState("selectByLines"), this.$clickSelection = n.selection.getLineRange(t.row)
            }, this.onQuadClick = function() {
                var e = this.editor;
                e.selectAll(), this.$clickSelection = e.getSelectionRange(), this.setState("selectAll")
            }, this.onMouseWheel = function(e) {
                if (!e.getShiftKey() && !e.getAccelKey()) {
                    var t = e.domEvent.timeStamp,
                        n = t - (this.$lastScrollTime || 0),
                        i = this.editor,
                        r = i.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed);
                    return r || 200 > n ? (this.$lastScrollTime = t, i.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0
                }
            }
        }).call(n.prototype), t.DefaultHandlers = n
    }), ace.define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event"], function(e, t) {
        function n(e) {
            function t() {
                h = i.createElement("div"), h.className = "ace_gutter-tooltip", h.style.display = "none", a.container.appendChild(h)
            }

            function n() {
                h || t();
                var e = u.getDocumentPosition().row,
                    n = l.$annotations[e];
                if (!n) return o();
                var i = a.session.getLength();
                if (e == i) {
                    var r = a.renderer.pixelToScreenCoordinates(0, u.y).row,
                        c = u.$pos;
                    if (r > a.session.documentToScreenRow(c.row, c.column)) return o()
                }
                d != n && (d = n.text.join("<br/>"), h.style.display = "block", h.innerHTML = d, a.on("mousewheel", o), s(u))
            }

            function o() {
                c && (c = clearTimeout(c)), d && (h.style.display = "none", d = null, a.removeEventListener("mousewheel", o))
            }

            function s(e) {
                var t = a.renderer.$gutter.getBoundingClientRect();
                if (h.style.left = e.x + 15 + "px", e.y + 3 * a.renderer.lineHeight + 15 < t.bottom) h.style.bottom = "", h.style.top = e.y + 15 + "px";
                else {
                    h.style.top = "";
                    var n = window.innerHeight || document.documentElement.clientHeight;
                    h.style.bottom = n - e.y + 5 + "px"
                }
            }
            var a = e.editor,
                l = a.renderer.$gutterLayer;
            e.editor.setDefaultHandler("guttermousedown", function(t) {
                if (a.isFocused() && 0 == t.getButton()) {
                    var n = l.getRegion(t);
                    if ("foldWidgets" != n) {
                        var i = t.getDocumentPosition().row,
                            r = a.session.selection;
                        if (t.getShiftKey()) r.selectTo(i, 0);
                        else {
                            if (2 == t.domEvent.detail) return a.selectAll(), t.preventDefault();
                            e.$clickSelection = a.selection.getLineRange(i)
                        }
                        return e.setState("selectByLines"), e.captureMouse(t), t.preventDefault()
                    }
                }
            });
            var c, u, h, d;
            e.editor.setDefaultHandler("guttermousemove", function(t) {
                var r = t.domEvent.target || t.domEvent.srcElement;
                return i.hasCssClass(r, "ace_fold-widget") ? o() : (d && s(t), u = t, void(c || (c = setTimeout(function() {
                    c = null, u && !e.isMousePressed ? n() : o()
                }, 50))))
            }), r.addListener(a.renderer.$gutter, "mouseout", function() {
                u = null, d && !c && (c = setTimeout(function() {
                    c = null, o()
                }, 50))
            }), a.on("changeSession", o)
        }
        var i = e("../lib/dom"),
            r = e("../lib/event");
        t.GutterHandler = n
    }), ace.define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function(e, t) {
        var n = e("../lib/event"),
            i = e("../lib/useragent"),
            r = t.MouseEvent = function(e, t) {
                this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
            };
        (function() {
            this.stopPropagation = function() {
                n.stopPropagation(this.domEvent), this.propagationStopped = !0
            }, this.preventDefault = function() {
                n.preventDefault(this.domEvent), this.defaultPrevented = !0
            }, this.stop = function() {
                this.stopPropagation(), this.preventDefault()
            }, this.getDocumentPosition = function() {
                return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
            }, this.inSelection = function() {
                if (null !== this.$inSelection) return this.$inSelection;
                var e = this.editor,
                    t = e.getSelectionRange();
                if (t.isEmpty()) this.$inSelection = !1;
                else {
                    var n = this.getDocumentPosition();
                    this.$inSelection = t.contains(n.row, n.column)
                }
                return this.$inSelection
            }, this.getButton = function() {
                return n.getButton(this.domEvent)
            }, this.getShiftKey = function() {
                return this.domEvent.shiftKey
            }, this.getAccelKey = i.isMac ? function() {
                return this.domEvent.metaKey
            } : function() {
                return this.domEvent.ctrlKey
            }
        }).call(r.prototype)
    }), ace.define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function(e, t) {
        function n(e) {
            function t(e, t) {
                var n = (new Date).getTime(),
                    r = !t || e.row != t.row,
                    o = !t || e.column != t.column;
                if (!k || r || o) m.$blockScrolling += 1, m.moveCursorToPosition(e), m.$blockScrolling -= 1, k = n, S = {
                    x: A,
                    y: C
                };
                else {
                    var s = i(S.x, S.y, A, C);
                    s > c ? k = null : n - k >= l && (m.renderer.scrollCursorIntoView(), k = null)
                }
            }

            function n(e, t) {
                var n = (new Date).getTime(),
                    i = m.renderer.layerConfig.lineHeight,
                    r = m.renderer.layerConfig.characterWidth,
                    o = m.renderer.scroller.getBoundingClientRect(),
                    s = {
                        x: {
                            left: A - o.left,
                            right: o.right - A
                        },
                        y: {
                            top: C - o.top,
                            bottom: o.bottom - C
                        }
                    },
                    l = Math.min(s.x.left, s.x.right),
                    c = Math.min(s.y.top, s.y.bottom),
                    u = {
                        row: e.row,
                        column: e.column
                    };
                2 >= l / r && (u.column += s.x.left < s.x.right ? -3 : 2), 1 >= c / i && (u.row += s.y.top < s.y.bottom ? -1 : 1);
                var h = e.row != u.row,
                    d = e.column != u.column,
                    g = !t || e.row != t.row;
                h || d && !g ? B ? n - B >= a && m.renderer.scrollCursorIntoView(u) : B = n : B = null
            }

            function u() {
                var e = b;
                b = m.renderer.screenToTextCoordinates(A, C), t(b, e), n(b, e)
            }

            function h() {
                E = m.selection.toOrientedRange(), w = m.session.addMarker(E, "ace_selection", m.getSelectionStyle()), m.clearSelection(), m.isFocused() && m.renderer.$cursorLayer.setBlinking(!1), clearInterval(F), F = setInterval(u, 20), T = 0, o.addListener(document, "mousemove", g)
            }

            function d() {
                clearInterval(F), m.session.removeMarker(w), w = null, m.$blockScrolling += 1, m.selection.fromOrientedRange(E), m.$blockScrolling -= 1, m.isFocused() && !D && m.renderer.$cursorLayer.setBlinking(!m.getReadOnly()), E = null, T = 0, B = null, k = null, o.removeListener(document, "mousemove", g)
            }

            function g() {
                null == L && (L = setTimeout(function() {
                    null != L && w && d()
                }, 20))
            }

            function f(e) {
                var t = e.types;
                return !t || Array.prototype.some.call(t, function(e) {
                    return "text/plain" == e || "Text" == e
                })
            }

            function p(e) {
                var t = ["copy", "copymove", "all", "uninitialized"],
                    n = ["move", "copymove", "linkmove", "all", "uninitialized"],
                    i = s.isMac ? e.altKey : e.ctrlKey,
                    r = "uninitialized";
                try {
                    r = e.dataTransfer.effectAllowed.toLowerCase()
                } catch (e) {}
                var o = "none";
                return i && t.indexOf(r) >= 0 ? o = "copy" : n.indexOf(r) >= 0 ? o = "move" : t.indexOf(r) >= 0 && (o = "copy"), o
            }
            var m = e.editor,
                v = r.createElement("img");
            v.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", s.isOpera && (v.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");
            var y = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];
            y.forEach(function(t) {
                e[t] = this[t]
            }, this), m.addEventListener("mousedown", this.onMouseDown.bind(e));
            var w, A, C, F, E, b, x, D, B, k, S, $ = m.container,
                T = 0;
            this.onDragStart = function(e) {
                if (this.cancelDrag || !$.draggable) {
                    var t = this;
                    return setTimeout(function() {
                        t.startSelect(), t.captureMouse(e)
                    }, 0), e.preventDefault()
                }
                E = m.getSelectionRange();
                var n = e.dataTransfer;
                n.effectAllowed = m.getReadOnly() ? "copy" : "copyMove", s.isOpera && (m.container.appendChild(v), v._top = v.offsetTop), n.setDragImage && n.setDragImage(v, 0, 0), s.isOpera && m.container.removeChild(v), n.clearData(), n.setData("Text", m.session.getTextRange()), D = !0, this.setState("drag")
            }, this.onDragEnd = function(e) {
                if ($.draggable = !1, D = !1, this.setState(null), !m.getReadOnly()) {
                    var t = e.dataTransfer.dropEffect;
                    !x && "move" == t && m.session.remove(m.getSelectionRange()), m.renderer.$cursorLayer.setBlinking(!0)
                }
                this.editor.unsetStyle("ace_dragging")
            }, this.onDragEnter = function(e) {
                return !m.getReadOnly() && f(e.dataTransfer) ? (w || h(), T++, e.dataTransfer.dropEffect = x = p(e), o.preventDefault(e)) : void 0
            }, this.onDragOver = function(e) {
                return !m.getReadOnly() && f(e.dataTransfer) ? (w || (h(), T++), null !== L && (L = null), A = e.clientX, C = e.clientY, e.dataTransfer.dropEffect = x = p(e), o.preventDefault(e)) : void 0
            }, this.onDragLeave = function(e) {
                return T--, 0 >= T && w ? (d(), x = null, o.preventDefault(e)) : void 0
            }, this.onDrop = function(e) {
                if (w) {
                    var t = e.dataTransfer;
                    if (D) switch (x) {
                        case "move":
                            E = E.contains(b.row, b.column) ? {
                                start: b,
                                end: b
                            } : m.moveText(E, b);
                            break;
                        case "copy":
                            E = m.moveText(E, b, !0)
                    } else {
                        var n = t.getData("Text");
                        E = {
                            start: b,
                            end: m.session.insert(b, n)
                        }, m.focus(), x = null
                    }
                    return d(), o.preventDefault(e)
                }
            }, o.addListener($, "dragstart", this.onDragStart.bind(e)), o.addListener($, "dragend", this.onDragEnd.bind(e)), o.addListener($, "dragenter", this.onDragEnter.bind(e)), o.addListener($, "dragover", this.onDragOver.bind(e)), o.addListener($, "dragleave", this.onDragLeave.bind(e)), o.addListener($, "drop", this.onDrop.bind(e));
            var L = null
        }

        function i(e, t, n, i) {
            return Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2))
        }
        var r = e("../lib/dom"),
            o = e("../lib/event"),
            s = e("../lib/useragent"),
            a = 200,
            l = 200,
            c = 5;
        (function() {
            this.dragWait = function() {
                var e = (new Date).getTime() - this.mousedownEvent.time;
                e > this.editor.getDragDelay() && this.startDrag()
            }, this.dragWaitEnd = function() {
                var e = this.editor.container;
                e.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd()
            }, this.dragReadyEnd = function() {
                this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly()), this.editor.unsetStyle("ace_dragging"), this.dragWaitEnd()
            }, this.startDrag = function() {
                this.cancelDrag = !1;
                var e = this.editor.container;
                e.draggable = !0, this.editor.renderer.$cursorLayer.setBlinking(!1), this.editor.setStyle("ace_dragging"), this.setState("dragReady")
            }, this.onMouseDrag = function() {
                var e = this.editor.container;
                if (s.isIE && "dragReady" == this.state) {
                    var t = i(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                    t > 3 && e.dragDrop()
                }
                if ("dragWait" === this.state) {
                    var t = i(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                    t > 0 && (e.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()))
                }
            }, this.onMouseDown = function(e) {
                if (this.$dragEnabled) {
                    this.mousedownEvent = e;
                    var t = this.editor,
                        n = e.inSelection(),
                        i = e.getButton(),
                        r = e.domEvent.detail || 1;
                    if (1 === r && 0 === i && n) {
                        this.mousedownEvent.time = (new Date).getTime();
                        var o = e.domEvent.target || e.domEvent.srcElement;
                        if ("unselectable" in o && (o.unselectable = "on"), t.getDragDelay()) {
                            if (s.isWebKit) {
                                self.cancelDrag = !0;
                                var a = t.container;
                                a.draggable = !0
                            }
                            this.setState("dragWait")
                        } else this.startDrag();
                        this.captureMouse(e, this.onMouseDrag.bind(this)), e.defaultPrevented = !0
                    }
                }
            }
        }).call(n.prototype), t.DragdropHandler = n
    }), ace.define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter"], function(e, t, n) {
        "no use strict";

        function i(e) {
            return e.replace(/-(.)/g, function(e, t) {
                return t.toUpperCase()
            })
        }
        var r = e("./lib/lang"),
            o = e("./lib/oop"),
            s = e("./lib/net"),
            a = e("./lib/event_emitter").EventEmitter,
            l = function() {
                return this
            }(),
            c = {
                packaged: !1,
                workerPath: null,
                modePath: null,
                themePath: null,
                basePath: "",
                suffix: ".js",
                $moduleUrls: {}
            };
        t.get = function(e) {
            if (!c.hasOwnProperty(e)) throw new Error("Unknown config key: " + e);
            return c[e]
        }, t.set = function(e, t) {
            if (!c.hasOwnProperty(e)) throw new Error("Unknown config key: " + e);
            c[e] = t
        }, t.all = function() {
            return r.copyObject(c)
        }, o.implement(t, a), t.moduleUrl = function(e, t) {
            if (c.$moduleUrls[e]) return c.$moduleUrls[e];
            var n = e.split("/");
            t = t || n[n.length - 2] || "";
            var i = "snippets" == t ? "/" : "-",
                r = n[n.length - 1];
            if ("-" == i) {
                var o = new RegExp("^" + t + "[\\-_]|[\\-_]" + t + "$", "g");
                r = r.replace(o, "")
            }(!r || r == t) && n.length > 1 && (r = n[n.length - 2]);
            var s = c[t + "Path"];
            return null == s ? s = c.basePath : "/" == i && (t = i = ""), s && "/" != s.slice(-1) && (s += "/"), s + t + i + r + this.get("suffix")
        }, t.setModuleUrl = function(e, t) {
            return c.$moduleUrls[e] = t
        }, t.$loading = {}, t.loadModule = function(n, i) {
            var r, o;
            Array.isArray(n) && (o = n[0], n = n[1]);
            try {
                r = e(n)
            } catch (a) {}
            if (r && !t.$loading[n]) return i && i(r);
            if (t.$loading[n] || (t.$loading[n] = []), t.$loading[n].push(i), !(t.$loading[n].length > 1)) {
                var l = function() {
                    e([n], function(e) {
                        t._emit("load.module", {
                            name: n,
                            module: e
                        });
                        var i = t.$loading[n];
                        t.$loading[n] = null, i.forEach(function(t) {
                            t && t(e)
                        })
                    })
                };
                return t.get("packaged") ? void s.loadScript(t.moduleUrl(n, o), l) : l()
            }
        }, t.init = function() {
            if (c.packaged = e.packaged || n.packaged || l.define && define.packaged, !l.document) return "";
            for (var r = {}, o = "", s = document.getElementsByTagName("script"), a = 0; a < s.length; a++) {
                var u = s[a],
                    h = u.src || u.getAttribute("src");
                if (h) {
                    for (var d = u.attributes, g = 0, f = d.length; f > g; g++) {
                        var p = d[g];
                        0 === p.name.indexOf("data-ace-") && (r[i(p.name.replace(/^data-ace-/, ""))] = p.value)
                    }
                    var m = h.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
                    m && (o = m[1])
                }
            }
            o && (r.base = r.base || o, r.packaged = !0), r.basePath = r.base, r.workerPath = r.workerPath || r.base, r.modePath = r.modePath || r.base, r.themePath = r.themePath || r.base, delete r.base;
            for (var v in r) "undefined" != typeof r[v] && t.set(v, r[v])
        };
        var u = {
                setOptions: function(e) {
                    Object.keys(e).forEach(function(t) {
                        this.setOption(t, e[t])
                    }, this)
                },
                getOptions: function(e) {
                    var t = {};
                    return e ? Array.isArray(e) || (t = e, e = Object.keys(t)) : e = Object.keys(this.$options), e.forEach(function(e) {
                        t[e] = this.getOption(e)
                    }, this), t
                },
                setOption: function(e, t) {
                    if (this["$" + e] !== t) {
                        var n = this.$options[e];
                        return n ? n.forwardTo ? this[n.forwardTo] && this[n.forwardTo].setOption(e, t) : (n.handlesSet || (this["$" + e] = t), void(n && n.set && n.set.call(this, t))) : void("undefined" != typeof console && console.warn && console.warn('misspelled option "' + e + '"'))
                    }
                },
                getOption: function(e) {
                    var t = this.$options[e];
                    return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : void("undefined" != typeof console && console.warn && console.warn('misspelled option "' + e + '"'))
                }
            },
            h = {};
        t.defineOptions = function(e, t, n) {
            return e.$options || (h[t] = e.$options = {}), Object.keys(n).forEach(function(t) {
                var i = n[t];
                "string" == typeof i && (i = {
                    forwardTo: i
                }), i.name || (i.name = t), e.$options[i.name] = i, "initialValue" in i && (e["$" + i.name] = i.initialValue)
            }), o.implement(e, u), this
        }, t.resetOptions = function(e) {
            Object.keys(e.$options).forEach(function(t) {
                var n = e.$options[t];
                "value" in n && e.setOption(t, n.value)
            })
        }, t.setDefaultValue = function(e, n, i) {
            var r = h[e] || (h[e] = {});
            r[n] && (r.forwardTo ? t.setDefaultValue(r.forwardTo, n, i) : r[n].value = i)
        }, t.setDefaultValues = function(e, n) {
            Object.keys(n).forEach(function(i) {
                t.setDefaultValue(e, i, n[i])
            })
        }
    }), ace.define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
        var n = e("./dom");
        t.get = function(e, t) {
            var n = new XMLHttpRequest;
            n.open("GET", e, !0), n.onreadystatechange = function() {
                4 === n.readyState && t(n.responseText)
            }, n.send(null)
        }, t.loadScript = function(e, t) {
            var i = n.getDocumentHead(),
                r = document.createElement("script");
            r.src = e, i.appendChild(r), r.onload = r.onreadystatechange = function(e, n) {
                (n || !r.readyState || "loaded" == r.readyState || "complete" == r.readyState) && (r = r.onload = r.onreadystatechange = null, n || t())
            }
        }
    }), ace.define("ace/lib/event_emitter", ["require", "exports", "module"], function(e, t) {
        var n = {},
            i = function() {
                this.propagationStopped = !0
            },
            r = function() {
                this.defaultPrevented = !0
            };
        n._emit = n._dispatchEvent = function(e, t) {
            this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
            var n = this._eventRegistry[e] || [],
                o = this._defaultHandlers[e];
            if (n.length || o) {
                "object" == typeof t && t || (t = {}), t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = i), t.preventDefault || (t.preventDefault = r), n = n.slice();
                for (var s = 0; s < n.length && (n[s](t, this), !t.propagationStopped); s++);
                return o && !t.defaultPrevented ? o(t, this) : void 0
            }
        }, n._signal = function(e, t) {
            var n = (this._eventRegistry || {})[e];
            if (n) {
                n = n.slice();
                for (var i = 0; i < n.length; i++) n[i](t, this)
            }
        }, n.once = function(e, t) {
            var n = this;
            t && this.addEventListener(e, function i() {
                n.removeEventListener(e, i), t.apply(null, arguments)
            })
        }, n.setDefaultHandler = function(e, t) {
            var n = this._defaultHandlers;
            if (n || (n = this._defaultHandlers = {
                    _disabled_: {}
                }), n[e]) {
                var i = n[e],
                    r = n._disabled_[e];
                r || (n._disabled_[e] = r = []), r.push(i);
                var o = r.indexOf(t); - 1 != o && r.splice(o, 1)
            }
            n[e] = t
        }, n.removeDefaultHandler = function(e, t) {
            var n = this._defaultHandlers;
            if (n) {
                var i = n._disabled_[e];
                if (n[e] == t) {
                    {
                        n[e]
                    }
                    i && this.setDefaultHandler(e, i.pop())
                } else if (i) {
                    var r = i.indexOf(t); - 1 != r && i.splice(r, 1)
                }
            }
        }, n.on = n.addEventListener = function(e, t, n) {
            this._eventRegistry = this._eventRegistry || {};
            var i = this._eventRegistry[e];
            return i || (i = this._eventRegistry[e] = []), -1 == i.indexOf(t) && i[n ? "unshift" : "push"](t), t
        }, n.off = n.removeListener = n.removeEventListener = function(e, t) {
            this._eventRegistry = this._eventRegistry || {};
            var n = this._eventRegistry[e];
            if (n) {
                var i = n.indexOf(t); - 1 !== i && n.splice(i, 1)
            }
        }, n.removeAllListeners = function(e) {
            this._eventRegistry && (this._eventRegistry[e] = [])
        }, t.EventEmitter = n
    }), ace.define("ace/mouse/fold_handler", ["require", "exports", "module"], function(e, t) {
        function n(e) {
            e.on("click", function(t) {
                var n = t.getDocumentPosition(),
                    i = e.session,
                    r = i.getFoldAt(n.row, n.column, 1);
                r && (t.getAccelKey() ? i.removeFold(r) : i.expandFold(r), t.stop())
            }), e.on("gutterclick", function(t) {
                var n = e.renderer.$gutterLayer.getRegion(t);
                if ("foldWidgets" == n) {
                    var i = t.getDocumentPosition().row,
                        r = e.session;
                    r.foldWidgets && r.foldWidgets[i] && e.session.onFoldWidgetClick(i, t), e.isFocused() || e.focus(), t.stop()
                }
            }), e.on("gutterdblclick", function(t) {
                var n = e.renderer.$gutterLayer.getRegion(t);
                if ("foldWidgets" == n) {
                    var i = t.getDocumentPosition().row,
                        r = e.session,
                        o = r.getParentFoldRangeData(i, !0),
                        s = o.range || o.firstRange;
                    if (s) {
                        var i = s.start.row,
                            a = r.getFoldAt(i, r.getLine(i).length, 1);
                        a ? r.removeFold(a) : (r.addFold("...", s), e.renderer.scrollCursorIntoView({
                            row: s.start.row,
                            column: 0
                        }))
                    }
                    t.stop()
                }
            })
        }
        t.FoldHandler = n
    }), ace.define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function(e, t) {
        var n = e("../lib/keys"),
            i = e("../lib/event"),
            r = function(e) {
                this.$editor = e, this.$data = {}, this.$handlers = [], this.setDefaultHandler(e.commands)
            };
        (function() {
            this.setDefaultHandler = function(e) {
                this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0), this.$data = {
                    editor: this.$editor
                }
            }, this.setKeyboardHandler = function(e) {
                var t = this.$handlers;
                if (t[t.length - 1] != e) {
                    for (; t[t.length - 1] && t[t.length - 1] != this.$defaultHandler;) this.removeKeyboardHandler(t[t.length - 1]);
                    this.addKeyboardHandler(e, 1)
                }
            }, this.addKeyboardHandler = function(e, t) {
                if (e) {
                    var n = this.$handlers.indexOf(e); - 1 != n && this.$handlers.splice(n, 1), void 0 == t ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), -1 == n && e.attach && e.attach(this.$editor)
                }
            }, this.removeKeyboardHandler = function(e) {
                var t = this.$handlers.indexOf(e);
                return -1 == t ? !1 : (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0)
            }, this.getKeyboardHandler = function() {
                return this.$handlers[this.$handlers.length - 1]
            }, this.$callKeyboardHandlers = function(e, t, n, r) {
                for (var o, s = !1, a = this.$editor.commands, l = this.$handlers.length; l-- && (o = this.$handlers[l].handleKeyboard(this.$data, e, t, n, r), !(o && o.command && (s = "null" == o.command ? !0 : a.exec(o.command, this.$editor, o.args, r), s && r && -1 != e && 1 != o.passEvent && 1 != o.command.passEvent && i.stopEvent(r), s))););
                return s
            }, this.onCommandKey = function(e, t, i) {
                var r = n.keyCodeToString(i);
                this.$callKeyboardHandlers(t, r, i, e)
            }, this.onTextInput = function(e) {
                var t = this.$callKeyboardHandlers(-1, e);
                t || this.$editor.commands.exec("insertstring", this.$editor, e)
            }
        }).call(r.prototype), t.KeyBinding = r
    }), ace.define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function(e, t) {
        var n = e("./lib/oop"),
            i = e("./lib/lang"),
            r = e("./config"),
            o = e("./lib/event_emitter").EventEmitter,
            s = e("./selection").Selection,
            a = e("./mode/text").Mode,
            l = e("./range").Range,
            c = e("./document").Document,
            u = e("./background_tokenizer").BackgroundTokenizer,
            h = e("./search_highlight").SearchHighlight,
            d = function(e, t) {
                this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.$foldData.toString = function() {
                    return this.join("\n")
                }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == typeof e && e.getLine || (e = new c(e)), this.setDocument(e), this.selection = new s(this), r.resetOptions(this), this.setMode(t), r._emit("session", this)
            };
        (function() {
            function t(e) {
                return 4352 > e ? !1 : e >= 4352 && 4447 >= e || e >= 4515 && 4519 >= e || e >= 4602 && 4607 >= e || e >= 9001 && 9002 >= e || e >= 11904 && 11929 >= e || e >= 11931 && 12019 >= e || e >= 12032 && 12245 >= e || e >= 12272 && 12283 >= e || e >= 12288 && 12350 >= e || e >= 12353 && 12438 >= e || e >= 12441 && 12543 >= e || e >= 12549 && 12589 >= e || e >= 12593 && 12686 >= e || e >= 12688 && 12730 >= e || e >= 12736 && 12771 >= e || e >= 12784 && 12830 >= e || e >= 12832 && 12871 >= e || e >= 12880 && 13054 >= e || e >= 13056 && 19903 >= e || e >= 19968 && 42124 >= e || e >= 42128 && 42182 >= e || e >= 43360 && 43388 >= e || e >= 44032 && 55203 >= e || e >= 55216 && 55238 >= e || e >= 55243 && 55291 >= e || e >= 63744 && 64255 >= e || e >= 65040 && 65049 >= e || e >= 65072 && 65106 >= e || e >= 65108 && 65126 >= e || e >= 65128 && 65131 >= e || e >= 65281 && 65376 >= e || e >= 65504 && 65510 >= e
            }
            n.implement(this, o), this.setDocument = function(e) {
                this.doc && this.doc.removeListener("change", this.$onChange), this.doc = e, e.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches()
            }, this.getDocument = function() {
                return this.doc
            }, this.$resetRowCache = function(e) {
                if (!e) return this.$docRowCache = [], void(this.$screenRowCache = []);
                var t = this.$docRowCache.length,
                    n = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
                t > n && (this.$docRowCache.splice(n, t), this.$screenRowCache.splice(n, t))
            }, this.$getRowCacheIndex = function(e, t) {
                for (var n = 0, i = e.length - 1; i >= n;) {
                    var r = n + i >> 1,
                        o = e[r];
                    if (t > o) n = r + 1;
                    else {
                        if (!(o > t)) return r;
                        i = r - 1
                    }
                }
                return n - 1
            }, this.resetCaches = function() {
                this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0)
            }, this.onChangeFold = function(e) {
                var t = e.data;
                this.$resetRowCache(t.start.row)
            }, this.onChange = function(e) {
                var t = e.data;
                this.$modified = !0, this.$resetRowCache(t.range.start.row);
                var n = this.$updateInternalDataOnChange(e);
                !this.$fromUndo && this.$undoManager && !t.ignore && (this.$deltasDoc.push(t), n && 0 != n.length && this.$deltasFold.push({
                    action: "removeFolds",
                    folds: n
                }), this.$informUndoManager.schedule()), this.bgTokenizer.$updateOnChange(t), this._emit("change", e)
            }, this.setValue = function(e) {
                this.doc.setValue(e), this.selection.moveCursorTo(0, 0), this.selection.clearSelection(), this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.getUndoManager().reset()
            }, this.getValue = this.toString = function() {
                return this.doc.getValue()
            }, this.getSelection = function() {
                return this.selection
            }, this.getState = function(e) {
                return this.bgTokenizer.getState(e)
            }, this.getTokens = function(e) {
                return this.bgTokenizer.getTokens(e)
            }, this.getTokenAt = function(e, t) {
                var n, i = this.bgTokenizer.getTokens(e),
                    r = 0;
                if (null == t) o = i.length - 1, r = this.getLine(e).length;
                else
                    for (var o = 0; o < i.length && (r += i[o].value.length, !(r >= t)); o++);
                return n = i[o], n ? (n.index = o, n.start = r - n.value.length, n) : null
            }, this.setUndoManager = function(e) {
                if (this.$undoManager = e, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.$informUndoManager && this.$informUndoManager.cancel(), e) {
                    var t = this;
                    this.$syncInformUndoManager = function() {
                        t.$informUndoManager.cancel(), t.$deltasFold.length && (t.$deltas.push({
                            group: "fold",
                            deltas: t.$deltasFold
                        }), t.$deltasFold = []), t.$deltasDoc.length && (t.$deltas.push({
                            group: "doc",
                            deltas: t.$deltasDoc
                        }), t.$deltasDoc = []), t.$deltas.length > 0 && e.execute({
                            action: "aceupdate",
                            args: [t.$deltas, t],
                            merge: t.mergeUndoDeltas
                        }), t.mergeUndoDeltas = !1, t.$deltas = []
                    }, this.$informUndoManager = i.delayedCall(this.$syncInformUndoManager)
                }
            }, this.markUndoGroup = function() {
                this.$syncInformUndoManager && this.$syncInformUndoManager()
            }, this.$defaultUndoManager = {
                undo: function() {},
                redo: function() {},
                reset: function() {}
            }, this.getUndoManager = function() {
                return this.$undoManager || this.$defaultUndoManager
            }, this.getTabString = function() {
                return this.getUseSoftTabs() ? i.stringRepeat(" ", this.getTabSize()) : "  "
            }, this.setUseSoftTabs = function(e) {
                this.setOption("useSoftTabs", e)
            }, this.getUseSoftTabs = function() {
                return this.$useSoftTabs && !this.$mode.$indentWithTabs
            }, this.setTabSize = function(e) {
                this.setOption("tabSize", e)
            }, this.getTabSize = function() {
                return this.$tabSize
            }, this.isTabStop = function(e) {
                return this.$useSoftTabs && e.column % this.$tabSize == 0
            }, this.$overwrite = !1, this.setOverwrite = function(e) {
                this.setOption("overwrite", e)
            }, this.getOverwrite = function() {
                return this.$overwrite
            }, this.toggleOverwrite = function() {
                this.setOverwrite(!this.$overwrite)
            }, this.addGutterDecoration = function(e, t) {
                this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._emit("changeBreakpoint", {})
            }, this.removeGutterDecoration = function(e, t) {
                this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._emit("changeBreakpoint", {})
            }, this.getBreakpoints = function() {
                return this.$breakpoints
            }, this.setBreakpoints = function(e) {
                this.$breakpoints = [];
                for (var t = 0; t < e.length; t++) this.$breakpoints[e[t]] = "ace_breakpoint";
                this._emit("changeBreakpoint", {})
            }, this.clearBreakpoints = function() {
                this.$breakpoints = [], this._emit("changeBreakpoint", {})
            }, this.setBreakpoint = function(e, t) {
                void 0 === t && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._emit("changeBreakpoint", {})
            }, this.clearBreakpoint = function(e) {
                delete this.$breakpoints[e], this._emit("changeBreakpoint", {})
            }, this.addMarker = function(e, t, n, i) {
                var r = this.$markerId++,
                    o = {
                        range: e,
                        type: n || "line",
                        renderer: "function" == typeof n ? n : null,
                        clazz: t,
                        inFront: !!i,
                        id: r
                    };
                return i ? (this.$frontMarkers[r] = o, this._emit("changeFrontMarker")) : (this.$backMarkers[r] = o, this._emit("changeBackMarker")), r
            }, this.addDynamicMarker = function(e, t) {
                if (e.update) {
                    var n = this.$markerId++;
                    return e.id = n, e.inFront = !!t, t ? (this.$frontMarkers[n] = e, this._emit("changeFrontMarker")) : (this.$backMarkers[n] = e, this._emit("changeBackMarker")), e
                }
            }, this.removeMarker = function(e) {
                var t = this.$frontMarkers[e] || this.$backMarkers[e];
                if (t) {
                    var n = t.inFront ? this.$frontMarkers : this.$backMarkers;
                    t && (delete n[e], this._emit(t.inFront ? "changeFrontMarker" : "changeBackMarker"))
                }
            }, this.getMarkers = function(e) {
                return e ? this.$frontMarkers : this.$backMarkers
            }, this.highlight = function(e) {
                if (!this.$searchHighlight) {
                    var t = new h(null, "ace_selected-word", "text");
                    this.$searchHighlight = this.addDynamicMarker(t)
                }
                this.$searchHighlight.setRegexp(e)
            }, this.highlightLines = function(e, t, n, i) {
                "number" != typeof t && (n = t, t = e), n || (n = "ace_step");
                var r = new l(e, 0, t, 1 / 0);
                return r.id = this.addMarker(r, n, "fullLine", i), r
            }, this.setAnnotations = function(e) {
                this.$annotations = e, this._emit("changeAnnotation", {})
            }, this.getAnnotations = function() {
                return this.$annotations || []
            }, this.clearAnnotations = function() {
                this.setAnnotations([])
            }, this.$detectNewLine = function(e) {
                var t = e.match(/^.*?(\r?\n)/m);
                this.$autoNewLine = t ? t[1] : "\n"
            }, this.getWordRange = function(e, t) {
                var n = this.getLine(e),
                    i = !1;
                if (t > 0 && (i = !!n.charAt(t - 1).match(this.tokenRe)), i || (i = !!n.charAt(t).match(this.tokenRe)), i) var r = this.tokenRe;
                else if (/^\s+$/.test(n.slice(t - 1, t + 1))) var r = /\s/;
                else var r = this.nonTokenRe;
                var o = t;
                if (o > 0) {
                    do o--; while (o >= 0 && n.charAt(o).match(r));
                    o++
                }
                for (var s = t; s < n.length && n.charAt(s).match(r);) s++;
                return new l(e, o, e, s)
            }, this.getAWordRange = function(e, t) {
                for (var n = this.getWordRange(e, t), i = this.getLine(n.end.row); i.charAt(n.end.column).match(/[ \t]/);) n.end.column += 1;
                return n
            }, this.setNewLineMode = function(e) {
                this.doc.setNewLineMode(e)
            }, this.getNewLineMode = function() {
                return this.doc.getNewLineMode()
            }, this.setUseWorker = function(e) {
                this.setOption("useWorker", e)
            }, this.getUseWorker = function() {
                return this.$useWorker
            }, this.onReloadTokenizer = function(e) {
                var t = e.data;
                this.bgTokenizer.start(t.first), this._emit("tokenizerUpdate", e)
            }, this.$modes = {}, this.$mode = null, this.$modeId = null, this.setMode = function(e, t) {
                if (e && "object" == typeof e) {
                    if (e.getTokenizer) return this.$onChangeMode(e);
                    var n = e,
                        i = n.path
                } else i = e || "ace/mode/text";
                return this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new a), this.$modes[i] && !n ? (this.$onChangeMode(this.$modes[i]), void(t && t())) : (this.$modeId = i, r.loadModule(["mode", i], function(e) {
                    return this.$modeId !== i ? t && t() : this.$modes[i] && !n ? this.$onChangeMode(this.$modes[i]) : void(e && e.Mode && (e = new e.Mode(n), n || (this.$modes[i] = e, e.$id = i), this.$onChangeMode(e), t && t()))
                }.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0), void 0)
            }, this.$onChangeMode = function(e, t) {
                if (t || (this.$modeId = e.$id), this.$mode !== e) {
                    this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
                    var n = e.getTokenizer();
                    if (void 0 !== n.addEventListener) {
                        var i = this.onReloadTokenizer.bind(this);
                        n.addEventListener("update", i)
                    }
                    if (this.bgTokenizer) this.bgTokenizer.setTokenizer(n);
                    else {
                        this.bgTokenizer = new u(n);
                        var r = this;
                        this.bgTokenizer.addEventListener("update", function(e) {
                            r._emit("tokenizerUpdate", e)
                        })
                    }
                    this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, this.$options.wrapMethod.set.call(this, this.$wrapMethod), t || (this.$setFolding(e.foldingRules), this._emit("changeMode"), this.bgTokenizer.start(0))
                }
            }, this.$stopWorker = function() {
                this.$worker && this.$worker.terminate(), this.$worker = null
            }, this.$startWorker = function() {
                if ("undefined" == typeof Worker || e.noWorker) this.$worker = null;
                else try {
                    this.$worker = this.$mode.createWorker(this)
                } catch (t) {
                    console.log("Could not load worker"), console.log(t), this.$worker = null
                }
            }, this.getMode = function() {
                return this.$mode
            }, this.$scrollTop = 0, this.setScrollTop = function(e) {
                this.$scrollTop === e || isNaN(e) || (this.$scrollTop = e, this._signal("changeScrollTop", e))
            }, this.getScrollTop = function() {
                return this.$scrollTop
            }, this.$scrollLeft = 0, this.setScrollLeft = function(e) {
                this.$scrollLeft === e || isNaN(e) || (this.$scrollLeft = e, this._signal("changeScrollLeft", e))
            }, this.getScrollLeft = function() {
                return this.$scrollLeft
            }, this.getScreenWidth = function() {
                return this.$computeWidth(), this.screenWidth
            }, this.$computeWidth = function(e) {
                if (this.$modified || e) {
                    if (this.$modified = !1, this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
                    for (var t = this.doc.getAllLines(), n = this.$rowLengthCache, i = 0, r = 0, o = this.$foldData[r], s = o ? o.start.row : 1 / 0, a = t.length, l = 0; a > l; l++) {
                        if (l > s) {
                            if (l = o.end.row + 1, l >= a) break;
                            o = this.$foldData[r++], s = o ? o.start.row : 1 / 0
                        }
                        null == n[l] && (n[l] = this.$getStringScreenWidth(t[l])[0]), n[l] > i && (i = n[l])
                    }
                    this.screenWidth = i
                }
            }, this.getLine = function(e) {
                return this.doc.getLine(e)
            }, this.getLines = function(e, t) {
                return this.doc.getLines(e, t)
            }, this.getLength = function() {
                return this.doc.getLength()
            }, this.getTextRange = function(e) {
                return this.doc.getTextRange(e || this.selection.getRange())
            }, this.insert = function(e, t) {
                return this.doc.insert(e, t)
            }, this.remove = function(e) {
                return this.doc.remove(e)
            }, this.undoChanges = function(e, t) {
                if (e.length) {
                    this.$fromUndo = !0;
                    for (var n = null, i = e.length - 1; - 1 != i; i--) {
                        var r = e[i];
                        "doc" == r.group ? (this.doc.revertDeltas(r.deltas), n = this.$getUndoSelection(r.deltas, !0, n)) : r.deltas.forEach(function(e) {
                            this.addFolds(e.folds)
                        }, this)
                    }
                    return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), n
                }
            }, this.redoChanges = function(e, t) {
                if (e.length) {
                    this.$fromUndo = !0;
                    for (var n = null, i = 0; i < e.length; i++) {
                        var r = e[i];
                        "doc" == r.group && (this.doc.applyDeltas(r.deltas), n = this.$getUndoSelection(r.deltas, !1, n))
                    }
                    return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), n
                }
            }, this.setUndoSelect = function(e) {
                this.$undoSelect = e
            }, this.$getUndoSelection = function(e, t, n) {
                function i(e) {
                    var n = "insertText" === e.action || "insertLines" === e.action;
                    return t ? !n : n
                }
                var r, o, s = e[0],
                    a = !1;
                i(s) ? (r = l.fromPoints(s.range.start, s.range.end), a = !0) : (r = l.fromPoints(s.range.start, s.range.start), a = !1);
                for (var c = 1; c < e.length; c++) s = e[c], i(s) ? (o = s.range.start, -1 == r.compare(o.row, o.column) && r.setStart(s.range.start), o = s.range.end, 1 == r.compare(o.row, o.column) && r.setEnd(s.range.end), a = !0) : (o = s.range.start, -1 == r.compare(o.row, o.column) && (r = l.fromPoints(s.range.start, s.range.start)), a = !1);
                if (null != n) {
                    0 == l.comparePoints(n.start, r.start) && (n.start.column += r.end.column - r.start.column, n.end.column += r.end.column - r.start.column);
                    var u = n.compareRange(r);
                    1 == u ? r.setStart(n.start) : -1 == u && r.setEnd(n.end)
                }
                return r
            }, this.replace = function(e, t) {
                return this.doc.replace(e, t)
            }, this.moveText = function(e, t, n) {
                var i = this.getTextRange(e),
                    r = this.getFoldsInRange(e),
                    o = l.fromPoints(t, t);
                if (!n) {
                    this.remove(e);
                    var s = e.start.row - e.end.row,
                        a = s ? -e.end.column : e.start.column - e.end.column;
                    a && (o.start.row == e.end.row && o.start.column > e.end.column && (o.start.column += a), o.end.row == e.end.row && o.end.column > e.end.column && (o.end.column += a)), s && o.start.row >= e.end.row && (o.start.row += s, o.end.row += s)
                }
                if (o.end = this.insert(o.start, i), r.length) {
                    var c = e.start,
                        u = o.start,
                        s = u.row - c.row,
                        a = u.column - c.column;
                    this.addFolds(r.map(function(e) {
                        return e = e.clone(), e.start.row == c.row && (e.start.column += a), e.end.row == c.row && (e.end.column += a), e.start.row += s, e.end.row += s, e
                    }))
                }
                return o
            }, this.indentRows = function(e, t, n) {
                n = n.replace(/\t/g, this.getTabString());
                for (var i = e; t >= i; i++) this.insert({
                    row: i,
                    column: 0
                }, n)
            }, this.outdentRows = function(e) {
                for (var t = e.collapseRows(), n = new l(0, 0, 0, 0), i = this.getTabSize(), r = t.start.row; r <= t.end.row; ++r) {
                    var o = this.getLine(r);
                    n.start.row = r, n.end.row = r;
                    for (var s = 0; i > s && " " == o.charAt(s); ++s);
                    i > s && "  " == o.charAt(s) ? (n.start.column = s, n.end.column = s + 1) : (n.start.column = 0, n.end.column = s), this.remove(n)
                }
            }, this.$moveLines = function(e, t, n) {
                if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), 0 > n) {
                    var i = this.getRowFoldStart(e + n);
                    if (0 > i) return 0;
                    var r = i - e
                } else if (n > 0) {
                    var i = this.getRowFoldEnd(t + n);
                    if (i > this.doc.getLength() - 1) return 0;
                    var r = i - t
                } else {
                    e = this.$clipRowToDocument(e), t = this.$clipRowToDocument(t);
                    var r = t - e + 1
                }
                var o = new l(e, 0, t, Number.MAX_VALUE),
                    s = this.getFoldsInRange(o).map(function(e) {
                        return e = e.clone(), e.start.row += r, e.end.row += r, e
                    }),
                    a = 0 == n ? this.doc.getLines(e, t) : this.doc.removeLines(e, t);
                return this.doc.insertLines(e + r, a), s.length && this.addFolds(s), r
            }, this.moveLinesUp = function(e, t) {
                return this.$moveLines(e, t, -1)
            }, this.moveLinesDown = function(e, t) {
                return this.$moveLines(e, t, 1)
            }, this.duplicateLines = function(e, t) {
                return this.$moveLines(e, t, 0)
            }, this.$clipRowToDocument = function(e) {
                return Math.max(0, Math.min(e, this.doc.getLength() - 1))
            }, this.$clipColumnToRow = function(e, t) {
                return 0 > t ? 0 : Math.min(this.doc.getLine(e).length, t)
            }, this.$clipPositionToDocument = function(e, t) {
                if (t = Math.max(0, t), 0 > e) e = 0, t = 0;
                else {
                    var n = this.doc.getLength();
                    e >= n ? (e = n - 1, t = this.doc.getLine(n - 1).length) : t = Math.min(this.doc.getLine(e).length, t)
                }
                return {
                    row: e,
                    column: t
                }
            }, this.$clipRangeToDocument = function(e) {
                e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
                var t = this.doc.getLength() - 1;
                return e.end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e
            }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
                min: null,
                max: null
            }, this.setUseWrapMode = function(e) {
                if (e != this.$useWrapMode) {
                    if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
                        var t = this.getLength();
                        this.$wrapData = [];
                        for (var n = 0; t > n; n++) this.$wrapData.push([]);
                        this.$updateWrapData(0, t - 1)
                    }
                    this._emit("changeWrapMode")
                }
            }, this.getUseWrapMode = function() {
                return this.$useWrapMode
            }, this.setWrapLimitRange = function(e, t) {
                (this.$wrapLimitRange.min !== e || this.$wrapLimitRange.max !== t) && (this.$wrapLimitRange = {
                    min: e,
                    max: t
                }, this.$modified = !0, this._emit("changeWrapMode"))
            }, this.adjustWrapLimit = function(e, t) {
                var n = this.$wrapLimitRange;
                n.max < 0 && (n = {
                    min: t,
                    max: t
                });
                var i = this.$constrainWrapLimit(e, n.min, n.max);
                return i != this.$wrapLimit && i > 1 ? (this.$wrapLimit = i, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._emit("changeWrapLimit")), !0) : !1
            }, this.$constrainWrapLimit = function(e, t, n) {
                return t && (e = Math.max(t, e)), n && (e = Math.min(n, e)), e
            }, this.getWrapLimit = function() {
                return this.$wrapLimit
            }, this.setWrapLimit = function(e) {
                this.setWrapLimitRange(e, e)
            }, this.getWrapLimitRange = function() {
                return {
                    min: this.$wrapLimitRange.min,
                    max: this.$wrapLimitRange.max
                }
            }, this.$updateInternalDataOnChange = function(e) {
                var t, n = this.$useWrapMode,
                    i = e.data.action,
                    r = e.data.range.start.row,
                    o = e.data.range.end.row,
                    s = e.data.range.start,
                    a = e.data.range.end,
                    l = null;
                if (-1 != i.indexOf("Lines") ? (o = "insertLines" == i ? r + e.data.lines.length : r, t = e.data.lines ? e.data.lines.length : o - r) : t = o - r, this.$updating = !0, 0 != t)
                    if (-1 != i.indexOf("remove")) {
                        this[n ? "$wrapData" : "$rowLengthCache"].splice(r, t);
                        var c = this.$foldData;
                        l = this.getFoldsInRange(e.data.range), this.removeFolds(l);
                        var u = this.getFoldLine(a.row),
                            h = 0;
                        if (u) {
                            u.addRemoveChars(a.row, a.column, s.column - a.column), u.shiftRow(-t);
                            var d = this.getFoldLine(r);
                            d && d !== u && (d.merge(u), u = d), h = c.indexOf(u) + 1
                        }
                        for (h; h < c.length; h++) {
                            var u = c[h];
                            u.start.row >= a.row && u.shiftRow(-t)
                        }
                        o = r
                    } else {
                        var g;
                        if (n) {
                            g = [r, 0];
                            for (var f = 0; t > f; f++) g.push([]);
                            this.$wrapData.splice.apply(this.$wrapData, g)
                        } else g = Array(t), g.unshift(r, 0), this.$rowLengthCache.splice.apply(this.$rowLengthCache, g);
                        var c = this.$foldData,
                            u = this.getFoldLine(r),
                            h = 0;
                        if (u) {
                            var p = u.range.compareInside(s.row, s.column);
                            0 == p ? (u = u.split(s.row, s.column), u.shiftRow(t), u.addRemoveChars(o, 0, a.column - s.column)) : -1 == p && (u.addRemoveChars(r, 0, a.column - s.column), u.shiftRow(t)), h = c.indexOf(u) + 1
                        }
                        for (h; h < c.length; h++) {
                            var u = c[h];
                            u.start.row >= r && u.shiftRow(t)
                        }
                    }
                else {
                    t = Math.abs(e.data.range.start.column - e.data.range.end.column), -1 != i.indexOf("remove") && (l = this.getFoldsInRange(e.data.range), this.removeFolds(l), t = -t);
                    var u = this.getFoldLine(r);
                    u && u.addRemoveChars(r, s.column, t)
                }
                return n && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, n ? this.$updateWrapData(r, o) : this.$updateRowLengthCache(r, o), l
            }, this.$updateRowLengthCache = function(e, t) {
                this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null
            }, this.$updateWrapData = function(e, t) {
                var n, i, r = this.doc.getAllLines(),
                    o = this.getTabSize(),
                    s = this.$wrapData,
                    a = this.$wrapLimit,
                    l = e;
                for (t = Math.min(t, r.length - 1); t >= l;) i = this.getFoldLine(l, i), i ? (n = [], i.walk(function(e, t, i, o) {
                    var s;
                    if (null != e) {
                        s = this.$getDisplayTokens(e, n.length), s[0] = d;
                        for (var a = 1; a < s.length; a++) s[a] = g
                    } else s = this.$getDisplayTokens(r[t].substring(o, i), n.length);
                    n = n.concat(s)
                }.bind(this), i.end.row, r[i.end.row].length + 1), s[i.start.row] = this.$computeWrapSplits(n, a, o), l = i.end.row + 1) : (n = this.$getDisplayTokens(r[l]), s[l] = this.$computeWrapSplits(n, a, o), l++)
            };
            var s = 1,
                c = 2,
                d = 3,
                g = 4,
                f = 9,
                p = 10,
                m = 11,
                v = 12;
            this.$computeWrapSplits = function(e, t) {
                function n(t) {
                    var n = e.slice(o, t),
                        r = n.length;
                    n.join("").replace(/12/g, function() {
                        r -= 1
                    }).replace(/2/g, function() {
                        r -= 1
                    }), s += r, i.push(s), o = t
                }
                if (0 == e.length) return [];
                for (var i = [], r = e.length, o = 0, s = 0, a = this.$wrapAsCode; r - o > t;) {
                    var l = o + t;
                    if (e[l - 1] >= p && e[l] >= p) n(l);
                    else if (e[l] != d && e[l] != g) {
                        for (var c = Math.max(l - (a ? 10 : t - (t >> 2)), o - 1); l > c && e[l] < d;) l--;
                        if (a) {
                            for (; l > c && e[l] < d;) l--;
                            for (; l > c && e[l] == f;) l--
                        } else
                            for (; l > c && e[l] < p;) l--;
                        l > c ? n(++l) : (l = o + t, n(l))
                    } else {
                        for (l; l != o - 1 && e[l] != d; l--);
                        if (l > o) {
                            n(l);
                            continue
                        }
                        for (l = o + t; l < e.length && e[l] == g; l++);
                        if (l == e.length) break;
                        n(l)
                    }
                }
                return i
            }, this.$getDisplayTokens = function(e, n) {
                var i, r = [];
                n = n || 0;
                for (var o = 0; o < e.length; o++) {
                    var a = e.charCodeAt(o);
                    if (9 == a) {
                        i = this.getScreenTabSize(r.length + n), r.push(m);
                        for (var l = 1; i > l; l++) r.push(v)
                    } else 32 == a ? r.push(p) : a > 39 && 48 > a || a > 57 && 64 > a ? r.push(f) : a >= 4352 && t(a) ? r.push(s, c) : r.push(s)
                }
                return r
            }, this.$getStringScreenWidth = function(e, n, i) {
                if (0 == n) return [0, 0];
                null == n && (n = 1 / 0), i = i || 0;
                var r, o;
                for (o = 0; o < e.length && (r = e.charCodeAt(o), i += 9 == r ? this.getScreenTabSize(i) : r >= 4352 && t(r) ? 2 : 1, !(i > n)); o++);
                return [i, o]
            }, this.getRowLength = function(e) {
                return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 : 1
            }, this.getScreenLastRowColumn = function(e) {
                var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
                return this.documentToScreenColumn(t.row, t.column)
            }, this.getDocumentLastRowColumn = function(e, t) {
                var n = this.documentToScreenRow(e, t);
                return this.getScreenLastRowColumn(n)
            }, this.getDocumentLastRowColumnPosition = function(e, t) {
                var n = this.documentToScreenRow(e, t);
                return this.screenToDocumentPosition(n, Number.MAX_VALUE / 10)
            }, this.getRowSplitData = function(e) {
                return this.$useWrapMode ? this.$wrapData[e] : void 0
            }, this.getScreenTabSize = function(e) {
                return this.$tabSize - e % this.$tabSize
            }, this.screenToDocumentRow = function(e, t) {
                return this.screenToDocumentPosition(e, t).row
            }, this.screenToDocumentColumn = function(e, t) {
                return this.screenToDocumentPosition(e, t).column
            }, this.screenToDocumentPosition = function(e, t) {
                if (0 > e) return {
                    row: 0,
                    column: 0
                };
                var n, i, r = 0,
                    o = 0,
                    s = 0,
                    a = 0,
                    l = this.$screenRowCache,
                    c = this.$getRowCacheIndex(l, e),
                    u = l.length;
                if (u && c >= 0) var s = l[c],
                    r = this.$docRowCache[c],
                    h = e > l[u - 1];
                else var h = !u;
                for (var d = this.getLength() - 1, g = this.getNextFoldLine(r), f = g ? g.start.row : 1 / 0; e >= s && (a = this.getRowLength(r), !(s + a - 1 >= e || r >= d));) s += a, r++, r > f && (r = g.end.row + 1, g = this.getNextFoldLine(r, g), f = g ? g.start.row : 1 / 0), h && (this.$docRowCache.push(r), this.$screenRowCache.push(s));
                if (g && g.start.row <= r) n = this.getFoldDisplayLine(g), r = g.start.row;
                else {
                    if (e >= s + a || r > d) return {
                        row: d,
                        column: this.getLine(d).length
                    };
                    n = this.getLine(r), g = null
                }
                if (this.$useWrapMode) {
                    var p = this.$wrapData[r];
                    p && (i = p[e - s], e > s && p.length && (o = p[e - s - 1] || p[p.length - 1], n = n.substring(o)))
                }
                return o += this.$getStringScreenWidth(n, t)[1], this.$useWrapMode && o >= i && (o = i - 1), g ? g.idxToPosition(o) : {
                    row: r,
                    column: o
                }
            }, this.documentToScreenPosition = function(e, t) {
                if ("undefined" == typeof t) var n = this.$clipPositionToDocument(e.row, e.column);
                else n = this.$clipPositionToDocument(e, t);
                e = n.row, t = n.column;
                var i = 0,
                    r = null,
                    o = null;
                o = this.getFoldAt(e, t, 1), o && (e = o.start.row, t = o.start.column);
                var s, a = 0,
                    l = this.$docRowCache,
                    c = this.$getRowCacheIndex(l, e),
                    u = l.length;
                if (u && c >= 0) var a = l[c],
                    i = this.$screenRowCache[c],
                    h = e > l[u - 1];
                else var h = !u;
                for (var d = this.getNextFoldLine(a), g = d ? d.start.row : 1 / 0; e > a;) {
                    if (a >= g) {
                        if (s = d.end.row + 1, s > e) break;
                        d = this.getNextFoldLine(s, d), g = d ? d.start.row : 1 / 0
                    } else s = a + 1;
                    i += this.getRowLength(a), a = s, h && (this.$docRowCache.push(a), this.$screenRowCache.push(i))
                }
                var f = "";
                if (d && a >= g ? (f = this.getFoldDisplayLine(d, e, t), r = d.start.row) : (f = this.getLine(e).substring(0, t), r = e), this.$useWrapMode) {
                    for (var p = this.$wrapData[r], m = 0; f.length >= p[m];) i++, m++;
                    f = f.substring(p[m - 1] || 0, f.length)
                }
                return {
                    row: i,
                    column: this.$getStringScreenWidth(f)[0]
                }
            }, this.documentToScreenColumn = function(e, t) {
                return this.documentToScreenPosition(e, t).column
            }, this.documentToScreenRow = function(e, t) {
                return this.documentToScreenPosition(e, t).row
            }, this.getScreenLength = function() {
                var e = 0,
                    t = null;
                if (this.$useWrapMode)
                    for (var n = this.$wrapData.length, i = 0, r = 0, t = this.$foldData[r++], o = t ? t.start.row : 1 / 0; n > i;) e += this.$wrapData[i].length + 1, i++, i > o && (i = t.end.row + 1, t = this.$foldData[r++], o = t ? t.start.row : 1 / 0);
                else {
                    e = this.getLength();
                    for (var s = this.$foldData, r = 0; r < s.length; r++) t = s[r], e -= t.end.row - t.start.row
                }
                return e
            }
        }).call(d.prototype), e("./edit_session/folding").Folding.call(d.prototype), e("./edit_session/bracket_match").BracketMatch.call(d.prototype), r.defineOptions(d.prototype, "session", {
            wrap: {
                set: function(e) {
                    if (e && "off" != e ? "free" == e ? e = !0 : "printMargin" == e ? e = -1 : "string" == typeof e && (e = parseInt(e, 10) || !1) : e = !1, this.$wrap != e) {
                        if (e) {
                            var t = "number" == typeof e ? e : null;
                            this.setWrapLimitRange(t, t), this.setUseWrapMode(!0)
                        } else this.setUseWrapMode(!1);
                        this.$wrap = e
                    }
                },
                get: function() {
                    return this.getUseWrapMode() ? this.getWrapLimitRange().min || "free" : "off"
                },
                handlesSet: !0
            },
            wrapMethod: {
                set: function(e) {
                    this.$wrapAsCode = "auto" == e ? "text" != this.$mode.type : "text" != e
                },
                initialValue: "auto"
            },
            firstLineNumber: {
                set: function() {
                    this._emit("changeBreakpoint")
                },
                initialValue: 1
            },
            useWorker: {
                set: function(e) {
                    this.$useWorker = e, this.$stopWorker(), e && this.$startWorker()
                },
                initialValue: !0
            },
            useSoftTabs: {
                initialValue: !0
            },
            tabSize: {
                set: function(e) {
                    isNaN(e) || this.$tabSize === e || (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._emit("changeTabSize"))
                },
                initialValue: 4,
                handlesSet: !0
            },
            overwrite: {
                set: function() {
                    this._emit("changeOverwrite")
                },
                initialValue: !1
            },
            newLineMode: {
                set: function(e) {
                    this.doc.setNewLineMode(e)
                },
                get: function() {
                    return this.doc.getNewLineMode()
                },
                handlesSet: !0
            }
        }), t.EditSession = d
    }), ace.define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function(e, t) {
        var n = e("./lib/oop"),
            i = e("./lib/lang"),
            r = e("./lib/event_emitter").EventEmitter,
            o = e("./range").Range,
            s = function(e) {
                this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
                var t = this;
                this.lead.on("change", function(e) {
                    t._emit("changeCursor"), t.$isEmpty || t._emit("changeSelection"), !t.$keepDesiredColumnOnChange && e.old.column != e.value.column && (t.$desiredColumn = null)
                }), this.selectionAnchor.on("change", function() {
                    t.$isEmpty || t._emit("changeSelection")
                })
            };
        (function() {
            n.implement(this, r), this.isEmpty = function() {
                return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
            }, this.isMultiLine = function() {
                return this.isEmpty() ? !1 : this.getRange().isMultiLine()
            }, this.getCursor = function() {
                return this.lead.getPosition()
            }, this.setSelectionAnchor = function(e, t) {
                this.anchor.setPosition(e, t), this.$isEmpty && (this.$isEmpty = !1, this._emit("changeSelection"))
            }, this.getSelectionAnchor = function() {
                return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
            }, this.getSelectionLead = function() {
                return this.lead.getPosition()
            }, this.shiftSelection = function(e) {
                if (this.$isEmpty) return void this.moveCursorTo(this.lead.row, this.lead.column + e);
                var t = this.getSelectionAnchor(),
                    n = this.getSelectionLead(),
                    i = this.isBackwards();
                (!i || 0 !== t.column) && this.setSelectionAnchor(t.row, t.column + e), (i || 0 !== n.column) && this.$moveSelection(function() {
                    this.moveCursorTo(n.row, n.column + e)
                })
            }, this.isBackwards = function() {
                var e = this.anchor,
                    t = this.lead;
                return e.row > t.row || e.row == t.row && e.column > t.column
            }, this.getRange = function() {
                var e = this.anchor,
                    t = this.lead;
                return this.isEmpty() ? o.fromPoints(t, t) : this.isBackwards() ? o.fromPoints(t, e) : o.fromPoints(e, t)
            }, this.clearSelection = function() {
                this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
            }, this.selectAll = function() {
                var e = this.doc.getLength() - 1;
                this.setSelectionAnchor(0, 0), this.moveCursorTo(e, this.doc.getLine(e).length)
            }, this.setRange = this.setSelectionRange = function(e, t) {
                t ? (this.setSelectionAnchor(e.end.row, e.end.column), this.selectTo(e.start.row, e.start.column)) : (this.setSelectionAnchor(e.start.row, e.start.column), this.selectTo(e.end.row, e.end.column)), this.getRange().isEmpty() && (this.$isEmpty = !0), this.$desiredColumn = null
            }, this.$moveSelection = function(e) {
                var t = this.lead;
                this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this)
            }, this.selectTo = function(e, t) {
                this.$moveSelection(function() {
                    this.moveCursorTo(e, t)
                })
            }, this.selectToPosition = function(e) {
                this.$moveSelection(function() {
                    this.moveCursorToPosition(e)
                })
            }, this.selectUp = function() {
                this.$moveSelection(this.moveCursorUp)
            }, this.selectDown = function() {
                this.$moveSelection(this.moveCursorDown)
            }, this.selectRight = function() {
                this.$moveSelection(this.moveCursorRight)
            }, this.selectLeft = function() {
                this.$moveSelection(this.moveCursorLeft)
            }, this.selectLineStart = function() {
                this.$moveSelection(this.moveCursorLineStart)
            }, this.selectLineEnd = function() {
                this.$moveSelection(this.moveCursorLineEnd)
            }, this.selectFileEnd = function() {
                this.$moveSelection(this.moveCursorFileEnd)
            }, this.selectFileStart = function() {
                this.$moveSelection(this.moveCursorFileStart)
            }, this.selectWordRight = function() {
                this.$moveSelection(this.moveCursorWordRight)
            }, this.selectWordLeft = function() {
                this.$moveSelection(this.moveCursorWordLeft)
            }, this.getWordRange = function(e, t) {
                if ("undefined" == typeof t) {
                    var n = e || this.lead;
                    e = n.row, t = n.column
                }
                return this.session.getWordRange(e, t)
            }, this.selectWord = function() {
                this.setSelectionRange(this.getWordRange())
            }, this.selectAWord = function() {
                var e = this.getCursor(),
                    t = this.session.getAWordRange(e.row, e.column);
                this.setSelectionRange(t)
            }, this.getLineRange = function(e, t) {
                var n, i = "number" == typeof e ? e : this.lead.row,
                    r = this.session.getFoldLine(i);
                return r ? (i = r.start.row, n = r.end.row) : n = i, t === !0 ? new o(i, 0, n, this.session.getLine(n).length) : new o(i, 0, n + 1, 0)
            }, this.selectLine = function() {
                this.setSelectionRange(this.getLineRange())
            }, this.moveCursorUp = function() {
                this.moveCursorBy(-1, 0)
            }, this.moveCursorDown = function() {
                this.moveCursorBy(1, 0)
            }, this.moveCursorLeft = function() {
                var e, t = this.lead.getPosition();
                if (e = this.session.getFoldAt(t.row, t.column, -1)) this.moveCursorTo(e.start.row, e.start.column);
                else if (0 == t.column) t.row > 0 && this.moveCursorTo(t.row - 1, this.doc.getLine(t.row - 1).length);
                else {
                    var n = this.session.getTabSize();
                    this.session.isTabStop(t) && this.doc.getLine(t.row).slice(t.column - n, t.column).split(" ").length - 1 == n ? this.moveCursorBy(0, -n) : this.moveCursorBy(0, -1)
                }
            }, this.moveCursorRight = function() {
                var e, t = this.lead.getPosition();
                if (e = this.session.getFoldAt(t.row, t.column, 1)) this.moveCursorTo(e.end.row, e.end.column);
                else if (this.lead.column == this.doc.getLine(this.lead.row).length) this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
                else {
                    var n = this.session.getTabSize(),
                        t = this.lead;
                    this.session.isTabStop(t) && this.doc.getLine(t.row).slice(t.column, t.column + n).split(" ").length - 1 == n ? this.moveCursorBy(0, n) : this.moveCursorBy(0, 1)
                }
            }, this.moveCursorLineStart = function() {
                var e = this.lead.row,
                    t = this.lead.column,
                    n = this.session.documentToScreenRow(e, t),
                    i = this.session.screenToDocumentPosition(n, 0),
                    r = this.session.getDisplayLine(e, null, i.row, i.column),
                    o = r.match(/^\s*/);
                o[0].length != t && !this.session.$useEmacsStyleLineStart && (i.column += o[0].length), this.moveCursorToPosition(i)
            }, this.moveCursorLineEnd = function() {
                var e = this.lead,
                    t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
                if (this.lead.column == t.column) {
                    var n = this.session.getLine(t.row);
                    if (t.column == n.length) {
                        var i = n.search(/\s+$/);
                        i > 0 && (t.column = i)
                    }
                }
                this.moveCursorTo(t.row, t.column)
            }, this.moveCursorFileEnd = function() {
                var e = this.doc.getLength() - 1,
                    t = this.doc.getLine(e).length;
                this.moveCursorTo(e, t)
            }, this.moveCursorFileStart = function() {
                this.moveCursorTo(0, 0)
            }, this.moveCursorLongWordRight = function() {
                var e, t = this.lead.row,
                    n = this.lead.column,
                    i = this.doc.getLine(t),
                    r = i.substring(n);
                this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
                var o = this.session.getFoldAt(t, n, 1);
                return o ? void this.moveCursorTo(o.end.row, o.end.column) : ((e = this.session.nonTokenRe.exec(r)) && (n += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, r = i.substring(n)), n >= i.length ? (this.moveCursorTo(t, i.length), this.moveCursorRight(), t < this.doc.getLength() - 1 && this.moveCursorWordRight(), void 0) : ((e = this.session.tokenRe.exec(r)) && (n += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(t, n)))
            }, this.moveCursorLongWordLeft = function() {
                var e, t = this.lead.row,
                    n = this.lead.column;
                if (e = this.session.getFoldAt(t, n, -1)) return void this.moveCursorTo(e.start.row, e.start.column);
                var r = this.session.getFoldStringAt(t, n, -1);
                null == r && (r = this.doc.getLine(t).substring(0, n));
                var o, s = i.stringReverse(r);
                return this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, (o = this.session.nonTokenRe.exec(s)) && (n -= this.session.nonTokenRe.lastIndex, s = s.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), 0 >= n ? (this.moveCursorTo(t, 0), this.moveCursorLeft(), t > 0 && this.moveCursorWordLeft(), void 0) : ((o = this.session.tokenRe.exec(s)) && (n -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(t, n))
            }, this.$shortWordEndIndex = function(e) {
                var t, n, i = 0,
                    r = /\s/,
                    o = this.session.tokenRe;
                if (o.lastIndex = 0, t = this.session.tokenRe.exec(e)) i = this.session.tokenRe.lastIndex;
                else {
                    for (;
                        (n = e[i]) && r.test(n);) i++;
                    if (1 > i)
                        for (o.lastIndex = 0;
                            (n = e[i]) && !o.test(n);)
                            if (o.lastIndex = 0, i++, r.test(n)) {
                                if (i > 2) {
                                    i--;
                                    break
                                }
                                for (;
                                    (n = e[i]) && r.test(n);) i++;
                                if (i > 2) break
                            }
                }
                return o.lastIndex = 0, i
            }, this.moveCursorShortWordRight = function() {
                var e = this.lead.row,
                    t = this.lead.column,
                    n = this.doc.getLine(e),
                    i = n.substring(t),
                    r = this.session.getFoldAt(e, t, 1);
                if (r) return this.moveCursorTo(r.end.row, r.end.column);
                if (t == n.length) {
                    var o = this.doc.getLength();
                    do e++, i = this.doc.getLine(e); while (o > e && /^\s*$/.test(i));
                    /^\s+/.test(i) || (i = ""), t = 0
                }
                var s = this.$shortWordEndIndex(i);
                this.moveCursorTo(e, t + s)
            }, this.moveCursorShortWordLeft = function() {
                var e, t = this.lead.row,
                    n = this.lead.column;
                if (e = this.session.getFoldAt(t, n, -1)) return this.moveCursorTo(e.start.row, e.start.column);
                var r = this.session.getLine(t).substring(0, n);
                if (0 == n) {
                    do t--, r = this.doc.getLine(t); while (t > 0 && /^\s*$/.test(r));
                    n = r.length, /\s+$/.test(r) || (r = "")
                }
                var o = i.stringReverse(r),
                    s = this.$shortWordEndIndex(o);
                return this.moveCursorTo(t, n - s)
            }, this.moveCursorWordRight = function() {
                this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
            }, this.moveCursorWordLeft = function() {
                this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
            }, this.moveCursorBy = function(e, t) {
                var n = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
                0 === t && (this.$desiredColumn ? n.column = this.$desiredColumn : this.$desiredColumn = n.column);
                var i = this.session.screenToDocumentPosition(n.row + e, n.column);
                this.moveCursorTo(i.row, i.column + t, 0 === t)
            }, this.moveCursorToPosition = function(e) {
                this.moveCursorTo(e.row, e.column)
            }, this.moveCursorTo = function(e, t, n) {
                var i = this.session.getFoldAt(e, t, 1);
                i && (e = i.start.row, t = i.start.column), this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, n || (this.$desiredColumn = null)
            }, this.moveCursorToScreen = function(e, t, n) {
                var i = this.session.screenToDocumentPosition(e, t);
                this.moveCursorTo(i.row, i.column, n)
            }, this.detach = function() {
                this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
            }, this.fromOrientedRange = function(e) {
                this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn
            }, this.toOrientedRange = function(e) {
                var t = this.getRange();
                return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e
            }, this.toJSON = function() {
                if (this.rangeCount) var e = this.ranges.map(function(e) {
                    var t = e.clone();
                    return t.isBackwards = e.cursor == e.start, t
                });
                else {
                    var e = this.getRange();
                    e.isBackwards = this.isBackwards()
                }
                return e
            }, this.fromJSON = function(e) {
                if (void 0 == e.start) {
                    if (this.rangeList) {
                        this.toSingleRange(e[0]);
                        for (var t = e.length; t--;) {
                            var n = o.fromPoints(e[t].start, e[t].end);
                            e.isBackwards && (n.cursor = n.start), this.addRange(n, !0)
                        }
                        return
                    }
                    e = e[0]
                }
                this.rangeList && this.toSingleRange(e), this.setSelectionRange(e, e.isBackwards)
            }, this.isEqual = function(e) {
                if ((e.length || this.rangeCount) && e.length != this.rangeCount) return !1;
                if (!e.length || !this.ranges) return this.getRange().isEqual(e);
                for (var t = this.ranges.length; t--;)
                    if (!this.ranges[t].isEqual(e[t])) return !1;
                return !0
            }
        }).call(s.prototype), t.Selection = s
    }), ace.define("ace/range", ["require", "exports", "module"], function(e, t) {
        var n = function(e, t) {
                return e.row - t.row || e.column - t.column
            },
            i = function(e, t, n, i) {
                this.start = {
                    row: e,
                    column: t
                }, this.end = {
                    row: n,
                    column: i
                }
            };
        (function() {
            this.isEqual = function(e) {
                return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column
            }, this.toString = function() {
                return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
            }, this.contains = function(e, t) {
                return 0 == this.compare(e, t)
            }, this.compareRange = function(e) {
                var t, n = e.end,
                    i = e.start;
                return t = this.compare(n.row, n.column), 1 == t ? (t = this.compare(i.row, i.column), 1 == t ? 2 : 0 == t ? 1 : 0) : -1 == t ? -2 : (t = this.compare(i.row, i.column), -1 == t ? -1 : 1 == t ? 42 : 0)
            }, this.comparePoint = function(e) {
                return this.compare(e.row, e.column)
            }, this.containsRange = function(e) {
                return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end)
            }, this.intersects = function(e) {
                var t = this.compareRange(e);
                return -1 == t || 0 == t || 1 == t
            }, this.isEnd = function(e, t) {
                return this.end.row == e && this.end.column == t
            }, this.isStart = function(e, t) {
                return this.start.row == e && this.start.column == t
            }, this.setStart = function(e, t) {
                "object" == typeof e ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t)
            }, this.setEnd = function(e, t) {
                "object" == typeof e ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t)
            }, this.inside = function(e, t) {
                return 0 == this.compare(e, t) ? this.isEnd(e, t) || this.isStart(e, t) ? !1 : !0 : !1
            }, this.insideStart = function(e, t) {
                return 0 == this.compare(e, t) ? this.isEnd(e, t) ? !1 : !0 : !1
            }, this.insideEnd = function(e, t) {
                return 0 == this.compare(e, t) ? this.isStart(e, t) ? !1 : !0 : !1
            }, this.compare = function(e, t) {
                return this.isMultiLine() || e !== this.start.row ? e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0 : t < this.start.column ? -1 : t > this.end.column ? 1 : 0
            }, this.compareStart = function(e, t) {
                return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
            }, this.compareEnd = function(e, t) {
                return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t)
            }, this.compareInside = function(e, t) {
                return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
            }, this.clipRows = function(e, t) {
                if (this.end.row > t) var n = {
                    row: t + 1,
                    column: 0
                };
                else if (this.end.row < e) var n = {
                    row: e,
                    column: 0
                };
                if (this.start.row > t) var r = {
                    row: t + 1,
                    column: 0
                };
                else if (this.start.row < e) var r = {
                    row: e,
                    column: 0
                };
                return i.fromPoints(r || this.start, n || this.end)
            }, this.extend = function(e, t) {
                var n = this.compare(e, t);
                if (0 == n) return this;
                if (-1 == n) var r = {
                    row: e,
                    column: t
                };
                else var o = {
                    row: e,
                    column: t
                };
                return i.fromPoints(r || this.start, o || this.end)
            }, this.isEmpty = function() {
                return this.start.row === this.end.row && this.start.column === this.end.column
            }, this.isMultiLine = function() {
                return this.start.row !== this.end.row
            }, this.clone = function() {
                return i.fromPoints(this.start, this.end)
            }, this.collapseRows = function() {
                return 0 == this.end.column ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0)
            }, this.toScreenRange = function(e) {
                var t = e.documentToScreenPosition(this.start),
                    n = e.documentToScreenPosition(this.end);
                return new i(t.row, t.column, n.row, n.column)
            }, this.moveBy = function(e, t) {
                this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t
            }
        }).call(i.prototype), i.fromPoints = function(e, t) {
            return new i(e.row, e.column, t.row, t.column)
        }, i.comparePoints = n, i.comparePoints = function(e, t) {
            return e.row - t.row || e.column - t.column
        }, t.Range = i
    }), ace.define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function(e, t) {
        var n = e("../tokenizer").Tokenizer,
            i = e("./text_highlight_rules").TextHighlightRules,
            r = e("./behaviour").Behaviour,
            o = e("../unicode"),
            s = e("../lib/lang"),
            a = e("../token_iterator").TokenIterator,
            l = e("../range").Range,
            c = function() {
                this.HighlightRules = i, this.$behaviour = new r
            };
        (function() {
            this.tokenRe = new RegExp("^[" + o.packages.L + o.packages.Mn + o.packages.Mc + o.packages.Nd + o.packages.Pc + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + o.packages.L + o.packages.Mn + o.packages.Mc + o.packages.Nd + o.packages.Pc + "\\$_]|s])+", "g"), this.getTokenizer = function() {
                return this.$tokenizer || (this.$highlightRules = new this.HighlightRules, this.$tokenizer = new n(this.$highlightRules.getRules())), this.$tokenizer
            }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function(e, t, n, i) {
                function r(e) {
                    for (var t = n; i >= t; t++) e(o.getLine(t), t)
                }
                var o = t.doc,
                    a = !0,
                    l = !0,
                    c = 1 / 0,
                    u = t.getTabSize(),
                    h = !1;
                if (this.lineCommentStart) {
                    if (Array.isArray(this.lineCommentStart)) var d = this.lineCommentStart.map(s.escapeRegExp).join("|"),
                        g = this.lineCommentStart[0];
                    else var d = s.escapeRegExp(this.lineCommentStart),
                        g = this.lineCommentStart;
                    d = new RegExp("^(\\s*)(?:" + d + ") ?"), h = t.getUseSoftTabs();
                    var f = function(e, t) {
                            var n = e.match(d);
                            if (n) {
                                var i = n[1].length,
                                    r = n[0].length;
                                !y(e, i, r) && " " == n[0][r - 1] && r--, o.removeInLine(t, i, r)
                            }
                        },
                        p = g + " ",
                        m = function(e, t) {
                            (!a || /\S/.test(e)) && (y(e, c, c) ? o.insertInLine({
                                row: t,
                                column: c
                            }, p) : o.insertInLine({
                                row: t,
                                column: c
                            }, g))
                        },
                        v = function(e) {
                            return d.test(e)
                        },
                        y = function(e, t, n) {
                            for (var i = 0; t-- && " " == e.charAt(t);) i++;
                            if (i % u != 0) return !1;
                            for (var i = 0;
                                " " == e.charAt(n++);) i++;
                            return u > 2 ? i % u != u - 1 : i % u == 0
                        }
                } else {
                    if (!this.blockComment) return !1;
                    var g = this.blockComment.start,
                        w = this.blockComment.end,
                        d = new RegExp("^(\\s*)(?:" + s.escapeRegExp(g) + ")"),
                        A = new RegExp("(?:" + s.escapeRegExp(w) + ")\\s*$"),
                        m = function(e, t) {
                            v(e, t) || (!a || /\S/.test(e)) && (o.insertInLine({
                                row: t,
                                column: e.length
                            }, w), o.insertInLine({
                                row: t,
                                column: c
                            }, g))
                        },
                        f = function(e, t) {
                            var n;
                            (n = e.match(A)) && o.removeInLine(t, e.length - n[0].length, e.length), (n = e.match(d)) && o.removeInLine(t, n[1].length, n[0].length)
                        },
                        v = function(e, n) {
                            if (d.test(e)) return !0;
                            for (var i = t.getTokens(n), r = 0; r < i.length; r++)
                                if ("comment" === i[r].type) return !0
                        }
                }
                var C = 1 / 0;
                r(function(e, t) {
                    var n = e.search(/\S/); - 1 !== n ? (c > n && (c = n), l && !v(e, t) && (l = !1)) : C > e.length && (C = e.length)
                }), 1 / 0 == c && (c = C, a = !1, l = !1), h && c % u != 0 && (c = Math.floor(c / u) * u), r(l ? f : m)
            }, this.toggleBlockComment = function(e, t, n, i) {
                var r = this.blockComment;
                if (r) {
                    !r.start && r[0] && (r = r[0]);
                    var o, s, c = new a(t, i.row, i.column),
                        u = c.getCurrentToken(),
                        h = (t.selection, t.selection.toOrientedRange());
                    if (u && /comment/.test(u.type)) {
                        for (var d, g; u && /comment/.test(u.type);) {
                            var f = u.value.indexOf(r.start);
                            if (-1 != f) {
                                var p = c.getCurrentTokenRow(),
                                    m = c.getCurrentTokenColumn() + f;
                                d = new l(p, m, p, m + r.start.length);
                                break
                            }
                            u = c.stepBackward()
                        }
                        for (var c = new a(t, i.row, i.column), u = c.getCurrentToken(); u && /comment/.test(u.type);) {
                            var f = u.value.indexOf(r.end);
                            if (-1 != f) {
                                var p = c.getCurrentTokenRow(),
                                    m = c.getCurrentTokenColumn() + f;
                                g = new l(p, m, p, m + r.end.length);
                                break
                            }
                            u = c.stepForward()
                        }
                        g && t.remove(g), d && (t.remove(d), o = d.start.row, s = -r.start.length)
                    } else s = r.start.length, o = n.start.row, t.insert(n.end, r.end), t.insert(n.start, r.start);
                    h.start.row == o && (h.start.column += s), h.end.row == o && (h.end.column += s), t.selection.fromOrientedRange(h)
                }
            }, this.getNextLineIndent = function(e, t) {
                return this.$getIndent(t)
            }, this.checkOutdent = function() {
                return !1
            }, this.autoOutdent = function() {}, this.$getIndent = function(e) {
                return e.match(/^\s*/)[0]
            }, this.createWorker = function() {
                return null
            }, this.createModeDelegates = function(e) {
                this.$embeds = [], this.$modes = {};
                for (var t in e) e[t] && (this.$embeds.push(t), this.$modes[t] = new e[t]);
                for (var n = ["toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"], t = 0; t < n.length; t++)(function(e) {
                    var i = n[t],
                        r = e[i];
                    e[n[t]] = function() {
                        return this.$delegator(i, arguments, r)
                    }
                })(this)
            }, this.$delegator = function(e, t, n) {
                var i = t[0];
                "string" != typeof i && (i = i[0]);
                for (var r = 0; r < this.$embeds.length; r++)
                    if (this.$modes[this.$embeds[r]]) {
                        var o = i.split(this.$embeds[r]);
                        if (!o[0] && o[1]) {
                            t[0] = o[1];
                            var s = this.$modes[this.$embeds[r]];
                            return s[e].apply(s, t)
                        }
                    }
                var a = n.apply(this, t);
                return n ? a : void 0
            }, this.transformAction = function(e, t) {
                if (this.$behaviour) {
                    var n = this.$behaviour.getBehaviours();
                    for (var i in n)
                        if (n[i][t]) {
                            var r = n[i][t].apply(this, arguments);
                            if (r) return r
                        }
                }
            }, this.getKeywords = function(e) {
                if (!this.completionKeywords) {
                    var t = this.$tokenizer.rules,
                        n = [];
                    for (var i in t)
                        for (var r = t[i], o = 0, s = r.length; s > o; o++)
                            if ("string" == typeof r[o].token) /keyword|support|storage/.test(r[o].token) && n.push(r[o].regex);
                            else if ("object" == typeof r[o].token)
                        for (var a = 0, l = r[o].token.length; l > a; a++)
                            if (/keyword|support|storage/.test(r[o].token[a])) {
                                var i = r[o].regex.match(/\(.+?\)/g)[a];
                                n.push(i.substr(1, i.length - 2))
                            }
                    this.completionKeywords = n
                }
                return e ? n.concat(this.$keywordList || []) : this.$keywordList
            }, this.$createKeywordList = function() {
                return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || []
            }, this.getCompletions = function() {
                var e = this.$keywordList || this.$createKeywordList();
                return e.map(function(e) {
                    return {
                        name: e,
                        value: e,
                        score: 0,
                        meta: "keyword"
                    }
                })
            }
        }).call(c.prototype), t.Mode = c
    }), ace.define("ace/tokenizer", ["require", "exports", "module"], function(e, t) {
        var n = 1e3,
            i = function(e) {
                this.states = e, this.regExps = {}, this.matchMappings = {};
                for (var t in this.states) {
                    for (var n = this.states[t], i = [], r = 0, o = this.matchMappings[t] = {
                            defaultToken: "text"
                        }, s = "g", a = [], l = 0; l < n.length; l++) {
                        var c = n[l];
                        if (c.defaultToken && (o.defaultToken = c.defaultToken), c.caseInsensitive && (s = "gi"), null != c.regex) {
                            c.regex instanceof RegExp && (c.regex = c.regex.toString().slice(1, -1));
                            var u = c.regex,
                                h = new RegExp("(?:(" + u + ")|(.))").exec("a").length - 2;
                            if (Array.isArray(c.token))
                                if (1 == c.token.length || 1 == h) c.token = c.token[0];
                                else {
                                    if (h - 1 != c.token.length) throw new Error("number of classes and regexp groups in '" + c.token + "'\n'" + c.regex + "' doesn't match\n" + (h - 1) + "!=" + c.token.length);
                                    c.tokenArray = c.token, c.token = null, c.onMatch = this.$arrayTokens
                                }
                            else "function" == typeof c.token && !c.onMatch && (c.onMatch = h > 1 ? this.$applyToken : c.token);
                            h > 1 && (/\\\d/.test(c.regex) ? u = c.regex.replace(/\\([0-9]+)/g, function(e, t) {
                                return "\\" + (parseInt(t, 10) + r + 1)
                            }) : (h = 1, u = this.removeCapturingGroups(c.regex)), !c.splitRegex && "string" != typeof c.token && a.push(c)), o[r] = l, r += h, i.push(u), c.onMatch || (c.onMatch = null), c.__proto__ = null
                        }
                    }
                    a.forEach(function(e) {
                        e.splitRegex = this.createSplitterRegexp(e.regex, s)
                    }, this), this.regExps[t] = new RegExp("(" + i.join(")|(") + ")|($)", s)
                }
            };
        (function() {
            this.$setMaxTokenCount = function(e) {
                n = 0 | e
            }, this.$applyToken = function(e) {
                var t = this.splitRegex.exec(e).slice(1),
                    n = this.token.apply(this, t);
                if ("string" == typeof n) return [{
                    type: n,
                    value: e
                }];
                for (var i = [], r = 0, o = n.length; o > r; r++) t[r] && (i[i.length] = {
                    type: n[r],
                    value: t[r]
                });
                return i
            }, this.$arrayTokens = function(e) {
                if (!e) return [];
                var t = this.splitRegex.exec(e);
                if (!t) return "text";
                for (var n = [], i = this.tokenArray, r = 0, o = i.length; o > r; r++) t[r + 1] && (n[n.length] = {
                    type: i[r],
                    value: t[r + 1]
                });
                return n
            }, this.removeCapturingGroups = function(e) {
                var t = e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function(e, t) {
                    return t ? "(?:" : e
                });
                return t
            }, this.createSplitterRegexp = function(e, t) {
                if (-1 != e.indexOf("(?=")) {
                    var n = 0,
                        i = !1,
                        r = {};
                    e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(e, t, o, s, a, l) {
                        return i ? i = "]" != a : a ? i = !0 : s ? (n == r.stack && (r.end = l + 1, r.stack = -1), n--) : o && (n++, 1 != o.length && (r.stack = n, r.start = l)), e
                    }), null != r.end && /^\)*$/.test(e.substr(r.end)) && (e = e.substring(0, r.start) + e.substr(r.end))
                }
                return new RegExp(e, (t || "").replace("g", ""))
            }, this.getLineTokens = function(e, t) {
                if (t && "string" != typeof t) {
                    var i = t.slice(0);
                    t = i[0]
                } else var i = [];
                var r = t || "start",
                    o = this.states[r],
                    s = this.matchMappings[r],
                    a = this.regExps[r];
                a.lastIndex = 0;
                for (var l, c = [], u = 0, h = {
                        type: null,
                        value: ""
                    }; l = a.exec(e);) {
                    var d = s.defaultToken,
                        g = null,
                        f = l[0],
                        p = a.lastIndex;
                    if (p - f.length > u) {
                        var m = e.substring(u, p - f.length);
                        h.type == d ? h.value += m : (h.type && c.push(h), h = {
                            type: d,
                            value: m
                        })
                    }
                    for (var v = 0; v < l.length - 2; v++)
                        if (void 0 !== l[v + 1]) {
                            g = o[s[v]], d = g.onMatch ? g.onMatch(f, r, i) : g.token, g.next && (r = "string" == typeof g.next ? g.next : g.next(r, i), o = this.states[r], o || (window.console && console.error && console.error(r, "doesn't exist"), r = "start", o = this.states[r]), s = this.matchMappings[r], u = p, a = this.regExps[r], a.lastIndex = p);
                            break
                        }
                    if (f)
                        if ("string" == typeof d) g && g.merge === !1 || h.type !== d ? (h.type && c.push(h), h = {
                            type: d,
                            value: f
                        }) : h.value += f;
                        else if (d) {
                        h.type && c.push(h), h = {
                            type: null,
                            value: ""
                        };
                        for (var v = 0; v < d.length; v++) c.push(d[v])
                    }
                    if (u == e.length) break;
                    if (u = p, c.length > n) {
                        for (; u < e.length;) h.type && c.push(h), h = {
                            value: e.substring(u, u += 2e3),
                            type: "overflow"
                        };
                        r = "start", i = [];
                        break
                    }
                }
                return h.type && c.push(h), {
                    tokens: c,
                    state: i.length ? i : r
                }
            }
        }).call(i.prototype), t.Tokenizer = i
    }), ace.define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function(e, t) {
        var n = e("../lib/lang"),
            i = function() {
                this.$rules = {
                    start: [{
                        token: "empty_line",
                        regex: "^$"
                    }, {
                        defaultToken: "text"
                    }]
                }
            };
        (function() {
            this.addRules = function(e, t) {
                if (t)
                    for (var n in e) {
                        for (var i = e[n], r = 0; r < i.length; r++) {
                            var o = i[r];
                            o.next && ("string" != typeof o.next ? o.nextState && 0 !== o.nextState.indexOf(t) && (o.nextState = t + o.nextState) : 0 !== o.next.indexOf(t) && (o.next = t + o.next))
                        }
                        this.$rules[t + n] = i
                    } else
                        for (var n in e) this.$rules[n] = e[n]
            }, this.getRules = function() {
                return this.$rules
            }, this.embedRules = function(e, t, i, r, o) {
                var s = (new e).getRules();
                if (r)
                    for (var a = 0; a < r.length; a++) r[a] = t + r[a];
                else {
                    r = [];
                    for (var l in s) r.push(t + l)
                }
                if (this.addRules(s, t), i)
                    for (var c = Array.prototype[o ? "push" : "unshift"], a = 0; a < r.length; a++) c.apply(this.$rules[r[a]], n.deepCopy(i));
                this.$embeds || (this.$embeds = []), this.$embeds.push(t)
            }, this.getEmbeds = function() {
                return this.$embeds
            };
            var e = function(e, t) {
                    return "start" != e && t.unshift(this.nextState, e), this.nextState
                },
                t = function(e, t) {
                    return t[0] !== e ? "start" : (t.shift(), t.shift())
                };
            this.normalizeRules = function() {
                function n(o) {
                    var s = r[o];
                    s.processed = !0;
                    for (var a = 0; a < s.length; a++) {
                        var l = s[a];
                        !l.regex && l.start && (l.regex = l.start, l.next || (l.next = []), l.next.push({
                            defaultToken: l.token
                        }, {
                            token: l.token + ".end",
                            regex: l.end || l.start,
                            next: "pop"
                        }), l.token = l.token + ".start", l.push = !0);
                        var c = l.next || l.push;
                        if (c && Array.isArray(c)) {
                            var u = l.stateName;
                            u || (u = l.token, "string" != typeof u && (u = u[0] || ""), r[u] && (u += i++)), r[u] = c, l.next = u, n(u)
                        } else "pop" == c && (l.next = t);
                        if (l.push && (l.nextState = l.next || l.push, l.next = e, delete l.push), l.rules)
                            for (var h in l.rules) r[h] ? r[h].push && r[h].push.apply(r[h], l.rules[h]) : r[h] = l.rules[h];
                        if (l.include || "string" == typeof l) var d = l.include || l,
                            g = r[d];
                        else Array.isArray(l) && (g = l);
                        if (g) {
                            var f = [a, 1].concat(g);
                            l.noEscape && (f = f.filter(function(e) {
                                return !e.next
                            })), s.splice.apply(s, f), a--, g = null
                        }
                        l.keywordMap && (l.token = this.createKeywordMapper(l.keywordMap, l.defaultToken || "text", l.caseInsensitive), delete l.defaultToken)
                    }
                }
                var i = 0,
                    r = this.$rules;
                Object.keys(r).forEach(n, this)
            }, this.createKeywordMapper = function(e, t, n, i) {
                var r = Object.create(null);
                return Object.keys(e).forEach(function(t) {
                    var o = e[t];
                    n && (o = o.toLowerCase());
                    for (var s = o.split(i || "|"), a = s.length; a--;) r[s[a]] = t
                }), Object.getPrototypeOf(r) && (r.__proto__ = null), this.$keywordList = Object.keys(r), e = null, n ? function(e) {
                    return r[e.toLowerCase()] || t
                } : function(e) {
                    return r[e] || t
                }
            }, this.getKeywords = function() {
                return this.$keywords
            }
        }).call(i.prototype), t.TextHighlightRules = i
    }), ace.define("ace/mode/behaviour", ["require", "exports", "module"], function(e, t) {
        var n = function() {
            this.$behaviours = {}
        };
        (function() {
            this.add = function(e, t, n) {
                switch (void 0) {
                    case this.$behaviours:
                        this.$behaviours = {};
                    case this.$behaviours[e]:
                        this.$behaviours[e] = {}
                }
                this.$behaviours[e][t] = n
            }, this.addBehaviours = function(e) {
                for (var t in e)
                    for (var n in e[t]) this.add(t, n, e[t][n])
            }, this.remove = function(e) {
                this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e]
            }, this.inherit = function(e, t) {
                if ("function" == typeof e) var n = (new e).getBehaviours(t);
                else var n = e.getBehaviours(t);
                this.addBehaviours(n)
            }, this.getBehaviours = function(e) {
                if (!e) return this.$behaviours;
                for (var t = {}, n = 0; n < e.length; n++) this.$behaviours[e[n]] && (t[e[n]] = this.$behaviours[e[n]]);
                return t
            }
        }).call(n.prototype), t.Behaviour = n
    }), ace.define("ace/unicode", ["require", "exports", "module"], function(e, t) {
        function n(e) {
            var n = /\w{4}/g;
            for (var i in e) t.packages[i] = e[i].replace(n, "\\u$&")
        }
        t.packages = {}, n({
            L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
            Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
            Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
            Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
            Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
            Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
            M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
            Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
            Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
            Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
            N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
            Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
            Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
            No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
            P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
            Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
            Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
            Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
            Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
            Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
            Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
            Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
            S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
            Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
            Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
            Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
            So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
            Z: "002000A01680180E2000-200A20282029202F205F3000",
            Zs: "002000A01680180E2000-200A202F205F3000",
            Zl: "2028",
            Zp: "2029",
            C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
            Cc: "0000-001F007F-009F",
            Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
            Co: "E000-F8FF",
            Cs: "D800-DFFF",
            Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
        })
    }), ace.define("ace/token_iterator", ["require", "exports", "module"], function(e, t) {
        var n = function(e, t, n) {
            this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
            var i = e.getTokenAt(t, n);
            this.$tokenIndex = i ? i.index : -1
        };
        (function() {
            this.stepBackward = function() {
                for (this.$tokenIndex -= 1; this.$tokenIndex < 0;) {
                    if (this.$row -= 1, this.$row < 0) return this.$row = 0, null;
                    this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
                }
                return this.$rowTokens[this.$tokenIndex]
            }, this.stepForward = function() {
                this.$tokenIndex += 1;
                for (var e; this.$tokenIndex >= this.$rowTokens.length;) {
                    if (this.$row += 1, e || (e = this.$session.getLength()), this.$row >= e) return this.$row = e - 1, null;
                    this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
                }
                return this.$rowTokens[this.$tokenIndex]
            }, this.getCurrentToken = function() {
                return this.$rowTokens[this.$tokenIndex]
            }, this.getCurrentTokenRow = function() {
                return this.$row
            }, this.getCurrentTokenColumn = function() {
                var e = this.$rowTokens,
                    t = this.$tokenIndex,
                    n = e[t].start;
                if (void 0 !== n) return n;
                for (n = 0; t > 0;) t -= 1, n += e[t].value.length;
                return n
            }
        }).call(n.prototype), t.TokenIterator = n
    }), ace.define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function(e, t) {
        var n = e("./lib/oop"),
            i = e("./lib/event_emitter").EventEmitter,
            r = e("./range").Range,
            o = e("./anchor").Anchor,
            s = function(e) {
                this.$lines = [], 0 == e.length ? this.$lines = [""] : Array.isArray(e) ? this._insertLines(0, e) : this.insert({
                    row: 0,
                    column: 0
                }, e)
            };
        (function() {
            n.implement(this, i), this.setValue = function(e) {
                var t = this.getLength();
                this.remove(new r(0, 0, t, this.getLine(t - 1).length)), this.insert({
                    row: 0,
                    column: 0
                }, e)
            }, this.getValue = function() {
                return this.getAllLines().join(this.getNewLineCharacter())
            }, this.createAnchor = function(e, t) {
                return new o(this, e, t)
            }, this.$split = 0 == "aaa".split(/a/).length ? function(e) {
                return e.replace(/\r\n|\r/g, "\n").split("\n")
            } : function(e) {
                return e.split(/\r\n|\r|\n/)
            }, this.$detectNewLine = function(e) {
                var t = e.match(/^.*?(\r\n|\r|\n)/m);
                this.$autoNewLine = t ? t[1] : "\n"
            }, this.getNewLineCharacter = function() {
                switch (this.$newLineMode) {
                    case "windows":
                        return "\r\n";
                    case "unix":
                        return "\n";
                    default:
                        return this.$autoNewLine
                }
            }, this.$autoNewLine = "\n", this.$newLineMode = "auto", this.setNewLineMode = function(e) {
                this.$newLineMode !== e && (this.$newLineMode = e)
            }, this.getNewLineMode = function() {
                return this.$newLineMode
            }, this.isNewLine = function(e) {
                return "\r\n" == e || "\r" == e || "\n" == e
            }, this.getLine = function(e) {
                return this.$lines[e] || ""
            }, this.getLines = function(e, t) {
                return this.$lines.slice(e, t + 1)
            }, this.getAllLines = function() {
                return this.getLines(0, this.getLength())
            }, this.getLength = function() {
                return this.$lines.length
            }, this.getTextRange = function(e) {
                if (e.start.row == e.end.row) return this.getLine(e.start.row).substring(e.start.column, e.end.column);
                var t = this.getLines(e.start.row, e.end.row);
                t[0] = (t[0] || "").substring(e.start.column);
                var n = t.length - 1;
                return e.end.row - e.start.row == n && (t[n] = t[n].substring(0, e.end.column)), t.join(this.getNewLineCharacter())
            }, this.$clipPosition = function(e) {
                var t = this.getLength();
                return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : e.row < 0 && (e.row = 0), e
            }, this.insert = function(e, t) {
                if (!t || 0 === t.length) return e;
                e = this.$clipPosition(e), this.getLength() <= 1 && this.$detectNewLine(t);
                var n = this.$split(t),
                    i = n.splice(0, 1)[0],
                    r = 0 == n.length ? null : n.splice(n.length - 1, 1)[0];
                return e = this.insertInLine(e, i), null !== r && (e = this.insertNewLine(e), e = this._insertLines(e.row, n), e = this.insertInLine(e, r || "")), e
            }, this.insertLines = function(e, t) {
                return e >= this.getLength() ? this.insert({
                    row: e,
                    column: 0
                }, "\n" + t.join("\n")) : this._insertLines(Math.max(e, 0), t)
            }, this._insertLines = function(e, t) {
                if (0 == t.length) return {
                    row: e,
                    column: 0
                };
                if (t.length > 65535) {
                    var n = this._insertLines(e, t.slice(65535));
                    t = t.slice(0, 65535)
                }
                var i = [e, 0];
                i.push.apply(i, t), this.$lines.splice.apply(this.$lines, i);
                var o = new r(e, 0, e + t.length, 0),
                    s = {
                        action: "insertLines",
                        range: o,
                        lines: t
                    };
                return this._emit("change", {
                    data: s
                }), n || o.end
            }, this.insertNewLine = function(e) {
                e = this.$clipPosition(e);
                var t = this.$lines[e.row] || "";
                this.$lines[e.row] = t.substring(0, e.column), this.$lines.splice(e.row + 1, 0, t.substring(e.column, t.length));
                var n = {
                        row: e.row + 1,
                        column: 0
                    },
                    i = {
                        action: "insertText",
                        range: r.fromPoints(e, n),
                        text: this.getNewLineCharacter()
                    };
                return this._emit("change", {
                    data: i
                }), n
            }, this.insertInLine = function(e, t) {
                if (0 == t.length) return e;
                var n = this.$lines[e.row] || "";
                this.$lines[e.row] = n.substring(0, e.column) + t + n.substring(e.column);
                var i = {
                        row: e.row,
                        column: e.column + t.length
                    },
                    o = {
                        action: "insertText",
                        range: r.fromPoints(e, i),
                        text: t
                    };
                return this._emit("change", {
                    data: o
                }), i
            }, this.remove = function(e) {
                if (!e instanceof r && (e = r.fromPoints(e.start, e.end)), e.start = this.$clipPosition(e.start), e.end = this.$clipPosition(e.end), e.isEmpty()) return e.start;
                var t = e.start.row,
                    n = e.end.row;
                if (e.isMultiLine()) {
                    var i = 0 == e.start.column ? t : t + 1,
                        o = n - 1;
                    e.end.column > 0 && this.removeInLine(n, 0, e.end.column), o >= i && this._removeLines(i, o), i != t && (this.removeInLine(t, e.start.column, this.getLine(t).length), this.removeNewLine(e.start.row))
                } else this.removeInLine(t, e.start.column, e.end.column);
                return e.start
            }, this.removeInLine = function(e, t, n) {
                if (t != n) {
                    var i = new r(e, t, e, n),
                        o = this.getLine(e),
                        s = o.substring(t, n),
                        a = o.substring(0, t) + o.substring(n, o.length);
                    this.$lines.splice(e, 1, a);
                    var l = {
                        action: "removeText",
                        range: i,
                        text: s
                    };
                    return this._emit("change", {
                        data: l
                    }), i.start
                }
            }, this.removeLines = function(e, t) {
                return 0 > e || t >= this.getLength() ? this.remove(new r(e, 0, t + 1, 0)) : this._removeLines(e, t)
            }, this._removeLines = function(e, t) {
                var n = new r(e, 0, t + 1, 0),
                    i = this.$lines.splice(e, t - e + 1),
                    o = {
                        action: "removeLines",
                        range: n,
                        nl: this.getNewLineCharacter(),
                        lines: i
                    };
                return this._emit("change", {
                    data: o
                }), i
            }, this.removeNewLine = function(e) {
                var t = this.getLine(e),
                    n = this.getLine(e + 1),
                    i = new r(e, t.length, e + 1, 0),
                    o = t + n;
                this.$lines.splice(e, 2, o);
                var s = {
                    action: "removeText",
                    range: i,
                    text: this.getNewLineCharacter()
                };
                this._emit("change", {
                    data: s
                })
            }, this.replace = function(e, t) {
                if (!e instanceof r && (e = r.fromPoints(e.start, e.end)), 0 == t.length && e.isEmpty()) return e.start;
                if (t == this.getTextRange(e)) return e.end;
                if (this.remove(e), t) var n = this.insert(e.start, t);
                else n = e.start;
                return n
            }, this.applyDeltas = function(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t],
                        i = r.fromPoints(n.range.start, n.range.end);
                    "insertLines" == n.action ? this.insertLines(i.start.row, n.lines) : "insertText" == n.action ? this.insert(i.start, n.text) : "removeLines" == n.action ? this._removeLines(i.start.row, i.end.row - 1) : "removeText" == n.action && this.remove(i)
                }
            }, this.revertDeltas = function(e) {
                for (var t = e.length - 1; t >= 0; t--) {
                    var n = e[t],
                        i = r.fromPoints(n.range.start, n.range.end);
                    "insertLines" == n.action ? this._removeLines(i.start.row, i.end.row - 1) : "insertText" == n.action ? this.remove(i) : "removeLines" == n.action ? this._insertLines(i.start.row, n.lines) : "removeText" == n.action && this.insert(i.start, n.text)
                }
            }, this.indexToPosition = function(e, t) {
                for (var n = this.$lines || this.getAllLines(), i = this.getNewLineCharacter().length, r = t || 0, o = n.length; o > r; r++)
                    if (e -= n[r].length + i, 0 > e) return {
                        row: r,
                        column: e + n[r].length + i
                    };
                return {
                    row: o - 1,
                    column: n[o - 1].length
                }
            }, this.positionToIndex = function(e, t) {
                for (var n = this.$lines || this.getAllLines(), i = this.getNewLineCharacter().length, r = 0, o = Math.min(e.row, n.length), s = t || 0; o > s; ++s) r += n[s].length + i;
                return r + e.column
            }
        }).call(s.prototype), t.Document = s
    }), ace.define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t) {
        var n = e("./lib/oop"),
            i = e("./lib/event_emitter").EventEmitter,
            r = t.Anchor = function(e, t, n) {
                this.$onChange = this.onChange.bind(this), this.attach(e), "undefined" == typeof n ? this.setPosition(t.row, t.column) : this.setPosition(t, n)
            };
        (function() {
            n.implement(this, i), this.getPosition = function() {
                return this.$clipPositionToDocument(this.row, this.column)
            }, this.getDocument = function() {
                return this.document
            }, this.$insertRight = !1, this.onChange = function(e) {
                var t = e.data,
                    n = t.range;
                if ((n.start.row != n.end.row || n.start.row == this.row) && !(n.start.row > this.row || n.start.row == this.row && n.start.column > this.column)) {
                    var i = this.row,
                        r = this.column,
                        o = n.start,
                        s = n.end;
                    "insertText" === t.action ? o.row === i && o.column <= r ? o.column === r && this.$insertRight || (o.row === s.row ? r += s.column - o.column : (r -= o.column, i += s.row - o.row)) : o.row !== s.row && o.row < i && (i += s.row - o.row) : "insertLines" === t.action ? o.row <= i && (i += s.row - o.row) : "removeText" === t.action ? o.row === i && o.column < r ? r = s.column >= r ? o.column : Math.max(0, r - (s.column - o.column)) : o.row !== s.row && o.row < i ? (s.row === i && (r = Math.max(0, r - s.column) + o.column), i -= s.row - o.row) : s.row === i && (i -= s.row - o.row, r = Math.max(0, r - s.column) + o.column) : "removeLines" == t.action && o.row <= i && (s.row <= i ? i -= s.row - o.row : (i = o.row, r = 0)), this.setPosition(i, r, !0)
                }
            }, this.setPosition = function(e, t, n) {
                var i;
                if (i = n ? {
                        row: e,
                        column: t
                    } : this.$clipPositionToDocument(e, t), this.row != i.row || this.column != i.column) {
                    var r = {
                        row: this.row,
                        column: this.column
                    };
                    this.row = i.row, this.column = i.column, this._emit("change", {
                        old: r,
                        value: i
                    })
                }
            }, this.detach = function() {
                this.document.removeEventListener("change", this.$onChange)
            }, this.attach = function(e) {
                this.document = e || this.document, this.document.on("change", this.$onChange)
            }, this.$clipPositionToDocument = function(e, t) {
                var n = {};
                return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : 0 > e ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), 0 > t && (n.column = 0), n
            }
        }).call(r.prototype)
    }), ace.define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t) {
        var n = e("./lib/oop"),
            i = e("./lib/event_emitter").EventEmitter,
            r = function(e) {
                this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
                var t = this;
                this.$worker = function() {
                    if (t.running) {
                        for (var e = new Date, n = t.currentLine, i = -1, r = t.doc; t.lines[n];) n++;
                        var o = n,
                            s = r.getLength(),
                            a = 0;
                        for (t.running = !1; s > n;) {
                            t.$tokenizeRow(n), i = n;
                            do n++; while (t.lines[n]);
                            if (a++, a % 5 == 0 && new Date - e > 20) return t.running = setTimeout(t.$worker, 20), void(t.currentLine = n)
                        }
                        t.currentLine = n, i >= o && t.fireUpdateEvent(o, i)
                    }
                }
            };
        (function() {
            n.implement(this, i), this.setTokenizer = function(e) {
                this.tokenizer = e, this.lines = [], this.states = [], this.start(0)
            }, this.setDocument = function(e) {
                this.doc = e, this.lines = [], this.states = [], this.stop()
            }, this.fireUpdateEvent = function(e, t) {
                var n = {
                    first: e,
                    last: t
                };
                this._emit("update", {
                    data: n
                })
            }, this.start = function(e) {
                this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
            }, this.scheduleStart = function() {
                this.running || (this.running = setTimeout(this.$worker, 700))
            }, this.$updateOnChange = function(e) {
                var t = e.range,
                    n = t.start.row,
                    i = t.end.row - n;
                if (0 === i) this.lines[n] = null;
                else if ("removeText" == e.action || "removeLines" == e.action) this.lines.splice(n, i + 1, null), this.states.splice(n, i + 1, null);
                else {
                    var r = Array(i + 1);
                    r.unshift(n, 1), this.lines.splice.apply(this.lines, r), this.states.splice.apply(this.states, r)
                }
                this.currentLine = Math.min(n, this.currentLine, this.doc.getLength()), this.stop()
            }, this.stop = function() {
                this.running && clearTimeout(this.running), this.running = !1
            }, this.getTokens = function(e) {
                return this.lines[e] || this.$tokenizeRow(e)
            }, this.getState = function(e) {
                return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start"
            }, this.$tokenizeRow = function(e) {
                var t = this.doc.getLine(e),
                    n = this.states[e - 1],
                    i = this.tokenizer.getLineTokens(t, n, e);
                return this.states[e] + "" != i.state + "" ? (this.states[e] = i.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = i.tokens
            }
        }).call(r.prototype), t.BackgroundTokenizer = r
    }), ace.define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t) {
        var n = e("./lib/lang"),
            i = (e("./lib/oop"), e("./range").Range),
            r = function(e, t, n) {
                this.setRegexp(e), this.clazz = t, this.type = n || "text"
            };
        (function() {
            this.MAX_RANGES = 500, this.setRegexp = function(e) {
                this.regExp + "" != e + "" && (this.regExp = e, this.cache = [])
            }, this.update = function(e, t, r, o) {
                if (this.regExp)
                    for (var s = o.firstRow, a = o.lastRow, l = s; a >= l; l++) {
                        var c = this.cache[l];
                        null == c && (c = n.getMatchOffsets(r.getLine(l), this.regExp), c.length > this.MAX_RANGES && (c = c.slice(0, this.MAX_RANGES)), c = c.map(function(e) {
                            return new i(l, e.offset, l, e.offset + e.length)
                        }), this.cache[l] = c.length ? c : "");
                        for (var u = c.length; u--;) t.drawSingleLineMarker(e, c[u].toScreenRange(r), this.clazz, o)
                    }
            }
        }).call(r.prototype), t.SearchHighlight = r
    }), ace.define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function(e, t) {
        function n() {
            this.getFoldAt = function(e, t, n) {
                var i = this.getFoldLine(e);
                if (!i) return null;
                for (var r = i.folds, o = 0; o < r.length; o++) {
                    var s = r[o];
                    if (s.range.contains(e, t)) {
                        if (1 == n && s.range.isEnd(e, t)) continue;
                        if (-1 == n && s.range.isStart(e, t)) continue;
                        return s
                    }
                }
            }, this.getFoldsInRange = function(e) {
                var t = e.start,
                    n = e.end,
                    i = this.$foldData,
                    r = [];
                t.column += 1, n.column -= 1;
                for (var o = 0; o < i.length; o++) {
                    var s = i[o].range.compareRange(e);
                    if (2 != s) {
                        if (-2 == s) break;
                        for (var a = i[o].folds, l = 0; l < a.length; l++) {
                            var c = a[l];
                            if (s = c.range.compareRange(e), -2 == s) break;
                            if (2 != s) {
                                if (42 == s) break;
                                r.push(c)
                            }
                        }
                    }
                }
                return t.column -= 1, n.column += 1, r
            }, this.getAllFolds = function() {
                function e(e) {
                    t.push(e)
                }
                for (var t = [], n = this.$foldData, i = 0; i < n.length; i++)
                    for (var r = 0; r < n[i].folds.length; r++) e(n[i].folds[r]);
                return t
            }, this.getFoldStringAt = function(e, t, n, i) {
                if (i = i || this.getFoldLine(e), !i) return null;
                for (var r, o, s = {
                        end: {
                            column: 0
                        }
                    }, a = 0; a < i.folds.length; a++) {
                    o = i.folds[a];
                    var l = o.range.compareEnd(e, t);
                    if (-1 == l) {
                        r = this.getLine(o.start.row).substring(s.end.column, o.start.column);
                        break
                    }
                    if (0 === l) return null;
                    s = o
                }
                return r || (r = this.getLine(o.start.row).substring(s.end.column)), -1 == n ? r.substring(0, t - s.end.column) : 1 == n ? r.substring(t - s.end.column) : r
            }, this.getFoldLine = function(e, t) {
                var n = this.$foldData,
                    i = 0;
                for (t && (i = n.indexOf(t)), -1 == i && (i = 0), i; i < n.length; i++) {
                    var r = n[i];
                    if (r.start.row <= e && r.end.row >= e) return r;
                    if (r.end.row > e) return null
                }
                return null
            }, this.getNextFoldLine = function(e, t) {
                var n = this.$foldData,
                    i = 0;
                for (t && (i = n.indexOf(t)), -1 == i && (i = 0), i; i < n.length; i++) {
                    var r = n[i];
                    if (r.end.row >= e) return r
                }
                return null
            }, this.getFoldedRowCount = function(e, t) {
                for (var n = this.$foldData, i = t - e + 1, r = 0; r < n.length; r++) {
                    var o = n[r],
                        s = o.end.row,
                        a = o.start.row;
                    if (s >= t) {
                        t > a && (a >= e ? i -= t - a : i = 0);
                        break
                    }
                    s >= e && (i -= a >= e ? s - a : s - e + 1)
                }
                return i
            }, this.$addFoldLine = function(e) {
                return this.$foldData.push(e), this.$foldData.sort(function(e, t) {
                    return e.start.row - t.start.row
                }), e
            }, this.addFold = function(e, t) {
                var n, i = this.$foldData,
                    s = !1;
                e instanceof o ? n = e : (n = new o(t, e), n.collapseChildren = t.collapseChildren), this.$clipRangeToDocument(n.range);
                var a = n.start.row,
                    l = n.start.column,
                    c = n.end.row,
                    u = n.end.column;
                if (c > a || a == c && u - 2 >= l) {
                    var h = this.getFoldAt(a, l, 1),
                        d = this.getFoldAt(c, u, -1);
                    if (h && d == h) return h.addSubFold(n);
                    if (h && !h.range.isStart(a, l) || d && !d.range.isEnd(c, u)) throw new Error("A fold can't intersect already existing fold" + n.range + h.range);
                    var g = this.getFoldsInRange(n.range);
                    g.length > 0 && (this.removeFolds(g), g.forEach(function(e) {
                        n.addSubFold(e)
                    }));
                    for (var f = 0; f < i.length; f++) {
                        var p = i[f];
                        if (c == p.start.row) {
                            p.addFold(n), s = !0;
                            break
                        }
                        if (a == p.end.row) {
                            if (p.addFold(n), s = !0, !n.sameRow) {
                                var m = i[f + 1];
                                if (m && m.start.row == c) {
                                    p.merge(m);
                                    break
                                }
                            }
                            break
                        }
                        if (c <= p.start.row) break
                    }
                    return s || (p = this.$addFoldLine(new r(this.$foldData, n))), this.$useWrapMode ? this.$updateWrapData(p.start.row, p.start.row) : this.$updateRowLengthCache(p.start.row, p.start.row), this.$modified = !0, this._emit("changeFold", {
                        data: n,
                        action: "add"
                    }), n
                }
                throw new Error("The range has to be at least 2 characters width")
            }, this.addFolds = function(e) {
                e.forEach(function(e) {
                    this.addFold(e)
                }, this)
            }, this.removeFold = function(e) {
                var t = e.foldLine,
                    n = t.start.row,
                    i = t.end.row,
                    r = this.$foldData,
                    o = t.folds;
                if (1 == o.length) r.splice(r.indexOf(t), 1);
                else if (t.range.isEnd(e.end.row, e.end.column)) o.pop(), t.end.row = o[o.length - 1].end.row, t.end.column = o[o.length - 1].end.column;
                else if (t.range.isStart(e.start.row, e.start.column)) o.shift(), t.start.row = o[0].start.row, t.start.column = o[0].start.column;
                else if (e.sameRow) o.splice(o.indexOf(e), 1);
                else {
                    var s = t.split(e.start.row, e.start.column);
                    o = s.folds, o.shift(), s.start.row = o[0].start.row, s.start.column = o[0].start.column
                }
                this.$updating || (this.$useWrapMode ? this.$updateWrapData(n, i) : this.$updateRowLengthCache(n, i)), this.$modified = !0, this._emit("changeFold", {
                    data: e,
                    action: "remove"
                })
            }, this.removeFolds = function(e) {
                for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
                t.forEach(function(e) {
                    this.removeFold(e)
                }, this), this.$modified = !0
            }, this.expandFold = function(e) {
                this.removeFold(e), e.subFolds.forEach(function(t) {
                    e.restoreRange(t), this.addFold(t)
                }, this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = []
            }, this.expandFolds = function(e) {
                e.forEach(function(e) {
                    this.expandFold(e)
                }, this)
            }, this.unfold = function(e, t) {
                var n, r;
                if (null == e ? (n = new i(0, 0, this.getLength(), 0), t = !0) : n = "number" == typeof e ? new i(e, 0, e, this.getLine(e).length) : "row" in e ? i.fromPoints(e, e) : e, r = this.getFoldsInRange(n), t) this.removeFolds(r);
                else
                    for (; r.length;) this.expandFolds(r), r = this.getFoldsInRange(n)
            }, this.isRowFolded = function(e, t) {
                return !!this.getFoldLine(e, t)
            }, this.getRowFoldEnd = function(e, t) {
                var n = this.getFoldLine(e, t);
                return n ? n.end.row : e
            }, this.getRowFoldStart = function(e, t) {
                var n = this.getFoldLine(e, t);
                return n ? n.start.row : e
            }, this.getFoldDisplayLine = function(e, t, n, i, r) {
                null == i && (i = e.start.row, r = 0), null == t && (t = e.end.row, n = this.getLine(t).length);
                var o = this.doc,
                    s = "";
                return e.walk(function(e, t, n, a) {
                    if (!(i > t)) {
                        if (t == i) {
                            if (r > n) return;
                            a = Math.max(r, a)
                        }
                        s += null != e ? e : o.getLine(t).substring(a, n)
                    }
                }, t, n), s
            }, this.getDisplayLine = function(e, t, n, i) {
                var r = this.getFoldLine(e);
                if (!r) {
                    var o;
                    return o = this.doc.getLine(e), o.substring(i || 0, t || o.length)
                }
                return this.getFoldDisplayLine(r, e, t, n, i)
            }, this.$cloneFoldData = function() {
                var e = [];
                return e = this.$foldData.map(function(t) {
                    var n = t.folds.map(function(e) {
                        return e.clone()
                    });
                    return new r(e, n)
                })
            }, this.toggleFold = function(e) {
                var t, n, i = this.selection,
                    r = i.getRange();
                if (r.isEmpty()) {
                    var o = r.start;
                    if (t = this.getFoldAt(o.row, o.column)) return void this.expandFold(t);
                    (n = this.findMatchingBracket(o)) ? 1 == r.comparePoint(n) ? r.end = n : (r.start = n, r.start.column++, r.end.column--): (n = this.findMatchingBracket({
                        row: o.row,
                        column: o.column + 1
                    })) ? (1 == r.comparePoint(n) ? r.end = n : r.start = n, r.start.column++) : r = this.getCommentFoldRange(o.row, o.column) || r
                } else {
                    var s = this.getFoldsInRange(r);
                    if (e && s.length) return void this.expandFolds(s);
                    1 == s.length && (t = s[0])
                }
                if (t || (t = this.getFoldAt(r.start.row, r.start.column)), t && t.range.toString() == r.toString()) return void this.expandFold(t);
                var a = "...";
                if (!r.isMultiLine()) {
                    if (a = this.getTextRange(r), a.length < 4) return;
                    a = a.trim().substring(0, 2) + ".."
                }
                this.addFold(a, r)
            }, this.getCommentFoldRange = function(e, t, n) {
                var r = new s(this, e, t),
                    o = r.getCurrentToken();
                if (o && /^comment|string/.test(o.type)) {
                    var a = new i,
                        l = new RegExp(o.type.replace(/\..*/, "\\."));
                    if (1 != n) {
                        do o = r.stepBackward(); while (o && l.test(o.type));
                        r.stepForward()
                    }
                    if (a.start.row = r.getCurrentTokenRow(), a.start.column = r.getCurrentTokenColumn() + 2, r = new s(this, e, t), -1 != n) {
                        do o = r.stepForward(); while (o && l.test(o.type));
                        o = r.stepBackward()
                    } else o = r.getCurrentToken();
                    return a.end.row = r.getCurrentTokenRow(), a.end.column = r.getCurrentTokenColumn() + o.value.length - 2, a
                }
            }, this.foldAll = function(e, t, n) {
                void 0 == n && (n = 1e5);
                var i = this.foldWidgets;
                t = t || this.getLength(), e = e || 0;
                for (var r = e; t > r; r++)
                    if (null == i[r] && (i[r] = this.getFoldWidget(r)), "start" == i[r]) {
                        var o = this.getFoldWidgetRange(r),
                            s = o.end.row;
                        if (o && o.isMultiLine() && t >= s && o.start.row >= e) try {
                            var a = this.addFold("...", o);
                            a.collapseChildren = n, r = s
                        } catch (l) {}
                    }
            }, this.$foldStyles = {
                manual: 1,
                markbegin: 1,
                markbeginend: 1
            }, this.$foldStyle = "markbegin", this.setFoldStyle = function(e) {
                if (!this.$foldStyles[e]) throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
                if (this.$foldStyle != e) {
                    this.$foldStyle = e, "manual" == e && this.unfold();
                    var t = this.$foldMode;
                    this.$setFolding(null), this.$setFolding(t)
                }
            }, this.$setFolding = function(e) {
                return this.$foldMode != e ? (this.$foldMode = e, this.removeListener("change", this.$updateFoldWidgets), this._emit("changeAnnotation"), e && "manual" != this.$foldStyle ? (this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), void 0) : void(this.foldWidgets = null)) : void 0
            }, this.getParentFoldRangeData = function(e, t) {
                var n = this.foldWidgets;
                if (!n || t && n[e]) return {};
                for (var i, r = e - 1; r >= 0;) {
                    var o = n[r];
                    if (null == o && (o = n[r] = this.getFoldWidget(r)), "start" == o) {
                        var s = this.getFoldWidgetRange(r);
                        if (i || (i = s), s && s.end.row >= e) break
                    }
                    r--
                }
                return {
                    range: -1 !== r && s,
                    firstRange: i
                }
            }, this.onFoldWidgetClick = function(e, t) {
                var n = this.getFoldWidget(e),
                    i = this.getLine(e);
                t = t.domEvent;
                var r = t.shiftKey,
                    o = t.ctrlKey || t.metaKey,
                    s = t.altKey,
                    a = "end" === n ? -1 : 1,
                    l = this.getFoldAt(e, -1 === a ? 0 : i.length, a);
                if (l) return void(r || o ? this.removeFold(l) : this.expandFold(l));
                var c = this.getFoldWidgetRange(e);
                if (c && !c.isMultiLine() && (l = this.getFoldAt(c.start.row, c.start.column, 1), l && c.isEqual(l.range))) return void this.removeFold(l);
                if (s) {
                    var u = this.getParentFoldRangeData(e);
                    if (u.range) var h = u.range.start.row + 1,
                        d = u.range.end.row;
                    this.foldAll(h, d, o ? 1e4 : 0)
                } else if (r) {
                    var d = c ? c.end.row : this.getLength();
                    this.foldAll(e + 1, c.end.row, o ? 1e4 : 0)
                } else c && (o && (c.collapseChildren = 1e4), this.addFold("...", c));
                c || ((t.target || t.srcElement).className += " ace_invalid")
            }, this.updateFoldWidgets = function(e) {
                var t = e.data,
                    n = t.range,
                    i = n.start.row,
                    r = n.end.row - i;
                if (0 === r) this.foldWidgets[i] = null;
                else if ("removeText" == t.action || "removeLines" == t.action) this.foldWidgets.splice(i, r + 1, null);
                else {
                    var o = Array(r + 1);
                    o.unshift(i, 1), this.foldWidgets.splice.apply(this.foldWidgets, o)
                }
            }
        }
        var i = e("../range").Range,
            r = e("./fold_line").FoldLine,
            o = e("./fold").Fold,
            s = e("../token_iterator").TokenIterator;
        t.Folding = n
    }), ace.define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function(e, t) {
        function n(e, t) {
            this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
            var n = t[t.length - 1];
            this.range = new i(t[0].start.row, t[0].start.column, n.end.row, n.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function(e) {
                e.setFoldLine(this)
            }, this)
        }
        var i = e("../range").Range;
        (function() {
            this.shiftRow = function(e) {
                this.start.row += e, this.end.row += e, this.folds.forEach(function(t) {
                    t.start.row += e, t.end.row += e
                })
            }, this.addFold = function(e) {
                if (e.sameRow) {
                    if (e.start.row < this.startRow || e.endRow > this.endRow) throw new Error("Can't add a fold to this FoldLine as it has no connection");
                    this.folds.push(e), this.folds.sort(function(e, t) {
                        return -e.range.compareEnd(t.start.row, t.start.column)
                    }), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column)
                } else if (e.start.row == this.end.row) this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column;
                else {
                    if (e.end.row != this.start.row) throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
                    this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column
                }
                e.foldLine = this
            }, this.containsRow = function(e) {
                return e >= this.start.row && e <= this.end.row
            }, this.walk = function(e, t, n) {
                var i, r, o, s = 0,
                    a = this.folds,
                    l = !0;
                null == t && (t = this.end.row, n = this.end.column);
                for (var c = 0; c < a.length; c++) {
                    if (i = a[c], r = i.range.compareStart(t, n), -1 == r) return void e(null, t, n, s, l);
                    if (o = e(null, i.start.row, i.start.column, s, l), o = !o && e(i.placeholder, i.start.row, i.start.column, s), o || 0 == r) return;
                    l = !i.sameRow, s = i.end.column
                }
                e(null, t, n, s, l)
            }, this.getNextFoldTo = function(e, t) {
                for (var n, i, r = 0; r < this.folds.length; r++) {
                    if (n = this.folds[r], i = n.range.compareEnd(e, t), -1 == i) return {
                        fold: n,
                        kind: "after"
                    };
                    if (0 == i) return {
                        fold: n,
                        kind: "inside"
                    }
                }
                return null
            }, this.addRemoveChars = function(e, t, n) {
                var i, r, o = this.getNextFoldTo(e, t);
                if (o)
                    if (i = o.fold, "inside" == o.kind && i.start.column != t && i.start.row != e) window.console && window.console.log(e, t, i);
                    else if (i.start.row == e) {
                    r = this.folds;
                    var s = r.indexOf(i);
                    for (0 == s && (this.start.column += n), s; s < r.length; s++) {
                        if (i = r[s], i.start.column += n, !i.sameRow) return;
                        i.end.column += n
                    }
                    this.end.column += n
                }
            }, this.split = function(e, t) {
                var i = this.getNextFoldTo(e, t).fold,
                    r = this.folds,
                    o = this.foldData;
                if (!i) return null;
                var s = r.indexOf(i),
                    a = r[s - 1];
                this.end.row = a.end.row, this.end.column = a.end.column, r = r.splice(s, r.length - s);
                var l = new n(o, r);
                return o.splice(o.indexOf(this) + 1, 0, l), l
            }, this.merge = function(e) {
                for (var t = e.folds, n = 0; n < t.length; n++) this.addFold(t[n]);
                var i = this.foldData;
                i.splice(i.indexOf(e), 1)
            }, this.toString = function() {
                var e = [this.range.toString() + ": ["];
                return this.folds.forEach(function(t) {
                    e.push("  " + t.toString())
                }), e.push("]"), e.join("\n")
            }, this.idxToPosition = function(e) {
                for (var t, n = 0, i = 0; i < this.folds.length; i++) {
                    var t = this.folds[i];
                    if (e -= t.start.column - n, 0 > e) return {
                        row: t.start.row,
                        column: t.start.column + e
                    };
                    if (e -= t.placeholder.length, 0 > e) return t.start;
                    n = t.end.column
                }
                return {
                    row: this.end.row,
                    column: this.end.column + e
                }
            }
        }).call(n.prototype), t.FoldLine = n
    }), ace.define("ace/edit_session/fold", ["require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop"], function(e, t) {
        function n(e, t) {
            e.row -= t.row, 0 == e.row && (e.column -= t.column)
        }

        function i(e, t) {
            n(e.start, t), n(e.end, t)
        }

        function r(e, t) {
            0 == e.row && (e.column += t.column), e.row += t.row
        }

        function o(e, t) {
            r(e.start, t), r(e.end, t)
        }
        var s = (e("../range").Range, e("../range_list").RangeList),
            a = e("../lib/oop"),
            l = t.Fold = function(e, t) {
                this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = []
            };
        a.inherits(l, s),
            function() {
                this.toString = function() {
                    return '"' + this.placeholder + '" ' + this.range.toString()
                }, this.setFoldLine = function(e) {
                    this.foldLine = e, this.subFolds.forEach(function(t) {
                        t.setFoldLine(e)
                    })
                }, this.clone = function() {
                    var e = this.range.clone(),
                        t = new l(e, this.placeholder);
                    return this.subFolds.forEach(function(e) {
                        t.subFolds.push(e.clone())
                    }), t.collapseChildren = this.collapseChildren, t
                }, this.addSubFold = function(e) {
                    if (!this.range.isEqual(e)) {
                        if (!this.range.containsRange(e)) throw new Error("A fold can't intersect already existing fold" + e.range + this.range);
                        i(e, this.start);
                        for (var t = e.start.row, n = e.start.column, r = 0, o = -1; r < this.subFolds.length && (o = this.subFolds[r].range.compare(t, n), 1 == o); r++);
                        var s = this.subFolds[r];
                        if (0 == o) return s.addSubFold(e);
                        for (var t = e.range.end.row, n = e.range.end.column, a = r, o = -1; a < this.subFolds.length && (o = this.subFolds[a].range.compare(t, n), 1 == o); a++); {
                            this.subFolds[a]
                        }
                        if (0 == o) throw new Error("A fold can't intersect already existing fold" + e.range + this.range); {
                            this.subFolds.splice(r, a - r, e)
                        }
                        return e.setFoldLine(this.foldLine), e
                    }
                }, this.restoreRange = function(e) {
                    return o(e, this.start)
                }
            }.call(l.prototype)
    }), ace.define("ace/range_list", ["require", "exports", "module", "ace/range"], function(e, t) {
        var n = e("./range").Range,
            i = n.comparePoints,
            r = function() {
                this.ranges = []
            };
        (function() {
            this.comparePoints = i, this.pointIndex = function(e, t, n) {
                for (var r = this.ranges, o = n || 0; o < r.length; o++) {
                    var s = r[o],
                        a = i(e, s.end);
                    if (!(a > 0)) {
                        var l = i(e, s.start);
                        return 0 === a ? t && 0 !== l ? -o - 2 : o : l > 0 || 0 === l && !t ? o : -o - 1
                    }
                }
                return -o - 1
            }, this.add = function(e) {
                var t = !e.isEmpty(),
                    n = this.pointIndex(e.start, t);
                0 > n && (n = -n - 1);
                var i = this.pointIndex(e.end, t, n);
                return 0 > i ? i = -i - 1 : i++, this.ranges.splice(n, i - n, e)
            }, this.addList = function(e) {
                for (var t = [], n = e.length; n--;) t.push.call(t, this.add(e[n]));
                return t
            }, this.substractPoint = function(e) {
                var t = this.pointIndex(e);
                return t >= 0 ? this.ranges.splice(t, 1) : void 0
            }, this.merge = function() {
                var e = [],
                    t = this.ranges;
                t = t.sort(function(e, t) {
                    return i(e.start, t.start)
                });
                for (var n, r = t[0], o = 1; o < t.length; o++) {
                    n = r, r = t[o];
                    var s = i(n.end, r.start);
                    0 > s || (0 != s || n.isEmpty() || r.isEmpty()) && (i(n.end, r.end) < 0 && (n.end.row = r.end.row, n.end.column = r.end.column), t.splice(o, 1), e.push(r), r = n, o--)
                }
                return this.ranges = t, e
            }, this.contains = function(e, t) {
                return this.pointIndex({
                    row: e,
                    column: t
                }) >= 0
            }, this.containsPoint = function(e) {
                return this.pointIndex(e) >= 0
            }, this.rangeAtPoint = function(e) {
                var t = this.pointIndex(e);
                return t >= 0 ? this.ranges[t] : void 0
            }, this.clipRows = function(e, t) {
                var n = this.ranges;
                if (n[0].start.row > t || n[n.length - 1].start.row < e) return [];
                var i = this.pointIndex({
                    row: e,
                    column: 0
                });
                0 > i && (i = -i - 1);
                var r = this.pointIndex({
                    row: t,
                    column: 0
                }, i);
                0 > r && (r = -r - 1);
                for (var o = [], s = i; r > s; s++) o.push(n[s]);
                return o
            }, this.removeAll = function() {
                return this.ranges.splice(0, this.ranges.length)
            }, this.attach = function(e) {
                this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
            }, this.detach = function() {
                this.session && (this.session.removeListener("change", this.onChange), this.session = null)
            }, this.$onChange = function(e) {
                var t = e.data.range;
                if ("i" == e.data.action[0]) var n = t.start,
                    i = t.end;
                else var i = t.start,
                    n = t.end;
                for (var r = n.row, o = i.row, s = o - r, a = -n.column + i.column, l = this.ranges, c = 0, u = l.length; u > c; c++) {
                    var h = l[c];
                    if (!(h.end.row < r)) {
                        if (h.start.row > r) break;
                        if (h.start.row == r && h.start.column >= n.column && (h.start.column != n.column || !this.$insertRight) && (h.start.column += a, h.start.row += s), h.end.row == r && h.end.column >= n.column) {
                            if (h.end.column == n.column && this.$insertRight) continue;
                            h.end.column == n.column && a > 0 && u - 1 > c && h.end.column > h.start.column && h.end.column == l[c + 1].start.column && (h.end.column -= a), h.end.column += a, h.end.row += s
                        }
                    }
                }
                if (0 != s && u > c)
                    for (; u > c; c++) {
                        var h = l[c];
                        h.start.row += s, h.end.row += s
                    }
            }
        }).call(r.prototype), t.RangeList = r
    }), ace.define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function(e, t) {
        function n() {
            this.findMatchingBracket = function(e, t) {
                if (0 == e.column) return null;
                var n = t || this.getLine(e.row).charAt(e.column - 1);
                if ("" == n) return null;
                var i = n.match(/([\(\[\{])|([\)\]\}])/);
                return i ? i[1] ? this.$findClosingBracket(i[1], e) : this.$findOpeningBracket(i[2], e) : null
            }, this.getBracketRange = function(e) {
                var t, n = this.getLine(e.row),
                    i = !0,
                    o = n.charAt(e.column - 1),
                    s = o && o.match(/([\(\[\{])|([\)\]\}])/);
                if (s || (o = n.charAt(e.column), e = {
                        row: e.row,
                        column: e.column + 1
                    }, s = o && o.match(/([\(\[\{])|([\)\]\}])/), i = !1), !s) return null;
                if (s[1]) {
                    var a = this.$findClosingBracket(s[1], e);
                    if (!a) return null;
                    t = r.fromPoints(e, a), i || (t.end.column++, t.start.column--), t.cursor = t.end
                } else {
                    var a = this.$findOpeningBracket(s[2], e);
                    if (!a) return null;
                    t = r.fromPoints(a, e), i || (t.start.column++, t.end.column--), t.cursor = t.start
                }
                return t
            }, this.$brackets = {
                ")": "(",
                "(": ")",
                "]": "[",
                "[": "]",
                "{": "}",
                "}": "{"
            }, this.$findOpeningBracket = function(e, t, n) {
                var r = this.$brackets[e],
                    o = 1,
                    s = new i(this, t.row, t.column),
                    a = s.getCurrentToken();
                if (a || (a = s.stepForward()), a) {
                    n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("rparen", ".paren") + ")+"));
                    for (var l = t.column - s.getCurrentTokenColumn() - 2, c = a.value;;) {
                        for (; l >= 0;) {
                            var u = c.charAt(l);
                            if (u == r) {
                                if (o -= 1, 0 == o) return {
                                    row: s.getCurrentTokenRow(),
                                    column: l + s.getCurrentTokenColumn()
                                }
                            } else u == e && (o += 1);
                            l -= 1
                        }
                        do a = s.stepBackward(); while (a && !n.test(a.type));
                        if (null == a) break;
                        c = a.value, l = c.length - 1
                    }
                    return null
                }
            }, this.$findClosingBracket = function(e, t, n) {
                var r = this.$brackets[e],
                    o = 1,
                    s = new i(this, t.row, t.column),
                    a = s.getCurrentToken();
                if (a || (a = s.stepForward()), a) {
                    n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("lparen", ".paren") + ")+"));
                    for (var l = t.column - s.getCurrentTokenColumn();;) {
                        for (var c = a.value, u = c.length; u > l;) {
                            var h = c.charAt(l);
                            if (h == r) {
                                if (o -= 1, 0 == o) return {
                                    row: s.getCurrentTokenRow(),
                                    column: l + s.getCurrentTokenColumn()
                                }
                            } else h == e && (o += 1);
                            l += 1
                        }
                        do a = s.stepForward(); while (a && !n.test(a.type));
                        if (null == a) break;
                        l = 0
                    }
                    return null
                }
            }
        }
        var i = e("../token_iterator").TokenIterator,
            r = e("../range").Range;
        t.BracketMatch = n
    }), ace.define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t) {
        var n = e("./lib/lang"),
            i = e("./lib/oop"),
            r = e("./range").Range,
            o = function() {
                this.$options = {}
            };
        (function() {
            this.set = function(e) {
                return i.mixin(this.$options, e), this
            }, this.getOptions = function() {
                return n.copyObject(this.$options)
            }, this.setOptions = function(e) {
                this.$options = e
            }, this.find = function(e) {
                var t = this.$matchIterator(e, this.$options);
                if (!t) return !1;
                var n = null;
                return t.forEach(function(e, t, i) {
                    if (e.start) n = e;
                    else {
                        var o = e.offset + (i || 0);
                        n = new r(t, o, t, o + e.length)
                    }
                    return !0
                }), n
            }, this.findAll = function(e) {
                var t = this.$options;
                if (!t.needle) return [];
                this.$assembleRegExp(t);
                var i = t.range,
                    o = i ? e.getLines(i.start.row, i.end.row) : e.doc.getAllLines(),
                    s = [],
                    a = t.re;
                if (t.$isMultiLine)
                    for (var l = a.length, c = o.length - l, u = a.offset || 0; c >= u; u++) {
                        for (var h = 0; l > h && -1 != o[u + h].search(a[h]); h++);
                        var d = o[u],
                            g = o[u + l - 1],
                            f = d.match(a[0])[0].length,
                            p = g.match(a[l - 1])[0].length;
                        s.push(new r(u, d.length - f, u + l - 1, p))
                    } else
                        for (var m = 0; m < o.length; m++)
                            for (var v = n.getMatchOffsets(o[m], a), h = 0; h < v.length; h++) {
                                var y = v[h];
                                s.push(new r(m, y.offset, m, y.offset + y.length))
                            }
                if (i) {
                    for (var w = i.start.column, A = i.start.column, m = 0, h = s.length - 1; h > m && s[m].start.column < w && s[m].start.row == i.start.row;) m++;
                    for (; h > m && s[h].end.column > A && s[h].end.row == i.end.row;) h--;
                    for (s = s.slice(m, h + 1), m = 0, h = s.length; h > m; m++) s[m].start.row += i.start.row, s[m].end.row += i.start.row
                }
                return s
            }, this.replace = function(e, t) {
                var n = this.$options,
                    i = this.$assembleRegExp(n);
                if (n.$isMultiLine) return t;
                if (i) {
                    var r = i.exec(e);
                    if (!r || r[0].length != e.length) return null;
                    if (t = e.replace(i, t), n.preserveCase) {
                        t = t.split("");
                        for (var o = Math.min(e.length, e.length); o--;) {
                            var s = e[o];
                            t[o] = s && s.toLowerCase() != s ? t[o].toUpperCase() : t[o].toLowerCase()
                        }
                        t = t.join("")
                    }
                    return t
                }
            }, this.$matchIterator = function(e, t) {
                var i = this.$assembleRegExp(t);
                if (!i) return !1;
                var o, s = this,
                    a = t.backwards;
                if (t.$isMultiLine) var l = i.length,
                    c = function(t, n, s) {
                        var a = t.search(i[0]);
                        if (-1 != a) {
                            for (var c = 1; l > c; c++)
                                if (t = e.getLine(n + c), -1 == t.search(i[c])) return;
                            var u = t.match(i[l - 1])[0].length,
                                h = new r(n, a, n + l - 1, u);
                            return 1 == i.offset ? (h.start.row--, h.start.column = Number.MAX_VALUE) : s && (h.start.column += s), o(h) ? !0 : void 0
                        }
                    };
                else if (a) var c = function(e, t, r) {
                    for (var s = n.getMatchOffsets(e, i), a = s.length - 1; a >= 0; a--)
                        if (o(s[a], t, r)) return !0
                };
                else var c = function(e, t, r) {
                    for (var s = n.getMatchOffsets(e, i), a = 0; a < s.length; a++)
                        if (o(s[a], t, r)) return !0
                };
                return {
                    forEach: function(n) {
                        o = n, s.$lineIterator(e, t).forEach(c)
                    }
                }
            }, this.$assembleRegExp = function(e, t) {
                if (e.needle instanceof RegExp) return e.re = e.needle;
                var i = e.needle;
                if (!e.needle) return e.re = !1;
                e.regExp || (i = n.escapeRegExp(i)), e.wholeWord && (i = "\\b" + i + "\\b");
                var r = e.caseSensitive ? "g" : "gi";
                if (e.$isMultiLine = !t && /[\n\r]/.test(i), e.$isMultiLine) return e.re = this.$assembleMultilineRegExp(i, r);
                try {
                    var o = new RegExp(i, r)
                } catch (s) {
                    o = !1
                }
                return e.re = o
            }, this.$assembleMultilineRegExp = function(e, t) {
                for (var n = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), i = [], r = 0; r < n.length; r++) try {
                    i.push(new RegExp(n[r], t))
                } catch (o) {
                    return !1
                }
                return "" == n[0] ? (i.shift(), i.offset = 1) : i.offset = 0, i
            }, this.$lineIterator = function(e, t) {
                var n = 1 == t.backwards,
                    i = 0 != t.skipCurrent,
                    r = t.range,
                    o = t.start;
                o || (o = r ? r[n ? "end" : "start"] : e.selection.getRange()), o.start && (o = o[i != n ? "end" : "start"]);
                var s = r ? r.start.row : 0,
                    a = r ? r.end.row : e.getLength() - 1,
                    l = n ? function(n) {
                        var i = o.row,
                            r = e.getLine(i).substring(0, o.column);
                        if (!n(r, i)) {
                            for (i--; i >= s; i--)
                                if (n(e.getLine(i), i)) return;
                            if (0 != t.wrap)
                                for (i = a, s = o.row; i >= s; i--)
                                    if (n(e.getLine(i), i)) return
                        }
                    } : function(n) {
                        var i = o.row,
                            r = e.getLine(i).substr(o.column);
                        if (!n(r, i, o.column)) {
                            for (i += 1; a >= i; i++)
                                if (n(e.getLine(i), i)) return;
                            if (0 != t.wrap)
                                for (i = s, a = o.row; a >= i; i++)
                                    if (n(e.getLine(i), i)) return
                        }
                    };
                return {
                    forEach: l
                }
            }
        }).call(o.prototype), t.Search = o
    }), ace.define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("../keyboard/hash_handler").HashHandler,
            r = e("../lib/event_emitter").EventEmitter,
            o = function(e, t) {
                i.call(this, t, e), this.byName = this.commands, this.setDefaultHandler("exec", function(e) {
                    return e.command.exec(e.editor, e.args || {})
                })
            };
        n.inherits(o, i),
            function() {
                n.implement(this, r), this.exec = function(e, t, n) {
                    if ("string" == typeof e && (e = this.commands[e]), !e) return !1;
                    if (t && t.$readOnly && !e.readOnly) return !1;
                    var i = {
                            editor: t,
                            command: e,
                            args: n
                        },
                        r = this._emit("exec", i);
                    return this._signal("afterExec", i), r === !1 ? !1 : !0
                }, this.toggleRecording = function(e) {
                    return this.$inReplay ? void 0 : (e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function(e) {
                        this.macro.push([e.command, e.args])
                    }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0))
                }, this.replay = function(e) {
                    if (!this.$inReplay && this.macro) {
                        if (this.recording) return this.toggleRecording(e);
                        try {
                            this.$inReplay = !0, this.macro.forEach(function(t) {
                                "string" == typeof t ? this.exec(t, e) : this.exec(t[0], e, t[1])
                            }, this)
                        } finally {
                            this.$inReplay = !1
                        }
                    }
                }, this.trimMacro = function(e) {
                    return e.map(function(e) {
                        return "string" != typeof e[0] && (e[0] = e[0].name), e[1] || (e = e[0]), e
                    })
                }
            }.call(o.prototype), t.CommandManager = o
    }), ace.define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(e, t) {
        function n(e, t) {
            if (this.platform = t || (r.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.__defineGetter__ && this.__defineSetter__ && "undefined" != typeof console && console.error) {
                var n = !1,
                    i = function() {
                        n || (n = !0, console.error("commmandKeyBinding has too many m's. use commandKeyBinding"))
                    };
                this.__defineGetter__("commmandKeyBinding", function() {
                    return i(), this.commandKeyBinding
                }), this.__defineSetter__("commmandKeyBinding", function(e) {
                    return i(), this.commandKeyBinding = e
                })
            } else this.commmandKeyBinding = this.commandKeyBinding;
            this.addCommands(e)
        }
        var i = e("../lib/keys"),
            r = e("../lib/useragent");
        (function() {
            this.addCommand = function(e) {
                this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e)
            }, this.removeCommand = function(e) {
                var t = "string" == typeof e ? e : e.name;
                e = this.commands[t], delete this.commands[t];
                var n = this.commandKeyBinding;
                for (var i in n)
                    for (var r in n[i]) n[i][r] == e && delete n[i][r]
            }, this.bindKey = function(e, t) {
                if (e) {
                    if ("function" == typeof t) return void this.addCommand({
                        exec: t,
                        bindKey: e,
                        name: t.name || e
                    });
                    var n = this.commandKeyBinding;
                    e.split("|").forEach(function(e) {
                        var i = this.parseKeys(e, t),
                            r = i.hashId;
                        (n[r] || (n[r] = {}))[i.key] = t
                    }, this)
                }
            }, this.addCommands = function(e) {
                e && Object.keys(e).forEach(function(t) {
                    var n = e[t];
                    if (n) return "string" == typeof n ? this.bindKey(n, t) : ("function" == typeof n && (n = {
                        exec: n
                    }), n.name || (n.name = t), this.addCommand(n), void 0)
                }, this)
            }, this.removeCommands = function(e) {
                Object.keys(e).forEach(function(t) {
                    this.removeCommand(e[t])
                }, this)
            }, this.bindKeys = function(e) {
                Object.keys(e).forEach(function(t) {
                    this.bindKey(t, e[t])
                }, this)
            }, this._buildKeyHash = function(e) {
                var t = e.bindKey;
                if (t) {
                    var n = "string" == typeof t ? t : t[this.platform];
                    this.bindKey(n, e)
                }
            }, this.parseKeys = function(e) {
                -1 != e.indexOf(" ") && (e = e.split(/\s+/).pop());
                var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e) {
                        return e
                    }),
                    n = t.pop(),
                    r = i[n];
                if (i.FUNCTION_KEYS[r]) n = i.FUNCTION_KEYS[r].toLowerCase();
                else {
                    if (!t.length) return {
                        key: n,
                        hashId: -1
                    };
                    if (1 == t.length && "shift" == t[0]) return {
                        key: n.toUpperCase(),
                        hashId: -1
                    }
                }
                for (var o = 0, s = t.length; s--;) {
                    var a = i.KEY_MODS[t[s]];
                    if (null == a) return "undefined" != typeof console && console.error("invalid modifier " + t[s] + " in " + e), !1;
                    o |= a
                }
                return {
                    key: n,
                    hashId: o
                }
            }, this.findKeyCommand = function(e, t) {
                var n = this.commandKeyBinding;
                return n[e] && n[e][t]
            }, this.handleKeyboard = function(e, t, n) {
                return {
                    command: this.findKeyCommand(t, n)
                }
            }
        }).call(n.prototype), t.HashHandler = n
    }), ace.define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config"], function(e, t) {
        function n(e, t) {
            return {
                win: e,
                mac: t
            }
        }
        var i = e("../lib/lang"),
            r = e("../config");
        t.commands = [{
            name: "showSettingsMenu",
            bindKey: n("Ctrl-,", "Command-,"),
            exec: function(e) {
                r.loadModule("ace/ext/settings_menu", function(t) {
                    t.init(e), e.showSettingsMenu()
                })
            },
            readOnly: !0
        }, {
            name: "selectall",
            bindKey: n("Ctrl-A", "Command-A"),
            exec: function(e) {
                e.selectAll()
            },
            readOnly: !0
        }, {
            name: "centerselection",
            bindKey: n(null, "Ctrl-L"),
            exec: function(e) {
                e.centerSelection()
            },
            readOnly: !0
        }, {
            name: "gotoline",
            bindKey: n("Ctrl-L", "Command-L"),
            exec: function(e) {
                var t = parseInt(prompt("Enter line number:"), 10);
                isNaN(t) || e.gotoLine(t)
            },
            readOnly: !0
        }, {
            name: "fold",
            bindKey: n("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
            exec: function(e) {
                e.session.toggleFold(!1)
            },
            readOnly: !0
        }, {
            name: "unfold",
            bindKey: n("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
            exec: function(e) {
                e.session.toggleFold(!0)
            },
            readOnly: !0
        }, {
            name: "foldall",
            bindKey: n("Alt-0", "Command-Option-0"),
            exec: function(e) {
                e.session.foldAll()
            },
            readOnly: !0
        }, {
            name: "unfoldall",
            bindKey: n("Alt-Shift-0", "Command-Option-Shift-0"),
            exec: function(e) {
                e.session.unfold()
            },
            readOnly: !0
        }, {
            name: "findnext",
            bindKey: n("Ctrl-K", "Command-G"),
            exec: function(e) {
                e.findNext()
            },
            readOnly: !0
        }, {
            name: "findprevious",
            bindKey: n("Ctrl-Shift-K", "Command-Shift-G"),
            exec: function(e) {
                e.findPrevious()
            },
            readOnly: !0
        }, {
            name: "find",
            bindKey: n("Ctrl-F", "Command-F"),
            exec: function(e) {
                r.loadModule("ace/ext/searchbox", function(t) {
                    t.Search(e)
                })
            },
            readOnly: !0
        }, {
            name: "overwrite",
            bindKey: "Insert",
            exec: function(e) {
                e.toggleOverwrite()
            },
            readOnly: !0
        }, {
            name: "selecttostart",
            bindKey: n("Ctrl-Shift-Home", "Command-Shift-Up"),
            exec: function(e) {
                e.getSelection().selectFileStart()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            group: "fileJump"
        }, {
            name: "gotostart",
            bindKey: n("Ctrl-Home", "Command-Home|Command-Up"),
            exec: function(e) {
                e.navigateFileStart()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            group: "fileJump"
        }, {
            name: "selectup",
            bindKey: n("Shift-Up", "Shift-Up"),
            exec: function(e) {
                e.getSelection().selectUp()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "golineup",
            bindKey: n("Up", "Up|Ctrl-P"),
            exec: function(e, t) {
                e.navigateUp(t.times)
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selecttoend",
            bindKey: n("Ctrl-Shift-End", "Command-Shift-Down"),
            exec: function(e) {
                e.getSelection().selectFileEnd()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            group: "fileJump"
        }, {
            name: "gotoend",
            bindKey: n("Ctrl-End", "Command-End|Command-Down"),
            exec: function(e) {
                e.navigateFileEnd()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            group: "fileJump"
        }, {
            name: "selectdown",
            bindKey: n("Shift-Down", "Shift-Down"),
            exec: function(e) {
                e.getSelection().selectDown()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "golinedown",
            bindKey: n("Down", "Down|Ctrl-N"),
            exec: function(e, t) {
                e.navigateDown(t.times)
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selectwordleft",
            bindKey: n("Ctrl-Shift-Left", "Option-Shift-Left"),
            exec: function(e) {
                e.getSelection().selectWordLeft()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "gotowordleft",
            bindKey: n("Ctrl-Left", "Option-Left"),
            exec: function(e) {
                e.navigateWordLeft()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selecttolinestart",
            bindKey: n("Alt-Shift-Left", "Command-Shift-Left"),
            exec: function(e) {
                e.getSelection().selectLineStart()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "gotolinestart",
            bindKey: n("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
            exec: function(e) {
                e.navigateLineStart()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selectleft",
            bindKey: n("Shift-Left", "Shift-Left"),
            exec: function(e) {
                e.getSelection().selectLeft()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "gotoleft",
            bindKey: n("Left", "Left|Ctrl-B"),
            exec: function(e, t) {
                e.navigateLeft(t.times)
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selectwordright",
            bindKey: n("Ctrl-Shift-Right", "Option-Shift-Right"),
            exec: function(e) {
                e.getSelection().selectWordRight()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "gotowordright",
            bindKey: n("Ctrl-Right", "Option-Right"),
            exec: function(e) {
                e.navigateWordRight()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selecttolineend",
            bindKey: n("Alt-Shift-Right", "Command-Shift-Right"),
            exec: function(e) {
                e.getSelection().selectLineEnd()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "gotolineend",
            bindKey: n("Alt-Right|End", "Command-Right|End|Ctrl-E"),
            exec: function(e) {
                e.navigateLineEnd()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selectright",
            bindKey: n("Shift-Right", "Shift-Right"),
            exec: function(e) {
                e.getSelection().selectRight()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "gotoright",
            bindKey: n("Right", "Right|Ctrl-F"),
            exec: function(e, t) {
                e.navigateRight(t.times)
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selectpagedown",
            bindKey: "Shift-PageDown",
            exec: function(e) {
                e.selectPageDown()
            },
            readOnly: !0
        }, {
            name: "pagedown",
            bindKey: n(null, "Option-PageDown"),
            exec: function(e) {
                e.scrollPageDown()
            },
            readOnly: !0
        }, {
            name: "gotopagedown",
            bindKey: n("PageDown", "PageDown|Ctrl-V"),
            exec: function(e) {
                e.gotoPageDown()
            },
            readOnly: !0
        }, {
            name: "selectpageup",
            bindKey: "Shift-PageUp",
            exec: function(e) {
                e.selectPageUp()
            },
            readOnly: !0
        }, {
            name: "pageup",
            bindKey: n(null, "Option-PageUp"),
            exec: function(e) {
                e.scrollPageUp()
            },
            readOnly: !0
        }, {
            name: "gotopageup",
            bindKey: "PageUp",
            exec: function(e) {
                e.gotoPageUp()
            },
            readOnly: !0
        }, {
            name: "scrollup",
            bindKey: n("Ctrl-Up", null),
            exec: function(e) {
                e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight)
            },
            readOnly: !0
        }, {
            name: "scrolldown",
            bindKey: n("Ctrl-Down", null),
            exec: function(e) {
                e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight)
            },
            readOnly: !0
        }, {
            name: "selectlinestart",
            bindKey: "Shift-Home",
            exec: function(e) {
                e.getSelection().selectLineStart()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selectlineend",
            bindKey: "Shift-End",
            exec: function(e) {
                e.getSelection().selectLineEnd()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "togglerecording",
            bindKey: n("Ctrl-Alt-E", "Command-Option-E"),
            exec: function(e) {
                e.commands.toggleRecording(e)
            },
            readOnly: !0
        }, {
            name: "replaymacro",
            bindKey: n("Ctrl-Shift-E", "Command-Shift-E"),
            exec: function(e) {
                e.commands.replay(e)
            },
            readOnly: !0
        }, {
            name: "jumptomatching",
            bindKey: n("Ctrl-P", "Ctrl-Shift-P"),
            exec: function(e) {
                e.jumpToMatching()
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "selecttomatching",
            bindKey: n("Ctrl-Shift-P", null),
            exec: function(e) {
                e.jumpToMatching(!0)
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "cut",
            exec: function(e) {
                var t = e.getSelectionRange();
                e._emit("cut", t), e.selection.isEmpty() || (e.session.remove(t), e.clearSelection())
            },
            multiSelectAction: "forEach"
        }, {
            name: "removeline",
            bindKey: n("Ctrl-D", "Command-D"),
            exec: function(e) {
                e.removeLines()
            },
            multiSelectAction: "forEachLine"
        }, {
            name: "duplicateSelection",
            bindKey: n("Ctrl-Shift-D", "Command-Shift-D"),
            exec: function(e) {
                e.duplicateSelection()
            },
            multiSelectAction: "forEach"
        }, {
            name: "sortlines",
            bindKey: n("Ctrl-Alt-S", "Command-Alt-S"),
            exec: function(e) {
                e.sortLines()
            },
            multiSelectAction: "forEachLine"
        }, {
            name: "togglecomment",
            bindKey: n("Ctrl-/", "Command-/"),
            exec: function(e) {
                e.toggleCommentLines()
            },
            multiSelectAction: "forEachLine"
        }, {
            name: "toggleBlockComment",
            bindKey: n("Ctrl-Shift-/", "Command-Shift-/"),
            exec: function(e) {
                e.toggleBlockComment()
            },
            multiSelectAction: "forEach"
        }, {
            name: "modifyNumberUp",
            bindKey: n("Ctrl-Shift-Up", "Alt-Shift-Up"),
            exec: function(e) {
                e.modifyNumber(1)
            },
            multiSelectAction: "forEach"
        }, {
            name: "modifyNumberDown",
            bindKey: n("Ctrl-Shift-Down", "Alt-Shift-Down"),
            exec: function(e) {
                e.modifyNumber(-1)
            },
            multiSelectAction: "forEach"
        }, {
            name: "replace",
            bindKey: n("Ctrl-H", "Command-Option-F"),
            exec: function(e) {
                r.loadModule("ace/ext/searchbox", function(t) {
                    t.Search(e, !0)
                })
            }
        }, {
            name: "undo",
            bindKey: n("Ctrl-Z", "Command-Z"),
            exec: function(e) {
                e.undo()
            }
        }, {
            name: "redo",
            bindKey: n("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
            exec: function(e) {
                e.redo()
            }
        }, {
            name: "copylinesup",
            bindKey: n("Alt-Shift-Up", "Command-Option-Up"),
            exec: function(e) {
                e.copyLinesUp()
            }
        }, {
            name: "movelinesup",
            bindKey: n("Alt-Up", "Option-Up"),
            exec: function(e) {
                e.moveLinesUp()
            }
        }, {
            name: "copylinesdown",
            bindKey: n("Alt-Shift-Down", "Command-Option-Down"),
            exec: function(e) {
                e.copyLinesDown()
            }
        }, {
            name: "movelinesdown",
            bindKey: n("Alt-Down", "Option-Down"),
            exec: function(e) {
                e.moveLinesDown()
            }
        }, {
            name: "del",
            bindKey: n("Delete", "Delete|Ctrl-D|Shift-Delete"),
            exec: function(e) {
                e.remove("right")
            },
            multiSelectAction: "forEach"
        }, {
            name: "backspace",
            bindKey: n("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
            exec: function(e) {
                e.remove("left")
            },
            multiSelectAction: "forEach"
        }, {
            name: "cut_or_delete",
            bindKey: n("Shift-Delete", null),
            exec: function(e) {
                return e.selection.isEmpty() ? void e.remove("left") : !1
            },
            multiSelectAction: "forEach"
        }, {
            name: "removetolinestart",
            bindKey: n("Alt-Backspace", "Command-Backspace"),
            exec: function(e) {
                e.removeToLineStart()
            },
            multiSelectAction: "forEach"
        }, {
            name: "removetolineend",
            bindKey: n("Alt-Delete", "Ctrl-K"),
            exec: function(e) {
                e.removeToLineEnd()
            },
            multiSelectAction: "forEach"
        }, {
            name: "removewordleft",
            bindKey: n("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
            exec: function(e) {
                e.removeWordLeft()
            },
            multiSelectAction: "forEach"
        }, {
            name: "removewordright",
            bindKey: n("Ctrl-Delete", "Alt-Delete"),
            exec: function(e) {
                e.removeWordRight()
            },
            multiSelectAction: "forEach"
        }, {
            name: "outdent",
            bindKey: n("Shift-Tab", "Shift-Tab"),
            exec: function(e) {
                e.blockOutdent()
            },
            multiSelectAction: "forEach"
        }, {
            name: "indent",
            bindKey: n("Tab", "Tab"),
            exec: function(e) {
                e.indent()
            },
            multiSelectAction: "forEach"
        }, {
            name: "blockoutdent",
            bindKey: n("Ctrl-[", "Ctrl-["),
            exec: function(e) {
                e.blockOutdent()
            },
            multiSelectAction: "forEachLine"
        }, {
            name: "blockindent",
            bindKey: n("Ctrl-]", "Ctrl-]"),
            exec: function(e) {
                e.blockIndent()
            },
            multiSelectAction: "forEachLine"
        }, {
            name: "insertstring",
            exec: function(e, t) {
                e.insert(t)
            },
            multiSelectAction: "forEach"
        }, {
            name: "inserttext",
            exec: function(e, t) {
                e.insert(i.stringRepeat(t.text || "", t.times || 1))
            },
            multiSelectAction: "forEach"
        }, {
            name: "splitline",
            bindKey: n(null, "Ctrl-O"),
            exec: function(e) {
                e.splitLine()
            },
            multiSelectAction: "forEach"
        }, {
            name: "transposeletters",
            bindKey: n("Ctrl-T", "Ctrl-T"),
            exec: function(e) {
                e.transposeLetters()
            },
            multiSelectAction: function(e) {
                e.transposeSelections(1)
            }
        }, {
            name: "touppercase",
            bindKey: n("Ctrl-U", "Ctrl-U"),
            exec: function(e) {
                e.toUpperCase()
            },
            multiSelectAction: "forEach"
        }, {
            name: "tolowercase",
            bindKey: n("Ctrl-Shift-U", "Ctrl-Shift-U"),
            exec: function(e) {
                e.toLowerCase()
            },
            multiSelectAction: "forEach"
        }]
    }), ace.define("ace/undomanager", ["require", "exports", "module"], function(e, t) {
        var n = function() {
            this.reset()
        };
        (function() {
            this.execute = function(e) {
                var t = e.args[0];
                this.$doc = e.args[1], e.merge && this.hasUndo() && (t = this.$undoStack.pop().concat(t)), this.$undoStack.push(t), this.$redoStack = [], this.dirtyCounter < 0 && (this.dirtyCounter = 0 / 0), this.dirtyCounter++
            }, this.undo = function(e) {
                var t = this.$undoStack.pop(),
                    n = null;
                return t && (n = this.$doc.undoChanges(t, e), this.$redoStack.push(t), this.dirtyCounter--), n
            }, this.redo = function(e) {
                var t = this.$redoStack.pop(),
                    n = null;
                return t && (n = this.$doc.redoChanges(t, e), this.$undoStack.push(t), this.dirtyCounter++), n
            }, this.reset = function() {
                this.$undoStack = [], this.$redoStack = [], this.dirtyCounter = 0
            }, this.hasUndo = function() {
                return this.$undoStack.length > 0
            }, this.hasRedo = function() {
                return this.$redoStack.length > 0
            }, this.markClean = function() {
                this.dirtyCounter = 0
            }, this.isClean = function() {
                return 0 === this.dirtyCounter
            }
        }).call(n.prototype), t.UndoManager = n
    }), ace.define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/useragent", "ace/config", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/renderloop", "ace/lib/event_emitter"], function(e, t) {
        var n = e("./lib/oop"),
            i = e("./lib/dom"),
            r = (e("./lib/useragent"), e("./config")),
            o = e("./layer/gutter").Gutter,
            s = e("./layer/marker").Marker,
            a = e("./layer/text").Text,
            l = e("./layer/cursor").Cursor,
            c = e("./scrollbar").ScrollBarH,
            u = e("./scrollbar").ScrollBarV,
            h = e("./renderloop").RenderLoop,
            d = e("./lib/event_emitter").EventEmitter,
            g = ".ace_editor {position: relative;overflow: hidden;font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;font-size: 12px;line-height: normal;color: black;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: text;}.ace_dragging, .ace_dragging * {cursor: move !important;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: '';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgXxbAAAAJbSURBVHjapFNNaBNBFH4zs5vdZLP5sQmNpT82QY209heh1ioWisaDRcSKF0WKJ0GQnrzrxasHsR6EnlrwD0TagxJabaVEpFYxLWlLSS822tr87m66ccfd2GKyVhA6MMybgfe97/vmPUQphd0sZjto9XIn9OOsvlu2nkqRzVU+6vvlzPf8W6bk8dxQ0NPbxAALgCgg2JkaQuhzQau/El0zbmUA7U0Es8v2CiYmKQJHGO1QICCLoqilMhkmurDAyapKgqItezi/USRdJqEYY4D5jCy03ht2yMkkvL91jTTX10qzyyu2hruPRN7jgbH+EOsXcMLgYiThEgAMhABW85oqy1DXdRIdvP1AHJ2acQXvDIrVHcdQNrEKNYSVMSZGMjEzIIAwDXIo+6G/FxcGnzkC3T2oMhLjre49sBB+RRcHLqdafK6sYdE/GGBwU1VpFNj0aN8pJbe+BkZyevUrvLl6Xmm0W9IuTc0DxrDNAJd5oEvI/KRsNC3bQyNjPO9yQ1YHcfj2QvfQc/5TUhJTBc2iM0U7AWDQtc1nJHvD/cfO2s7jaGkiTEfa/Ep8coLu7zmNmh8+dc5lZDuUeFAGUNA/OY6JVaypQ0vjr7XYjUvJM37vt+j1vuTK5DgVfVUoTjVe+y3/LxMxY2GgU+CSLy4cpfsYorRXuXIOi0Vt40h67uZFTdIo6nLaZcwUJWAzwNS0tBnqqKzQDnjdG/iPyZxo46HaKUpbvYkj8qYRTZsBhge+JHhZyh0x9b95JqjVJkT084kZIPwu/mPWqPgfQ5jXh2+92Ay7HedfAgwA6KDWafb4w3cAAAAASUVORK5CYII=\");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTg4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTk4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBNjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBNzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd7PfIAAAGmSURBVHjaYvr//z8DJZiJgUIANoCRkREb9gLiSVAaQx4OQM7AAkwd7XU2/v++/rOttdYGEB9dASEvOMydGKfH8Gv/p4XTkvRBfLxeQAP+1cUhXopyvzhP7P/IoSj7g7Mw09cNKO6J1QQ0L4gICPIv/veg/8W+JdFvQNLHVsW9/nmn9zk7B+cCkDwhL7gt6knSZnx9/LuCEOcvkIAMP+cvto9nfqyZmmUAksfnBUtbM60gX/3/kgyv3/xSFOL5DZT+L8vP+Yfh5cvfPvp/xUHyQHXGyAYwgpwBjZYFT3Y1OEl/OfCH4ffv3wzc4iwMvNIsDJ+f/mH4+vIPAxsb631WW0Yln6ZpQLXdMK/DXGDflh+sIv37EivD5x//Gb7+YWT4y86sl7BCCkSD+Z++/1dkvsFRl+HnD1Rvje4F8whjMXmGj58YGf5zsDMwcnAwfPvKcml62DsQDeaDxN+/Y0qwlpEHqrdB94IRNIDUgfgfKJChGK4OikEW3gTiXUB950ASLFAF54AC94A0G9QAfOnmF9DCDzABFqS08IHYDIScdijOjQABBgC+/9awBH96jwAAAABJRU5ErkJggg==\");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url(\"data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAEFBQVJSUl5eXmRkZGtra39/f4WFhYmJiZGRkaampry8vMPDw8zMzNXV1dzc3OTk5Orq6vDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABQALAAAAAAQABAAAAUuICWOZGmeaBml5XGwFCQSBGyXRSAwtqQIiRuiwIM5BoYVbEFIyGCQoeJGrVptIQA7\");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTk5MTVGREIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTk5MTVGRUIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFOTkxNUZCQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFOTkxNUZDQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SIDkjAAAAJ1JREFUeNpi/P//PwMlgImBQkB7A6qrq/+DMC55FkIGKCoq4pVnpFkgTp069f/+/fv/r1u37r+tre1/kg0A+ptn9uzZYLaRkRHpLvjw4cNXWVlZhufPnzOcO3eOdAO0tbVPAjHDmzdvGA4fPsxIsgGSkpJmv379Ynj37h2DjIyMCMkG3LhxQ/T27dsMampqDHZ2dq/pH41DxwCAAAMAFdc68dUsFZgAAAAASUVORK5CYII=\");}.ace_scrollbar {position: absolute;overflow-x: hidden;overflow-y: auto;right: 0;top: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-h {position: absolute;overflow-x: auto;overflow-y: hidden;right: 0;left: 0;bottom: 0;z-index: 6;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;text-indent: -1em;}.ace_text-input.ace_composition {background: #f8f8f8;color: #111;z-index: 1000;opacity: 1;text-indent: 0;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;white-space: nowrap;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;/* setting pointer-events: auto; on node under the mouse, which changesduring scroll, will break mouse wheel scrolling in Safari */pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;border-left: 2px solid}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0px;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-moz-transition: opacity 0.18s;-webkit-transition: opacity 0.18s;-o-transition: opacity 0.18s;-ms-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_cursor[style*=\"opacity: 0\"]{-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";}.ace_editor.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_line {white-space: nowrap;}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%3AIDAT8%11c%FC%FF%FF%7F%18%03%1A%60%01%F2%3F%A0%891%80%04%FF%11-%F8%17%9BJ%E2%05%B1ZD%81v%26t%E7%80%F8%A3%82h%A12%1A%20%A3%01%02%0F%01%BA%25%06%00%19%C0%0D%AEF%D5%3ES%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%003IDAT8%11c%FC%FF%FF%7F%3E%03%1A%60%01%F2%3F%A3%891%80%04%FFQ%26%F8w%C0%B43%A1%DB%0C%E2%8F%0A%A2%85%CAh%80%8C%06%08%3C%04%E8%96%18%00%A3S%0D%CD%CF%D8%C1%9D%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;}.ace_gutter-tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;display: inline-block;max-width: 500px;padding: 4px;position: fixed;z-index: 999999;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre-line;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAe%8A%B1%0D%000%0C%C2%F2%2CK%96%BC%D0%8F9%81%88H%E9%D0%0E%96%C0%10%92%3E%02%80%5E%82%E4%A9*-%EEsw%C8%CC%11%EE%96w%D8%DC%E9*Eh%0C%151(%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAm%C7%C1%09%000%08C%D1%8C%ECE%C8E(%8E%EC%02)%1EZJ%F1%C1'%04%07I%E1%E5%EE%CAL%F5%A2%99%99%22%E2%D6%1FU%B5%FE0%D9x%A7%26Wz5%0E%D5%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget.ace_closed {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%03%00%00%00%06%08%06%00%00%00%06%E5%24%0C%00%00%009IDATx%DA5%CA%C1%09%000%08%03%C0%AC*(%3E%04%C1%0D%BA%B1%23%A4Uh%E0%20%81%C0%CC%F8%82%81%AA%A2%AArGfr%88%08%11%11%1C%DD%7D%E0%EE%5B%F6%F6%CB%B8%05Q%2F%E9tai%D9%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}/*** Dark version for fold widgets*/.ace_dark .ace_fold-widget {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");}.ace_dark .ace_fold-widget.ace_end {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget.ace_closed {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-moz-transition: opacity 0.4s ease 0.05s;-webkit-transition: opacity 0.4s ease 0.05s;-o-transition: opacity 0.4s ease 0.05s;-ms-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-moz-transition: opacity 0.05s ease 0.05s;-webkit-transition: opacity 0.05s ease 0.05s;-o-transition: opacity 0.05s ease 0.05s;-ms-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}";
        i.importCssString(g, "ace_editor");
        var f = function(e, t) {
            var n = this;
            this.container = e || i.createElement("div"), this.$keepTextAreaAtCursor = !0, i.addCssClass(this.container, "ace_editor"), this.setTheme(t), this.$gutter = i.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.scroller = i.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = i.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new o(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new s(this.content);
            var d = this.$textLayer = new a(this.content);
            this.canvas = d.element, this.$markerFront = new s(this.content), this.$cursorLayer = new l(this.content), this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new u(this.container, this), this.scrollBarH = new c(this.container, this), this.scrollBarV.addEventListener("scroll", function(e) {
                n.$scrollAnimation || n.session.setScrollTop(e.data - n.scrollMargin.top)
            }), this.scrollBarH.addEventListener("scroll", function(e) {
                n.$scrollAnimation || n.session.setScrollLeft(e.data - n.scrollMargin.left)
            }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = {
                row: 0,
                column: 0
            }, this.$textLayer.addEventListener("changeCharacterSize", function() {
                n.updateCharacterSize(), n.onResize(!0), n._signal("changeCharacterSize")
            }), this.$size = {
                width: 0,
                height: 0,
                scrollerHeight: 0,
                scrollerWidth: 0
            }, this.layerConfig = {
                width: 1,
                padding: 0,
                firstRow: 0,
                firstRowScreen: 0,
                lastRow: 0,
                lineHeight: 0,
                characterWidth: 0,
                minHeight: 1,
                maxHeight: 1,
                offset: 0,
                height: 1
            }, this.scrollMargin = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                v: 0,
                h: 0
            }, this.$loop = new h(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), r.resetOptions(this), r._emit("renderer", this)
        };
        (function() {
            this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, n.implement(this, d), this.updateCharacterSize = function() {
                this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin()
            }, this.setSession = function(e) {
                this.session = e, this.scroller.className = "ace_scroller", this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), this.$loop.schedule(this.CHANGE_FULL)
            }, this.updateLines = function(e, t) {
                void 0 === t && (t = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = {
                    firstRow: e,
                    lastRow: t
                }, this.$changedLines.firstRow > this.layerConfig.lastRow || this.$changedLines.lastRow < this.layerConfig.firstRow || this.$loop.schedule(this.CHANGE_LINES)
            }, this.onChangeTabSize = function() {
                this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
            }, this.updateText = function() {
                this.$loop.schedule(this.CHANGE_TEXT)
            }, this.updateFull = function(e) {
                e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
            }, this.updateFontSize = function() {
                this.$textLayer.checkForSizeChanges()
            }, this.$changes = 0, this.onResize = function(e, t, n, i) {
                if (!(this.resizing > 2)) {
                    this.resizing > 0 ? this.resizing++ : this.resizing = e ? 1 : 0;
                    var r = this.container;
                    i || (i = r.clientHeight || r.scrollHeight), n || (n = r.clientWidth || r.scrollWidth);
                    var o = this.$updateCachedSize(e, t, n, i);
                    return this.$size.scrollerHeight && (n || i) ? (e && (this.$gutterLayer.$padding = null), e ? this.$renderChanges(o, !0) : this.$loop.schedule(o | this.$changes), this.resizing && (this.resizing = 0), void 0) : this.resizing = 0
                }
            }, this.$updateCachedSize = function(e, t, n, i) {
                var r = 0,
                    o = this.$size,
                    s = {
                        width: o.width,
                        height: o.height,
                        scrollerHeight: o.scrollerHeight,
                        scrollerWidth: o.scrollerWidth
                    };
                return i && (e || o.height != i) && (o.height = i, r = this.CHANGE_SIZE, o.scrollerHeight = o.height, this.$horizScroll && (o.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", this.session && (this.session.setScrollTop(this.getScrollTop()), r |= this.CHANGE_SCROLL)), n && (e || o.width != n) && (r = this.CHANGE_SIZE, o.width = n, null == t && (t = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = t, this.scrollBarH.element.style.left = this.scroller.style.left = t + "px", o.scrollerWidth = Math.max(0, n - t - this.scrollBarV.getWidth()), this.scrollBarH.element.style.right = this.scroller.style.right = this.scrollBarV.getWidth() + "px", this.scroller.style.bottom = this.scrollBarH.getHeight() + "px", (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) && (r |= this.CHANGE_FULL)), r && this._signal("resize", s), r
            }, this.onGutterResize = function() {
                var e = this.$showGutter ? this.$gutter.offsetWidth : 0;
                e != this.gutterWidth && (this.$changes |= this.$updateCachedSize(!0, e, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : (this.$computeLayerConfig(), this.$loop.schedule(this.CHANGE_MARKER))
            }, this.adjustWrapLimit = function() {
                var e = this.$size.scrollerWidth - 2 * this.$padding,
                    t = Math.floor(e / this.characterWidth);
                return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn)
            }, this.setAnimatedScroll = function(e) {
                this.setOption("animatedScroll", e)
            }, this.getAnimatedScroll = function() {
                return this.$animatedScroll
            }, this.setShowInvisibles = function(e) {
                this.setOption("showInvisibles", e)
            }, this.getShowInvisibles = function() {
                return this.getOption("showInvisibles")
            }, this.getDisplayIndentGuides = function() {
                return this.getOption("displayIndentGuides")
            }, this.setDisplayIndentGuides = function(e) {
                this.setOption("displayIndentGuides", e)
            }, this.setShowPrintMargin = function(e) {
                this.setOption("showPrintMargin", e)
            }, this.getShowPrintMargin = function() {
                return this.getOption("showPrintMargin")
            }, this.setPrintMarginColumn = function(e) {
                this.setOption("printMarginColumn", e)
            }, this.getPrintMarginColumn = function() {
                return this.getOption("printMarginColumn")
            }, this.getShowGutter = function() {
                return this.getOption("showGutter")
            }, this.setShowGutter = function(e) {
                return this.setOption("showGutter", e)
            }, this.getFadeFoldWidgets = function() {
                return this.getOption("fadeFoldWidgets")
            }, this.setFadeFoldWidgets = function(e) {
                this.setOption("fadeFoldWidgets", e)
            }, this.setHighlightGutterLine = function(e) {
                this.setOption("highlightGutterLine", e)
            }, this.getHighlightGutterLine = function() {
                return this.getOption("highlightGutterLine")
            }, this.$updateGutterLineHighlight = function() {
                var e = this.$cursorLayer.$pixelPos,
                    t = this.layerConfig.lineHeight;
                if (this.session.getUseWrapMode()) {
                    var n = this.session.selection.getCursor();
                    n.column = 0, e = this.$cursorLayer.getPixelPosition(n, !0), t *= this.session.getRowLength(n.row)
                }
                this.$gutterLineHighlight.style.top = e.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = t + "px"
            }, this.$updatePrintMargin = function() {
                if (this.$showPrintMargin || this.$printMarginEl) {
                    if (!this.$printMarginEl) {
                        var e = i.createElement("div");
                        e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = i.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild)
                    }
                    var t = this.$printMarginEl.style;
                    t.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit()
                }
            }, this.getContainerElement = function() {
                return this.container
            }, this.getMouseEventTarget = function() {
                return this.content
            }, this.getTextAreaContainer = function() {
                return this.container
            }, this.$moveTextAreaToCursor = function() {
                if (this.$keepTextAreaAtCursor) {
                    var e = this.layerConfig,
                        t = this.$cursorLayer.$pixelPos.top,
                        n = this.$cursorLayer.$pixelPos.left;
                    t -= e.offset;
                    var i = this.lineHeight;
                    if (!(0 > t || t > e.height - i)) {
                        var r = this.characterWidth;
                        if (this.$composition) {
                            var o = this.textarea.value.replace(/^\x01+/, "");
                            r *= this.session.$getStringScreenWidth(o)[0] + 2, i += 2, t -= 1
                        }
                        n -= this.scrollLeft, n > this.$size.scrollerWidth - r && (n = this.$size.scrollerWidth - r), n -= this.scrollBar.width, this.textarea.style.height = i + "px", this.textarea.style.width = r + "px", this.textarea.style.right = Math.max(0, this.$size.scrollerWidth - n - r) + "px", this.textarea.style.bottom = Math.max(0, this.$size.height - t - i) + "px"
                    }
                }
            }, this.getFirstVisibleRow = function() {
                return this.layerConfig.firstRow
            }, this.getFirstFullyVisibleRow = function() {
                return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1)
            }, this.getLastFullyVisibleRow = function() {
                var e = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
                return this.layerConfig.firstRow - 1 + e
            }, this.getLastVisibleRow = function() {
                return this.layerConfig.lastRow
            }, this.$padding = null, this.setPadding = function(e) {
                this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
            }, this.setScrollMargin = function(e, t, n, i) {
                var r = this.scrollMargin;
                r.top = 0 | e, r.bottom = 0 | t, r.right = 0 | i, r.left = 0 | n, r.v = r.top + r.bottom, r.h = r.left + r.right, this.updateFull()
            }, this.getHScrollBarAlwaysVisible = function() {
                return this.$hScrollBarAlwaysVisible
            }, this.setHScrollBarAlwaysVisible = function(e) {
                this.setOption("hScrollBarAlwaysVisible", e)
            }, this.getVScrollBarAlwaysVisible = function() {
                return this.$hScrollBarAlwaysVisible
            }, this.setVScrollBarAlwaysVisible = function(e) {
                this.setOption("vScrollBarAlwaysVisible", e)
            }, this.$updateScrollBarV = function() {
                this.scrollBarV.setInnerHeight(this.layerConfig.maxHeight + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top)
            }, this.$updateScrollBarH = function() {
                this.scrollBarH.setInnerWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left)
            }, this.$renderChanges = function(e, t) {
                return this.$changes && (e |= this.$changes, this.$changes = 0), this.session && this.container.offsetWidth && (e || t) ? this.$size.width ? (this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender"), (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL || e & this.CHANGE_H_SCROLL) && (e |= this.$computeLayerConfig()), e & this.CHANGE_H_SCROLL && (this.$updateScrollBarH(), this.content.style.marginLeft = -this.scrollLeft + "px", this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"), e & this.CHANGE_FULL ? (this.$updateScrollBarV(), this.$updateScrollBarH(), this.$textLayer.update(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this._signal("afterRender"), void 0) : e & this.CHANGE_SCROLL ? (this.$updateScrollBarV(), e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(this.layerConfig) : this.$textLayer.scrollLines(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this.$moveTextAreaToCursor(), this._signal("afterRender"), void 0) : (e & this.CHANGE_TEXT ? (this.$textLayer.update(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig)) : e & this.CHANGE_LINES ? (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(this.layerConfig) : (e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER) && this.$showGutter && this.$gutterLayer.update(this.layerConfig), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(this.layerConfig), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(this.layerConfig), (e & this.CHANGE_SIZE || e & this.CHANGE_LINES) && (this.$updateScrollBarV(), this.$updateScrollBarH()), void this._signal("afterRender"))) : (this.$changes |= e, this.onResize(!0)) : void(this.$changes |= e)
            }, this.$autosize = function(e) {
                var e = this.session.getScreenLength() * this.lineHeight,
                    t = this.$maxLines * this.lineHeight,
                    n = Math.max((this.$minLines || 1) * this.lineHeight, Math.min(t, e)),
                    i = e > t;
                if (n != this.desiredHeight || this.$size.height != this.desiredHeight || i != this.$vScroll) {
                    i != this.$vScroll && (this.$vScroll = i, this.scrollBarV.setVisible(i));
                    var r = this.container.clientWidth;
                    this.container.style.height = n + "px", this.$updateCachedSize(!0, this.$gutterWidth, r, n), this.desiredHeight = n
                }
            }, this.$computeLayerConfig = function() {
                this.$maxLines && this.lineHeight > 1 && this.$autosize();
                var e = this.session,
                    t = this.$size.height <= 2 * this.lineHeight,
                    n = this.session.getScreenLength(),
                    i = n * this.lineHeight,
                    r = this.scrollTop % this.lineHeight,
                    o = this.$size.scrollerHeight + this.lineHeight,
                    s = this.$getLongestLine(),
                    a = !t && (this.$hScrollBarAlwaysVisible || this.$size.scrollerWidth - s - 2 * this.$padding < 0),
                    l = this.$horizScroll !== a;
                l && (this.$horizScroll = a, this.scrollBarH.setVisible(a)), !this.$maxLines && this.$scrollPastEnd && this.scrollTop > i - this.$size.scrollerHeight && (i += Math.min((this.$size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd, this.scrollTop - i + this.$size.scrollerHeight));
                var c = !t && (this.$vScrollBarAlwaysVisible || this.$size.scrollerHeight - i < 0),
                    u = this.$vScroll !== c;
                u && (this.$vScroll = c, this.scrollBarV.setVisible(c)), this.session.setScrollTop(Math.max(-this.scrollMargin.top, Math.min(this.scrollTop, i - this.$size.scrollerHeight + this.scrollMargin.v))), this.session.setScrollLeft(Math.max(-this.scrollMargin.left, Math.min(this.scrollLeft, s + 2 * this.$padding - this.$size.scrollerWidth + this.scrollMargin.h)));
                var h, d, g = Math.ceil(o / this.lineHeight) - 1,
                    f = Math.max(0, Math.round((this.scrollTop - r) / this.lineHeight)),
                    p = f + g,
                    m = this.lineHeight;
                f = e.screenToDocumentRow(f, 0);
                var v = e.getFoldLine(f);
                v && (f = v.start.row), h = e.documentToScreenRow(f, 0), d = e.getRowLength(f) * m, p = Math.min(e.screenToDocumentRow(p, 0), e.getLength() - 1), o = this.$size.scrollerHeight + e.getRowLength(p) * m + d, r = this.scrollTop - h * m;
                var y = 0;
                return (l || u) && (y = this.$updateCachedSize(!0, this.gutterWidth, this.$size.width, this.$size.height), this._signal("scrollbarVisibilityChanged"), u && (s = this.$getLongestLine())), this.layerConfig = {
                    width: s,
                    padding: this.$padding,
                    firstRow: f,
                    firstRowScreen: h,
                    lastRow: p,
                    lineHeight: m,
                    characterWidth: this.characterWidth,
                    minHeight: o,
                    maxHeight: i,
                    offset: r,
                    height: this.$size.scrollerHeight
                }, this.$gutterLayer.element.style.marginTop = -r + "px", this.content.style.marginTop = -r + "px", this.content.style.width = s + 2 * this.$padding + "px", this.content.style.height = o + "px", y
            }, this.$updateLines = function() {
                var e = this.$changedLines.firstRow,
                    t = this.$changedLines.lastRow;
                this.$changedLines = null;
                var n = this.layerConfig;
                if (!(e > n.lastRow + 1 || t < n.firstRow)) return 1 / 0 === t ? (this.$showGutter && this.$gutterLayer.update(n), void this.$textLayer.update(n)) : (this.$textLayer.updateLines(n, e, t), !0)
            }, this.$getLongestLine = function() {
                var e = this.session.getScreenWidth();
                return this.showInvisibles && !this.session.$useWrapMode && (e += 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth))
            }, this.updateFrontMarkers = function() {
                this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
            }, this.updateBackMarkers = function() {
                this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
            }, this.addGutterDecoration = function(e, t) {
                this.$gutterLayer.addGutterDecoration(e, t)
            }, this.removeGutterDecoration = function(e, t) {
                this.$gutterLayer.removeGutterDecoration(e, t)
            }, this.updateBreakpoints = function() {
                this.$loop.schedule(this.CHANGE_GUTTER)
            }, this.setAnnotations = function(e) {
                this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER)
            }, this.updateCursor = function() {
                this.$loop.schedule(this.CHANGE_CURSOR)
            }, this.hideCursor = function() {
                this.$cursorLayer.hideCursor()
            }, this.showCursor = function() {
                this.$cursorLayer.showCursor()
            }, this.scrollSelectionIntoView = function(e, t, n) {
                this.scrollCursorIntoView(e, n), this.scrollCursorIntoView(t, n)
            }, this.scrollCursorIntoView = function(e, t) {
                if (0 !== this.$size.scrollerHeight) {
                    var n = this.$cursorLayer.getPixelPosition(e),
                        i = n.left,
                        r = n.top,
                        o = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
                    o > r ? (t && (r -= t * this.$size.scrollerHeight), 0 == r ? r = -this.scrollMargin.top : 0 == r && (r = +this.scrollMargin.bottom), this.session.setScrollTop(r)) : o + this.$size.scrollerHeight < r + this.lineHeight && (t && (r += t * this.$size.scrollerHeight), this.session.setScrollTop(r + this.lineHeight - this.$size.scrollerHeight));
                    var s = this.scrollLeft;
                    s > i ? (i < this.$padding + 2 * this.layerConfig.characterWidth && (i = -this.scrollMargin.left), this.session.setScrollLeft(i)) : s + this.$size.scrollerWidth < i + this.characterWidth ? this.session.setScrollLeft(Math.round(i + this.characterWidth - this.$size.scrollerWidth)) : s <= this.$padding && i - s < this.characterWidth && this.session.setScrollLeft(0)
                }
            }, this.getScrollTop = function() {
                return this.session.getScrollTop()
            }, this.getScrollLeft = function() {
                return this.session.getScrollLeft()
            }, this.getScrollTopRow = function() {
                return this.scrollTop / this.lineHeight
            }, this.getScrollBottomRow = function() {
                return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
            }, this.scrollToRow = function(e) {
                this.session.setScrollTop(e * this.lineHeight)
            }, this.alignCursor = function(e, t) {
                "number" == typeof e && (e = {
                    row: e,
                    column: 0
                });
                var n = this.$cursorLayer.getPixelPosition(e),
                    i = this.$size.scrollerHeight - this.lineHeight,
                    r = n.top - i * (t || 0);
                return this.session.setScrollTop(r), r
            }, this.STEPS = 8, this.$calcSteps = function(e, t) {
                var n = 0,
                    i = this.STEPS,
                    r = [],
                    o = function(e, t, n) {
                        return n * (Math.pow(e - 1, 3) + 1) + t
                    };
                for (n = 0; i > n; ++n) r.push(o(n / this.STEPS, e, t - e));
                return r
            }, this.scrollToLine = function(e, t, n, i) {
                var r = this.$cursorLayer.getPixelPosition({
                        row: e,
                        column: 0
                    }),
                    o = r.top;
                t && (o -= this.$size.scrollerHeight / 2);
                var s = this.scrollTop;
                this.session.setScrollTop(o), n !== !1 && this.animateScrolling(s, i)
            }, this.animateScrolling = function(e, t) {
                var n = this.scrollTop;
                if (this.$animatedScroll) {
                    var i = this;
                    if (e != n) {
                        if (this.$scrollAnimation) {
                            var r = this.$scrollAnimation.steps;
                            if (r.length && (e = r[0], e == n)) return
                        }
                        var o = i.$calcSteps(e, n);
                        this.$scrollAnimation = {
                            from: e,
                            to: n,
                            steps: o
                        }, clearInterval(this.$timer), i.session.setScrollTop(o.shift()), this.$timer = setInterval(function() {
                            o.length ? (i.session.setScrollTop(o.shift()), i.session.$scrollTop = n) : null != n ? (i.session.$scrollTop = -1, i.session.setScrollTop(n), n = null) : (i.$timer = clearInterval(i.$timer), i.$scrollAnimation = null, t && t())
                        }, 10)
                    }
                }
            }, this.scrollToY = function(e) {
                this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e)
            }, this.scrollToX = function(e) {
                this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL)
            }, this.scrollTo = function(e, t) {
                this.session.setScrollTop(t), this.session.setScrollLeft(t)
            }, this.scrollBy = function(e, t) {
                t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e)
            }, this.isScrollableBy = function(e, t) {
                return 0 > t && this.session.getScrollTop() >= 1 - this.scrollMargin.top ? !0 : t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight - (this.$size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd < -1 + this.scrollMargin.bottom ? !0 : 0 > e && this.session.getScrollLeft() >= 1 - this.scrollMargin.left ? !0 : e > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right ? !0 : void 0
            }, this.pixelToScreenCoordinates = function(e, t) {
                var n = this.scroller.getBoundingClientRect(),
                    i = (e + this.scrollLeft - n.left - this.$padding) / this.characterWidth,
                    r = Math.floor((t + this.scrollTop - n.top) / this.lineHeight),
                    o = Math.round(i);
                return {
                    row: r,
                    column: o,
                    side: i - o > 0 ? 1 : -1
                }
            }, this.screenToTextCoordinates = function(e, t) {
                var n = this.scroller.getBoundingClientRect(),
                    i = Math.round((e + this.scrollLeft - n.left - this.$padding) / this.characterWidth),
                    r = Math.floor((t + this.scrollTop - n.top) / this.lineHeight);
                return this.session.screenToDocumentPosition(r, Math.max(i, 0))
            }, this.textToScreenCoordinates = function(e, t) {
                var n = this.scroller.getBoundingClientRect(),
                    i = this.session.documentToScreenPosition(e, t),
                    r = this.$padding + Math.round(i.column * this.characterWidth),
                    o = i.row * this.lineHeight;
                return {
                    pageX: n.left + r - this.scrollLeft,
                    pageY: n.top + o - this.scrollTop
                }
            }, this.visualizeFocus = function() {
                i.addCssClass(this.container, "ace_focus")
            }, this.visualizeBlur = function() {
                i.removeCssClass(this.container, "ace_focus")
            }, this.showComposition = function() {
                this.$composition || (this.$composition = {
                    keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                    cssText: this.textarea.style.cssText
                }), this.$keepTextAreaAtCursor = !0, i.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor()
            }, this.setCompositionText = function() {
                this.$moveTextAreaToCursor()
            }, this.hideComposition = function() {
                this.$composition && (i.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, this.textarea.style.cssText = this.$composition.cssText, this.$composition = null)
            }, this.setTheme = function(e, t) {
                function n(n) {
                    if (o.$themeValue != e) return t && t();
                    if (n.cssClass) {
                        i.importCssString(n.cssText, n.cssClass, o.container.ownerDocument), o.theme && i.removeCssClass(o.container, o.theme.cssClass), o.$theme = n.cssClass, o.theme = n, i.addCssClass(o.container, n.cssClass), i.setCssClass(o.container, "ace_dark", n.isDark);
                        var r = "padding" in n ? n.padding : 4;
                        o.$padding && r != o.$padding && o.setPadding(r), o.$size && (o.$size.width = 0, o.onResize()), o._dispatchEvent("themeLoaded", {
                            theme: n
                        }), t && t()
                    }
                }
                var o = this;
                if (this.$themeValue = e, o._dispatchEvent("themeChange", {
                        theme: e
                    }), e && "string" != typeof e) n(e);
                else {
                    var s = e || "ace/theme/textmate";
                    r.loadModule(["theme", s], n)
                }
            }, this.getTheme = function() {
                return this.$themeValue
            }, this.setStyle = function(e, t) {
                i.setCssClass(this.container, e, 0 != t)
            }, this.unsetStyle = function(e) {
                i.removeCssClass(this.container, e)
            }, this.setMouseCursor = function(e) {
                this.content.style.cursor = e
            }, this.destroy = function() {
                this.$textLayer.destroy(), this.$cursorLayer.destroy()
            }
        }).call(f.prototype), r.defineOptions(f.prototype, "renderer", {
            animatedScroll: {
                initialValue: !1
            },
            showInvisibles: {
                set: function(e) {
                    this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT)
                },
                initialValue: !1
            },
            showPrintMargin: {
                set: function() {
                    this.$updatePrintMargin()
                },
                initialValue: !0
            },
            printMarginColumn: {
                set: function() {
                    this.$updatePrintMargin()
                },
                initialValue: 80
            },
            printMargin: {
                set: function(e) {
                    "number" == typeof e && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin()
                },
                get: function() {
                    return this.$showPrintMargin && this.$printMarginColumn
                }
            },
            showGutter: {
                set: function(e) {
                    this.$gutter.style.display = e ? "block" : "none", this.onGutterResize()
                },
                initialValue: !0
            },
            fadeFoldWidgets: {
                set: function(e) {
                    i.setCssClass(this.$gutter, "ace_fade-fold-widgets", e)
                },
                initialValue: !1
            },
            showFoldWidgets: {
                set: function(e) {
                    this.$gutterLayer.setShowFoldWidgets(e)
                },
                initialValue: !0
            },
            displayIndentGuides: {
                set: function(e) {
                    this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT)
                },
                initialValue: !0
            },
            highlightGutterLine: {
                set: function(e) {
                    return this.$gutterLineHighlight ? (this.$gutterLineHighlight.style.display = e ? "" : "none", void(this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight())) : (this.$gutterLineHighlight = i.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter-active-line", this.$gutter.appendChild(this.$gutterLineHighlight), void 0)
                },
                initialValue: !1,
                value: !0
            },
            hScrollBarAlwaysVisible: {
                set: function() {
                    (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL)
                },
                initialValue: !1
            },
            vScrollBarAlwaysVisible: {
                set: function() {
                    (!this.$vScrollBarAlwaysVisible || !this.$vScroll) && this.$loop.schedule(this.CHANGE_SCROLL)
                },
                initialValue: !1
            },
            fontSize: {
                set: function(e) {
                    "number" == typeof e && (e += "px"), this.container.style.fontSize = e, this.updateFontSize()
                },
                initialValue: 12
            },
            fontFamily: {
                set: function(e) {
                    this.container.style.fontFamily = e, this.updateFontSize()
                }
            },
            maxLines: {
                set: function() {
                    this.updateFull()
                }
            },
            minLines: {
                set: function() {
                    this.updateFull()
                }
            },
            scrollPastEnd: {
                set: function(e) {
                    e = +e || 0, this.$scrollPastEnd != e && (this.$scrollPastEnd = e, this.$loop.schedule(this.CHANGE_SCROLL))
                },
                initialValue: 0,
                handlesSet: !0
            },
            fixedWidthGutter: {
                set: function(e) {
                    this.$gutterLayer.$fixedWidth = !!e, this.$loop.schedule(this.CHANGE_GUTTER)
                }
            }
        }), t.VirtualRenderer = f
    }), ace.define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter"], function(e, t) {
        var n = e("../lib/dom"),
            i = e("../lib/oop"),
            r = e("../lib/lang"),
            o = e("../lib/event_emitter").EventEmitter,
            s = function(e) {
                this.element = n.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$cells = []
            };
        (function() {
            i.implement(this, o), this.setSession = function(e) {
                this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = e, e.on("change", this.$updateAnnotations)
            }, this.addGutterDecoration = function(e, t) {
                window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t)
            }, this.removeGutterDecoration = function(e, t) {
                window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t)
            }, this.setAnnotations = function(e) {
                this.$annotations = [];
                for (var t, n, i = 0; i < e.length; i++) {
                    var o = e[i],
                        n = o.row,
                        t = this.$annotations[n];
                    t || (t = this.$annotations[n] = {
                        text: []
                    });
                    var s = o.text;
                    s = s ? r.escapeHTML(s) : o.html || "", -1 === t.text.indexOf(s) && t.text.push(s);
                    var a = o.type;
                    "error" == a ? t.className = " ace_error" : "warning" == a && " ace_error" != t.className ? t.className = " ace_warning" : "info" == a && !t.className && (t.className = " ace_info")
                }
            }, this.$updateAnnotations = function(e) {
                if (this.$annotations.length) {
                    var t = e.data,
                        n = t.range,
                        i = n.start.row,
                        r = n.end.row - i;
                    if (0 !== r)
                        if ("removeText" == t.action || "removeLines" == t.action) this.$annotations.splice(i, r + 1, null);
                        else {
                            var o = Array(r + 1);
                            o.unshift(i, 1), this.$annotations.splice.apply(this.$annotations, o)
                        }
                }
            }, this.update = function(e) {
                for (var t = e.firstRow, i = e.lastRow, r = this.session.getNextFoldLine(t), o = r ? r.start.row : 1 / 0, s = this.$showFoldWidgets && this.session.foldWidgets, a = this.session.$breakpoints, l = this.session.$decorations, c = this.session.$firstLineNumber, u = 0, h = null, d = -1, g = t;;) {
                    if (g > o && (g = r.end.row + 1, r = this.session.getNextFoldLine(g, r), o = r ? r.start.row : 1 / 0), g > i) {
                        for (; this.$cells.length > d + 1;) h = this.$cells.pop(), this.element.removeChild(h.element);
                        break
                    }
                    h = this.$cells[++d], h || (h = {
                        element: null,
                        textNode: null,
                        foldWidget: null
                    }, h.element = n.createElement("div"), h.textNode = document.createTextNode(""), h.element.appendChild(h.textNode), this.element.appendChild(h.element), this.$cells[d] = h);
                    var f = "ace_gutter-cell ";
                    a[g] && (f += a[g]), l[g] && (f += l[g]), this.$annotations[g] && (f += this.$annotations[g].className), h.element.className != f && (h.element.className = f);
                    var p = this.session.getRowLength(g) * e.lineHeight + "px";
                    p != h.element.style.height && (h.element.style.height = p);
                    var m = u = g + c;
                    if (m != h.textNode.data && (h.textNode.data = m), s) {
                        var v = s[g];
                        null == v && (v = s[g] = this.session.getFoldWidget(g))
                    }
                    if (v) {
                        h.foldWidget || (h.foldWidget = n.createElement("span"), h.element.appendChild(h.foldWidget));
                        var f = "ace_fold-widget ace_" + v;
                        f += "start" == v && g == o && g < r.end.row ? " ace_closed" : " ace_open", h.foldWidget.className != f && (h.foldWidget.className = f);
                        var p = e.lineHeight + "px";
                        h.foldWidget.style.height != p && (h.foldWidget.style.height = p)
                    } else null != h.foldWidget && (h.element.removeChild(h.foldWidget), h.foldWidget = null);
                    g++
                }
                this.element.style.height = e.minHeight + "px", (this.$fixedWidth || this.session.$useWrapMode) && (u = this.session.getLength());
                var y = u.toString().length * e.characterWidth,
                    w = this.$padding || this.$computePadding();
                y += w.left + w.right, y !== this.gutterWidth && !isNaN(y) && (this.gutterWidth = y, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", y))
            }, this.$fixedWidth = !1, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function(e) {
                e ? n.addCssClass(this.element, "ace_folding-enabled") : n.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null
            }, this.getShowFoldWidgets = function() {
                return this.$showFoldWidgets
            }, this.$computePadding = function() {
                if (!this.element.firstChild) return {
                    left: 0,
                    right: 0
                };
                var e = n.computedStyle(this.element.firstChild);
                return this.$padding = {}, this.$padding.left = parseInt(e.paddingLeft) + 1 || 0, this.$padding.right = parseInt(e.paddingRight) || 0, this.$padding
            }, this.getRegion = function(e) {
                var t = this.$padding || this.$computePadding(),
                    n = this.element.getBoundingClientRect();
                return e.x < t.left + n.left ? "markers" : this.$showFoldWidgets && e.x > n.right - t.right ? "foldWidgets" : void 0
            }
        }).call(s.prototype), t.Gutter = s
    }), ace.define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function(e, t) {
        var n = e("../range").Range,
            i = e("../lib/dom"),
            r = function(e) {
                this.element = i.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element)
            };
        (function() {
            this.$padding = 0, this.setPadding = function(e) {
                this.$padding = e
            }, this.setSession = function(e) {
                this.session = e
            }, this.setMarkers = function(e) {
                this.markers = e
            }, this.update = function(e) {
                var e = e || this.config;
                if (e) {
                    this.config = e;
                    var t = [];
                    for (var n in this.markers) {
                        var r = this.markers[n];
                        if (r.range) {
                            var o = r.range.clipRows(e.firstRow, e.lastRow);
                            if (!o.isEmpty())
                                if (o = o.toScreenRange(this.session), r.renderer) {
                                    var s = this.$getTop(o.start.row, e),
                                        a = this.$padding + o.start.column * e.characterWidth;
                                    r.renderer(t, o, a, s, e)
                                } else "fullLine" == r.type ? this.drawFullLineMarker(t, o, r.clazz, e) : "screenLine" == r.type ? this.drawScreenLineMarker(t, o, r.clazz, e) : o.isMultiLine() ? "text" == r.type ? this.drawTextMarker(t, o, r.clazz, e) : this.drawMultiLineMarker(t, o, r.clazz, e) : this.drawSingleLineMarker(t, o, r.clazz + " ace_start", e)
                        } else r.update(t, this, this.session, e)
                    }
                    this.element = i.setInnerHtml(this.element, t.join(""))
                }
            }, this.$getTop = function(e, t) {
                return (e - t.firstRowScreen) * t.lineHeight
            }, this.drawTextMarker = function(e, t, i, r, o) {
                var s = t.start.row,
                    a = new n(s, t.start.column, s, this.session.getScreenLastRowColumn(s));
                for (this.drawSingleLineMarker(e, a, i + " ace_start", r, 1, o), s = t.end.row, a = new n(s, 0, s, t.end.column), this.drawSingleLineMarker(e, a, i, r, 0, o), s = t.start.row + 1; s < t.end.row; s++) a.start.row = s, a.end.row = s, a.end.column = this.session.getScreenLastRowColumn(s), this.drawSingleLineMarker(e, a, i, r, 1, o)
            }, this.drawMultiLineMarker = function(e, t, n, i, r) {
                var o = this.$padding,
                    s = i.lineHeight,
                    a = this.$getTop(t.start.row, i),
                    l = o + t.start.column * i.characterWidth;
                r = r || "", e.push("<div class='", n, " ace_start' style='", "height:", s, "px;", "right:0;", "top:", a, "px;", "left:", l, "px;", r, "'></div>"), a = this.$getTop(t.end.row, i);
                var c = t.end.column * i.characterWidth;
                e.push("<div class='", n, "' style='", "height:", s, "px;", "width:", c, "px;", "top:", a, "px;", "left:", o, "px;", r, "'></div>"), s = (t.end.row - t.start.row - 1) * i.lineHeight, 0 > s || (a = this.$getTop(t.start.row + 1, i), e.push("<div class='", n, "' style='", "height:", s, "px;", "right:0;", "top:", a, "px;", "left:", o, "px;", r, "'></div>"))
            }, this.drawSingleLineMarker = function(e, t, n, i, r, o) {
                var s = i.lineHeight,
                    a = (t.end.column + (r || 0) - t.start.column) * i.characterWidth,
                    l = this.$getTop(t.start.row, i),
                    c = this.$padding + t.start.column * i.characterWidth;
                e.push("<div class='", n, "' style='", "height:", s, "px;", "width:", a, "px;", "top:", l, "px;", "left:", c, "px;", o || "", "'></div>")
            }, this.drawFullLineMarker = function(e, t, n, i, r) {
                var o = this.$getTop(t.start.row, i),
                    s = i.lineHeight;
                t.start.row != t.end.row && (s += this.$getTop(t.end.row, i) - o), e.push("<div class='", n, "' style='", "height:", s, "px;", "top:", o, "px;", "left:0;right:0;", r || "", "'></div>")
            }, this.drawScreenLineMarker = function(e, t, n, i, r) {
                var o = this.$getTop(t.start.row, i),
                    s = i.lineHeight;
                e.push("<div class='", n, "' style='", "height:", s, "px;", "top:", o, "px;", "left:0;right:0;", r || "", "'></div>")
            }
        }).call(r.prototype), t.Marker = r
    }), ace.define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("../lib/dom"),
            r = e("../lib/lang"),
            o = e("../lib/useragent"),
            s = e("../lib/event_emitter").EventEmitter,
            a = function(e) {
                this.element = i.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$characterSize = {
                    width: 0,
                    height: 0
                }, this.checkForSizeChanges(), this.$pollSizeChanges()
            };
        (function() {
            n.implement(this, s), this.EOF_CHAR = "\xb6", this.EOL_CHAR = "\xac", this.TAB_CHAR = "\u2192", this.SPACE_CHAR = "\xb7", this.$padding = 0, this.setPadding = function(e) {
                this.$padding = e, this.element.style.padding = "0 " + e + "px"
            }, this.getLineHeight = function() {
                return this.$characterSize.height || 0
            }, this.getCharacterWidth = function() {
                return this.$characterSize.width || 0
            }, this.checkForSizeChanges = function() {
                var e = this.$measureSizes();
                if (e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
                    this.$measureNode.style.fontWeight = "bold";
                    var t = this.$measureSizes();
                    this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", {
                        data: e
                    })
                }
            }, this.$pollSizeChanges = function() {
                var e = this;
                this.$pollSizeChangesTimer = setInterval(function() {
                    e.checkForSizeChanges()
                }, 500)
            }, this.$fontStyles = {
                fontFamily: 1,
                fontSize: 1,
                fontWeight: 1,
                fontStyle: 1,
                lineHeight: 1
            }, this.$measureSizes = o.isIE || o.isOldGecko ? function() {
                var e = 1e3;
                if (!this.$measureNode) {
                    var t = this.$measureNode = i.createElement("div"),
                        n = t.style;
                    if (n.width = n.height = "auto", n.left = n.top = 40 * -e + "px", n.visibility = "hidden", n.position = "fixed", n.overflow = "visible", n.whiteSpace = "nowrap", t.innerHTML = r.stringRepeat("Xy", e), this.element.ownerDocument.body) this.element.ownerDocument.body.appendChild(t);
                    else {
                        for (var o = this.element.parentNode; !i.hasCssClass(o, "ace_editor");) o = o.parentNode;
                        o.appendChild(t)
                    }
                }
                if (!this.element.offsetWidth) return null;
                var n = this.$measureNode.style,
                    s = i.computedStyle(this.element);
                for (var a in this.$fontStyles) n[a] = s[a];
                var l = {
                    height: this.$measureNode.offsetHeight,
                    width: this.$measureNode.offsetWidth / (2 * e)
                };
                return 0 == l.width || 0 == l.height ? null : l
            } : function() {
                if (!this.$measureNode) {
                    var e = this.$measureNode = i.createElement("div"),
                        t = e.style;
                    t.width = t.height = "auto", t.left = t.top = "-100px", t.visibility = "hidden", t.position = "fixed", t.overflow = "visible", t.whiteSpace = "nowrap", e.innerHTML = r.stringRepeat("X", 100);
                    for (var n = this.element.parentNode; n && !i.hasCssClass(n, "ace_editor");) n = n.parentNode;
                    if (!n) return this.$measureNode = null;
                    n.appendChild(e)
                }
                var o = this.$measureNode.getBoundingClientRect(),
                    s = {
                        height: o.height,
                        width: o.width / 100
                    };
                return 0 == s.width || 0 == s.height ? null : s
            }, this.setSession = function(e) {
                this.session = e, this.$computeTabString()
            }, this.showInvisibles = !1, this.setShowInvisibles = function(e) {
                return this.showInvisibles == e ? !1 : (this.showInvisibles = e, this.$computeTabString(), !0)
            }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function(e) {
                return this.displayIndentGuides == e ? !1 : (this.displayIndentGuides = e, this.$computeTabString(), !0)
            }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function() {
                var e = this.session.getTabSize();
                this.tabSize = e;
                for (var t = this.$tabStrings = [0], n = 1; e + 1 > n; n++) t.push(this.showInvisibles ? "<span class='ace_invisible'>" + this.TAB_CHAR + r.stringRepeat(" ", n - 1) + "</span>" : r.stringRepeat(" ", n));
                if (this.displayIndentGuides) {
                    this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                    var i = "ace_indent-guide";
                    if (this.showInvisibles) {
                        i += " ace_invisible";
                        var o = r.stringRepeat(this.SPACE_CHAR, this.tabSize),
                            s = this.TAB_CHAR + r.stringRepeat(" ", this.tabSize - 1)
                    } else var o = r.stringRepeat(" ", this.tabSize),
                        s = o;
                    this.$tabStrings[" "] = "<span class='" + i + "'>" + o + "</span>", this.$tabStrings["  "] = "<span class='" + i + "'>" + s + "</span>"
                }
            }, this.updateLines = function(e, t, n) {
                (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) && this.scrollLines(e), this.config = e;
                for (var r = Math.max(t, e.firstRow), o = Math.min(n, e.lastRow), s = this.element.childNodes, a = 0, l = e.firstRow; r > l; l++) {
                    var c = this.session.getFoldLine(l);
                    if (c) {
                        if (c.containsRow(r)) {
                            r = c.start.row;
                            break
                        }
                        l = c.end.row
                    }
                    a++
                }
                for (var l = r, c = this.session.getNextFoldLine(l), u = c ? c.start.row : 1 / 0; l > u && (l = c.end.row + 1, c = this.session.getNextFoldLine(l, c), u = c ? c.start.row : 1 / 0), !(l > o);) {
                    var h = s[a++];
                    if (h) {
                        var d = [];
                        this.$renderLine(d, l, !this.$useLineGroups(), l == u ? c : !1), i.setInnerHtml(h, d.join(""))
                    }
                    l++
                }
            }, this.scrollLines = function(e) {
                var t = this.config;
                if (this.config = e, !t || t.lastRow < e.firstRow) return this.update(e);
                if (e.lastRow < t.firstRow) return this.update(e);
                var n = this.element;
                if (t.firstRow < e.firstRow)
                    for (var i = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); i > 0; i--) n.removeChild(n.firstChild);
                if (t.lastRow > e.lastRow)
                    for (var i = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); i > 0; i--) n.removeChild(n.lastChild);
                if (e.firstRow < t.firstRow) {
                    var r = this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1);
                    n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r)
                }
                if (e.lastRow > t.lastRow) {
                    var r = this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow);
                    n.appendChild(r)
                }
            }, this.$renderLinesFragment = function(e, t, n) {
                for (var r = this.element.ownerDocument.createDocumentFragment(), o = t, s = this.session.getNextFoldLine(o), a = s ? s.start.row : 1 / 0; o > a && (o = s.end.row + 1, s = this.session.getNextFoldLine(o, s), a = s ? s.start.row : 1 / 0), !(o > n);) {
                    var l = i.createElement("div"),
                        c = [];
                    if (this.$renderLine(c, o, !1, o == a ? s : !1), l.innerHTML = c.join(""), this.$useLineGroups()) l.className = "ace_line_group", r.appendChild(l);
                    else
                        for (var u = l.childNodes; u.length;) r.appendChild(u[0]);
                    o++
                }
                return r
            }, this.update = function(e) {
                this.config = e;
                for (var t = [], n = e.firstRow, r = e.lastRow, o = n, s = this.session.getNextFoldLine(o), a = s ? s.start.row : 1 / 0; o > a && (o = s.end.row + 1, s = this.session.getNextFoldLine(o, s), a = s ? s.start.row : 1 / 0), !(o > r);) this.$useLineGroups() && t.push("<div class='ace_line_group'>"), this.$renderLine(t, o, !1, o == a ? s : !1), this.$useLineGroups() && t.push("</div>"), o++;
                this.element = i.setInnerHtml(this.element, t.join(""))
            }, this.$textToken = {
                text: !0,
                rparen: !0,
                lparen: !0
            }, this.$renderToken = function(e, t, n, i) {
                var o = this,
                    s = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g,
                    a = function(e, n, i, s) {
                        if (n) return o.showInvisibles ? "<span class='ace_invisible'>" + r.stringRepeat(o.SPACE_CHAR, e.length) + "</span>" : r.stringRepeat(" ", e.length);
                        if ("&" == e) return "&#38;";
                        if ("<" == e) return "&#60;";
                        if ("  " == e) {
                            var a = o.session.getScreenTabSize(t + s);
                            return t += a - 1, o.$tabStrings[a]
                        }
                        if ("\u3000" == e) {
                            var l = o.showInvisibles ? "ace_cjk ace_invisible" : "ace_cjk",
                                c = o.showInvisibles ? o.SPACE_CHAR : "";
                            return t += 1, "<span class='" + l + "' style='width:" + 2 * o.config.characterWidth + "px'>" + c + "</span>"
                        }
                        return i ? "<span class='ace_invisible ace_invalid'>" + o.SPACE_CHAR + "</span>" : (t += 1, "<span class='ace_cjk' style='width:" + 2 * o.config.characterWidth + "px'>" + e + "</span>")
                    },
                    l = i.replace(s, a);
                if (this.$textToken[n.type]) e.push(l);
                else {
                    var c = "ace_" + n.type.replace(/\./g, " ace_"),
                        u = "";
                    "fold" == n.type && (u = " style='width:" + n.value.length * this.config.characterWidth + "px;' "), e.push("<span class='", c, "'", u, ">", l, "</span>")
                }
                return t + i.length
            }, this.renderIndentGuide = function(e, t, n) {
                var i = t.search(this.$indentGuideRe);
                return 0 >= i || i >= n ? t : " " == t[0] ? (i -= i % this.tabSize, e.push(r.stringRepeat(this.$tabStrings[" "], i / this.tabSize)), t.substr(i)) : "  " == t[0] ? (e.push(r.stringRepeat(this.$tabStrings[" "], i)), t.substr(i)) : t
            }, this.$renderWrappedLine = function(e, t, n, i) {
                for (var r = 0, o = 0, s = n[0], a = 0, l = 0; l < t.length; l++) {
                    var c = t[l],
                        u = c.value;
                    if (0 == l && this.displayIndentGuides) {
                        if (r = u.length, u = this.renderIndentGuide(e, u, s), !u) continue;
                        r -= u.length
                    }
                    if (r + u.length < s) a = this.$renderToken(e, a, c, u), r += u.length;
                    else {
                        for (; r + u.length >= s;) a = this.$renderToken(e, a, c, u.substring(0, s - r)), u = u.substring(s - r), r = s, i || e.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), o++, a = 0, s = n[o] || Number.MAX_VALUE;
                        0 != u.length && (r += u.length, a = this.$renderToken(e, a, c, u))
                    }
                }
            }, this.$renderSimpleLine = function(e, t) {
                var n = 0,
                    i = t[0],
                    r = i.value;
                this.displayIndentGuides && (r = this.renderIndentGuide(e, r)), r && (n = this.$renderToken(e, n, i, r));
                for (var o = 1; o < t.length; o++) i = t[o], r = i.value, n = this.$renderToken(e, n, i, r)
            }, this.$renderLine = function(e, t, n, i) {
                if (!i && 0 != i && (i = this.session.getFoldLine(t)), i) var r = this.$getFoldLineTokens(t, i);
                else var r = this.session.getTokens(t);
                if (n || e.push("<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), r.length) {
                    var o = this.session.getRowSplitData(t);
                    o && o.length ? this.$renderWrappedLine(e, r, o, n) : this.$renderSimpleLine(e, r)
                }
                this.showInvisibles && (i && (t = i.end.row), e.push("<span class='ace_invisible'>", t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")), n || e.push("</div>")
            }, this.$getFoldLineTokens = function(e, t) {
                function n(e, t, n) {
                    for (var i = 0, o = 0; o + e[i].value.length < t;)
                        if (o += e[i].value.length, i++, i == e.length) return;
                    if (o != t) {
                        var s = e[i].value.substring(t - o);
                        s.length > n - t && (s = s.substring(0, n - t)), r.push({
                            type: e[i].type,
                            value: s
                        }), o = t + s.length, i += 1
                    }
                    for (; n > o && i < e.length;) {
                        var s = e[i].value;
                        r.push(s.length + o > n ? {
                            type: e[i].type,
                            value: s.substring(0, n - o)
                        } : e[i]), o += s.length, i += 1
                    }
                }
                var i = this.session,
                    r = [],
                    o = i.getTokens(e);
                return t.walk(function(e, t, s, a, l) {
                    null != e ? r.push({
                        type: "fold",
                        value: e
                    }) : (l && (o = i.getTokens(t)), o.length && n(o, a, s))
                }, t.end.row, this.session.getLine(t.end.row).length), r
            }, this.$useLineGroups = function() {
                return this.session.getUseWrapMode()
            }, this.destroy = function() {
                clearInterval(this.$pollSizeChangesTimer), this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode), delete this.$measureNode
            }
        }).call(a.prototype), t.Text = a
    }), ace.define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
        var n = e("../lib/dom"),
            i = function(e) {
                this.element = n.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), n.addCssClass(this.element, "ace_hidden-cursors")
            };
        (function() {
            this.$padding = 0, this.setPadding = function(e) {
                this.$padding = e
            }, this.setSession = function(e) {
                this.session = e
            }, this.setBlinking = function(e) {
                e != this.isBlinking && (this.isBlinking = e, this.restartTimer())
            }, this.setBlinkInterval = function(e) {
                e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer())
            }, this.setSmoothBlinking = function(e) {
                e != this.smoothBlinking && (this.smoothBlinking = e, e ? n.addCssClass(this.element, "ace_smooth-blinking") : n.removeCssClass(this.element, "ace_smooth-blinking"), this.restartTimer())
            }, this.addCursor = function() {
                var e = n.createElement("div");
                return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e
            }, this.removeCursor = function() {
                if (this.cursors.length > 1) {
                    var e = this.cursors.pop();
                    return e.parentNode.removeChild(e), e
                }
            }, this.hideCursor = function() {
                this.isVisible = !1, n.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
            }, this.showCursor = function() {
                this.isVisible = !0, n.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
            }, this.restartTimer = function() {
                clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.smoothBlinking && n.removeCssClass(this.element, "ace_smooth-blinking");
                for (var e = this.cursors.length; e--;) this.cursors[e].style.opacity = "";
                if (this.isBlinking && this.blinkInterval && this.isVisible) {
                    this.smoothBlinking && setTimeout(function() {
                        n.addCssClass(this.element, "ace_smooth-blinking")
                    }.bind(this));
                    var t = function() {
                        this.timeoutId = setTimeout(function() {
                            for (var e = this.cursors.length; e--;) this.cursors[e].style.opacity = 0
                        }.bind(this), .6 * this.blinkInterval)
                    }.bind(this);
                    this.intervalId = setInterval(function() {
                        for (var e = this.cursors.length; e--;) this.cursors[e].style.opacity = "";
                        t()
                    }.bind(this), this.blinkInterval), t()
                }
            }, this.getPixelPosition = function(e, t) {
                if (!this.config || !this.session) return {
                    left: 0,
                    top: 0
                };
                e || (e = this.session.selection.getCursor());
                var n = this.session.documentToScreenPosition(e),
                    i = this.$padding + n.column * this.config.characterWidth,
                    r = (n.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
                return {
                    left: i,
                    top: r
                }
            }, this.update = function(e) {
                this.config = e;
                var t = this.session.$selectionMarkers,
                    n = 0,
                    i = 0;
                (void 0 === t || 0 === t.length) && (t = [{
                    cursor: null
                }]);
                for (var n = 0, r = t.length; r > n; n++) {
                    var o = this.getPixelPosition(t[n].cursor, !0);
                    if (!((o.top > e.height + e.offset || o.top < -e.offset) && n > 1)) {
                        var s = (this.cursors[i++] || this.addCursor()).style;
                        s.left = o.left + "px", s.top = o.top + "px", s.width = e.characterWidth + "px", s.height = e.lineHeight + "px"
                    }
                }
                for (; this.cursors.length > i;) this.removeCursor();
                var a = this.session.getOverwrite();
                this.$setOverwrite(a), this.$pixelPos = o, this.restartTimer()
            }, this.$setOverwrite = function(e) {
                e != this.overwrite && (this.overwrite = e, e ? n.addCssClass(this.element, "ace_overwrite-cursors") : n.removeCssClass(this.element, "ace_overwrite-cursors"))
            }, this.destroy = function() {
                clearInterval(this.intervalId), clearTimeout(this.timeoutId)
            }
        }).call(i.prototype), t.Cursor = i
    }), ace.define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function(e, t) {
        var n = e("./lib/oop"),
            i = e("./lib/dom"),
            r = e("./lib/event"),
            o = e("./lib/event_emitter").EventEmitter,
            s = function(e, t) {
                this.element = i.createElement("div"), this.element.className = "ace_scrollbar", this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.element.appendChild(this.inner), e.appendChild(this.element), t.$scrollbarWidth = this.width = i.scrollbarWidth(e.ownerDocument), t.$scrollbarWidth = this.width = i.scrollbarWidth(e.ownerDocument), this.fullWidth = this.width, this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px", this.setVisible(!1), this.element.style.overflowY = "scroll", r.addListener(this.element, "scroll", this.onScrollV.bind(this)), r.addListener(this.element, "mousedown", r.preventDefault)
            },
            a = function(e, t) {
                this.element = i.createElement("div"), this.element.className = "ace_scrollbar-h", this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.element.appendChild(this.inner), e.appendChild(this.element), this.height = t.$scrollbarWidth, this.fullHeight = this.height, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px", this.setVisible(!1), this.element.style.overflowX = "scroll", r.addListener(this.element, "scroll", this.onScrollH.bind(this)), r.addListener(this.element, "mousedown", r.preventDefault)
            };
        (function() {
            n.implement(this, o), this.setVisible = function(e) {
                e ? (this.element.style.display = "", this.fullWidth && (this.width = this.fullWidth), this.fullHeight && (this.height = this.fullHeight)) : (this.element.style.display = "none", this.height = this.width = 0)
            }, this.onScrollV = function() {
                this.skipEvent || (this.scrollTop = this.element.scrollTop, this._emit("scroll", {
                    data: this.scrollTop
                })), this.skipEvent = !1
            }, this.onScrollH = function() {
                this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", {
                    data: this.scrollLeft
                })), this.skipEvent = !1
            }, this.getWidth = function() {
                return this.width
            }, this.getHeight = function() {
                return this.height
            }, this.setHeight = function(e) {
                this.element.style.height = e + "px"
            }, this.setWidth = function(e) {
                this.element.style.width = e + "px"
            }, this.setInnerHeight = function(e) {
                this.inner.style.height = e + "px"
            }, this.setInnerWidth = function(e) {
                this.inner.style.width = e + "px"
            }, this.setScrollTop = function(e) {
                this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = this.element.scrollTop = e)
            }, this.setScrollLeft = function(e) {
                this.scrollLeft != e && (this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = e)
            }
        }).call(s.prototype), a.prototype = s.prototype, t.ScrollBar = s, t.ScrollBarV = s, t.ScrollBarH = a
    }), ace.define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function(e, t) {
        var n = e("./lib/event"),
            i = function(e, t) {
                this.onRender = e, this.pending = !1, this.changes = 0, this.window = t || window
            };
        (function() {
            this.schedule = function(e) {
                if (this.changes = this.changes | e, !this.pending) {
                    this.pending = !0;
                    var t = this;
                    n.nextFrame(function() {
                        t.pending = !1;
                        for (var e; e = t.changes;) t.changes = 0, t.onRender(e)
                    }, this.window)
                }
            }
        }).call(i.prototype), t.RenderLoop = i
    }), ace.define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"], function(e, t) {
        function n(e, t, n) {
            return f.$options.wrap = !0, f.$options.needle = t, f.$options.backwards = -1 == n, f.find(e)
        }

        function i(e, t) {
            return e.row == t.row && e.column == t.column
        }

        function r(e) {
            e.$multiselectOnSessionChange || (e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), e.$multiselectOnSessionChange = t.onSessionChange.bind(e), e.$multiselectOnSessionChange(e), e.on("changeSession", e.$multiselectOnSessionChange), e.on("mousedown", c), e.commands.addCommands(d.defaultCommands), o(e))
        }

        function o(e) {
            function t() {
                i && (e.renderer.setMouseCursor(""), i = !1)
            }
            var n = e.textInput.getElement(),
                i = !1;
            u.addListener(n, "keydown", function(n) {
                18 != n.keyCode || n.ctrlKey || n.shiftKey || n.metaKey ? i && t() : i || (e.renderer.setMouseCursor("crosshair"), i = !0)
            }), u.addListener(n, "keyup", t), u.addListener(n, "blur", t)
        }
        var s = e("./range_list").RangeList,
            a = e("./range").Range,
            l = e("./selection").Selection,
            c = e("./mouse/multi_select_handler").onMouseDown,
            u = e("./lib/event"),
            h = e("./lib/lang"),
            d = e("./commands/multi_select_commands");
        t.commands = d.defaultCommands.concat(d.multiSelectCommands);
        var g = e("./search").Search,
            f = new g,
            p = e("./edit_session").EditSession;
        (function() {
            this.getSelectionMarkers = function() {
                return this.$selectionMarkers
            }
        }).call(p.prototype),
            function() {
                this.ranges = null, this.rangeList = null, this.addRange = function(e, t) {
                    if (e) {
                        if (!this.inMultiSelectMode && 0 == this.rangeCount) {
                            var n = this.toOrientedRange();
                            if (this.rangeList.add(n), this.rangeList.add(e), 2 != this.rangeList.ranges.length) return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
                            this.rangeList.removeAll(), this.rangeList.add(n), this.$onAddRange(n)
                        }
                        e.cursor || (e.cursor = e.end);
                        var i = this.rangeList.add(e);
                        return this.$onAddRange(e), i.length && this.$onRemoveRange(i), this.rangeCount > 1 && !this.inMultiSelectMode && (this._emit("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e)
                    }
                }, this.toSingleRange = function(e) {
                    e = e || this.ranges[0];
                    var t = this.rangeList.removeAll();
                    t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e)
                }, this.substractPoint = function(e) {
                    var t = this.rangeList.substractPoint(e);
                    return t ? (this.$onRemoveRange(t), t[0]) : void 0
                }, this.mergeOverlappingRanges = function() {
                    var e = this.rangeList.merge();
                    e.length ? this.$onRemoveRange(e) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
                }, this.$onAddRange = function(e) {
                    this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._emit("addRange", {
                        range: e
                    })
                }, this.$onRemoveRange = function(e) {
                    if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
                        var t = this.rangeList.ranges.pop();
                        e.push(t), this.rangeCount = 0
                    }
                    for (var n = e.length; n--;) {
                        var i = this.ranges.indexOf(e[n]);
                        this.ranges.splice(i, 1)
                    }
                    this._emit("removeRange", {
                        ranges: e
                    }), 0 == this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._emit("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), t = t || this.ranges[0], t && !t.isEqual(this.getRange()) && this.fromOrientedRange(t)
                }, this.$initRangeList = function() {
                    this.rangeList || (this.rangeList = new s, this.ranges = [], this.rangeCount = 0)
                }, this.getAllRanges = function() {
                    return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()]
                }, this.splitIntoLines = function() {
                    if (this.rangeCount > 1) {
                        var e = this.rangeList.ranges,
                            t = e[e.length - 1],
                            n = a.fromPoints(e[0].start, t.end);
                        this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
                    } else {
                        var n = this.getRange(),
                            i = this.isBackwards(),
                            r = n.start.row,
                            o = n.end.row;
                        if (r == o) {
                            if (i) var s = n.end,
                                l = n.start;
                            else var s = n.start,
                                l = n.end;
                            return this.addRange(a.fromPoints(l, l)), void this.addRange(a.fromPoints(s, s))
                        }
                        var c = [],
                            u = this.getLineRange(r, !0);
                        u.start.column = n.start.column, c.push(u);
                        for (var h = r + 1; o > h; h++) c.push(this.getLineRange(h, !0));
                        u = this.getLineRange(o, !0), u.end.column = n.end.column, c.push(u), c.forEach(this.addRange, this)
                    }
                }, this.toggleBlockSelection = function() {
                    if (this.rangeCount > 1) {
                        var e = this.rangeList.ranges,
                            t = e[e.length - 1],
                            n = a.fromPoints(e[0].start, t.end);
                        this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
                    } else {
                        var i = this.session.documentToScreenPosition(this.selectionLead),
                            r = this.session.documentToScreenPosition(this.selectionAnchor),
                            o = this.rectangularRangeBlock(i, r);
                        o.forEach(this.addRange, this)
                    }
                }, this.rectangularRangeBlock = function(e, t, n) {
                    var r = [],
                        o = e.column < t.column;
                    if (o) var s = e.column,
                        l = t.column;
                    else var s = t.column,
                        l = e.column;
                    var c = e.row < t.row;
                    if (c) var u = e.row,
                        h = t.row;
                    else var u = t.row,
                        h = e.row;
                    0 > s && (s = 0), 0 > u && (u = 0), u == h && (n = !0);
                    for (var d = u; h >= d; d++) {
                        var g = a.fromPoints(this.session.screenToDocumentPosition(d, s), this.session.screenToDocumentPosition(d, l));
                        if (g.isEmpty()) {
                            if (f && i(g.end, f)) break;
                            var f = g.end
                        }
                        g.cursor = o ? g.start : g.end, r.push(g)
                    }
                    if (c && r.reverse(), !n) {
                        for (var p = r.length - 1; r[p].isEmpty() && p > 0;) p--;
                        if (p > 0)
                            for (var m = 0; r[m].isEmpty();) m++;
                        for (var v = p; v >= m; v--) r[v].isEmpty() && r.splice(v, 1)
                    }
                    return r
                }
            }.call(l.prototype);
        var m = e("./editor").Editor;
        (function() {
            this.updateSelectionMarkers = function() {
                this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            }, this.addSelectionMarker = function(e) {
                e.cursor || (e.cursor = e.end);
                var t = this.getSelectionStyle();
                return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e
            }, this.removeSelectionMarker = function(e) {
                if (e.marker) {
                    this.session.removeMarker(e.marker);
                    var t = this.session.$selectionMarkers.indexOf(e); - 1 != t && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
                }
            }, this.removeSelectionMarkers = function(e) {
                for (var t = this.session.$selectionMarkers, n = e.length; n--;) {
                    var i = e[n];
                    if (i.marker) {
                        this.session.removeMarker(i.marker);
                        var r = t.indexOf(i); - 1 != r && t.splice(r, 1)
                    }
                }
                this.session.selectionMarkerCount = t.length
            }, this.$onAddRange = function(e) {
                this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            }, this.$onRemoveRange = function(e) {
                this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            }, this.$onMultiSelect = function() {
                this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(d.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
            }, this.$onSingleSelect = function() {
                this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(d.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
            }, this.$onMultiSelectExec = function(e) {
                var t = e.command,
                    n = e.editor;
                if (n.multiSelect) {
                    if (t.multiSelectAction) "forEach" == t.multiSelectAction ? i = n.forEachSelection(t, e.args) : "forEachLine" == t.multiSelectAction ? i = n.forEachSelection(t, e.args, !0) : "single" == t.multiSelectAction ? (n.exitMultiSelectMode(), i = t.exec(n, e.args || {})) : i = t.multiSelectAction(n, e.args || {});
                    else {
                        var i = t.exec(n, e.args || {});
                        n.multiSelect.addRange(n.multiSelect.toOrientedRange()), n.multiSelect.mergeOverlappingRanges()
                    }
                    return i
                }
            }, this.forEachSelection = function(e, t, n) {
                if (!this.inVirtualSelectionMode) {
                    var i, r = this.session,
                        o = this.selection,
                        s = o.rangeList,
                        a = o._eventRegistry;
                    o._eventRegistry = {};
                    var c = new l(r);
                    this.inVirtualSelectionMode = !0;
                    for (var u = s.ranges.length; u--;) {
                        if (n)
                            for (; u > 0 && s.ranges[u].start.row == s.ranges[u - 1].end.row;) u--;
                        c.fromOrientedRange(s.ranges[u]), this.selection = r.selection = c;
                        var h = e.exec(this, t || {});
                        void 0 == !i && (i = h), c.toOrientedRange(s.ranges[u])
                    }
                    c.detach(), this.selection = r.selection = o, this.inVirtualSelectionMode = !1, o._eventRegistry = a, o.mergeOverlappingRanges();
                    var d = this.renderer.$scrollAnimation;
                    return this.onCursorChange(), this.onSelectionChange(), d && d.from == d.to && this.renderer.animateScrolling(d.from), i
                }
            }, this.exitMultiSelectMode = function() {
                this.inMultiSelectMode && !this.inVirtualSelectionMode && this.multiSelect.toSingleRange()
            }, this.getSelectedText = function() {
                var e = "";
                if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                    for (var t = this.multiSelect.rangeList.ranges, n = [], i = 0; i < t.length; i++) n.push(this.session.getTextRange(t[i]));
                    var r = this.session.getDocument().getNewLineCharacter();
                    e = n.join(r), e.length == (n.length - 1) * r.length && (e = "")
                } else this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
                return e
            }, this.onPaste = function(e) {
                if (!this.$readOnly) {
                    if (this._signal("paste", e), !this.inMultiSelectMode || this.inVirtualSelectionMode) return this.insert(e);
                    var t = e.split(/\r\n|\r|\n/),
                        n = this.selection.rangeList.ranges;
                    if (t.length > n.length || t.length < 2 || !t[1]) return this.commands.exec("insertstring", this, e);
                    for (var i = n.length; i--;) {
                        var r = n[i];
                        r.isEmpty() || this.session.remove(r), this.session.insert(r.start, t[i])
                    }
                }
            }, this.findAll = function(e, t, n) {
                t = t || {}, t.needle = e || t.needle, this.$search.set(t);
                var i = this.$search.findAll(this.session);
                if (!i.length) return 0;
                this.$blockScrolling += 1;
                var r = this.multiSelect;
                n || r.toSingleRange(i[0]);
                for (var o = i.length; o--;) r.addRange(i[o], !0);
                return this.$blockScrolling -= 1, i.length
            }, this.selectMoreLines = function(e, t) {
                var n = this.selection.toOrientedRange(),
                    i = n.cursor == n.end,
                    r = this.session.documentToScreenPosition(n.cursor);
                this.selection.$desiredColumn && (r.column = this.selection.$desiredColumn);
                var o = this.session.screenToDocumentPosition(r.row + e, r.column);
                if (n.isEmpty()) var s = o;
                else var l = this.session.documentToScreenPosition(i ? n.end : n.start),
                    s = this.session.screenToDocumentPosition(l.row + e, l.column);
                if (i) {
                    var c = a.fromPoints(o, s);
                    c.cursor = c.start
                } else {
                    var c = a.fromPoints(s, o);
                    c.cursor = c.end
                }
                if (c.desiredColumn = r.column, this.selection.inMultiSelectMode) {
                    if (t) var u = n.cursor
                } else this.selection.addRange(n);
                this.selection.addRange(c), u && this.selection.substractPoint(u)
            }, this.transposeSelections = function(e) {
                for (var t = this.session, n = t.multiSelect, i = n.ranges, r = i.length; r--;) {
                    var o = i[r];
                    if (o.isEmpty()) {
                        var s = t.getWordRange(o.start.row, o.start.column);
                        o.start.row = s.start.row, o.start.column = s.start.column, o.end.row = s.end.row, o.end.column = s.end.column
                    }
                }
                n.mergeOverlappingRanges();
                for (var a = [], r = i.length; r--;) {
                    var o = i[r];
                    a.unshift(t.getTextRange(o))
                }
                0 > e ? a.unshift(a.pop()) : a.push(a.shift());
                for (var r = i.length; r--;) {
                    var o = i[r],
                        s = o.clone();
                    t.replace(o, a[r]), o.start.row = s.start.row, o.start.column = s.start.column
                }
            }, this.selectMore = function(e, t) {
                var i = this.session,
                    r = i.multiSelect,
                    o = r.toOrientedRange();
                if (o.isEmpty()) {
                    var o = i.getWordRange(o.start.row, o.start.column);
                    return o.cursor = -1 == e ? o.start : o.end, void this.multiSelect.addRange(o)
                }
                var s = i.getTextRange(o),
                    a = n(i, s, e);
                a && (a.cursor = -1 == e ? a.start : a.end, this.multiSelect.addRange(a)), t && this.multiSelect.substractPoint(o.cursor)
            }, this.alignCursors = function() {
                var e = this.session,
                    t = e.multiSelect,
                    n = t.ranges;
                if (n.length) {
                    var i = -1,
                        r = n.filter(function(e) {
                            return e.cursor.row == i ? !0 : void(i = e.cursor.row)
                        });
                    t.$onRemoveRange(r);
                    var o = 0,
                        s = 1 / 0,
                        l = n.map(function(t) {
                            var n = t.cursor,
                                i = e.getLine(n.row),
                                r = i.substr(n.column).search(/\S/g);
                            return -1 == r && (r = 0), n.column > o && (o = n.column), s > r && (s = r), r
                        });
                    n.forEach(function(t, n) {
                        var i = t.cursor,
                            r = o - i.column,
                            c = l[n] - s;
                        r > c ? e.insert(i, h.stringRepeat(" ", r - c)) : e.remove(new a(i.row, i.column, i.row, i.column - r + c)), t.start.column = t.end.column = o, t.start.row = t.end.row = i.row, t.cursor = t.end
                    }), t.fromOrientedRange(n[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                } else {
                    var c = this.selection.getRange(),
                        u = c.start.row,
                        d = c.end.row,
                        g = this.session.doc.removeLines(u, d);
                    g = this.$reAlignText(g), this.session.doc.insertLines(u, g), c.start.column = 0, c.end.column = g[g.length - 1].length, this.selection.setRange(c)
                }
            }, this.$reAlignText = function(e) {
                function t(e) {
                    return h.stringRepeat(" ", e)
                }

                function n(e) {
                    return e[2] ? t(o) + e[2] + t(s - e[2].length + a) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                }

                function i(e) {
                    return e[2] ? t(o + s - e[2].length) + e[2] + t(a, " ") + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                }

                function r(e) {
                    return e[2] ? t(o) + e[2] + t(a) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                }
                var o, s, a, l = !0,
                    c = !0;
                return e.map(function(e) {
                    var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
                    return t ? null == o ? (o = t[1].length, s = t[2].length, a = t[3].length, t) : (o + s + a != t[1].length + t[2].length + t[3].length && (c = !1), o != t[1].length && (l = !1), o > t[1].length && (o = t[1].length), s < t[2].length && (s = t[2].length), a > t[3].length && (a = t[3].length), t) : [e]
                }).map(l ? c ? i : n : r)
            }
        }).call(m.prototype), t.onSessionChange = function(e) {
            var t = e.session;
            t.multiSelect || (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t.multiSelect;
            var n = e.oldSession;
            n && (n.multiSelect.removeEventListener("addRange", this.$onAddRange), n.multiSelect.removeEventListener("removeRange", this.$onRemoveRange), n.multiSelect.removeEventListener("multiSelect", this.$onMultiSelect), n.multiSelect.removeEventListener("singleSelect", this.$onSingleSelect)), t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
        }, t.MultiSelect = r, e("./config").defineOptions(m.prototype, "editor", {
            enableMultiselect: {
                set: function(e) {
                    r(this), e ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", c)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", c))
                },
                value: !0
            }
        })
    }), ace.define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event"], function(e, t) {
        function n(e, t) {
            return e.row == t.row && e.column == t.column
        }

        function i(e) {
            var t = e.domEvent,
                i = t.altKey,
                o = t.shiftKey,
                s = e.getAccelKey(),
                a = e.getButton();
            if (e.editor.inMultiSelectMode && 2 == a) return void e.editor.textInput.onContextMenu(e.domEvent);
            if (!s && !i) return void(0 == a && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode());
            var l = e.editor,
                c = l.selection,
                u = l.inMultiSelectMode,
                h = e.getDocumentPosition(),
                d = c.getCursor(),
                g = e.inSelection() || c.isEmpty() && n(h, d),
                f = e.x,
                p = e.y,
                m = function(e) {
                    f = e.clientX, p = e.clientY
                },
                v = function() {
                    var e = l.renderer.pixelToScreenCoordinates(f, p),
                        t = y.screenToDocumentPosition(e.row, e.column);
                    n(A, e) && n(t, c.selectionLead) || (A = e, l.selection.moveCursorToPosition(t), l.selection.clearSelection(), l.renderer.scrollCursorIntoView(), l.removeSelectionMarkers(C), C = c.rectangularRangeBlock(A, w), C.forEach(l.addSelectionMarker, l), l.updateSelectionMarkers())
                },
                y = l.session,
                w = l.renderer.pixelToScreenCoordinates(f, p),
                A = w;
            if (!s || o || i || 0 != a) {
                if (i && 0 == a) {
                    e.stop(), u && !s ? c.toSingleRange() : !u && s && c.addRange();
                    var C = [];
                    o ? (w = y.documentToScreenPosition(c.lead), v()) : (c.moveCursorToPosition(h), c.clearSelection());
                    var F = function() {
                            clearInterval(b), l.removeSelectionMarkers(C);
                            for (var e = 0; e < C.length; e++) c.addRange(C[e])
                        },
                        E = v;
                    r.capture(l.container, m, F);
                    var b = setInterval(function() {
                        E()
                    }, 20);
                    return e.preventDefault()
                }
            } else {
                if (!u && g) return;
                if (!u) {
                    var x = c.toOrientedRange();
                    l.addSelectionMarker(x)
                }
                var D = c.rangeList.rangeAtPoint(h);
                l.once("mouseup", function() {
                    var e = c.toOrientedRange();
                    D && e.isEmpty() && n(D.cursor, e.cursor) ? c.substractPoint(e.cursor) : (x && (l.removeSelectionMarker(x), c.addRange(x)), c.addRange(e))
                })
            }
        }
        var r = e("../lib/event");
        t.onMouseDown = i
    }), ace.define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function(e, t) {
        t.defaultCommands = [{
            name: "addCursorAbove",
            exec: function(e) {
                e.selectMoreLines(-1)
            },
            bindKey: {
                win: "Ctrl-Alt-Up",
                mac: "Ctrl-Alt-Up"
            },
            readonly: !0
        }, {
            name: "addCursorBelow",
            exec: function(e) {
                e.selectMoreLines(1)
            },
            bindKey: {
                win: "Ctrl-Alt-Down",
                mac: "Ctrl-Alt-Down"
            },
            readonly: !0
        }, {
            name: "addCursorAboveSkipCurrent",
            exec: function(e) {
                e.selectMoreLines(-1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Up",
                mac: "Ctrl-Alt-Shift-Up"
            },
            readonly: !0
        }, {
            name: "addCursorBelowSkipCurrent",
            exec: function(e) {
                e.selectMoreLines(1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Down",
                mac: "Ctrl-Alt-Shift-Down"
            },
            readonly: !0
        }, {
            name: "selectMoreBefore",
            exec: function(e) {
                e.selectMore(-1)
            },
            bindKey: {
                win: "Ctrl-Alt-Left",
                mac: "Ctrl-Alt-Left"
            },
            readonly: !0
        }, {
            name: "selectMoreAfter",
            exec: function(e) {
                e.selectMore(1)
            },
            bindKey: {
                win: "Ctrl-Alt-Right",
                mac: "Ctrl-Alt-Right"
            },
            readonly: !0
        }, {
            name: "selectNextBefore",
            exec: function(e) {
                e.selectMore(-1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Left",
                mac: "Ctrl-Alt-Shift-Left"
            },
            readonly: !0
        }, {
            name: "selectNextAfter",
            exec: function(e) {
                e.selectMore(1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Right",
                mac: "Ctrl-Alt-Shift-Right"
            },
            readonly: !0
        }, {
            name: "splitIntoLines",
            exec: function(e) {
                e.multiSelect.splitIntoLines()
            },
            bindKey: {
                win: "Ctrl-Alt-L",
                mac: "Ctrl-Alt-L"
            },
            readonly: !0
        }, {
            name: "alignCursors",
            exec: function(e) {
                e.alignCursors()
            },
            bindKey: {
                win: "Ctrl-Alt-A",
                mac: "Ctrl-Alt-A"
            }
        }], t.multiSelectCommands = [{
            name: "singleSelection",
            bindKey: "esc",
            exec: function(e) {
                e.exitMultiSelectMode()
            },
            readonly: !0,
            isAvailable: function(e) {
                return e && e.inMultiSelectMode
            }
        }];
        var n = e("../keyboard/hash_handler").HashHandler;
        t.keyboardHandler = new n(t.multiSelectCommands)
    }), ace.define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/config"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("../lib/event_emitter").EventEmitter,
            r = e("../config"),
            o = function(t, n, i) {
                this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), this.onError = this.onError.bind(this), e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl);
                var o;
                if (r.get("packaged") || !e.toUrl) o = r.moduleUrl(n, "worker");
                else {
                    var s = this.$normalizePath;
                    o = s(e.toUrl("ace/worker/worker.js", null, "_"));
                    var a = {};
                    t.forEach(function(t) {
                        a[t] = s(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
                    })
                }
                this.$worker = new Worker(o), this.$worker.postMessage({
                    init: !0,
                    tlns: a,
                    module: n,
                    classname: i
                }), this.callbackId = 1, this.callbacks = {}, this.$worker.onerror = this.onError, this.$worker.onmessage = this.onMessage
            };
        (function() {
            n.implement(this, i), this.onError = function(e) {
                throw window.console && console.log && console.log(e), e
            }, this.onMessage = function(e) {
                var t = e.data;
                switch (t.type) {
                    case "log":
                        window.console && console.log && console.log.apply(console, t.data);
                        break;
                    case "event":
                        this._emit(t.name, {
                            data: t.data
                        });
                        break;
                    case "call":
                        var n = this.callbacks[t.id];
                        n && (n(t.data), delete this.callbacks[t.id])
                }
            }, this.$normalizePath = function(e) {
                return location.host ? (e = e.replace(/^[a-z]+:\/\/[^\/]+/, ""), e = location.protocol + "//" + location.host + ("/" == e.charAt(0) ? "" : location.pathname.replace(/\/[^\/]*$/, "")) + "/" + e.replace(/^[\/]+/, "")) : e
            }, this.terminate = function() {
                this._emit("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc.removeEventListener("change", this.changeListener), this.$doc = null
            }, this.send = function(e, t) {
                this.$worker.postMessage({
                    command: e,
                    args: t
                })
            }, this.call = function(e, t, n) {
                if (n) {
                    var i = this.callbackId++;
                    this.callbacks[i] = n, t.push(i)
                }
                this.send(e, t)
            }, this.emit = function(e, t) {
                try {
                    this.$worker.postMessage({
                        event: e,
                        data: {
                            data: t.data
                        }
                    })
                } catch (n) {}
            }, this.attachToDocument = function(e) {
                this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener)
            }, this.changeListener = function(e) {
                this.deltaQueue ? this.deltaQueue.push(e.data) : (this.deltaQueue = [e.data], setTimeout(this.$sendDeltaQueue, 1))
            }, this.$sendDeltaQueue = function() {
                var e = this.deltaQueue;
                e && (this.deltaQueue = null, e.length > 20 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {
                    data: e
                }))
            }
        }).call(o.prototype);
        var s = function(e, t, n) {
            this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.callbackId = 1, this.callbacks = {}, this.messageBuffer = [];
            var o = null,
                s = Object.create(i),
                a = this;
            this.$worker = {}, this.$worker.terminate = function() {}, this.$worker.postMessage = function(e) {
                a.messageBuffer.push(e), o && setTimeout(l)
            };
            var l = function() {
                var e = a.messageBuffer.shift();
                e.command ? o[e.command].apply(o, e.args) : e.event && s._emit(e.event, e.data)
            };
            s.postMessage = function(e) {
                a.onMessage({
                    data: e
                })
            }, s.callback = function(e, t) {
                this.postMessage({
                    type: "call",
                    id: t,
                    data: e
                })
            }, s.emit = function(e, t) {
                this.postMessage({
                    type: "event",
                    name: e,
                    data: t
                })
            }, r.loadModule(["worker", t], function(e) {
                for (o = new e[n](s); a.messageBuffer.length;) l()
            })
        };
        s.prototype = o.prototype, t.UIWorkerClient = s, t.WorkerClient = o
    }), ace.define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function(e, t) {
        var n = e("./range").Range,
            i = e("./lib/event_emitter").EventEmitter,
            r = e("./lib/oop"),
            o = function(e, t, n, i, r, o) {
                var s = this;
                this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = r, this.othersClass = o, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = i, this.$onCursorChange = function() {
                    setTimeout(function() {
                        s.onCursorChange()
                    })
                }, this.$pos = n;
                var a = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {
                    length: -1
                };
                this.$undoStackDepth = a.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange)
            };
        (function() {
            r.implement(this, i), this.setup = function() {
                var e = this,
                    t = this.doc,
                    i = this.session,
                    r = this.$pos;
                this.pos = t.createAnchor(r.row, r.column), this.markerId = i.addMarker(new n(r.row, r.column, r.row, r.column + this.length), this.mainClass, null, !1), this.pos.on("change", function(t) {
                    i.removeMarker(e.markerId), e.markerId = i.addMarker(new n(t.value.row, t.value.column, t.value.row, t.value.column + e.length), e.mainClass, null, !1)
                }), this.others = [], this.$others.forEach(function(n) {
                    var i = t.createAnchor(n.row, n.column);
                    e.others.push(i)
                }), i.setUndoSelect(!1)
            }, this.showOtherMarkers = function() {
                if (!this.othersActive) {
                    var e = this.session,
                        t = this;
                    this.othersActive = !0, this.others.forEach(function(i) {
                        i.markerId = e.addMarker(new n(i.row, i.column, i.row, i.column + t.length), t.othersClass, null, !1), i.on("change", function(r) {
                            e.removeMarker(i.markerId), i.markerId = e.addMarker(new n(r.value.row, r.value.column, r.value.row, r.value.column + t.length), t.othersClass, null, !1)
                        })
                    })
                }
            }, this.hideOtherMarkers = function() {
                if (this.othersActive) {
                    this.othersActive = !1;
                    for (var e = 0; e < this.others.length; e++) this.session.removeMarker(this.others[e].markerId)
                }
            }, this.onUpdate = function(e) {
                var t = e.data,
                    i = t.range;
                if (i.start.row === i.end.row && i.start.row === this.pos.row && !this.$updating) {
                    this.$updating = !0;
                    var r = "insertText" === t.action ? i.end.column - i.start.column : i.start.column - i.end.column;
                    if (i.start.column >= this.pos.column && i.start.column <= this.pos.column + this.length + 1) {
                        var o = i.start.column - this.pos.column;
                        if (this.length += r, !this.session.$fromUndo) {
                            if ("insertText" === t.action)
                                for (var s = this.others.length - 1; s >= 0; s--) {
                                    var a = this.others[s],
                                        l = {
                                            row: a.row,
                                            column: a.column + o
                                        };
                                    a.row === i.start.row && i.start.column < a.column && (l.column += r), this.doc.insert(l, t.text)
                                } else if ("removeText" === t.action)
                                    for (var s = this.others.length - 1; s >= 0; s--) {
                                        var a = this.others[s],
                                            l = {
                                                row: a.row,
                                                column: a.column + o
                                            };
                                        a.row === i.start.row && i.start.column < a.column && (l.column += r), this.doc.remove(new n(l.row, l.column, l.row, l.column - r))
                                    }
                                i.start.column === this.pos.column && "insertText" === t.action ? setTimeout(function() {
                                this.pos.setPosition(this.pos.row, this.pos.column - r);
                                for (var e = 0; e < this.others.length; e++) {
                                    var t = this.others[e],
                                        n = {
                                            row: t.row,
                                            column: t.column - r
                                        };
                                    t.row === i.start.row && i.start.column < t.column && (n.column += r), t.setPosition(n.row, n.column)
                                }
                            }.bind(this), 0) : i.start.column === this.pos.column && "removeText" === t.action && setTimeout(function() {
                                for (var e = 0; e < this.others.length; e++) {
                                    var t = this.others[e];
                                    t.row === i.start.row && i.start.column < t.column && t.setPosition(t.row, t.column - r)
                                }
                            }.bind(this), 0)
                        }
                        this.pos._emit("change", {
                            value: this.pos
                        });
                        for (var s = 0; s < this.others.length; s++) this.others[s]._emit("change", {
                            value: this.others[s]
                        })
                    }
                    this.$updating = !1
                }
            }, this.onCursorChange = function(e) {
                if (!this.$updating) {
                    var t = this.session.selection.getCursor();
                    t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e))
                }
            }, this.detach = function() {
                this.session.removeMarker(this.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.pos.detach();
                for (var e = 0; e < this.others.length; e++) this.others[e].detach();
                this.session.setUndoSelect(!0)
            }, this.cancel = function() {
                if (-1 === this.$undoStackDepth) throw Error("Canceling placeholders only supported with undo manager attached to session.");
                for (var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth, n = 0; t > n; n++) e.undo(!0)
            }
        }).call(o.prototype), t.PlaceHolder = o
    }), ace.define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function(e, t) {
        var n = e("../../range").Range,
            i = t.FoldMode = function() {};
        (function() {
            this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function(e, t, n) {
                var i = e.getLine(n);
                return this.foldingStartMarker.test(i) ? "start" : "markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(i) ? "end" : ""
            }, this.getFoldWidgetRange = function() {
                return null
            }, this.indentationBlock = function(e, t, i) {
                var r = /\S/,
                    o = e.getLine(t),
                    s = o.search(r);
                if (-1 != s) {
                    for (var a = i || o.length, l = e.getLength(), c = t, u = t; ++t < l;) {
                        var h = e.getLine(t).search(r);
                        if (-1 != h) {
                            if (s >= h) break;
                            u = t
                        }
                    }
                    if (u > c) {
                        var d = e.getLine(u).length;
                        return new n(c, a, u, d)
                    }
                }
            }, this.openingBracketBlock = function(e, t, i, r, o) {
                var s = {
                        row: i,
                        column: r + 1
                    },
                    a = e.$findClosingBracket(t, s, o);
                if (a) {
                    var l = e.foldWidgets[a.row];
                    return null == l && (l = this.getFoldWidget(e, a.row)), "start" == l && a.row > s.row && (a.row--, a.column = e.getLine(a.row).length), n.fromPoints(s, a)
                }
            }, this.closingBracketBlock = function(e, t, i, r) {
                var o = {
                        row: i,
                        column: r
                    },
                    s = e.$findOpeningBracket(t, o);
                if (s) return s.column++, o.column--, n.fromPoints(s, o)
            }
        }).call(i.prototype)
    }), ace.define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
        t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;border-radius: 2px;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
        var n = e("../lib/dom");
        n.importCssString(t.cssText, t.cssClass)
    }),
    function() {
        ace.require(["ace/ace"], function(e) {
            e && e.config.init(), window.ace || (window.ace = {});
            for (var t in e) e.hasOwnProperty(t) && (ace[t] = e[t])
        })
    }(), ace.define("ace/mode/markdown", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript", "ace/mode/xml", "ace/mode/html", "ace/tokenizer", "ace/mode/markdown_highlight_rules", "ace/mode/folding/markdown"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("./text").Mode,
            r = e("./javascript").Mode,
            o = e("./xml").Mode,
            s = e("./html").Mode,
            a = (e("../tokenizer").Tokenizer, e("./markdown_highlight_rules").MarkdownHighlightRules),
            l = e("./folding/markdown").FoldMode,
            c = function() {
                this.HighlightRules = a, this.createModeDelegates({
                    "js-": r,
                    "xml-": o,
                    "html-": s
                }), this.foldingRules = new l
            };
        n.inherits(c, i),
            function() {
                this.type = "text", this.lineCommentStart = ">", this.getNextLineIndent = function(e, t) {
                    if ("listblock" == e) {
                        var n = /^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(t);
                        if (!n) return "";
                        var i = n[2];
                        return i || (i = parseInt(n[3], 10) + 1 + "."), n[1] + i + n[4]
                    }
                    return this.$getIndent(t)
                }
            }.call(c.prototype), t.Mode = c
    }), ace.define("ace/mode/javascript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/javascript_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/worker/worker_client", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("./text").Mode,
            r = (e("../tokenizer").Tokenizer, e("./javascript_highlight_rules").JavaScriptHighlightRules),
            o = e("./matching_brace_outdent").MatchingBraceOutdent,
            s = (e("../range").Range, e("../worker/worker_client").WorkerClient),
            a = e("./behaviour/cstyle").CstyleBehaviour,
            l = e("./folding/cstyle").FoldMode,
            c = function() {
                this.HighlightRules = r, this.$outdent = new o, this.$behaviour = new a, this.foldingRules = new l
            };
        n.inherits(c, i),
            function() {
                this.lineCommentStart = "//", this.blockComment = {
                    start: "/*",
                    end: "*/"
                }, this.getNextLineIndent = function(e, t, n) {
                    var i = this.$getIndent(t),
                        r = this.getTokenizer().getLineTokens(t, e),
                        o = r.tokens,
                        s = r.state;
                    if (o.length && "comment" == o[o.length - 1].type) return i;
                    if ("start" == e || "no_regex" == e) {
                        var a = t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);
                        a && (i += n)
                    } else if ("doc-start" == e) {
                        if ("start" == s || "no_regex" == s) return "";
                        var a = t.match(/^\s*(\/?)\*/);
                        a && (a[1] && (i += " "), i += "* ")
                    }
                    return i
                }, this.checkOutdent = function(e, t, n) {
                    return this.$outdent.checkOutdent(t, n)
                }, this.autoOutdent = function(e, t, n) {
                    this.$outdent.autoOutdent(t, n)
                }, this.createWorker = function(e) {
                    var t = new s(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
                    return t.attachToDocument(e.getDocument()), t.on("jslint", function(t) {
                        e.setAnnotations(t.data)
                    }), t.on("terminate", function() {
                        e.clearAnnotations()
                    }), t
                }
            }.call(c.prototype), t.Mode = c
    }), ace.define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("./doc_comment_highlight_rules").DocCommentHighlightRules,
            r = e("./text_highlight_rules").TextHighlightRules,
            o = function() {
                var e = this.createKeywordMapper({
                        "variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",
                        keyword: "const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static",
                        "storage.type": "const|let|var|function",
                        "constant.language": "null|Infinity|NaN|undefined",
                        "support.function": "alert",
                        "constant.language.boolean": "true|false"
                    }, "identifier"),
                    t = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",
                    n = "[a-zA-Z\\$_\xa1-\uffff][a-zA-Z\\d\\$_\xa1-\uffff]*\\b",
                    r = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";
                this.$rules = {
                    no_regex: [{
                        token: "comment",
                        regex: "\\/\\/",
                        next: "line_comment"
                    }, i.getStartRule("doc-start"), {
                        token: "comment",
                        regex: /\/\*/,
                        next: "comment"
                    }, {
                        token: "string",
                        regex: "'(?=.)",
                        next: "qstring"
                    }, {
                        token: "string",
                        regex: '"(?=.)',
                        next: "qqstring"
                    }, {
                        token: "constant.numeric",
                        regex: /0[xX][0-9a-fA-F]+\b/
                    }, {
                        token: "constant.numeric",
                        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
                    }, {
                        token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"],
                        regex: "(" + n + ")(\\.)(prototype)(\\.)(" + n + ")(\\s*)(=)",
                        next: "function_arguments"
                    }, {
                        token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(" + n + ")(\\.)(" + n + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(" + n + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"],
                        regex: "(" + n + ")(\\.)(" + n + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"],
                        regex: "(function)(\\s+)(" + n + ")(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(" + n + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["text", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(:)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: "keyword",
                        regex: "(?:" + t + ")\\b",
                        next: "start"
                    }, {
                        token: ["punctuation.operator", "support.function"],
                        regex: /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
                    }, {
                        token: ["punctuation.operator", "support.function.dom"],
                        regex: /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
                    }, {
                        token: ["punctuation.operator", "support.constant"],
                        regex: /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
                    }, {
                        token: ["storage.type", "punctuation.operator", "support.function.firebug"],
                        regex: /(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/
                    }, {
                        token: e,
                        regex: n
                    }, {
                        token: "keyword.operator",
                        regex: /--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,
                        next: "start"
                    }, {
                        token: "punctuation.operator",
                        regex: /\?|\:|\,|\;|\./,
                        next: "start"
                    }, {
                        token: "paren.lparen",
                        regex: /[\[({]/,
                        next: "start"
                    }, {
                        token: "paren.rparen",
                        regex: /[\])}]/
                    }, {
                        token: "keyword.operator",
                        regex: /\/=?/,
                        next: "start"
                    }, {
                        token: "comment",
                        regex: /^#!.*$/
                    }],
                    start: [i.getStartRule("doc-start"), {
                        token: "comment",
                        regex: "\\/\\*",
                        next: "comment_regex_allowed"
                    }, {
                        token: "comment",
                        regex: "\\/\\/",
                        next: "line_comment_regex_allowed"
                    }, {
                        token: "string.regexp",
                        regex: "\\/",
                        next: "regex"
                    }, {
                        token: "text",
                        regex: "\\s+|^$",
                        next: "start"
                    }, {
                        token: "empty",
                        regex: "",
                        next: "no_regex"
                    }],
                    regex: [{
                        token: "regexp.keyword.operator",
                        regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
                    }, {
                        token: "string.regexp",
                        regex: "/\\w*",
                        next: "no_regex"
                    }, {
                        token: "invalid",
                        regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
                    }, {
                        token: "constant.language.escape",
                        regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?]/
                    }, {
                        token: "constant.language.delimiter",
                        regex: /\|/
                    }, {
                        token: "constant.language.escape",
                        regex: /\[\^?/,
                        next: "regex_character_class"
                    }, {
                        token: "empty",
                        regex: "$",
                        next: "no_regex"
                    }, {
                        defaultToken: "string.regexp"
                    }],
                    regex_character_class: [{
                        token: "regexp.keyword.operator",
                        regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
                    }, {
                        token: "constant.language.escape",
                        regex: "]",
                        next: "regex"
                    }, {
                        token: "constant.language.escape",
                        regex: "-"
                    }, {
                        token: "empty",
                        regex: "$",
                        next: "no_regex"
                    }, {
                        defaultToken: "string.regexp.charachterclass"
                    }],
                    function_arguments: [{
                        token: "variable.parameter",
                        regex: n
                    }, {
                        token: "punctuation.operator",
                        regex: "[, ]+"
                    }, {
                        token: "punctuation.operator",
                        regex: "$"
                    }, {
                        token: "empty",
                        regex: "",
                        next: "no_regex"
                    }],
                    comment_regex_allowed: [{
                        token: "comment",
                        regex: "\\*\\/",
                        next: "start"
                    }, {
                        defaultToken: "comment"
                    }],
                    comment: [{
                        token: "comment",
                        regex: "\\*\\/",
                        next: "no_regex"
                    }, {
                        defaultToken: "comment"
                    }],
                    line_comment_regex_allowed: [{
                        token: "comment",
                        regex: "$|^",
                        next: "start"
                    }, {
                        defaultToken: "comment"
                    }],
                    line_comment: [{
                        token: "comment",
                        regex: "$|^",
                        next: "no_regex"
                    }, {
                        defaultToken: "comment"
                    }],
                    qqstring: [{
                        token: "constant.language.escape",
                        regex: r
                    }, {
                        token: "string",
                        regex: "\\\\$",
                        next: "qqstring"
                    }, {
                        token: "string",
                        regex: '"|$',
                        next: "no_regex"
                    }, {
                        defaultToken: "string"
                    }],
                    qstring: [{
                        token: "constant.language.escape",
                        regex: r
                    }, {
                        token: "string",
                        regex: "\\\\$",
                        next: "qstring"
                    }, {
                        token: "string",
                        regex: "'|$",
                        next: "no_regex"
                    }, {
                        defaultToken: "string"
                    }]
                }, this.embedRules(i, "doc-", [i.getEndRule("no_regex")])
            };
        n.inherits(o, r), t.JavaScriptHighlightRules = o
    }), ace.define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("./text_highlight_rules").TextHighlightRules,
            r = function() {
                this.$rules = {
                    start: [{
                        token: "comment.doc.tag",
                        regex: "@[\\w\\d_]+"
                    }, {
                        token: "comment.doc.tag",
                        regex: "\\bTODO\\b"
                    }, {
                        defaultToken: "comment.doc"
                    }]
                }
            };
        n.inherits(r, i), r.getStartRule = function(e) {
            return {
                token: "comment.doc",
                regex: "\\/\\*(?=\\*)",
                next: e
            }
        }, r.getEndRule = function(e) {
            return {
                token: "comment.doc",
                regex: "\\*\\/",
                next: e
            }
        }, t.DocCommentHighlightRules = r
    }), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t) {
        var n = e("../range").Range,
            i = function() {};
        (function() {
            this.checkOutdent = function(e, t) {
                return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
            }, this.autoOutdent = function(e, t) {
                var i = e.getLine(t),
                    r = i.match(/^(\s*\})/);
                if (!r) return 0;
                var o = r[1].length,
                    s = e.findMatchingBracket({
                        row: t,
                        column: o
                    });
                if (!s || s.row == t) return 0;
                var a = this.$getIndent(e.getLine(s.row));
                e.replace(new n(t, 0, t, o - 1), a)
            }, this.$getIndent = function(e) {
                return e.match(/^\s*/)[0]
            }
        }).call(i.prototype), t.MatchingBraceOutdent = i
    }), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t) {
        var n = e("../../lib/oop"),
            i = e("../behaviour").Behaviour,
            r = e("../../token_iterator").TokenIterator,
            o = e("../../lib/lang"),
            s = ["text", "paren.rparen", "punctuation.operator"],
            a = ["text", "paren.rparen", "punctuation.operator", "comment"],
            l = 0,
            c = -1,
            u = "",
            h = 0,
            d = -1,
            g = "",
            f = "",
            p = function() {
                p.isSaneInsertion = function(e, t) {
                    var n = e.getCursorPosition(),
                        i = new r(t, n.row, n.column);
                    if (!this.$matchTokenType(i.getCurrentToken() || "text", s)) {
                        var o = new r(t, n.row, n.column + 1);
                        if (!this.$matchTokenType(o.getCurrentToken() || "text", s)) return !1
                    }
                    return i.stepForward(), i.getCurrentTokenRow() !== n.row || this.$matchTokenType(i.getCurrentToken() || "text", a)
                }, p.$matchTokenType = function(e, t) {
                    return t.indexOf(e.type || e) > -1
                }, p.recordAutoInsert = function(e, t, n) {
                    var i = e.getCursorPosition(),
                        r = t.doc.getLine(i.row);
                    this.isAutoInsertedClosing(i, r, u[0]) || (l = 0), c = i.row, u = n + r.substr(i.column), l++
                }, p.recordMaybeInsert = function(e, t, n) {
                    var i = e.getCursorPosition(),
                        r = t.doc.getLine(i.row);
                    this.isMaybeInsertedClosing(i, r) || (h = 0), d = i.row, g = r.substr(0, i.column) + n, f = r.substr(i.column), h++
                }, p.isAutoInsertedClosing = function(e, t, n) {
                    return l > 0 && e.row === c && n === u[0] && t.substr(e.column) === u
                }, p.isMaybeInsertedClosing = function(e, t) {
                    return h > 0 && e.row === d && t.substr(e.column) === f && t.substr(0, e.column) == g
                }, p.popAutoInsertedClosing = function() {
                    u = u.substr(1), l--
                }, p.clearMaybeInsertedClosing = function() {
                    h = 0, d = -1
                }, this.add("braces", "insertion", function(e, t, n, i, r) {
                    var s = n.getCursorPosition(),
                        a = i.doc.getLine(s.row);
                    if ("{" == r) {
                        var l = n.getSelectionRange(),
                            c = i.doc.getTextRange(l);
                        if ("" !== c && "{" !== c && n.getWrapBehavioursEnabled()) return {
                            text: "{" + c + "}",
                            selection: !1
                        };
                        if (p.isSaneInsertion(n, i)) return /[\]\}\)]/.test(a[s.column]) ? (p.recordAutoInsert(n, i, "}"), {
                            text: "{}",
                            selection: [1, 1]
                        }) : (p.recordMaybeInsert(n, i, "{"), {
                            text: "{",
                            selection: [1, 1]
                        })
                    } else if ("}" == r) {
                        var u = a.substring(s.column, s.column + 1);
                        if ("}" == u) {
                            var d = i.$findOpeningBracket("}", {
                                column: s.column + 1,
                                row: s.row
                            });
                            if (null !== d && p.isAutoInsertedClosing(s, a, r)) return p.popAutoInsertedClosing(), {
                                text: "",
                                selection: [1, 1]
                            }
                        }
                    } else if ("\n" == r || "\r\n" == r) {
                        var g = "";
                        p.isMaybeInsertedClosing(s, a) && (g = o.stringRepeat("}", h), p.clearMaybeInsertedClosing());
                        var u = a.substring(s.column, s.column + 1);
                        if ("}" == u || "" !== g) {
                            var f = i.findMatchingBracket({
                                row: s.row,
                                column: s.column
                            }, "}");
                            if (!f) return null;
                            var m = this.getNextLineIndent(e, a.substring(0, s.column), i.getTabString()),
                                v = this.$getIndent(a);
                            return {
                                text: "\n" + m + "\n" + v + g,
                                selection: [1, m.length, 1, m.length]
                            }
                        }
                    }
                }), this.add("braces", "deletion", function(e, t, n, i, r) {
                    var o = i.doc.getTextRange(r);
                    if (!r.isMultiLine() && "{" == o) {
                        var s = i.doc.getLine(r.start.row),
                            a = s.substring(r.end.column, r.end.column + 1);
                        if ("}" == a) return r.end.column++, r;
                        h--
                    }
                }), this.add("parens", "insertion", function(e, t, n, i, r) {
                    if ("(" == r) {
                        var o = n.getSelectionRange(),
                            s = i.doc.getTextRange(o);
                        if ("" !== s && n.getWrapBehavioursEnabled()) return {
                            text: "(" + s + ")",
                            selection: !1
                        };
                        if (p.isSaneInsertion(n, i)) return p.recordAutoInsert(n, i, ")"), {
                            text: "()",
                            selection: [1, 1]
                        }
                    } else if (")" == r) {
                        var a = n.getCursorPosition(),
                            l = i.doc.getLine(a.row),
                            c = l.substring(a.column, a.column + 1);
                        if (")" == c) {
                            var u = i.$findOpeningBracket(")", {
                                column: a.column + 1,
                                row: a.row
                            });
                            if (null !== u && p.isAutoInsertedClosing(a, l, r)) return p.popAutoInsertedClosing(), {
                                text: "",
                                selection: [1, 1]
                            }
                        }
                    }
                }), this.add("parens", "deletion", function(e, t, n, i, r) {
                    var o = i.doc.getTextRange(r);
                    if (!r.isMultiLine() && "(" == o) {
                        var s = i.doc.getLine(r.start.row),
                            a = s.substring(r.start.column + 1, r.start.column + 2);
                        if (")" == a) return r.end.column++, r
                    }
                }), this.add("brackets", "insertion", function(e, t, n, i, r) {
                    if ("[" == r) {
                        var o = n.getSelectionRange(),
                            s = i.doc.getTextRange(o);
                        if ("" !== s && n.getWrapBehavioursEnabled()) return {
                            text: "[" + s + "]",
                            selection: !1
                        };
                        if (p.isSaneInsertion(n, i)) return p.recordAutoInsert(n, i, "]"), {
                            text: "[]",
                            selection: [1, 1]
                        }
                    } else if ("]" == r) {
                        var a = n.getCursorPosition(),
                            l = i.doc.getLine(a.row),
                            c = l.substring(a.column, a.column + 1);
                        if ("]" == c) {
                            var u = i.$findOpeningBracket("]", {
                                column: a.column + 1,
                                row: a.row
                            });
                            if (null !== u && p.isAutoInsertedClosing(a, l, r)) return p.popAutoInsertedClosing(), {
                                text: "",
                                selection: [1, 1]
                            }
                        }
                    }
                }), this.add("brackets", "deletion", function(e, t, n, i, r) {
                    var o = i.doc.getTextRange(r);
                    if (!r.isMultiLine() && "[" == o) {
                        var s = i.doc.getLine(r.start.row),
                            a = s.substring(r.start.column + 1, r.start.column + 2);
                        if ("]" == a) return r.end.column++, r
                    }
                }), this.add("string_dquotes", "insertion", function(e, t, n, i, r) {
                    if ('"' == r || "'" == r) {
                        var o = r,
                            s = n.getSelectionRange(),
                            a = i.doc.getTextRange(s);
                        if ("" !== a && "'" !== a && '"' != a && n.getWrapBehavioursEnabled()) return {
                            text: o + a + o,
                            selection: !1
                        };
                        var l = n.getCursorPosition(),
                            c = i.doc.getLine(l.row),
                            u = c.substring(l.column - 1, l.column);
                        if ("\\" == u) return null;
                        for (var h, d = i.getTokens(s.start.row), g = 0, f = -1, m = 0; m < d.length && (h = d[m], "string" == h.type ? f = -1 : 0 > f && (f = h.value.indexOf(o)), !(h.value.length + g > s.start.column)); m++) g += d[m].value.length;
                        if (!h || 0 > f && "comment" !== h.type && ("string" !== h.type || s.start.column !== h.value.length + g - 1 && h.value.lastIndexOf(o) === h.value.length - 1)) {
                            if (!p.isSaneInsertion(n, i)) return;
                            return {
                                text: o + o,
                                selection: [1, 1]
                            }
                        }
                        if (h && "string" === h.type) {
                            var v = c.substring(l.column, l.column + 1);
                            if (v == o) return {
                                text: "",
                                selection: [1, 1]
                            }
                        }
                    }
                }), this.add("string_dquotes", "deletion", function(e, t, n, i, r) {
                    var o = i.doc.getTextRange(r);
                    if (!r.isMultiLine() && ('"' == o || "'" == o)) {
                        var s = i.doc.getLine(r.start.row),
                            a = s.substring(r.start.column + 1, r.start.column + 2);
                        if (a == o) return r.end.column++, r
                    }
                })
            };
        n.inherits(p, i), t.CstyleBehaviour = p
    }), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t) {
        var n = e("../../lib/oop"),
            i = (e("../../range").Range, e("./fold_mode").FoldMode),
            r = t.FoldMode = function(e) {
                e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
            };
        n.inherits(r, i),
            function() {
                this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function(e, t, n) {
                    var i = e.getLine(n),
                        r = i.match(this.foldingStartMarker);
                    if (r) {
                        var o = r.index;
                        return r[1] ? this.openingBracketBlock(e, r[1], n, o) : e.getCommentFoldRange(n, o + r[0].length, 1)
                    }
                    if ("markbeginend" === t) {
                        var r = i.match(this.foldingStopMarker);
                        if (r) {
                            var o = r.index + r[0].length;
                            return r[1] ? this.closingBracketBlock(e, r[1], n, o) : e.getCommentFoldRange(n, o, -1)
                        }
                    }
                }
            }.call(r.prototype)
    }), ace.define("ace/mode/xml", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/xml_highlight_rules", "ace/mode/behaviour/xml", "ace/mode/folding/xml"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("./text").Mode,
            r = (e("../tokenizer").Tokenizer, e("./xml_highlight_rules").XmlHighlightRules),
            o = e("./behaviour/xml").XmlBehaviour,
            s = e("./folding/xml").FoldMode,
            a = function() {
                this.HighlightRules = r, this.$behaviour = new o, this.foldingRules = new s
            };
        n.inherits(a, i),
            function() {
                this.blockComment = {
                    start: "<!--",
                    end: "-->"
                }
            }.call(a.prototype), t.Mode = a
    }), ace.define("ace/mode/xml_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/xml_util", "ace/mode/text_highlight_rules"], function(e, t) {
        var n = e("../lib/oop"),
            i = (e("./xml_util"), e("./text_highlight_rules").TextHighlightRules),
            r = function() {
                this.$rules = {
                    start: [{
                        token: "punctuation.string.begin",
                        regex: "<\\!\\[CDATA\\[",
                        next: "cdata"
                    }, {
                        token: ["punctuation.instruction.begin", "keyword.instruction"],
                        regex: "(<\\?)(xml)(?=[\\s])",
                        next: "xml_declaration"
                    }, {
                        token: ["punctuation.instruction.begin", "keyword.instruction"],
                        regex: "(<\\?)([-_a-zA-Z0-9]+)",
                        next: "instruction"
                    }, {
                        token: "comment",
                        regex: "<\\!--",
                        next: "comment"
                    }, {
                        token: ["punctuation.doctype.begin", "meta.tag.doctype"],
                        regex: "(<\\!)(DOCTYPE)(?=[\\s])",
                        next: "doctype"
                    }, {
                        include: "tag"
                    }, {
                        include: "reference"
                    }],
                    xml_declaration: [{
                        include: "attributes"
                    }, {
                        include: "instruction"
                    }],
                    instruction: [{
                        token: "punctuation.instruction.end",
                        regex: "\\?>",
                        next: "start"
                    }],
                    doctype: [{
                        include: "space"
                    }, {
                        include: "string"
                    }, {
                        token: "punctuation.doctype.end",
                        regex: ">",
                        next: "start"
                    }, {
                        token: "xml-pe",
                        regex: "[-_a-zA-Z0-9:]+"
                    }, {
                        token: "punctuation.begin",
                        regex: "\\[",
                        push: "declarations"
                    }],
                    declarations: [{
                        token: "text",
                        regex: "\\s+"
                    }, {
                        token: "punctuation.end",
                        regex: "]",
                        next: "pop"
                    }, {
                        token: ["punctuation.begin", "keyword"],
                        regex: "(<\\!)([-_a-zA-Z0-9]+)",
                        push: [{
                            token: "text",
                            regex: "\\s+"
                        }, {
                            token: "punctuation.end",
                            regex: ">",
                            next: "pop"
                        }, {
                            include: "string"
                        }]
                    }],
                    cdata: [{
                        token: "string.end",
                        regex: "\\]\\]>",
                        next: "start"
                    }, {
                        token: "text",
                        regex: "\\s+"
                    }, {
                        token: "text",
                        regex: "(?:[^\\]]|\\](?!\\]>))+"
                    }],
                    comment: [{
                        token: "comment",
                        regex: "-->",
                        next: "start"
                    }, {
                        defaultToken: "comment"
                    }],
                    tag: [{
                        token: ["meta.tag.punctuation.begin", "meta.tag.name"],
                        regex: "(<)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",
                        next: [{
                            include: "attributes"
                        }, {
                            token: "meta.tag.punctuation.end",
                            regex: "/?>",
                            next: "start"
                        }]
                    }, {
                        token: ["meta.tag.punctuation.begin", "meta.tag.name"],
                        regex: "(</)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",
                        next: [{
                            include: "space"
                        }, {
                            token: "meta.tag.punctuation.end",
                            regex: ">",
                            next: "start"
                        }]
                    }],
                    space: [{
                        token: "text",
                        regex: "\\s+"
                    }],
                    reference: [{
                        token: "constant.language.escape",
                        regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
                    }, {
                        token: "invalid.illegal",
                        regex: "&"
                    }],
                    string: [{
                        token: "string",
                        regex: "'",
                        push: "qstring_inner"
                    }, {
                        token: "string",
                        regex: '"',
                        push: "qqstring_inner"
                    }],
                    qstring_inner: [{
                        token: "string",
                        regex: "'",
                        next: "pop"
                    }, {
                        include: "reference"
                    }, {
                        defaultToken: "string"
                    }],
                    qqstring_inner: [{
                        token: "string",
                        regex: '"',
                        next: "pop"
                    }, {
                        include: "reference"
                    }, {
                        defaultToken: "string"
                    }],
                    attributes: [{
                        token: "entity.other.attribute-name",
                        regex: "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
                    }, {
                        token: "keyword.operator.separator",
                        regex: "="
                    }, {
                        include: "space"
                    }, {
                        include: "string"
                    }]
                }, this.constructor === r && this.normalizeRules()
            };
        (function() {
            this.embedTagRules = function(e, t, n) {
                this.$rules.tag.unshift({
                    token: ["meta.tag.punctuation.begin", "meta.tag.name." + n],
                    regex: "(<)(" + n + ")",
                    next: [{
                        include: "space"
                    }, {
                        include: "attributes"
                    }, {
                        token: "meta.tag.punctuation.end",
                        regex: "/?>",
                        next: t + "start"
                    }]
                }), this.$rules[n + "-end"] = [{
                    include: "space"
                }, {
                    token: "meta.tag.punctuation.end",
                    regex: ">",
                    next: "start",
                    onMatch: function(e, t, n) {
                        return n.splice(0), this.token
                    }
                }], this.embedRules(e, t, [{
                    token: ["meta.tag.punctuation.begin", "meta.tag.name." + n],
                    regex: "(</)(" + n + ")",
                    next: n + "-end"
                }, {
                    token: "string.begin",
                    regex: "<\\!\\[CDATA\\["
                }, {
                    token: "string.end",
                    regex: "\\]\\]>"
                }])
            }
        }).call(i.prototype), n.inherits(r, i), t.XmlHighlightRules = r
    }), ace.define("ace/mode/xml_util", ["require", "exports", "module"], function(e, t) {
        function n(e) {
            return [{
                token: "string",
                regex: '"',
                next: e + "_qqstring"
            }, {
                token: "string",
                regex: "'",
                next: e + "_qstring"
            }]
        }

        function i(e, t) {
            return [{
                token: "string",
                regex: e,
                next: t
            }, {
                token: "constant.language.escape",
                regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
            }, {
                defaultToken: "string"
            }]
        }
        t.tag = function(e, t, r, o) {
            e[t] = [{
                token: "text",
                regex: "\\s+"
            }, {
                token: o ? function(e) {
                    return o[e] ? "meta.tag.tag-name." + o[e] : "meta.tag.tag-name"
                } : "meta.tag.tag-name",
                regex: "[-_a-zA-Z0-9:]+",
                next: t + "_embed_attribute_list"
            }, {
                token: "empty",
                regex: "",
                next: t + "_embed_attribute_list"
            }], e[t + "_qstring"] = i("'", t + "_embed_attribute_list"), e[t + "_qqstring"] = i('"', t + "_embed_attribute_list"), e[t + "_embed_attribute_list"] = [{
                token: "meta.tag.r",
                regex: "/?>",
                next: r
            }, {
                token: "keyword.operator",
                regex: "="
            }, {
                token: "entity.other.attribute-name",
                regex: "[-_a-zA-Z0-9:]+"
            }, {
                token: "constant.numeric",
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token: "text",
                regex: "\\s+"
            }].concat(n(t))
        }
    }), ace.define("ace/mode/behaviour/xml", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t) {
        function n(e, t) {
            var n = e.type.split(".");
            return t.split(".").every(function(e) {
                return -1 !== n.indexOf(e)
            })
        }
        var i = e("../../lib/oop"),
            r = e("../behaviour").Behaviour,
            o = e("./cstyle").CstyleBehaviour,
            s = e("../../token_iterator").TokenIterator,
            a = function() {
                this.inherit(o, ["string_dquotes"]), this.add("autoclosing", "insertion", function(e, t, i, r, o) {
                    if (">" == o) {
                        var a = i.getCursorPosition(),
                            l = new s(r, a.row, a.column),
                            c = l.getCurrentToken();
                        if (c && n(c, "string") && l.getCurrentTokenColumn() + c.value.length > a.column) return;
                        var u = !1;
                        if (c && (n(c, "meta.tag") || n(c, "text") && c.value.match("/"))) u = !0;
                        else
                            do c = l.stepBackward(); while (c && (n(c, "string") || n(c, "keyword.operator") || n(c, "entity.attribute-name") || n(c, "text")));
                        if (!c || !n(c, "meta.tag.name") || l.stepBackward().value.match("/")) return;
                        var h = c.value;
                        if (u) var h = h.substring(0, a.column - c.start);
                        return {
                            text: "></" + h + ">",
                            selection: [1, 1]
                        }
                    }
                }), this.add("autoindent", "insertion", function(e, t, n, i, r) {
                    if ("\n" == r) {
                        var o = n.getCursorPosition(),
                            s = i.getLine(o.row),
                            a = s.substring(o.column, o.column + 2);
                        if ("</" == a) {
                            var l = this.$getIndent(s),
                                c = l + i.getTabString();
                            return {
                                text: "\n" + c + "\n" + l,
                                selection: [1, c.length, 1, c.length]
                            }
                        }
                    }
                })
            };
        i.inherits(a, r), t.XmlBehaviour = a
    }), ace.define("ace/mode/folding/xml", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/range", "ace/mode/folding/fold_mode", "ace/token_iterator"], function(e, t) {
        var n = e("../../lib/oop"),
            i = e("../../lib/lang"),
            r = e("../../range").Range,
            o = e("./fold_mode").FoldMode,
            s = e("../../token_iterator").TokenIterator,
            a = t.FoldMode = function(e) {
                o.call(this), this.voidElements = e || {}
            };
        n.inherits(a, o),
            function() {
                this.getFoldWidget = function(e, t, n) {
                    var i = this._getFirstTagInLine(e, n);
                    return i.closing ? "markbeginend" == t ? "end" : "" : !i.tagName || this.voidElements[i.tagName.toLowerCase()] ? "" : i.selfClosing ? "" : -1 !== i.value.indexOf("/" + i.tagName) ? "" : "start"
                }, this._getFirstTagInLine = function(e, t) {
                    for (var n = e.getTokens(t), r = "", o = 0; o < n.length; o++) {
                        var s = n[o];
                        r += 0 === s.type.lastIndexOf("meta.tag", 0) ? s.value : i.stringRepeat(" ", s.value.length)
                    }
                    return this._parseTag(r)
                }, this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/, this._parseTag = function(e) {
                    var t = e.match(this.tagRe),
                        n = 0;
                    return {
                        value: e,
                        match: t ? t[2] : "",
                        closing: t ? !!t[3] : !1,
                        selfClosing: t ? !!t[5] || "/>" == t[2] : !1,
                        tagName: t ? t[4] : "",
                        column: t[1] ? n + t[1].length : n
                    }
                }, this._readTagForward = function(e) {
                    var t = e.getCurrentToken();
                    if (!t) return null;
                    var n, i = "";
                    do
                        if (0 === t.type.lastIndexOf("meta.tag", 0)) {
                            if (!n) var n = {
                                row: e.getCurrentTokenRow(),
                                column: e.getCurrentTokenColumn()
                            };
                            if (i += t.value, -1 !== i.indexOf(">")) {
                                var r = this._parseTag(i);
                                return r.start = n, r.end = {
                                    row: e.getCurrentTokenRow(),
                                    column: e.getCurrentTokenColumn() + t.value.length
                                }, e.stepForward(), r
                            }
                        }
                    while (t = e.stepForward());
                    return null
                }, this._readTagBackward = function(e) {
                    var t = e.getCurrentToken();
                    if (!t) return null;
                    var n, i = "";
                    do
                        if (0 === t.type.lastIndexOf("meta.tag", 0) && (n || (n = {
                                row: e.getCurrentTokenRow(),
                                column: e.getCurrentTokenColumn() + t.value.length
                            }), i = t.value + i, -1 !== i.indexOf("<"))) {
                            var r = this._parseTag(i);
                            return r.end = n, r.start = {
                                row: e.getCurrentTokenRow(),
                                column: e.getCurrentTokenColumn()
                            }, e.stepBackward(), r
                        }
                    while (t = e.stepBackward());
                    return null
                }, this._pop = function(e, t) {
                    for (; e.length;) {
                        var n = e[e.length - 1];
                        if (!t || n.tagName == t.tagName) return e.pop();
                        if (this.voidElements[t.tagName]) return; {
                            if (!this.voidElements[n.tagName]) return null;
                            e.pop()
                        }
                    }
                }, this.getFoldWidgetRange = function(e, t, n) {
                    var i = this._getFirstTagInLine(e, n);
                    if (!i.match) return null;
                    var o, a = i.closing || i.selfClosing,
                        l = [];
                    if (a) {
                        for (var c = new s(e, n, i.column + i.match.length), u = {
                                row: n,
                                column: i.column
                            }; o = this._readTagBackward(c);)
                            if (o.selfClosing) {
                                if (!l.length) return o.start.column += o.tagName.length + 2, o.end.column -= 2, r.fromPoints(o.start, o.end)
                            } else if (o.closing) l.push(o);
                        else if (this._pop(l, o), 0 == l.length) return o.start.column += o.tagName.length + 2, r.fromPoints(o.start, u)
                    } else
                        for (var c = new s(e, n, i.column), h = {
                                row: n,
                                column: i.column + i.tagName.length + 2
                            }; o = this._readTagForward(c);)
                            if (o.selfClosing) {
                                if (!l.length) return o.start.column += o.tagName.length + 2, o.end.column -= 2, r.fromPoints(o.start, o.end)
                            } else if (o.closing) {
                        if (this._pop(l, o), 0 == l.length) return r.fromPoints(h, o.start)
                    } else l.push(o)
                }
            }.call(a.prototype)
    }), ace.define("ace/mode/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript", "ace/mode/css", "ace/tokenizer", "ace/mode/html_highlight_rules", "ace/mode/behaviour/html", "ace/mode/folding/html", "ace/mode/html_completions"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("./text").Mode,
            r = e("./javascript").Mode,
            o = e("./css").Mode,
            s = (e("../tokenizer").Tokenizer, e("./html_highlight_rules").HtmlHighlightRules),
            a = e("./behaviour/html").HtmlBehaviour,
            l = e("./folding/html").FoldMode,
            c = e("./html_completions").HtmlCompletions,
            u = function() {
                this.HighlightRules = s, this.$behaviour = new a, this.$completer = new c, this.createModeDelegates({
                    "js-": r,
                    "css-": o
                }), this.foldingRules = new l
            };
        n.inherits(u, i),
            function() {
                this.blockComment = {
                    start: "<!--",
                    end: "-->"
                }, this.getNextLineIndent = function(e, t) {
                    return this.$getIndent(t)
                }, this.checkOutdent = function() {
                    return !1
                }, this.getCompletions = function(e, t, n, i) {
                    return this.$completer.getCompletions(e, t, n, i)
                }
            }.call(u.prototype), t.Mode = u
    }), ace.define("ace/mode/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/css_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("./text").Mode,
            r = (e("../tokenizer").Tokenizer, e("./css_highlight_rules").CssHighlightRules),
            o = e("./matching_brace_outdent").MatchingBraceOutdent,
            s = e("../worker/worker_client").WorkerClient,
            a = e("./behaviour/css").CssBehaviour,
            l = e("./folding/cstyle").FoldMode,
            c = function() {
                this.HighlightRules = r, this.$outdent = new o, this.$behaviour = new a, this.foldingRules = new l
            };
        n.inherits(c, i),
            function() {
                this.foldingRules = "cStyle", this.blockComment = {
                    start: "/*",
                    end: "*/"
                }, this.getNextLineIndent = function(e, t, n) {
                    var i = this.$getIndent(t),
                        r = this.getTokenizer().getLineTokens(t, e).tokens;
                    if (r.length && "comment" == r[r.length - 1].type) return i;
                    var o = t.match(/^.*\{\s*$/);
                    return o && (i += n), i
                }, this.checkOutdent = function(e, t, n) {
                    return this.$outdent.checkOutdent(t, n)
                }, this.autoOutdent = function(e, t, n) {
                    this.$outdent.autoOutdent(t, n)
                }, this.createWorker = function(e) {
                    var t = new s(["ace"], "ace/mode/css_worker", "Worker");
                    return t.attachToDocument(e.getDocument()), t.on("csslint", function(t) {
                        e.setAnnotations(t.data)
                    }), t.on("terminate", function() {
                        e.clearAnnotations()
                    }), t
                }
            }.call(c.prototype), t.Mode = c
    }), ace.define("ace/mode/css_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function(e, t) {
        var n = e("../lib/oop"),
            i = (e("../lib/lang"), e("./text_highlight_rules").TextHighlightRules),
            r = t.supportType = "animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index",
            o = t.supportFunction = "rgb|rgba|url|attr|counter|counters",
            s = t.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero",
            a = t.supportConstantColor = "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow",
            l = t.supportConstantFonts = "arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace",
            c = t.numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))",
            u = t.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",
            h = t.pseudoClasses = "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",
            d = function() {
                var e = this.createKeywordMapper({
                    "support.function": o,
                    "support.constant": s,
                    "support.type": r,
                    "support.constant.color": a,
                    "support.constant.fonts": l
                }, "text", !0);
                this.$rules = {
                    start: [{
                        token: "comment",
                        regex: "\\/\\*",
                        push: "comment"
                    }, {
                        token: "paren.lparen",
                        regex: "\\{",
                        push: "ruleset"
                    }, {
                        token: "string",
                        regex: "@.*?{",
                        push: "media"
                    }, {
                        token: "keyword",
                        regex: "#[a-z0-9-_]+"
                    }, {
                        token: "variable",
                        regex: "\\.[a-z0-9-_]+"
                    }, {
                        token: "string",
                        regex: ":[a-z0-9-_]+"
                    }, {
                        token: "constant",
                        regex: "[a-z0-9-_]+"
                    }, {
                        caseInsensitive: !0
                    }],
                    media: [{
                        token: "comment",
                        regex: "\\/\\*",
                        push: "comment"
                    }, {
                        token: "paren.lparen",
                        regex: "\\{",
                        push: "ruleset"
                    }, {
                        token: "string",
                        regex: "\\}",
                        next: "pop"
                    }, {
                        token: "keyword",
                        regex: "#[a-z0-9-_]+"
                    }, {
                        token: "variable",
                        regex: "\\.[a-z0-9-_]+"
                    }, {
                        token: "string",
                        regex: ":[a-z0-9-_]+"
                    }, {
                        token: "constant",
                        regex: "[a-z0-9-_]+"
                    }, {
                        caseInsensitive: !0
                    }],
                    comment: [{
                        token: "comment",
                        regex: "\\*\\/",
                        next: "pop"
                    }, {
                        defaultToken: "comment"
                    }],
                    ruleset: [{
                        token: "paren.rparen",
                        regex: "\\}",
                        next: "pop"
                    }, {
                        token: "comment",
                        regex: "\\/\\*",
                        push: "comment"
                    }, {
                        token: "string",
                        regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
                    }, {
                        token: "string",
                        regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
                    }, {
                        token: ["constant.numeric", "keyword"],
                        regex: "(" + c + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"
                    }, {
                        token: "constant.numeric",
                        regex: c
                    }, {
                        token: "constant.numeric",
                        regex: "#[a-f0-9]{6}"
                    }, {
                        token: "constant.numeric",
                        regex: "#[a-f0-9]{3}"
                    }, {
                        token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"],
                        regex: u
                    }, {
                        token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"],
                        regex: h
                    }, {
                        token: ["support.function", "string", "support.function"],
                        regex: "(url\\()(.*)(\\))"
                    }, {
                        token: e,
                        regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
                    }, {
                        caseInsensitive: !0
                    }]
                }, this.normalizeRules()
            };
        n.inherits(d, i), t.CssHighlightRules = d
    }), ace.define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t) {
        var n = e("../../lib/oop"),
            i = (e("../behaviour").Behaviour, e("./cstyle").CstyleBehaviour),
            r = e("../../token_iterator").TokenIterator,
            o = function() {
                this.inherit(i), this.add("colon", "insertion", function(e, t, n, i, o) {
                    if (":" === o) {
                        var s = n.getCursorPosition(),
                            a = new r(i, s.row, s.column),
                            l = a.getCurrentToken();
                        if (l && l.value.match(/\s+/) && (l = a.stepBackward()), l && "support.type" === l.type) {
                            var c = i.doc.getLine(s.row),
                                u = c.substring(s.column, s.column + 1);
                            if (":" === u) return {
                                text: "",
                                selection: [1, 1]
                            };
                            if (!c.substring(s.column).match(/^\s*;/)) return {
                                text: ":;",
                                selection: [1, 1]
                            }
                        }
                    }
                }), this.add("colon", "deletion", function(e, t, n, i, o) {
                    var s = i.doc.getTextRange(o);
                    if (!o.isMultiLine() && ":" === s) {
                        var a = n.getCursorPosition(),
                            l = new r(i, a.row, a.column),
                            c = l.getCurrentToken();
                        if (c && c.value.match(/\s+/) && (c = l.stepBackward()), c && "support.type" === c.type) {
                            var u = i.doc.getLine(o.start.row),
                                h = u.substring(o.end.column, o.end.column + 1);
                            if (";" === h) return o.end.column++, o
                        }
                    }
                }), this.add("semicolon", "insertion", function(e, t, n, i, r) {
                    if (";" === r) {
                        var o = n.getCursorPosition(),
                            s = i.doc.getLine(o.row),
                            a = s.substring(o.column, o.column + 1);
                        if (";" === a) return {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                })
            };
        n.inherits(o, i), t.CssBehaviour = o
    }), ace.define("ace/mode/html_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/css_highlight_rules", "ace/mode/javascript_highlight_rules", "ace/mode/xml_highlight_rules"], function(e, t) {
        var n = e("../lib/oop"),
            i = e("../lib/lang"),
            r = e("./css_highlight_rules").CssHighlightRules,
            o = e("./javascript_highlight_rules").JavaScriptHighlightRules,
            s = e("./xml_highlight_rules").XmlHighlightRules,
            a = i.createMap({
                a: "anchor",
                button: "form",
                form: "form",
                img: "image",
                input: "form",
                label: "form",
                option: "form",
                script: "script",
                select: "form",
                textarea: "form",
                style: "style",
                table: "table",
                tbody: "table",
                td: "table",
                tfoot: "table",
                th: "table",
                tr: "table"
            }),
            l = function() {
                s.call(this), this.addRules({
                    attributes: [{
                        include: "space"
                    }, {
                        token: "entity.other.attribute-name",
                        regex: "[-_a-zA-Z0-9:]+"
                    }, {
                        token: "keyword.operator.separator",
                        regex: "=",
                        push: [{
                            include: "space"
                        }, {
                            token: "string",
                            regex: "[^<>='\"`\\s]+",
                            next: "pop"
                        }, {
                            token: "empty",
                            regex: "",
                            next: "pop"
                        }]
                    }, {
                        include: "string"
                    }],
                    tag: [{
                        token: function(e, t) {
                            var n = a[t];
                            return ["meta.tag.punctuation.begin", "meta.tag.name" + (n ? "." + n : "")]
                        },
                        regex: "(<)([-_a-zA-Z0-9:]+)",
                        next: "start_tag_stuff"
                    }, {
                        token: function(e, t) {
                            var n = a[t];
                            return ["meta.tag.punctuation.begin", "meta.tag.name" + (n ? "." + n : "")]
                        },
                        regex: "(</)([-_a-zA-Z0-9:]+)",
                        next: "end_tag_stuff"
                    }],
                    start_tag_stuff: [{
                        include: "attributes"
                    }, {
                        token: "meta.tag.punctuation.end",
                        regex: "/?>",
                        next: "start"
                    }],
                    end_tag_stuff: [{
                        include: "space"
                    }, {
                        token: "meta.tag.punctuation.end",
                        regex: ">",
                        next: "start"
                    }]
                }), this.embedTagRules(r, "css-", "style"), this.embedTagRules(o, "js-", "script"), this.constructor === l && this.normalizeRules()
            };
        n.inherits(l, s), t.HtmlHighlightRules = l
    }), ace.define("ace/mode/behaviour/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour/xml", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t) {
        function n(e, t) {
            var n = e.type.split(".");
            return t.split(".").every(function(e) {
                return -1 !== n.indexOf(e)
            })
        }
        var i = e("../../lib/oop"),
            r = e("../behaviour/xml").XmlBehaviour,
            o = (e("./cstyle").CstyleBehaviour, e("../../token_iterator").TokenIterator),
            s = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"],
            a = function() {
                this.inherit(r), this.add("autoclosing", "insertion", function(e, t, i, r, a) {
                    if (">" == a) {
                        var l = i.getCursorPosition(),
                            c = new o(r, l.row, l.column),
                            u = c.getCurrentToken();
                        if (u && n(u, "string") && c.getCurrentTokenColumn() + u.value.length > l.column) return;
                        var h = !1;
                        if (u && (n(u, "meta.tag") || n(u, "text") && u.value.match("/"))) h = !0;
                        else
                            do u = c.stepBackward(); while (u && (n(u, "string") || n(u, "keyword.operator") || n(u, "entity.attribute-name") || n(u, "text")));
                        if (!u || !n(u, "meta.tag.name") || c.stepBackward().value.match("/")) return;
                        var d = u.value;
                        if (h) var d = d.substring(0, l.column - u.start);
                        if (-1 !== s.indexOf(d)) return;
                        return {
                            text: "></" + d + ">",
                            selection: [1, 1]
                        }
                    }
                })
            };
        i.inherits(a, r), t.HtmlBehaviour = a
    }), ace.define("ace/mode/folding/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/mixed", "ace/mode/folding/xml", "ace/mode/folding/cstyle"], function(e, t) {
        var n = e("../../lib/oop"),
            i = e("./mixed").FoldMode,
            r = e("./xml").FoldMode,
            o = e("./cstyle").FoldMode,
            s = t.FoldMode = function() {
                i.call(this, new r({
                    area: 1,
                    base: 1,
                    br: 1,
                    col: 1,
                    command: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    keygen: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    source: 1,
                    track: 1,
                    wbr: 1,
                    li: 1,
                    dt: 1,
                    dd: 1,
                    p: 1,
                    rt: 1,
                    rp: 1,
                    optgroup: 1,
                    option: 1,
                    colgroup: 1,
                    td: 1,
                    th: 1
                }), {
                    "js-": new o,
                    "css-": new o
                })
            };
        n.inherits(s, i)
    }), ace.define("ace/mode/folding/mixed", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function(e, t) {
        var n = e("../../lib/oop"),
            i = e("./fold_mode").FoldMode,
            r = t.FoldMode = function(e, t) {
                this.defaultMode = e, this.subModes = t
            };
        n.inherits(r, i),
            function() {
                this.$getMode = function(e) {
                    "string" != typeof e && (e = e[0]);
                    for (var t in this.subModes)
                        if (0 === e.indexOf(t)) return this.subModes[t];
                    return null
                }, this.$tryMode = function(e, t, n, i) {
                    var r = this.$getMode(e);
                    return r ? r.getFoldWidget(t, n, i) : ""
                }, this.getFoldWidget = function(e, t, n) {
                    return this.$tryMode(e.getState(n - 1), e, t, n) || this.$tryMode(e.getState(n), e, t, n) || this.defaultMode.getFoldWidget(e, t, n)
                }, this.getFoldWidgetRange = function(e, t, n) {
                    var i = this.$getMode(e.getState(n - 1));
                    return i && i.getFoldWidget(e, t, n) || (i = this.$getMode(e.getState(n))), i && i.getFoldWidget(e, t, n) || (i = this.defaultMode), i.getFoldWidgetRange(e, t, n)
                }
            }.call(r.prototype)
    }), ace.define("ace/mode/html_completions", ["require", "exports", "module", "ace/token_iterator"], function(e, t) {
        function n(e, t) {
            var n = e.type.split(".");
            return t.split(".").every(function(e) {
                return -1 !== n.indexOf(e)
            })
        }

        function i(e, t) {
            var i = new r(e, t.row, t.column),
                o = i.getCurrentToken();
            if (!(o && (n(o, "tag") || n(o, "text") && o.value.match("/"))))
                do o = i.stepBackward(); while (o && (n(o, "string") || n(o, "operator") || n(o, "attribute-name") || n(o, "text")));
            return o && n(o, "tag-name") && !i.stepBackward().value.match("/") ? o.value : void 0
        }
        var r = e("../token_iterator").TokenIterator,
            o = ["accesskey", "class", "contenteditable", "contextmenu", "dir", "draggable", "dropzone", "hidden", "id", "lang", "spellcheck", "style", "tabindex", "title", "translate"],
            s = ["onabort", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "onvolumechange", "onwaiting"],
            a = o.concat(s),
            l = {
                html: ["manifest"],
                head: [],
                title: [],
                base: ["href", "target"],
                link: ["href", "hreflang", "rel", "media", "type", "sizes"],
                meta: ["http-equiv", "name", "content", "charset"],
                style: ["type", "media", "scoped"],
                script: ["charset", "type", "src", "defer", "async"],
                noscript: ["href"],
                body: ["onafterprint", "onbeforeprint", "onbeforeunload", "onhashchange", "onmessage", "onoffline", "onpopstate", "onredo", "onresize", "onstorage", "onundo", "onunload"],
                section: [],
                nav: [],
                article: ["pubdate"],
                aside: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                header: [],
                footer: [],
                address: [],
                main: [],
                p: [],
                hr: [],
                pre: [],
                blockquote: ["cite"],
                ol: ["start", "reversed"],
                ul: [],
                li: ["value"],
                dl: [],
                dt: [],
                dd: [],
                figure: [],
                figcaption: [],
                div: [],
                a: ["href", "target", "ping", "rel", "media", "hreflang", "type"],
                em: [],
                strong: [],
                small: [],
                s: [],
                cite: [],
                q: ["cite"],
                dfn: [],
                abbr: [],
                data: [],
                time: ["datetime"],
                code: [],
                "var": [],
                samp: [],
                kbd: [],
                sub: [],
                sup: [],
                i: [],
                b: [],
                u: [],
                mark: [],
                ruby: [],
                rt: [],
                rp: [],
                bdi: [],
                bdo: [],
                span: [],
                br: [],
                wbr: [],
                ins: ["cite", "datetime"],
                del: ["cite", "datetime"],
                img: ["alt", "src", "height", "width", "usemap", "ismap"],
                iframe: ["name", "src", "height", "width", "sandbox", "seamless"],
                embed: ["src", "height", "width", "type"],
                object: ["param", "data", "type", "height", "width", "usemap", "name", "form", "classid"],
                param: ["name", "value"],
                video: ["src", "autobuffer", "autoplay", "loop", "controls", "width", "height", "poster"],
                audio: ["src", "autobuffer", "autoplay", "loop", "controls"],
                source: ["src", "type", "media"],
                track: ["kind", "src", "srclang", "label", "default"],
                canvas: ["width", "height"],
                map: ["name"],
                area: ["shape", "coords", "href", "hreflang", "alt", "target", "media", "rel", "ping", "type"],
                svg: [],
                math: [],
                table: ["summary"],
                caption: [],
                colgroup: ["span"],
                col: ["span"],
                tbody: [],
                thead: [],
                tfoot: [],
                tr: [],
                td: ["headers", "rowspan", "colspan"],
                th: ["headers", "rowspan", "colspan", "scope"],
                form: ["accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"],
                fieldset: ["disabled", "form", "name"],
                legend: [],
                label: ["form", "for"],
                input: ["type", "accept", "alt", "autocomplete", "checked", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "list", "max", "maxlength", "min", "multiple", "pattern", "placeholder", "readonly", "required", "size", "src", "step", "width", "files", "value"],
                button: ["autofocus", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "value", "type"],
                select: ["autofocus", "disabled", "form", "multiple", "name", "size"],
                datalist: [],
                optgroup: ["disabled", "label"],
                option: ["disabled", "selected", "label", "value"],
                textarea: ["autofocus", "disabled", "form", "maxlength", "name", "placeholder", "readonly", "required", "rows", "cols", "wrap"],
                keygen: ["autofocus", "challenge", "disabled", "form", "keytype", "name"],
                output: ["for", "form", "name"],
                progress: ["value", "max"],
                meter: ["value", "min", "max", "low", "high", "optimum"],
                details: ["open"],
                summary: [],
                command: ["type", "label", "icon", "disabled", "checked", "radiogroup", "command"],
                menu: ["type", "label"],
                dialog: ["open"]
            },
            c = Object.keys(l),
            u = function() {};
        (function() {
            this.getCompletions = function(e, t, i, r) {
                var o = t.getTokenAt(i.row, i.column);
                return o ? n(o, "tag-name") || "<" == o.value && n(o, "text") ? this.getTagCompletions(e, t, i, r) : n(o, "text") || n(o, "attribute-name") ? this.getAttributeCompetions(e, t, i, r) : [] : []
            }, this.getTagCompletions = function(e, t, n, i) {
                var r = c;
                return i && (r = r.filter(function(e) {
                    return 0 === e.indexOf(i)
                })), r.map(function(e) {
                    return {
                        value: e,
                        meta: "tag"
                    }
                })
            }, this.getAttributeCompetions = function(e, t, n, r) {
                var o = i(t, n);
                if (!o) return [];
                var s = a;
                return o in l && (s = s.concat(l[o])), r && (s = s.filter(function(e) {
                    return 0 === e.indexOf(r)
                })), s.map(function(e) {
                    return {
                        caption: e,
                        snippet: e + '="$0"',
                        meta: "attribute"
                    }
                })
            }
        }).call(u.prototype), t.HtmlCompletions = u
    }), ace.define("ace/mode/markdown_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules", "ace/mode/javascript_highlight_rules", "ace/mode/xml_highlight_rules", "ace/mode/html_highlight_rules", "ace/mode/css_highlight_rules"], function(e, t) {
        function n(e, t) {
            return {
                token: "support.function",
                regex: "^```" + e + "\\s*$",
                push: t + "start"
            }
        }
        var i = e("../lib/oop"),
            r = e("../lib/lang"),
            o = e("./text_highlight_rules").TextHighlightRules,
            s = e("./javascript_highlight_rules").JavaScriptHighlightRules,
            a = e("./xml_highlight_rules").XmlHighlightRules,
            l = e("./html_highlight_rules").HtmlHighlightRules,
            c = e("./css_highlight_rules").CssHighlightRules,
            u = function(e) {
                return "(?:[^" + r.escapeRegExp(e) + "\\\\]|\\\\.)*"
            },
            h = function() {
                l.call(this), this.$rules.start.unshift({
                    token: "empty_line",
                    regex: "^$",
                    next: "allowBlock"
                }, {
                    token: "markup.heading.1",
                    regex: "^=+(?=\\s*$)"
                }, {
                    token: "markup.heading.2",
                    regex: "^\\-+(?=\\s*$)"
                }, {
                    token: function(e) {
                        return "markup.heading." + e.length
                    },
                    regex: /^#{1,6}(?=\s*[^ #]|\s+#.)/,
                    next: "header"
                }, n("(?:javascript|js)", "jscode-"), n("xml", "xmlcode-"), n("html", "htmlcode-"), n("css", "csscode-"), {
                    token: "support.function",
                    regex: "^```\\s*[a-zA-Z]*(?:{.*?\\})?\\s*$",
                    next: "githubblock"
                }, {
                    token: "string",
                    regex: "^>[ ].+$",
                    next: "blockquote"
                }, {
                    token: "constant",
                    regex: "^ {0,2}(?:(?: ?\\* ?){3,}|(?: ?\\- ?){3,}|(?: ?\\_ ?){3,})\\s*$",
                    next: "allowBlock"
                }, {
                    token: "markup.list",
                    regex: "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
                    next: "listblock-start"
                }, {
                    include: "basic"
                }), this.addRules({
                    basic: [{
                        token: "constant.language.escape",
                        regex: /\\[\\`*_{}\[\]()#+\-.!]/
                    }, {
                        token: "support.function",
                        regex: "(`+)(.*?[^`])(\\1)"
                    }, {
                        token: ["text", "constant", "text", "url", "string", "text"],
                        regex: '^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:["][^"]+["])?(\\s*))$'
                    }, {
                        token: ["text", "string", "text", "constant", "text"],
                        regex: "(\\[)(" + u("]") + ")(\\]s*\\[)(" + u("]") + ")(\\])"
                    }, {
                        token: ["text", "string", "text", "markup.underline", "string", "text"],
                        regex: "(\\[)(" + u("]") + ')(\\]\\()((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^"]))*)(\\s*"' + u('"') + '"\\s*)?(\\))'
                    }, {
                        token: "string",
                        regex: "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
                    }, {
                        token: "string",
                        regex: "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
                    }, {
                        token: ["text", "url", "text"],
                        regex: "(<)((?:https?|ftp|dict):[^'\">\\s]+|(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+)(>)"
                    }],
                    allowBlock: [{
                        token: "support.function",
                        regex: "^ {4}.+",
                        next: "allowBlock"
                    }, {
                        token: "empty",
                        regex: "",
                        next: "start"
                    }],
                    header: [{
                        regex: "$",
                        next: "start"
                    }, {
                        include: "basic"
                    }, {
                        defaultToken: "heading"
                    }],
                    "listblock-start": [{
                        token: "support.variable",
                        regex: /(?:\[[ x]\])?/,
                        next: "listblock"
                    }],
                    listblock: [{
                        token: "empty_line",
                        regex: "^$",
                        next: "start"
                    }, {
                        token: "markup.list",
                        regex: "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
                        next: "listblock-start"
                    }, {
                        include: "basic",
                        noEscape: !0
                    }, {
                        defaultToken: "list"
                    }],
                    blockquote: [{
                        token: "empty_line",
                        regex: "^\\s*$",
                        next: "start"
                    }, {
                        token: "string",
                        regex: ".+"
                    }],
                    githubblock: [{
                        token: "support.function",
                        regex: "^```",
                        next: "start"
                    }, {
                        token: "support.function",
                        regex: ".+"
                    }]
                }), this.embedRules(s, "jscode-", [{
                    token: "support.function",
                    regex: "^```",
                    next: "pop"
                }]), this.embedRules(l, "htmlcode-", [{
                    token: "support.function",
                    regex: "^```",
                    next: "pop"
                }]), this.embedRules(c, "csscode-", [{
                    token: "support.function",
                    regex: "^```",
                    next: "pop"
                }]), this.embedRules(a, "xmlcode-", [{
                    token: "support.function",
                    regex: "^```",
                    next: "pop"
                }]), this.normalizeRules()
            };
        i.inherits(h, o), t.MarkdownHighlightRules = h
    }), ace.define("ace/mode/folding/markdown", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/range"], function(e, t) {
        var n = e("../../lib/oop"),
            i = e("./fold_mode").FoldMode,
            r = e("../../range").Range,
            o = t.FoldMode = function() {};
        n.inherits(o, i),
            function() {
                this.foldingStartMarker = /^(?:[=-]+\s*$|#{1,6} |`{3})/, this.getFoldWidget = function(e, t, n) {
                    var i = e.getLine(n);
                    return this.foldingStartMarker.test(i) ? "`" == i[0] && "start" == e.bgTokenizer.getState(n) ? "end" : "start" : ""
                }, this.getFoldWidgetRange = function(e, t, n) {
                    function i(t) {
                        return h = e.getTokens(t)[0], h && 0 === h.type.lastIndexOf(d, 0)
                    }

                    function o() {
                        var e = h.value[0];
                        return "=" == e ? 6 : "-" == e ? 5 : 7 - h.value.search(/[^#]/)
                    }
                    var s = e.getLine(n),
                        a = s.length,
                        l = e.getLength(),
                        c = n,
                        u = n;
                    if (s.match(this.foldingStartMarker)) {
                        if ("`" == s[0]) {
                            if ("start" !== e.bgTokenizer.getState(n)) {
                                for (; ++n < l && (s = e.getLine(n), !("`" == s[0] & "```" == s.substring(0, 3))););
                                return new r(c, a, n, 0)
                            }
                            for (; n-- > 0 && (s = e.getLine(n), !("`" == s[0] & "```" == s.substring(0, 3))););
                            return new r(n, s.length, c, 0)
                        }
                        var h, d = "markup.heading";
                        if (i(n)) {
                            for (var g = o(); ++n < l;)
                                if (i(n)) {
                                    var f = o();
                                    if (f >= g) break
                                }
                            if (u = n - (h && -1 != ["=", "-"].indexOf(h.value[0]) ? 2 : 1), u > c)
                                for (; u > c && /^\s*$/.test(e.getLine(u));) u--;
                            if (u > c) {
                                var p = e.getLine(u).length;
                                return new r(c, a, u, p)
                            }
                        }
                    }
                }
            }.call(o.prototype)
    }), ace.define("ace/theme/github", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
        t.isDark = !1, t.cssClass = "ace-github", t.cssText = '/* CSS style content from github\'s default pygments highlighter template.Cursor and selection styles from textmate.css. */.ace-github .ace_gutter {background: #e8e8e8;color: #AAA;}.ace-github  {background: #fff;color: #000;}.ace-github .ace_keyword {font-weight: bold;}.ace-github .ace_string {color: #D14;}.ace-github .ace_variable.ace_class {color: teal;}.ace-github .ace_constant.ace_numeric {color: #099;}.ace-github .ace_constant.ace_buildin {color: #0086B3;}.ace-github .ace_support.ace_function {color: #0086B3;}.ace-github .ace_comment {color: #998;font-style: italic;}.ace-github .ace_variable.ace_language  {color: #0086B3;}.ace-github .ace_paren {font-weight: bold;}.ace-github .ace_boolean {font-weight: bold;}.ace-github .ace_string.ace_regexp {color: #009926;font-weight: normal;}.ace-github .ace_variable.ace_instance {color: teal;}.ace-github .ace_constant.ace_language {font-weight: bold;}.ace-github .ace_cursor {color: black;}.ace-github .ace_marker-layer .ace_active-line {background: rgb(255, 255, 204);}.ace-github .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-github.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;border-radius: 2px;}/* bold keywords cause cursor issues for some fonts *//* this disables bold style for editor and keeps for static highlighter */.ace-github.ace_nobold .ace_line > span {font-weight: normal !important;}.ace-github .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-github .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-github .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-github .ace_gutter-active-line {background-color : rgba(0, 0, 0, 0.07);}.ace-github .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-github .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-github .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
        var n = e("../lib/dom");
        n.importCssString(t.cssText, t.cssClass)
    })