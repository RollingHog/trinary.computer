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
    trinary.core = {
        dictionary: {
            nonaryToTrinary: {
                4: "++",
                3: "+0",
                2: "+-",
                1: "0+",
                0: "00",
                z: "0-",
                y: "-+",
                x: "-0",
                w: "--",
                "\u0446": "0-",
                "\u0443": "-+",
                "\u0445": "-0",
                "\u0436": "--",
                "\u0447": "++",
                "\u0437": "+0"
            },
            trinaryToNonary: {
                lat: {
                    "++": "4",
                    "+0": "3",
                    "+-": "2",
                    "0+": "1",
                    "00": "0",
                    "0-": "z",
                    "-+": "y",
                    "-0": "x",
                    "--": "w"
                },
                rus: {
                    "++": "4",
                    "+0": "3",
                    "+-": "2",
                    "0+": "1",
                    "00": "0",
                    "0-": "\u0446",
                    "-+": "\u0443",
                    "-0": "\u0445",
                    "--": "\u0436"
                }
            }
        },
        cache: {
            trinaryToNonary: {},
            sum: {},
            multiplication: {},
            tritSum: {},
            align: {}
        },
        sign: function(e) {
            var t = "";
            if ("string" == typeof e && e.length > 0) {
                var n = trinary.core.chop(e);
                t = n.charAt(0)
            }
            return t
        },
        validate: function(e, t) {
            return "undefined" == typeof t && (t = "0"), e.replace(/[^+0-]/g, t)
        },
        parity: function(e) {
            var t = e.replace(/0/g, "").length;
            return 0 == t ? "0" : t % 2 == 0 ? "+" : "-"
        },
        grow: function(e, t) {
            "undefined" == typeof e && (e = ""), "undefined" == typeof t && (t = 9);
            var n = t - e.length;
            return n > 0 && (e += trinary.core.align("0", n)), e
        },
        decimalToTrinary: function(e) {
            if (isNaN(e) || 0 == e) return "0";
            e = parseInt(e);
            var t = e,
                n = 0,
                i = "",
                r = "";
            for (0 > t && (t = Math.abs(t), n = 1);;)
                if (r = t % 3, t = Math.floor(t / 3), 2 == r ? (i = "-" + i, t += 1) : i = 1 == r ? "+" + i : "0" + i, 3 > t) {
                    i = 2 == t ? "+-" + i : 1 == t ? "+" + i : "0" + i;
                    break
                }
            return n && (i = trinary.core.inverse(i)), "0" == i.charAt(0) && (i = i.substr(1)), i
        },
        trinaryToDecimal: function(e) {
            var t = k = 0,
                n = e.length - 1;
            for (k = {
                    "+": 1,
                    0: 0,
                    "-": -1
                }, i = 0; i < e.length; i++) t += k[e.charAt(i)] * Math.pow(3, n), n--;
            return t
        },
        reverse: function(e) {
            for (var t = "", n = 0; n < e.length; n++) t = e.charAt(n) + t;
            return t
        },
        inverse: function(e) {
            return e.replace(/\+/g, "1").replace(/-/g, "+").replace(/1/g, "-")
        },
        align: function(e, t) {
            var n = e.length + "+" + t;
            if ("undefined" != typeof trinary.core.cache.align[n]) return trinary.core.cache.align[n] + e;
            /[+-]/.test(t) && (t = trinary.core.trinaryToDecimal(t));
            var i = t - e.length;
            if (i > 0) {
                for (var r = ""; i;) r += "0", i--;
                trinary.core.cache.align[n] = r, e = r + e
            }
            return e
        },
        tritSum: function(e, t, n, i) {
            "undefined" == typeof e && (e = "0"), "undefined" == typeof t && (t = "0"), "undefined" == typeof n && (n = "0"), "undefined" == typeof i && (i = "0");
            var r = e + "+" + t + "+" + n + "+" + i;
            if ("undefined" != typeof trinary.core.cache.tritSum[r]) return trinary.core.cache.tritSum[r];
            var o = {
                    "+": 1,
                    0: 0,
                    "-": -1
                },
                s = {
                    4: "+",
                    3: "0",
                    2: "-",
                    1: "+",
                    0: "0",
                    "-1": "-",
                    "-2": "+",
                    "-3": "0",
                    "-4": "-"
                },
                a = {
                    4: "+",
                    3: "+",
                    2: "+",
                    1: "0",
                    0: "0",
                    "-1": "0",
                    "-2": "-",
                    "-3": "-",
                    "-4": "-"
                },
                l = parseInt(o[e]) + parseInt(o[t]) + parseInt(o[n]) + parseInt(o[i]),
                c = {
                    carry: a[l],
                    sum: s[l]
                };
            return trinary.core.cache.tritSum[r] = c, c
        },
        sum: function(e, t, n) {
            "undefined" == typeof e && (e = "0"), "undefined" == typeof t && (t = "0"), "undefined" == typeof n && (n = "0");
            var i = e + "+" + t + "+" + n;
            if ("undefined" != typeof trinary.core.cache.sum[i]) return trinary.core.cache.sum[i];
            var r = "",
                o = "0",
                s = null,
                a = e.length,
                l = t.length,
                c = n.length;
            s = a > l ? a : l, c > s && (s = c);
            for (var u, h, d, g = {}; s;) u = h = d = "0", a > 0 && (u = e.charAt(a - 1), a -= 1), l > 0 && (h = t.charAt(l - 1), l -= 1), c > 0 && (d = n.charAt(c - 1), c -= 1), g = trinary.core.tritSum(u, h, d, o), o = g.carry, r = g.sum + r, s -= 1;
            return "0" != o && (r = o + r), r = trinary.core.chop(r), trinary.core.cache.sum[i] = r, r
        },
        nonaryToTrinary: function(e) {
            e = e.toString().toLowerCase();
            for (var t = trinary.core.dictionary.nonaryToTrinary, n = "", i = "", r = 0; r < e.length; r++) n = e.charAt(r), i += "undefined" == typeof t[n] ? "00" : t[n];
            return i
        },
        trinaryToNonary: function(e, t) {
            if (e.length % 2 && (e = "0" + e), "undefined" == typeof t && (t = "rus"), "undefined" != typeof trinary.core.cache.trinaryToNonary[e]) return trinary.core.cache.trinaryToNonary[e];
            for (var n = trinary.core.dictionary.trinaryToNonary[t], i = "", r = "", o = e.length, s = 1, a = 0; o > a; a++) r += e.charAt(a), 2 == s && (i += "undefined" == typeof n[r] ? "0" : n[r], r = "", s = 0), s++;
            return trinary.core.cache.trinaryToNonary[e] = i, i
        },
        detectBase: function(e) {
            return /[1234zyxw\u0446\u0443\u0445\u0436\u0447]/i.test(e) ? 9 : 3
        },
        decimalFraction: function(e) {
            var t = 0,
                n = 0,
                i = -e.length;
            n = {
                "+": 1,
                0: 0,
                "-": -1
            };
            for (var r = 0; r < e.length; r++) t += n[e.charAt(r)] * Math.pow(3, i), i--;
            return t
        },
        tryteMultiplyTrit: function(e, t) {
            var n = "",
                i = {
                    "++": "+",
                    "--": "+",
                    "-+": "-",
                    "+-": "-"
                };
            if ("0" == t) n = "0";
            else
                for (var r = 0; r < e.length; r++) n += "0" == e.charAt(r) ? "0" : i[e.charAt(r) + t];
            return n
        },
        bitwiseMultiplication: function(e, t) {
            var n = "",
                i = {
                    "++": "+",
                    "--": "+",
                    "-+": "-",
                    "+-": "-"
                },
                r = e.length - t.length;
            0 > r ? t = t.substr(-r) : r > 0 && (e = e.substr(r));
            for (var o, s, a = 0; a < e.length; a++) o = e.charAt(a), s = t.charAt(a), n += "0" == o || "0" == s ? "0" : i[o + s];
            return n
        },
        multiplication: function(e, t) {
            var n = e + "*" + t;
            if ("undefined" != typeof trinary.core.cache.multiplication[n]) return trinary.core.cache.multiplication[n];
            for (var i, r, o = "0", s = "", a = t.length; a > 0;) i = t[a - 1], r = trinary.core.tryteMultiplyTrit(e, i), r += s, o = trinary.core.sum(o, r), s += "0", a -= 1;
            return o = trinary.core.chop(o), trinary.core.cache.multiplication[n] = o, o
        },
        shift: function(e, t) {
            "undefined" == typeof t && (t = "+");
            var n = "",
                i = "";
            if ("string" == typeof t && (t = trinary.core.trinaryToDecimal(t)), t > 0) {
                for (; t > 0;) i += "0", t -= 1;
                n = e + i
            } else if (0 > t) {
                var r = e.length;
                for (t = Math.abs(t); t > 0;) i += "0", t -= 1;
                e = i + e, n = e.substr(0, r)
            } else n = e;
            return n = trinary.core.chop(n)
        },
        normalize: function(e, t) {
            "undefined" == typeof t && (t = 18), e = trinary.core.chop(e);
            var n = "0" + e,
                i = e.length + 1 - t;
            return 0 > i ? n = trinary.core.grow(n, t) : (n = trinary.core.align(n, t), n = n.substr(0, t)), i = trinary.core.decimalToTrinary(i), {
                normalize: n,
                N: i
            }
        },
        chop: function(e) {
            return e = e.replace(/^0+/, ""), 0 == e.length ? "0" : e
        }
    }, trinary.calendar = {}, trinary.calendar.Calendarium = function() {
        function e(e) {
            var t = trinary.core.decimalToTrinary(e);
            return t = trinary.core.align(t, 4), t.split("")
        }

        function t(t) {
            var n = e(t),
                i = [];
            for (var r in n) i.push(s[n[r]]);
            return i.join("")
        }

        function n(e) {
            var t = trinary.core.decimalToTrinary(e);
            return t = trinary.core.trinaryToNonary(t, "lat"), trinary.core.align(t, 2)
        }

        function i(t) {
            var n = e(t),
                i = [];
            for (var r in n) i.push('<span class="sign-view ' + o[n[r]] + '"></span>');
            return i.join("")
        }

        function r(e) {
            this.days = {};
            for (var t in e) this.days[e[t]] = !0
        }
        var o = {
                "+": "plus",
                "-": "minus",
                0: "zero"
            },
            s = {
                "+": "+",
                "-": "\u2212",
                0: "0"
            };
        r.prototype.isInclude = function(e) {
            return this.days[e]
        };
        var a = function(e) {
            "undefined" == typeof e && (e = {}), this.year = "number" != typeof e.year ? (new Date).getFullYear() : e.year, this.style = "undefined" == typeof e.style ? "" : e.style, "nonary" == e.system ? (this.formatter = n, this.system = "nonary") : (this.formatter = t, this.system = "trinary"), "triangle" == this.style && (this.formatter = i)
        };
        return a.prototype = {}, a.prototype.renderMonth = function(e, t, n) {
            var i = trinary.locale.date.monthFullNames,
                o = trinary.locale.date.dayShortNames,
                s = n ? new r(n) : null;
            o = o.slice(1, 7).concat(o[0]);
            var a = "",
                l = 0,
                c = new Date(t + "/01/" + e),
                u = c.getDay();
            a += '<table class="month ' + (t % 2 == 0 ? "even" : "odd") + '">';
            this.formatter(t);
            a += '<caption class="month-name">' + i[t - 1] + "</caption>", a += '<tr class="day-names">';
            for (var h = 0; 7 > h; h++) {
                var d = (this.formatter(h + 1), h >= 5 ? " holyday" : "");
                a += '<td class="day' + d + '">' + o[h] + "</td>"
            }
            a += "</tr>", a += '<tr class="week">', u == l && (u += 7);
            for (var h = l; u - 1 > h; h++) a += '<td class="day of-prev-month"></td>';
            for (var h = 1; 31 >= h && (c = new Date(t + "/" + h + "/" + e), !(c.getMonth() + 1 > t)); h++) {
                u = c.getDay();
                var g = "day";
                g += 0 == u || 6 == u ? " holyday" : "", g += s && s.isInclude(c.getDate()) ? " highlight" : "", a += '<td class="' + g + '">', a += this.formatter(c.getDate(), 4), a += "</td>", u == l && (a += '</tr><tr class="week">')
            }
            new Date(t + 1 + "/01/" + e).getDay();
            if (u > 0)
                for (var h = u + 1; 7 >= h; h++) a += '<td class="day of-next-month"></td>';
            return a += "</tr>", a += "</table>"
        }, a.prototype.renderYear = function(e) {
            var t = "";
            t += '<div class="year"><h2>' + this.formatter(e) + "</h2></div>";
            for (var n = 1; 12 >= n; n++) t += '<div class="calendar-month">' + this.renderMonth(e, n) + "</div>";
            return t
        }, a.prototype.wrap = function(e) {
            var t = "";
            return t += '<div class="calendar ' + this.system + " " + this.style + '">', t += e, t += "</div>"
        }, a.prototype.render = function() {
            return this.wrap(this.renderYear(this.year))
        }, a
    }(), trinary.calendar.Sinlendar = function(e) {
        this.initialize(e)
    }, trinary.calendar.Sinlendar.prototype = {
        conf: {
            width: 3600,
            height: 900,
            grid: 10
        },
        initialize: function(e) {
            this.placeholder = $(e), this.svg = SVG.create("svg", {
                width: this.conf.width,
                height: this.conf.height
            }), this.root = SVG.create("g"), this.root.translate(0, 10), this.placeholder.append(this.svg.instance), this.svg.append(this.root), this.render()
        },
        render: function() {
            this.root.append(this.wave({
                width: this.conf.width,
                height: 10 * this.conf.grid,
                "class": "year"
            }));
            var e = this.sequences({
                items: 12,
                "class": "month",
                height: 2 * this.conf.grid,
                width: this.conf.width
            });
            e.translate(0, 8 * this.conf.grid), this.root.append(e);
            var t = this.sequences({
                items: 53,
                "class": "week",
                height: this.conf.grid,
                width: this.conf.width
            });
            t.translate(0, 9 * this.conf.grid), this.root.append(t);
            var n = this.sequences({
                items: 365,
                "class": "week",
                height: .5 * this.conf.grid,
                width: this.conf.width
            });
            n.translate(0, 9.5 * this.conf.grid), this.root.append(n)
        },
        sequences: function(e) {
            for (var t = SVG.create("g"), n = e.items, i = e.width / n, r = 0; n > r;) {
                var o = this.wave({
                    width: i,
                    height: e.height,
                    "class": e["class"],
                    mirror: e.mirror
                });
                o.translate(i * r, 0), t.append(o), r++
            }
            return t
        },
        wave: function(e) {
            for (var t = "", n = 2 * e.width, i = 4 / n, r = e.height / 2, o = 0; n > o; o++) y = r * (1 + Math.cos(Math.PI * o * i)), t += o + "," + y + " ";
            var s = SVG.create("polyline", {
                    points: t
                }),
                a = SVG.create("g", {
                    "class": "sinus " + e["class"]
                });
            return a.append(s), a
        }
    }, "undefined" == typeof trinary.coder && (trinary.coder = {}),
    function(e) {
        var t = {
            binary: {
                encode: function(e) {
                    return e.toString(2)
                },
                decode: function(e) {
                    return parseInt(e, 2) || 0
                }
            },
            trinary: {
                encode: function(e) {
                    return trinary.core.decimalToTrinary(e)
                },
                decode: function(e) {
                    return trinary.core.trinaryToDecimal(e) || 0
                }
            },
            octonary: {
                encode: function(e) {
                    return e.toString(8)
                },
                decode: function(e) {
                    return parseInt(e, 8) || 0
                }
            },
            nonary: {
                encode: function(e) {
                    return trinary.core.trinaryToNonary(trinary.core.decimalToTrinary(e), "lat")
                },
                decode: function(e) {
                    return trinary.core.trinaryToDecimal(trinary.core.nonaryToTrinary(e)) || 0
                }
            },
            decimal: {
                encode: function(e) {
                    return e
                },
                decode: function(e) {
                    return parseInt(e, 10) || 0
                }
            },
            hexadecimal: {
                encode: function(e) {
                    return e.toString(16)
                },
                decode: function(e) {
                    return parseInt(e, 16) || 0
                }
            }
        };
        e.Translator = function(e) {
            var t = this;
            this.fields = [], $(e).find("[data-kind]").each(function(e, n) {
                var i = $(n),
                    r = i.attr("data-kind");
                t.fields.push({
                    input: i,
                    radix: r
                }), t.bindField(i, r)
            })
        }, e.Translator.prototype = {
            bindField: function(e, t) {
                var n = this;
                e.keyup(function() {
                    n.setValue(e.val(), t)
                })
            },
            setValue: function(e, n) {
                var i = t[n].decode(e);
                for (var r in this.fields) {
                    var o = this.fields[r];
                    n != o.radix && o.input.val(t[o.radix].encode(i))
                }
            }
        }
    }(trinary.coder);
    // Gardener.prototype = {
    //     tree: function(e) {
    //         var t = new Tree;
    //         return t.dx = e.dx, t.dy = e.dy, t.width = e.width, t.height = e.height, t.nodes = e.nodes, t.dimensions(), t
    //     }
    // },
    //  Tree.prototype = {
    //     dimensions: function() {
    //         var e = (this.width + 1) * this.dx;
    //         440 > e && (e = 440), this.h = (this.height + 1) * this.dy, this.h < 300 && (this.h = 300), this.svg.attr("style", "width:" + e + "px; height:" + this.h + "px"), this.root.setTransform("translate(" + this.dx + "," + this.dy + ")")
    //     },
    //     plant: function(e) {
    //         var t, n, i, r = $(e),
    //             o = this,
    //             s = function(e) {
    //                 if (e.pageX || e.pageY) var t = e.pageX,
    //                     n = e.pageY;
    //                 else if (e.clientX || e.clientY) var t = e.clientX,
    //                     n = e.clientY;
    //                 return {
    //                     x: t,
    //                     y: n
    //                 }
    //             },
    //             a = function(e, t) {
    //                 var n = e.scale();
    //                 t = 0 > t ? -1 : 1, e.scale(n.scale + .1 * t)
    //             },
    //             l = function(e) {
    //                 43 == e.which || 61 == e.which ? a(o.root) : (45 == e.which || 109 == e.which) && a(o.root, -1)
    //             };
    //         r.mouseover(function() {
    //             window.addEventListener("keypress", l, !1)
    //         }), r.mouseout(function() {
    //             window.removeEventListener("keypress", l, !1)
    //         }), r.mousedown(function(e) {
    //             t = !0;
    //             var r = s(e);
    //             n = r.x, i = r.y
    //         }), r.mousemove(function(e) {
    //             if (t) {
    //                 var r = s(e),
    //                     a = -n + r.x,
    //                     l = -i + r.y;
    //                 n = r.x, i = r.y;
    //                 var c = o.root.translate();
    //                 return o.root.translate(c.x + a, c.y + l), !1
    //             }
    //         }), r.mouseup(function() {
    //             t = !1
    //         }), r.mousewheel(function() {
    //             a(o.root)
    //         }, function() {
    //             a(o.root, -1)
    //         }, !0), r.append(this.svg.instance)
    //     },
    //     grow: function() {
    //         var t = (this.height, this.width * this.dx);
    //         440 > t && (t = 440);
    //         for (e in this.nodes) b = this.branch(this.nodes[e]), null != b && this.root.append(b);
    //         for (e in this.nodes) {
    //             var n = this.node(this.nodes[e]);
    //             null != n && this.root.append(n)
    //         }
    //     },
    //     branch: function(e) {
    //         return null != e.parent ? SVG.create("line", {
    //             x1: e.x,
    //             y1: e.y,
    //             x2: e.parent.x,
    //             y2: e.parent.y
    //         }) : void 0
    //     },
    //     node: function(e) {
    //         var t = SVG.create("g");
    //         "node" == e.type && t.attr("class", "node");
    //         var n = SVG.create("text", {
    //                 x: e.x,
    //                 y: e.y
    //             }),
    //             i = SVG.create("circle", {
    //                 cx: e.x,
    //                 cy: e.y,
    //                 r: 7
    //             });
    //         return n.text(e.label), t.append(i), t.append(n), t
    //     }
    // };
