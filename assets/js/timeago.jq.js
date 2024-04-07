/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.3.0
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
function timeago(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
    function t() {
        var t = n(this),
            s = o.settings;
        return isNaN(t.datetime) || (0 == s.cutoff || r(t.datetime) < s.cutoff) && e(this).text(i(t.datetime)), this
    }

    function n(t) {
        if (t = e(t), !t.data("timeago")) {
            t.data("timeago", {
                datetime: o.datetime(t)
            });
            var n = e.trim(t.text());
            o.settings.localeTitle ? t.attr("title", t.data("timeago").datetime.toLocaleString()) : !(n.length > 0) || o.isTime(t) && t.attr("title") || t.attr("title", n)
        }
        return t.data("timeago")
    }

    function i(e) {
        return o.inWords(r(e))
    }

    function r(e) {
        return (new Date).getTime() - e.getTime()
    }
    e.timeago = function(t) {
        return i(t instanceof Date ? t : "string" == typeof t ? e.timeago.parse(t) : "number" == typeof t ? new Date(t) : e.timeago.datetime(t))
    };
    var o = e.timeago;
    e.extend(e.timeago, {
        settings: {
            refreshMillis: 6e4,
            allowFuture: !1,
            localeTitle: !1,
            cutoff: 0,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            }
        },
        inWords: function(t) {
            function n(n, r) {
                var o = e.isFunction(n) ? n(r, t) : n,
                    s = i.numbers && i.numbers[r] || r;
                return o.replace(/%d/i, s)
            }
            var i = this.settings.strings,
                r = i.prefixAgo,
                o = i.suffixAgo;
            this.settings.allowFuture && 0 > t && (r = i.prefixFromNow, o = i.suffixFromNow);
            var s = Math.abs(t) / 1e3,
                a = s / 60,
                l = a / 60,
                c = l / 24,
                u = c / 365,
                h = 45 > s && n(i.seconds, Math.round(s)) || 90 > s && n(i.minute, 1) || 45 > a && n(i.minutes, Math.round(a)) || 90 > a && n(i.hour, 1) || 24 > l && n(i.hours, Math.round(l)) || 42 > l && n(i.day, 1) || 30 > c && n(i.days, Math.round(c)) || 45 > c && n(i.month, 1) || 365 > c && n(i.months, Math.round(c / 30)) || 1.5 > u && n(i.year, 1) || n(i.years, Math.round(u)),
                d = i.wordSeparator || "";
            return void 0 === i.wordSeparator && (d = " "), e.trim([r, h, o].join(d))
        },
        parse: function(t) {
            var n = e.trim(t);
            return n = n.replace(/\.\d+/, ""), n = n.replace(/-/, "/").replace(/-/, "/"), n = n.replace(/T/, " ").replace(/Z/, " UTC"), n = n.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(n)
        },
        datetime: function(t) {
            var n = e(t).attr(o.isTime(t) ? "datetime" : "title");
            return o.parse(n)
        },
        isTime: function(t) {
            return "time" === e(t).get(0).tagName.toLowerCase()
        }
    });
    var s = {
        init: function() {
            var n = e.proxy(t, this);
            n();
            var i = o.settings;
            i.refreshMillis > 0 && (this._timeagoInterval = setInterval(n, i.refreshMillis))
        },
        update: function(n) {
            e(this).data("timeago", {
                datetime: o.parse(n)
            }), t.apply(this)
        },
        updateFromDOM: function() {
            e(this).data("timeago", {
                datetime: o.parse(e(this).attr(o.isTime(this) ? "datetime" : "title"))
            }), t.apply(this)
        },
        dispose: function() {
            this._timeagoInterval && (window.clearInterval(this._timeagoInterval), this._timeagoInterval = null)
        }
    };
    e.fn.timeago = function(e, t) {
        var n = e ? s[e] : s.init;
        if (!n) throw new Error("Unknown function name '" + e + "' for timeago");
        return this.each(function() {
            n.call(this, t)
        }), this
    }, document.createElement("abbr"), document.createElement("time")
}),
function() {
    function e(e, t, n, i) {
        var r = e % 10;
        return 1 == r && (1 == e || e > 20) ? t : r > 1 && 5 > r && (e > 20 || 10 > e) ? n : i
    }
    jQuery.timeago.settings.strings = {
        prefixAgo: null,
        prefixFromNow: "\u0447\u0435\u0440\u0435\u0437",
        suffixAgo: "\u043d\u0430\u0437\u0430\u0434",
        suffixFromNow: null,
        seconds: "\u043c\u0435\u043d\u044c\u0448\u0435 \u043c\u0438\u043d\u0443\u0442\u044b",
        minute: "\u043c\u0438\u043d\u0443\u0442\u0443",
        minutes: function(t) {
            return e(t, "%d \u043c\u0438\u043d\u0443\u0442\u0430", "%d \u043c\u0438\u043d\u0443\u0442\u044b", "%d \u043c\u0438\u043d\u0443\u0442")
        },
        hour: "\u0447\u0430\u0441",
        hours: function(t) {
            return e(t, "%d \u0447\u0430\u0441", "%d \u0447\u0430\u0441\u0430", "%d \u0447\u0430\u0441\u043e\u0432")
        },
        day: "\u0434\u0435\u043d\u044c",
        days: function(t) {
            return e(t, "%d \u0434\u0435\u043d\u044c", "%d \u0434\u043d\u044f", "%d \u0434\u043d\u0435\u0439")
        },
        month: "\u043c\u0435\u0441\u044f\u0446",
        months: function(t) {
            return e(t, "%d \u043c\u0435\u0441\u044f\u0446", "%d \u043c\u0435\u0441\u044f\u0446\u0430", "%d \u043c\u0435\u0441\u044f\u0446\u0435\u0432")
        },
        year: "\u0433\u043e\u0434",
        years: function(t) {
            return e(t, "%d \u0433\u043e\u0434", "%d \u0433\u043e\u0434\u0430", "%d \u043b\u0435\u0442")
        }
    }
}()