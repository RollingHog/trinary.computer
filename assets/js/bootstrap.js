/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var n=e(this),r=n.data("bs.alert");r||n.data("bs.alert",r=new i(this)),"string"==typeof t&&r[t].call(n)})}var n='[data-dismiss="alert"]',i=function(t){e(t).on("click",n,this.close)};i.VERSION="3.3.5",i.TRANSITION_DURATION=150,i.prototype.close=function(t){function n(){s.detach().trigger("closed.bs.alert").remove()}var r=e(this),o=r.attr("data-target");o||(o=r.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,""));var s=e(o);t&&t.preventDefault(),s.length||(s=r.closest(".alert")),s.trigger(t=e.Event("close.bs.alert")),t.isDefaultPrevented()||(s.removeClass("in"),e.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",n).emulateTransitionEnd(i.TRANSITION_DURATION):n())};var r=e.fn.alert;e.fn.alert=t,e.fn.alert.Constructor=i,e.fn.alert.noConflict=function(){return e.fn.alert=r,this},e(document).on("click.bs.alert.data-api",n,i.prototype.close)}(jQuery)