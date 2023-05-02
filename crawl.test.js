const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://sub.domain.com/path";
  const actual = normalizeURL(input);
  const expected = "sub.domain.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip HTTP", () => {
  const input = "http://sub.domain.com/path";
  const actual = normalizeURL(input);
  const expected = "sub.domain.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://sub.domain.com/path/";
  const actual = normalizeURL(input);
  const expected = "sub.domain.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL CAPs", () => {
  const input = "https://sub.DOMAIN.com/path/";
  const actual = normalizeURL(input);
  const expected = "sub.domain.com/path";
  expect(actual).toEqual(expected);
});

