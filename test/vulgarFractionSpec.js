const GLib = imports.gi.GLib;
const Format = imports.formatter;



describe("Vulgar fraction", function() {
  let input = "%;vf";

  it("Zero minutes result in 0/0", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:00:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("⁰/₀");
  });

  it("Seven minutes result in 0/0", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:07:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("⁰/₀");
  });

  it("Eight minutes result in 1/4", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:08:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₄");
  });

  it("Fifteen minutes result in 1/4", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:15:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₄");
  });

  it("Twenty-two minutes result in 1/4", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:22:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₄");
  });

  it("Twenty-three minutes result in 1/2", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:23:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₂");
  });

  it("Thirty minutes result in 1/2", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:30:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₂");
  });

  it("Thirty-seven minutes result in 1/2", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:37:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₂");
  });

  it("Thirty-eight minutes result in 3/4", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:38:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("³/₄");
  });

  it("Fourty-five minutes result in 3/4", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:45:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("³/₄");
  });

  it("Fifty-two minutes result in 3/4", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:52:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("³/₄");
  });

  it("Fifty-three minutes result in 1/1", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:53:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₁");
  });

  it("Fifty-nine minutes result in 1/1", function() {
    let now = GLib.DateTime.new_from_iso8601("2019-01-01T10:59:00Z", null);

    let result = Format.format(input, now);

    expect(result).toBe("¹/₁");
  });
});
