import { getFormattedDateTime, padLeadingZero } from "./dates";

describe("Date Helper", () => {
  describe("getFormattedDateTime", () => {
    it("returns mm/dd hh:mm:ss formatted time when passed a date", () => {
      // arrange
      // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
      const date = new Date(99, 0, 24, 11, 33, 30, 0);

      // assert
      expect(getFormattedDateTime(date)).toEqual("1/24 11:33:30");
    });

    it("pads single digit minute and second values with leading zeros", () => {
      // arrange
      // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
      const date = new Date(99, 0, 4, 11, 3, 2, 0);

      // assert
      expect(getFormattedDateTime(date)).toEqual("1/4 11:03:02");
    });
  });

  describe("padLeadingZero", () => {
    it("should return 01 if passed 1", function() {
      // arrange
      const expected = "01";

      // act
      const result = padLeadingZero(1);

      // assert
      expect(result).toEqual(expected);
    });

    it("should return 10 if passed 10", () => {
      // arrange
      const expected = "10";

      // act
      const result = padLeadingZero(10);

      // assert
      expect(result).toEqual(expected);
    });

    it("should throw error if passed a non-numeric value", () => {
      // arrange
      const expected = "Numbers only.";

      // act
      const func = () => padLeadingZero("a");

      // assert
      expect(func).toThrow(expected);
    });
  });
});
