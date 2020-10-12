const GLib = imports.gi.GLib;

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

function roundMinutesForDenominator(now, denominator) {
    return Math.round(now.get_minute() / denominator);
}

function formatVulgarFraction(FORMAT, desired, now) {
    function roundToQuarters(now) {
        return roundMinutesForDenominator(now, 15);
    }

    if (FORMAT.indexOf("%;vf") < 0) {
        return desired;
    }

    var quarters = roundToQuarters(now);
    var vulgar_fraction = ["\u2070/\u2080", "\u00B9/\u2084", "\u00B9/\u2082", "\u00B3/\u2084", "\u00B9/\u2081"][quarters];
    return desired.replace(/%;vf/g, vulgar_fraction);
}

function formatClockFace(FORMAT, desired, now) {
    function roundToHalves(now) {
        return roundMinutesForDenominator(now, 30);
    }

    if (FORMAT.indexOf("%;cf") < 0) {
        return desired;
    }

    var hour = now.get_hour();

    var halves = roundToHalves(now);
    // round the fourth quarter to the next hour
    var roundedHour = halves == 2 ? hour + 1 : hour;
    // convert to 12 hour clock
    var roundedHour12 = roundedHour % 12;
    // convert 0 to 12
    if (roundedHour12 == 0) {
        roundedHour12 = 12;
    }

    var clockFaceCodePoint = 0x1f550 + (roundedHour12 - 1);

    var isHalfPast = halves == 1;
    if (isHalfPast) {
        clockFaceCodePoint += 12;
    }

    var repl;
    if (String.fromCodePoint) {
        repl = String.fromCodePoint(clockFaceCodePoint)
    } else {
        repl = fromCodePoint(clockFaceCodePoint);
    }
    return desired.replace(/%;cf/g, repl);
}

function formatBeatTime(FORMAT, desired, now) {
    if (FORMAT.indexOf("%;@") < 0) {
        return desired;
    }

    var bmtnow = now.to_timezone(GLib.TimeZone.new('+01'));
    var beat_time = 0 | (bmtnow.get_hour() + (bmtnow.get_minute() / 60) + bmtnow.get_second() / 3600) * 1000 / 24;
    beat_time = ('000' + beat_time).slice(-3);
    return desired.replace(/%;@/g, beat_time);
}

function formatCustom(FORMAT, desired, now) {
    if (FORMAT.indexOf("%;") < 0) {
        return desired;
    }
    
    desired = formatVulgarFraction(FORMAT, desired, now);
    desired = formatClockFace(FORMAT, desired, now);
    return formatBeatTime(FORMAT, desired, now);
}

function formatUsingGlib(desired, now) {
    if (desired.indexOf("%") < 0) {
        return desired;
    }
    
    return now.format(desired);
}

function format(FORMAT, now) {
    var desired = FORMAT;

    desired = formatCustom(FORMAT, desired, now);
    desired = formatUsingGlib(desired, now);

    return desired;
};
