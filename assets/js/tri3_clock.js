/*
    * Copyright 2010 Alexander Obukhov, Trinary Group
    *
    * http://trinary.ru
    *
    * Released under the MIT license
    *
    */
// "object" != typeof trinary && (trinary = {}), "object" != typeof trinary.clock && (trinary.clock = {}), 
trinary.clock.elektronika3 = {}, 
trinary.clock.elektronika3.Elektronika3 = function(e) {
    this.segment = {};
    var t = 30,
        n = 30;
    this.conf = {
        segment: {
            width: t,
            height: n
        }
    }, e = "elektronika3 " + e || "", this.root = SVG.create("g", {
        "class": e
    }), this.instance = this.root.instance, this.build("hours", 4, [1, 1]), this.build("minutes", 4, [1, n + 1]), this.build("seconds", 4, [1, 2 * (n + 1)]), this.width = 4 * t + 2, this.height = 3 * (n + 1), this.tictac(this), setInterval(this.tictac, 1e3, this)
}, trinary.clock.elektronika3.Elektronika3.prototype = {
    build: function(e, t, n) {
        var i = new trinary.clock.elektronika3.Segment(e, t, this.conf.segment);
        return i.instance.translate(n[0], n[1]), this.segment[e] = i, this.root.append(i.instance), i
    },
    tictac: function(e) {
        var t = new Date,
            n = t.getSeconds();
        n > 30 && (n -= 60), e.engine("seconds", n);
        var i = t.getMinutes();
        i > 30 && (i -= 60), e.engine("minutes", i);
        var r = t.getHours();
        r > 12 && (r -= 24), e.engine("hours", r)
    },
    engine: function(e, t) {
        t = trinary.core.decimalToTrinary(t), t = trinary.core.align(t, 4), this.segment[e].tictac(t)
    }
}, trinary.clock.elektronika3.Segment = function(e, t, n) {
    var i = SVG.create("g", {
            "class": "segment " + e
        }),
        r = n.width;
    this.indicators = [];
    for (var o = 0; t > o; o++) {
        var s = new trinary.clock.elektronika3.Indicator(n);
        s.instance.translate(o * r, 0), i.append(s.instance), this.indicators[o] = s
    }
    this.instance = i
}, trinary.clock.elektronika3.Segment.prototype = {
    tictac: function(e) {
        e = e.split("");
        for (var t = 0; t < e.length; t++) this.indicators[t].display(e[t])
    }
}, trinary.clock.elektronika3.Indicator = function(e) {
    this.led = {}, this.instance = this.render(e.width, e.height)
}, trinary.clock.elektronika3.Indicator.prototype = {
    render: function(e, t) {
        var n = SVG.create("g", {
                "class": "indicator"
            }),
            i = SVG.create("g", {
                "class": "zero"
            });
        n.append(i);
        var r = SVG.create("polyline", {
            points: "0,0 " + e + ", 0 " + e + "," + t + " 0," + t + " 0,0"
        });
        i.append(r), this.led[0] = i;
        var o = SVG.create("g", {
            "class": "minus"
        });
        n.append(o);
        var r = SVG.create("polyline", {
            points: "0,0 " + e + "," + t + " 0," + t + " 0,0"
        });
        o.append(r), this.led["-"] = o;
        var s = SVG.create("g", {
            "class": "plus"
        });
        n.append(s);
        var r = SVG.create("polyline", {
            points: "0,0 " + e + ", 0 " + e + "," + t + " 0,0"
        });
        return s.append(r), this.led["+"] = s, n
    },
    display: function(e) {
        this.instance.attr("class", "indicator " + ("+" == e ? "plus" : "-" == e ? "minus" : "zero"))
    }
}