'use strict';
(function ($) {

    var clear = true;
    var msgq = [];

    // writes the string
    //
    // @param jQuery $target
    // @param String str
    // @param Numeric cursor
    // @param Numeric delay
    // @param Function cb
    // @return void
    function typeString($target, str, cursor, delay, cb) {
        $target.html(function (_, html) {
            return html + str[cursor];
        });
        $target.parent().scrollLeft(1000);

        if (cursor < str.length - 1) {
            setTimeout(function () {
                typeString($target, str, cursor + 1, delay, cb);
            }, delay);
        }
        else {
            cb();
        }
    }

    // jQuery hook
    $.fn.extend({
        teletype: function (opts) {
            if (!clear) {
                msgq.push(opts);
            }
            else {
                clear = false;
                var settings = $.extend({}, $.teletype.defaults, opts);

                return $(this).each(function () {
                    (function loop($tar, idx) {
                        $tar.html('');
                        // type
                        typeString($tar, settings.text[idx], 0, settings.delay, function () {
                            clear = true;
                            if (msgq.length > 0) {
                                setTimeout(function() { $tar.teletype(msgq.pop()); }, settings.pauseDelay);
                            }
                        });
                    }($(this), 0));
                });
            }
        }
    });

    // plugin defaults
    $.extend({
        teletype: {
            defaults: {
                pauseDelay: 2000,
                delay: 70,
                text: []
            }
        }
    });
}(jQuery));