var Thencoder = {
    getFreq: function(e) {
        for (var t = {}, n = 0; n < e.length; n++) {
            var i = e.charAt(n);
            isset(t[i]) ? t[i]++ : t[i] = 1
        }
        var r = [];
        for (var o in t) r.push({
            letter: o,
            freq: t[o]
        });
        return r
    },
    sortByFreq: function(e, t) {
        var n = e.freq,
            i = t.freq;
        return n > i ? -1 : i > n ? 1 : 0
    },
    sortByLength: function(e, t) {
        var n = e.length,
            i = t.length;
        return n > i ? 1 : i > n ? -1 : 0
    },
    getBinaryTree: function(e) {
        var t = clone(e),
            n = [],
            i = 2;
        if (i > t.length) i = t.length, Thencoder.rebuild(t, n, i);
        else
            for (; t.length > 1;) Thencoder.rebuild(t, n, i);
        return n
    },
    getTrinaryTree: function(e) {
        var t = clone(e),
            n = [],
            i = 3;
        if (i > t.length) i = t.length, Thencoder.rebuild(t, n, i);
        else
            for (t.length % 2 == 0 ? Thencoder.rebuild(t, n, 2) : Thencoder.rebuild(t, n, i); t.length > 1;) Thencoder.rebuild(t, n, i);
        return n
    },
    rebuild: function(e, t, n) {
        e.sort(Thencoder.sortByFreq);
        for (var i = [], r = 0, o = n; o > 0; o--) {
            var s = e.pop();
            i.push(s), r += s.freq
        }
        t.push(i);
        var a = t.length - 1;
        e.push({
            letter: "{" + a + "}",
            freq: r
        })
    },
    getPrefixCodes: function(e) {
        var t = [],
            n = e.length - 1;
        return Thencoder.getElement(e[n], e, 0, t), t.sort(Thencoder.sortByLength), t
    },
    getElement: function(e, t, n, i) {
        n++;
        var r = /{(\d+)}/;
        for (var o in e) {
            var s = e[o],
                a = r.exec(s.letter);
            null != a && "" != a[1] ? Thencoder.getElement(t[a[1]], t, n, i) : i.push({
                letter: s.letter,
                length: n,
                freq: s.freq
            })
        }
    },
    getEncodedSize: function(e) {
        var t = 0;
        for (var n in e) {
            var i = e[n];
            t += i.length * i.freq
        }
        return t
    }
};
Thencoder.structure = {}, Thencoder.structure.TreeNode = function() {}, Thencoder.structure.Tree = function() {
        this.nodes = [], this.height = 0, this.dimensions = {}, this.base = 3, this.dx = 12, this.dy = 25, this.offset_k = 1
    }, Thencoder.structure.Tree.prototype = {
        grow: function(e) {
            this.bypass(e), this.calculate_dimensions(), this.calculate_coords();
            var t = {};
            return t.width = Math.pow(this.base, this.height - 1), t.height = this.height, t.base = this.base, t.dx = this.dx, t.dy = this.dy, t.nodes = this.nodes, t
        },
        bypass: function(e) {
            this.base = e[e.length - 1].length, 2 == this.base && (this.offset_k = .5);
            var t = "#";
            this.nodes = [];
            var n = new Thencoder.structure.TreeNode;
            n.label = t + (e.length - 1), n.xi = 0, n.yi = 0, n.type = "node", this.nodes[n.label] = n, this.height = 0;
            for (var i = /{(\d+)}/, r = e.length - 1; r >= 0; r--) {
                var o = r,
                    s = e[r],
                    a = 0;
                for (kl in s) {
                    var l = s[kl],
                        c = new Thencoder.structure.TreeNode;
                    c.type = 1 == i.test(l.letter) ? "node" : "leaf";
                    var u = l.letter.replace(/[{}]/g, "");
                    " " == u ? u = "&#9248;" : 13 == u.charCodeAt(0) ? u = "&#9229;" : 10 == u.charCodeAt(0) && (u = "&#9252;"), c.label = "node" == c.type ? t + u : u, c.parent = isset(this.nodes[t + o]) ? this.nodes[t + o] : null;
                    var h = null != c.parent ? c.parent.xi * this.base : 0,
                        d = null != c.parent ? c.parent.yi : 0;
                    c.xi = h + a, c.yi = d + 1, this.height < c.yi && (this.height = c.yi), this.nodes[c.label] = c, a++
                }
            }
            this.height++
        },
        calculate_dimensions: function() {
            for (var e = 0, t = 0; t < this.height; t++) {
                var n = this.dx * Math.pow(this.base, t);
                this.dimensions[this.height - t - 1] = {
                    dx: n,
                    offset: e * this.offset_k
                }, e += n
            }
        },
        calculate_coords: function() {
            for (var e in this.nodes) {
                var t = this.nodes[e];
                t.x = this.dimensions[t.yi].offset + this.dimensions[t.yi].dx * t.xi, t.y = this.dy * t.yi
            }
        }
    }, Thencoder.statistics = {
        buildSymbolHash: function(e) {
            var t = {};
            for (var n in e) {
                var i = e[n];
                t[i.letter] = {
                    length: i.length
                }
            }
            return t
        },
        symlist: function(e, t, n) {
            var i = "",
                r = 0,
                o = Thencoder.statistics.buildSymbolHash(t),
                s = Thencoder.statistics.buildSymbolHash(n),
                a = clone(e);
            a.sort(Thencoder.sortByFreq);
            for (k in a) {
                var l = a[k].freq,
                    c = a[k].letter,
                    u = o[c].length,
                    h = s[c].length;
                " " == c ? c = "&#160;" : 13 == c.charCodeAt(0) ? c = "&#9834;" : 10 == c.charCodeAt(0) && (c = "&#9689;"), i += r % 2 ? "<tr>" : "<tr class='even'>", i += "<th>" + c + "</th><td>" + l + "</td><td>" + u + "</td><td>" + h + "</td></tr>", r++
            }
            return i
        }
    }