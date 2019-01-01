const GLib = imports.gi.GLib;
const Format = imports.formatter;



describe("Not using format specifiers", function() {
  it("empty string results in empty string", function() {
    let input = "";

    let result = Format.format(input, null);

    expect(result).toBe(input);
  });

  it("non-empty string results in same non-empty string", function() {
    let input = "Lorem ipse";

    let result = Format.format(input, null);

    expect(result).toBe(input);
  });
});
