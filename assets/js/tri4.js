/*
 * Sinchron - Trinary clock
 *
 * Copyright 2008 Alexander Obukhov, Trinary Group
 *
 * http://trinary.ru
 *
 * Released under the MIT license
 *
 * $Date: 2008-10-28 20:00:00 +0000 (Tue, 28 Oct 2008) $
 * $Rev: 3 $
 */
trinary.clock.Sinchron = function (e, t, n) {
    this.placeholder = e, this.conf.width = "undefined" == typeof t ? this.placeholder.clientWidth : t, this.conf.height = "undefined" == typeof t ? this.placeholder.clientHeight : n
} 
trinary.clock.Sinchron.prototype = {
    placeholder: null,
    amplitudes: {},
    engine: null,
    conf: {
        width: 300,
        height: 150
    },
    root: null,
    sinus: {
        hour: {
            amplitude: .8,
            color: "#cc0000",
            color_alpha: "rgba(239, 41, 41, 0.9)",
            thickness: 3
        },
        minute: {
            amplitude: .5,
            color: "#73d216",
            color_alpha: "rgba(115, 210, 22, 1)",
            thickness: 2
        },
        second: {
            amplitude: .2,
            color: "#3465a4",
            color_alpha: "rgba(52, 101, 164, 0.5)",
            thickness: 1.5
        },
        millisecond: {
            amplitude: .1,
            color: "#555753",
            color_alpha: "rgba(85, 87, 83, 0.3)",
            thickness: 1
        }
    },
    clear: function () { },
    tictac: function (e) {
        var t = new Date;
        e.clear(), init = t.getMilliseconds() / 1e3, e.engine(e.sinus.millisecond, init), init = (init + t.getSeconds()) / 60, e.engine(e.sinus.second, init), init = (init + t.getMinutes()) / 60, e.engine(e.sinus.minute, init), init = (init + t.getHours()) / 24, e.engine(e.sinus.hour, init)
    },
    canvas: function () {
        this.build = function (e) {
            return this.sinus[e] = this.wave({
                "class": e,
                amplitude: this.amplitudes[e]
            }), this.sinus[e]
        }, this.wave = function (e) {
            var t = this.root,
                n = 2 * e.init + 1;
            t.lineWidth = e.thickness, t.strokeStyle = e.color, t.beginPath();
            var i, r, o = this.conf.height / 2,
                s = o * (1 - e.amplitude),
                a = 2 * Math.PI / this.conf.width;
            n = n * this.conf.width / 2;
            for (var l = 0; l < this.conf.width; l += 2) r = a * (l + n), i = s + e.amplitude * o * (1 + Math.cos(r)), t.lineTo(l, i);
            t.stroke(), t.globalAlpha = .75
        }, this.clear = function () {
            ctx = this.root, ctx.clearRect(0, 0, this.conf.width, this.conf.height), ctx.fillStyle = "#d3d7cf", ctx.fillRect(0, 0, this.conf.width / 2, this.conf.height)
        }, this.engine = function (e, t) {
            e.init = t, this.wave(e)
        }, this.placeholder.width = this.conf.width, this.placeholder.height = this.conf.height, this.root = this.placeholder.getContext("2d"), setInterval(this.tictac, 50, this)
    }
}