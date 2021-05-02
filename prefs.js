const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Config = imports.misc.config;
const Gio = imports.gi.Gio;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const Gettext = imports.gettext.domain('clock-override');
const _ = Gettext.gettext;

function init() {
    Convenience.initTranslations("clock-override");
}


const ClockOverrideSettings = new GObject.Class({
    Name: 'ClockOverridePrefs',
    Extends: Gtk.Grid,

    update_textbox_value: function(value) {
        let sval = this._settings.get_string('override-string');
        if (sval != value) {
            this._settings.set_string('override-string', value);

            // If requested time has seconds in it, so the clock needs to be updated every second, else can be updated every minute
            var set_clock_seconds = (value.indexOf("%S") !== -1) ||
                (value.indexOf("%-S") !== -1) ||
                (value.indexOf("%r") !== -1) ||
                (value.indexOf("%T") !== -1) ||
                (value.indexOf("%;@") !== -1);
            Gio.Settings.new("org.gnome.desktop.interface").set_boolean("clock-show-seconds", set_clock_seconds);
        }
    },

    _init: function(params) {

        this.parent(params);
        this.margin = 24;
        this.column_spacing = 30;
        this.row_spacing = 10;
        this._settings = Convenience.getSettings();

        let label = null;
        let widget = null;
        let value = null;

        label = new Gtk.Label({
            label: _("Text to display instead of the clock"),
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
            label: _("Some examples:"),
            use_markup: true,
            hexpand: true,
            halign: Gtk.Align.START
        });
        this.attach(label2, 0, 1, 3, 1);

        var css = new Gtk.CssProvider();
        css.load_from_data("GtkLabel { text-decoration: underline rgba(128, 128, 128, 0.3); }");

        var grid = this;
        var rownumber = 2;

        [
            [_("The time in 24-hour notation (14:50)"), "%H:%M"],
            [_("The time in 12-hour notation with seconds (2:50:10 pm)"), "%r"],
            [_("A bell"), "🔔"],
            [_("An emoji clock face"), "%;cf"],
            [_("Slow time (quarters as fractions)"), "%H %;vf"],
            [_("ISO date and time (2014-01-30T14:50:10)"), "%FT%T"],
            [_("Local and Internet time"), "%H:%M @%;@."],
            [_("Something sillier"), _("It is %M minutes past hour %H")],
            [_("Sunday | 2021-05-02 | 23:02"), _("%A | %F | %R")]
        ].forEach(function(eg) {
            let l = new Gtk.Label({
                label: '<b>' + eg[0] + '</b>:',
                use_markup: true,
                hexpand: true,
                halign: Gtk.Align.START
            });
            /* It would be nicer to use just a Label with a hyperlink in it here, for accessibility
               reasons, but god alone knows how to remove the underline on a label, thanks to the
               lack of Gtk CSS examples. And a Button would be ugly. So an EventBox it is for now. */
            /* SL 2021-05-02: GTK4 no longer "supports" EventBoxes and GtkLabel does not respond to button-press-event
               so I used links (again) which are not underlined (at least on my machine) */
            let r = new Gtk.Label({
                label: '<a href="#"><tt>' + eg[1] + '</tt></a>',
                use_markup: true,
                hexpand: true,
                halign: Gtk.Align.START
            });
            r.connect("activate-link", Lang.bind(grid, function(w) {
                this.update_textbox_value(eg[1]);
                grid._settings.set_string('override-string', eg[1]);
                return true;
            }));
            r.get_style_context().add_provider(css, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION)

            grid.attach(l, 0, rownumber, 1, 1);
            grid.attach(r, 1, rownumber, 2, 1);
            rownumber += 1;
        });

        let label3 = new Gtk.Label({
            label: '<a href="https://developer.gnome.org/glib/stable/glib-GDateTime.html#g-date-time-format">' + _("What do all these %x codes mean?") + '</a>',
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

     return widget;
}
