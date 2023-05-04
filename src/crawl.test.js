const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
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

test("getURLsFromHTML absolute", () => {
  const inputHTML = `
  <html>
    <body>
      <a href = "https://sub.domain.com/">
        Visit Domain Blog!
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://sub.domain.com'
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://sub.domain.com/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTML = `
  <html>
    <body>
      <a href = "/path/">
        Visit Domain Blog Path!
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://sub.domain.com'
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://sub.domain.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTML = `
  <html>
    <body>
      <a href = "https://sub.domain.com/path1/">
        Visit Domain Blog Path1!
      </a>
      <a href = "/path2/">
        Visit Domain Blog Path2!
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://sub.domain.com'
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://sub.domain.com/path1/", "https://sub.domain.com/path2/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTML = `
  <html>
    <body>
      <a href = "invalid">
        Invalid URL!
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://sub.domain.com'
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});

