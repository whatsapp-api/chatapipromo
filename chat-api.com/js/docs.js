$(document).ready(function () {
    "use strict";

    var scrolltoHash = function () {
        var scrollTarget = $(window.location.hash);
        if (scrollTarget.length === 1) {
            $('html, body').animate({
                scrollTop: scrollTarget.offset().top - 25
            }, 500);
        }
    };

    window.addEventListener("hashchange", scrolltoHash, false);
    scrolltoHash();
});