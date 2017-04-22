const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Config = imports.misc.config;
const Gio = imports.gi.Gio;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
}

const ClockOverrideSettings = new GObject.Class({
    Name: 'ClockOverridePrefs',
    Extends: Gtk.Grid,

    _init: function(params) {

        this.parent(params);
        this.margin = 24;
        this.spacing = 30;
        this.row_spacing = 10;
        this._settings = Convenience.getSettings();

        let label = null
        let widget = null;
        let value = null;

        label = new Gtk.Label({
            label: 'Text to display instead of the clock',
            hexpand: true,
            halign: Gtk.Align.START
        });
        widget = new Gtk.Entry({halign: Gtk.Align.END, text: this._settings.get_string('override-string')});
        widget.set_sensitive(true);
        widget.connect('changed', Lang.bind(this, function(w){
             value = w.get_text();
             let sval = this._settings.get_string('override-string');
             if (sval != value) {
                 this._settings.set_string('override-string', value);
             }
        }));
        let label2 = new Gtk.Label({
            label: 'Some examples:\n<b>ISO time</b>: <tt><a href="%FT%TZ">%FT%TZ</a></tt>\n<b>Nice picture of a clock</b>: <tt><a href="🕐">🕐</a></tt>',
            use_markup: true,
            hexpand: true,
            halign: Gtk.Align.START
        });
        label2.connect("activate-link", Lang.bind(this, function(w, uri) {
            this._settings.set_string('override-string', uri);
            return true;
        }));

        this.attach(label, 0, 1, 1, 1);
        this.attach(widget, 1, 1, 1, 1);
        this.attach(label2, 0, 2, 2, 1);

        this._settings.connect('changed::override-string', Lang.bind(this, function() {
            let sval = this._settings.get_string('override-string');
            if (widget.get_text() != sval) widget.set_text(sval);
        }));

    },

});

function buildPrefsWidget() {
     let widget = new ClockOverrideSettings();
     widget.show_all();

     return widget;
}
