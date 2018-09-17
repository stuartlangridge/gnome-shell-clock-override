const Main = imports.ui.main;
const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

var settings;

function init() {
    settings = Convenience.getSettings();
}

var fromCodePoint = function() {
    var MAX_SIZE = 0x4000;
    var codeUnits = [];
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) { return ''; }
    var result = '';
    while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (
            !isFinite(codePoint) ||       // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 ||              // not a valid Unicode code point
            codePoint > 0x10FFFF ||       // not a valid Unicode code point
            Math.floor(codePoint) != codePoint // not an integer
        ) {
            throw RangeError('Invalid code point: ' + codePoint);
        }
        if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint);
        } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = (codePoint % 0x400) + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += String.fromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};

function overrider(lbl) {
    var t = lbl.get_text();
    var FORMAT = settings.get_string("override-string");
    var desired = FORMAT;
    var now = GLib.DateTime.new_now_local();

    if (FORMAT.indexOf("%;") > -1) {
	if (FORMAT.indexOf("%;tf") > -1) {
    	    desired = desired.replace(/%;tf/g, '\t');
	}
        if (FORMAT.indexOf("%;vf") > -1) {
            var quarters = Math.round(now.get_minute() / 15);
            var vulgar_fraction = ["\u2070/\u2080", "\u00B9/\u2084", "\u00B9/\u2082", "\u00B3/\u2084", "\u00B9/\u2081"][quarters];
            desired = desired.replace(/%;vf/g, vulgar_fraction);
        }
        if (FORMAT.indexOf("%;cf") > -1) {
            var hour = now.get_hour();
            // convert from 0-23 to 1-12
            if (hour > 12) {
                hour -= 12;
            }
            if (hour == 0) {
                hour = 12;
            }
            var clockFaceCodePoint = 0x1f550 + (hour - 1);
            var minute = now.get_minute();
            if (minute >= 30) {
                clockFaceCodePoint += 12;
            }
            var repl;
            if (String.fromCodePoint) {
                repl = String.fromCodePoint(clockFaceCodePoint)
            } else {
                repl = fromCodePoint(clockFaceCodePoint);
            }
            desired = desired.replace(/%;cf/g, repl);
        }
        if (FORMAT.indexOf("%;@") > -1) {
            var bmtnow = GLib.DateTime.new_now(GLib.TimeZone.new('+01'));
            var beat_time = 0 | (((bmtnow.get_hour() + 1) % 24) + bmtnow.get_minute() / 60 + bmtnow.get_second() / 3600) * 1000 / 24;
            beat_time = ('000' + beat_time).slice(-3);
            desired = desired.replace(/%;@/g, beat_time);
        }
    }
    if (FORMAT.indexOf("%") > -1) {
        desired = now.format(desired);
    }
    if (t != desired) {
        last = t;
        lbl.set_text(desired);
    }
}

var lbl, signalHandlerID, last = "";

function enable() {
    var sA = Main.panel._statusArea;
    if (!sA) { sA = Main.panel.statusArea; }

    if (!sA || !sA.dateMenu || !sA.dateMenu.actor) {
        print("Looks like Shell has changed where things live again; aborting.");
        return;
    }

    sA.dateMenu.actor.first_child.get_children().forEach(function(w) {
        // assume that the text label is the first StLabel we find.
        // This is dodgy behaviour but there's no reliable way to
        // work out which it is.
        if (w.get_text && !lbl) { lbl = w; }
    });
    if (!lbl) {
        print("Looks like Shell has changed where things live again; aborting.");
        return;
    }
    signalHandlerID = lbl.connect("notify::text", overrider);
    last = lbl.get_text();
    overrider(lbl);
}

function disable() {
    if (lbl && signalHandlerID) {
        lbl.disconnect(signalHandlerID);
        lbl.set_text(last);
    }
}
