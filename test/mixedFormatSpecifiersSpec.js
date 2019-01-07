const GLib = imports.gi.GLib;
const Format = imports.formatter;



describe("Mixed format specifiers - both GLib and custom", function() {
  let now = GLib.DateTime.new_from_iso8601("2019-01-07T18:27:36+03:45", null);

  it("First GLib then custom works as expected", function() {
    let result = Format.format("%T - %;vf", now);

    expect(result).toBe("18:27:36 - ¹/₂");
  });

  it("First custom then GLib works as expected", function() {
    let result = Format.format("@%;@ / %R", now);

    expect(result).toBe("@654 / 18:27");
  });
});
