const GLib = imports.gi.GLib;
const Format = imports.formatter;



describe("GLib format specifier", function() {
  let now = GLib.DateTime.new_from_iso8601("2019-01-07T18:27:36+03:45", null);

  it("Example 24-hour notation works as expected", function() {
    let result = Format.format("%H:%M", now);

    expect(result).toBe("18:27");
  });

  it("Some arbitrary format specifier work as expected", function() {
    let result = Format.format("%:::z %% %V %T %s", now);

    expect(result).toBe("+03:45 % 02 18:27:36 1546872156");
  });
});
