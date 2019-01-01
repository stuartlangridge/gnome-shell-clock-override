const GLib = imports.gi.GLib;
const Format = imports.formatter;



describe("Clock face", function() {
  let input = "%;cf";

  describe("correct results for full and half hour times", function() {

    // 00:00 to 00:59

    it("00:00 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("00:29 results in 🕛", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕛");
    });

    it("00:30 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("00:59 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T00:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    // 01:00 to 01:59

    it("01:00 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    it("01:29 results in 🕐", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕐");
    });

    it("01:30 results in 🕜", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕜");
    });

    it("01:59 results in 🕜", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T01:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕜");
    });

    // 02:00 to 02:59

    it("02:00 results in 🕑", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T02:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕑");
    });

    it("02:29 results in 🕑", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T02:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕑");
    });

    it("02:30 results in 🕝", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T02:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕝");
    });

    it("02:59 results in 🕝", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T02:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕝");
    });

    // 03:00 to 03:59

    it("03:00 results in 🕒", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T03:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕒");
    });

    it("03:29 results in 🕒", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T03:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕒");
    });

    it("03:30 results in 🕞", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T03:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕞");
    });

    it("03:59 results in 🕞", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T03:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕞");
    });

    // 04:00 to 04:59

    it("04:00 results in 🕓", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T04:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕓");
    });

    it("04:29 results in 🕓", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T04:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕓");
    });

    it("04:30 results in 🕟", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T04:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕟");
    });

    it("04:59 results in 🕟", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T04:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕟");
    });

    // 05:00 to 05:59

    it("05:00 results in 🕔", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T05:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕔");
    });

    it("05:29 results in 🕔", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T05:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕔");
    });

    it("05:30 results in 🕠", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T05:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕠");
    });

    it("05:59 results in 🕠", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T05:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕠");
    });

    // 06:00 to 06:59

    it("06:00 results in 🕕", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T06:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕕");
    });

    it("06:29 results in 🕕", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T06:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕕");
    });

    it("06:30 results in 🕡", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T06:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕡");
    });

    it("06:59 results in 🕡", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T06:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕡");
    });

    // 07:00 to 07:59

    it("07:00 results in 🕖", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T07:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕖");
    });

    it("07:29 results in 🕖", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T07:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕖");
    });

    it("07:30 results in 🕢", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T07:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕢");
    });

    it("07:59 results in 🕢", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T07:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕢");
    });

    // 08:00 to 08:59

    it("08:00 results in 🕗", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T08:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕗");
    });

    it("08:29 results in 🕗", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T08:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕗");
    });

    it("08:30 results in 🕣", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T08:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕣");
    });

    it("08:59 results in 🕣", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T08:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕣");
    });

    // 09:00 to 09:59

    it("09:00 results in 🕘", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T09:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕘");
    });

    it("09:29 results in 🕘", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T09:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕘");
    });

    it("09:30 results in 🕤", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T09:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕤");
    });

    it("09:59 results in 🕤", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T09:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕤");
    });

    // 10:00 to 10:59

    it("10:00 results in 🕙", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕙");
    });

    it("10:29 results in 🕙", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕙");
    });

    it("10:30 results in 🕥", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕥");
    });

    it("10:59 results in 🕥", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕥");
    });

    // 11:00 to 11:59

    it("11:00 results in 🕚", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:00:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕚");
    });

    it("11:29 results in 🕚", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:29:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕚");
    });

    it("11:30 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:30:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });

    it("11:59 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T11:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });
  });

  describe("Correct 24 hour to 12 hour wrap", function() {

    it("12:34 results in 🕧", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T12:34:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕧");
    });

    it("18:27 results in 🕕", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T18:27:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕕");
    });

    it("23:59 results in 🕦", function() {
      let now = GLib.DateTime.new_from_iso8601("2019-01-01T23:59:00Z", null);

      let result = Format.format(input, now);

      expect(result).toBe("🕦");
    });
  });
});
