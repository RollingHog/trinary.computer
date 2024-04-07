/*
    * Copyright 2010 Alexander Obukhov, Trinary Group
    *
    * http://trinary.ru
    *
    * Released under the MIT license
    *
    */
trinary.clock.elektronika1.Elektronika1 = function() {
    this.indicator = {}, this.conf = {
        segment: {
            width: 30,
            height: 30
        },
        offset: 10,
        width: 300,
        height: 150,
        step: {
            w: 30,
            y: 30
        }
    };
    var e = this.conf;
    this.width = 11 * e.segment.width + 3 * e.offset, this.height = 2 * e.segment.height + 2 * e.offset, this.root = SVG.create("g", {
        "class": "elektronika1"
    }), this.instance = this.root.instance, this.amplitudes = {}, this.go()
}, 
trinary.clock.elektronika1.Elektronika1.prototype = {
    go: function() {
        var e = 5,
            t = this.conf.segment.width,
            n = this.conf.offset,
            i = e + this.conf.segment.height;
        this.build("hours", 3).instance.translate(e, i), this.build("minutes", 4).instance.translate(e + 2 * t + n, i), this.build("seconds", 4).instance.translate(e + 5 * t + 2 * n, i), this.tictac(this), setInterval(this.tictac, 1e3, this)
    },
    build: function(e, t) {
        return this.indicator[e] = new trinary.clock.elektronika1.Segment(e, t, this.conf.segment), this.root.append(this.indicator[e].instance), this.indicator[e]
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
        t = trinary.core.decimalToTrinary(t), t = trinary.core.align(t, 4), this.indicator[e].tic(t)
    }
}, trinary.clock.elektronika1.Segment = function(e, t, n) {
    this.instance = null, this.points = [], this.lines = [], this.conf = n;
    for (var i = n.width, r = n.height, o = SVG.create("g", {
            "class": e
        }), s = -1; 2 > s; s++) {
        var a = r * s,
            l = i * (t - 1),
            c = r * s,
            u = SVG.create("line", {
                "class": "separator",
                x1: 0,
                y1: a,
                x2: l,
                y2: c
            });
        o.append(u)
    }
    for (var s = 0; t > s; s++) {
        var h = s * i,
            l = s * i,
            a = -r,
            c = r,
            u = SVG.create("line", {
                "class": "separator",
                x1: h,
                y1: a,
                x2: l,
                y2: c
            });
        o.append(u)
    }
    for (var s = 1; t > s; s++) {
        var h = (s - 1) * i,
            l = s * i,
            d = this.line(h, l);
        this.lines[s] = d, o.append(d)
    }
    for (var s = 0; t > s; s++) {
        var g = this.point();
        g.attr("cx", s * i), this.points[s] = g, o.append(g)
    }
    this.instance = o
}, trinary.clock.elektronika1.Segment.prototype = {
    tic: function(e) {
        var t = (this.conf.width, this.conf.height);
        for (var n in this.points) {
            var r = trinary.core.trinaryToDecimal(e.charAt(n)),
                o = trinary.core.trinaryToDecimal(e.charAt(n - 1)),
                s = -r * t;
            this.points[n].attr("cy", s), i > 0 && (this.lines[n].attr("y1", -o * t), this.lines[n].attr("y2", -r * t))
        }
    },
    point: function() {
        return SVG.create("circle", {
            cx: 0,
            cy: 0,
            r: 2
        })
    },
    line: function(e, t) {
        return SVG.create("line", {
            x1: e,
            y1: 0,
            x2: t,
            y2: 0
        })
    }
}