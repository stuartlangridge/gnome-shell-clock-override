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

const EXAMPLES = [
    ["The time as HH.MM", "%H.%M"],
    ["The time in 24-hour notation (7:30:00 am BST)", "%r"],
    ["A bell", "🔔"],
    ["A clock", "%f"],
    ["ISO date and time (2014-01-30T04:27:00)", "%FT%T"],
    ["Something sillier", "It is %M minutes past hour %H"]
];


const ClockOverrideSettings = new GObject.Class({
    Name: 'ClockOverridePrefs',
    Extends: Gtk.Grid,

    update_textbox_value: function(value) {
        let sval = this._settings.get_string('override-string');
        if (sval != value) {
            this._settings.set_string('override-string', value);

            var set_clock_seconds;
            if ((value.indexOf("%S") !== -1) || (value.indexOf("%-S") !== -1) || (value.indexOf("%r") !== -1) || (value.indexOf("%T") !== -1)) {
                // requested time has seconds in it, so the clock needs to be updated every second
                set_clock_seconds = true;
            } else {
                // requested time does not have seconds in it, so we can update the clock every minute
                set_clock_seconds = false;
            }
            Gio.Settings.new("org.gnome.desktop.interface").set_boolean("clock-show-seconds", set_clock_seconds);
        }
    },

    _init: function(params) {

        this.parent(params);
        this.margin = 24;
        this.column_spacing = 30;
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
        widget.connect('changed', Lang.bind(this, function(w) {
            this.update_textbox_value(w.get_text());
        }));
        this.attach(label, 0, 0, 2, 1);
        this.attach(widget, 2, 0, 1, 1);

        let label2 = new Gtk.Label({
            label: 'Some examples:',
            use_markup: true,
            hexpand: true,
            halign: Gtk.Align.START
        });
        this.attach(label2, 0, 1, 3, 1);

        var css = new Gtk.CssProvider();
        css.load_from_data("GtkLabel { text-decoration: underline rgba(128, 128, 128, 0.3); }");

        var grid = this;
        var rownumber = 2;
        EXAMPLES.forEach(function(eg) {
            let l = new Gtk.Label({
                label: '<b>' + eg[0] + '</b>:',
                use_markup: true,
                hexpand: true,
                halign: Gtk.Align.START
            });
            /* It would be nicer to use just a Label with a hyperlink in it here, for accessibility
               reasons, but god alone knows how to remove the underline on a label, thanks to the
               lack of Gtk CSS examples. And a Button would be ugly. So an EventBox it is for now. */
            let eb = new Gtk.EventBox({
                hexpand: true,
                halign: Gtk.Align.START
            })
            let r = new Gtk.Label({
                label: '<tt>' + eg[1] + '</tt>',
                use_markup: true,
                hexpand: true,
                halign: Gtk.Align.START
            });
            eb.add(r);
            eb.connect("button-press-event", Lang.bind(grid, function(w) {
                this.update_textbox_value(eg[1]);
                grid._settings.set_string('override-string', eg[1]);
                return true;
            }));
            r.get_style_context().add_provider(css, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION)

            grid.attach(l, 0, rownumber, 1, 1);
            grid.attach(eb, 1, rownumber, 2, 1);
            rownumber += 1;
        })

        let label3 = new Gtk.Label({
            label: '<a href="http://strftime.org/">What do all these % codes mean?</a>',
            use_markup: true,
            hexpand: true,
            halign: Gtk.Align.END
        });
        this.attach(label3, 0, rownumber, 3, 1);


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
