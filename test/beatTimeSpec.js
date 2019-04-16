const GLib = imports.gi.GLib;
const Format = imports.formatter;



describe("Beat time", function() {
  let input = "%;@";

  describe("Local timezone is same as BMT (UTC+01)", function() {
    it("Start of day is 000", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T00:00:00+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("000");
    });

    it("00:01:26 is still 000", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T00:01:26+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("000");
    });

    it("00:01:27 is already 001", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T00:01:27+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("001");
    });

    it("06:00:00 is 250", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T06:00:00+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("250");
    });

    it("12:00:00 is 500", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T12:00:00+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("500");
    });

    it("18:00:00 is 750", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T18:00:00+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("750");
    });

    it("18:38:52 is 776", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T18:38:52+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("776");
    });

    it("18:38:53 is 777", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T18:38:53+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("777");
    });

    it("23:59:59 is 999", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T23:59:59+01", null);

      let result = Format.format(input, now);

      expect(result).toBe("999");
    });
  });

  describe("Local timezone is east of BMT (> UTC+01)", function() {
    it("01:00:00 in Athens, Greece is 000", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T01:00:00+02", null);

      let result = Format.format(input, now);

      expect(result).toBe("000");
    });

    it("02:01:26 in Nairobi, Kenia is still 000", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T02:01:26+03", null);

      let result = Format.format(input, now);

      expect(result).toBe("000");
    });

    it("03:46:27 in Kathmandu, Nepal is already 001", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T03:46:27+04:45", null);

      let result = Format.format(input, now);

      expect(result).toBe("001");
    });

    it("11:00:00 in Bishkek, Kirgistan is 250", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T11:00:00+06", null);

      let result = Format.format(input, now);

      expect(result).toBe("250");
    });

    it("18:00:00 in Kransoyarsk, Russia is 500", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T18:00:00+07", null);

      let result = Format.format(input, now);

      expect(result).toBe("500");
    });

    it("18:00:00 in Kuala Lumpur, Malaysia is 750", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-15T01:00:00+08", null);

      let result = Format.format(input, now);

      expect(result).toBe("750");
    });

    it("01:38:52 in Beijing, China is 776", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-15T01:38:52+08", null);

      let result = Format.format(input, now);

      expect(result).toBe("776");
    });

    it("04:38:53 DST in Sydney, AU is 777", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-15T04:38:53+11", null);

      let result = Format.format(input, now);

      expect(result).toBe("777");
    });

    it("11:59:59 DST in Auckland, NZ is 999", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-15T11:59:59+13", null);

      let result = Format.format(input, now);

      expect(result).toBe("999");
    });
  });

  describe("Local timezone is behind of BMT (< UTC+01)", function() {
    it("23:00:00 in London, England is 000", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-13T23:00:00+00", null);

      let result = Format.format(input, now);

      expect(result).toBe("000");
    });

    it("22:01:26 in the Azores, Portugal is still 000", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T22:01:26-01", null);

      let result = Format.format(input, now);

      expect(result).toBe("000");
    });

    it("21:01:27 in São Paulo, Brazil is already 001", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-13T21:01:27-02", null);

      let result = Format.format(input, now);

      expect(result).toBe("001");
    });

    it("01:30:00 in Newfoundland, Canada is 250", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T01:30:00-03:30", null);

      let result = Format.format(input, now);

      expect(result).toBe("250");
    });

    it("07:00:00 in La Paz, Bolivia is 500", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T07:00:00-04", null);

      let result = Format.format(input, now);

      expect(result).toBe("500");
    });

    it("12:00:00 in Lima, Peru is 750", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T12:00:00-05", null);

      let result = Format.format(input, now);

      expect(result).toBe("750");
    });

    it("11:38:52 in Ciudad de Guatemala, Guatemala is 776", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T11:38:52-06", null);

      let result = Format.format(input, now);

      expect(result).toBe("776");
    });

    it("10:38:53 in Mazatlán, Mexico is 777", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T10:38:53-07", null);

      let result = Format.format(input, now);

      expect(result).toBe("777");
    });

    it("14:59:59 in San Diego, USA is 999", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-14T14:59:59-08", null);

      let result = Format.format(input, now);

      expect(result).toBe("999");
    });
  });
});
