const Main = imports.ui.main;
const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Format = Me.imports.formatter;

var settings;

function init() {
    settings = Convenience.getSettings();
}

function overrider(lbl) {
    var FORMAT = settings.get_string("override-string");
    var now = GLib.DateTime.new_now_local();

    var desired = Format.format(FORMAT, now);

    var t = lbl.get_text();
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
    
    sA.dateMenu.actor.set_style("text-align: center;");

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
