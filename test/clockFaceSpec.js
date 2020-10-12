const GLib = imports.gi.GLib;
const Format = imports.formatter;



describe("Clock face", function() {
  let input = "%;cf";

  describe("correct results for times around full, quarter past, half past and quarter to", function() {

    // 00:00 to 00:59

    it("00:00 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("00:14 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:14:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("00:15 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:15:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("00:30 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("00:44 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:44:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("00:45 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:45:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    it("00:59 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    // 01:00 to 01:59

    it("01:00 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    it("01:14 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:14:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    it("01:15 results in 🕜", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:15:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕜");
    });

    it("01:30 results in 🕜", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕜");
    });

    it("01:44 results in 🕜", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:44:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕜");
    });

    it("01:45 results in 🕑", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:45:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕑");
    });

    it("01:59 results in 🕑", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕑");
    });

    // 02:00 to 02:59 (only reduced checks)

    it("02:00 results in 🕑", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T02:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕑");
    });

    it("02:30 results in 🕝", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T02:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕝");
    });

    // 03:00 to 03:59 (only reduced checks)

    it("03:00 results in 🕒", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T03:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕒");
    });

    it("03:30 results in 🕞", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T03:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕞");
    });

    // 04:00 to 04:59 (only reduced checks)

    it("04:00 results in 🕓", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T04:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕓");
    });

    it("04:30 results in 🕟", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T04:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕟");
    });

    // 05:00 to 05:59 (only reduced checks)

    it("05:00 results in 🕔", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T05:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕔");
    });

    it("05:30 results in 🕠", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T05:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕠");
    });

    // 06:00 to 06:59 (only reduced checks)

    it("06:00 results in 🕕", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T06:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕕");
    });

    it("06:30 results in 🕡", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T06:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕡");
    });

    // 07:00 to 07:59 (only reduced checks)

    it("07:00 results in 🕖", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T07:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕖");
    });

    it("07:30 results in 🕢", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T07:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕢");
    });

    // 08:00 to 08:59 (only reduced checks)

    it("08:00 results in 🕗", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T08:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕗");
    });

    it("08:30 results in 🕣", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T08:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕣");
    });

    // 09:00 to 09:59 (only reduced checks)

    it("09:00 results in 🕘", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T09:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕘");
    });

    it("09:30 results in 🕤", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T09:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕤");
    });

    // 10:00 to 10:59 (only reduced checks)

    it("10:00 results in 🕙", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕙");
    });

    it("10:30 results in 🕥", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕥");
    });

    // 11:00 to 11:59

    it("11:00 results in 🕚", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕚");
    });

    it("11:14 results in 🕚", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:14:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕚");
    });

    it("11:15 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:15:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });

    it("11:30 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });

    it("11:44 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:44:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });

    it("11:45 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:45:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("11:59 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });
  });

  describe("Correct 24 hour to 12 hour wrap", function() {

    // 12:00 to 12:59

    it("12:00 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("12:14 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:14:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("12:15 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:15:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("12:30 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("12:44 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:44:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("12:45 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:45:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    it("12:59 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    // Miscellaneous

    it("13:00 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T13:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    it("15:14 results in 🕒", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T15:14:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕒");
    });

    it("17:15 results in 🕠", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T17:15:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕠");
    });

    it("19:30 results in 🕢", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T19:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕢");
    });

    it("21:44 results in 🕤", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T21:44:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕤");
    });

    it("22:45 results in 🕚", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T22:45:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕚");
    });

    it("23:59 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    // 23:00 to 23:59

    it("23:00 results in 🕚", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕚");
    });

    it("23:14 results in 🕚", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:14:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕚");
    });

    it("23:15 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:15:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });

    it("23:30 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });

    it("23:44 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:44:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });

    it("23:45 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:45:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("23:59 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });
  });
});
