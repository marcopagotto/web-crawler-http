const { sortPages } = require("./report");
const { test, expect } = require("@jest/globals");

test("sortPage 2 pages", () => {
  const input = {
    "https://sub.domain.com/path": 1,
    "https://sub.domain.com": 8,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://sub.domain.com", 8],
    ["https://sub.domain.com/path", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPage 5 pages", () => {
  const input = {
    "https://sub.domain.com": 8,
    "https://sub.domain.com/path": 4,
    "https://sub.domain.com/path1": 12,
    "https://sub.domain.com/path2": 27,
    "https://sub.domain.com/path3": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://sub.domain.com/path2", 27],
    ["https://sub.domain.com/path1", 12],
    ["https://sub.domain.com/path3", 9],
    ["https://sub.domain.com", 8],
    ["https://sub.domain.com/path", 4],
  ];
  expect(actual).toEqual(expected);
});

test("sortPage 2 pages equal crawls", () => {
  const input = {
    "https://sub.domain.com/path": 1,
    "https://sub.domain.com": 1,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://sub.domain.com/path", 1],
    ["https://sub.domain.com", 1],
  ];
  expect(actual).toEqual(expected);
});
