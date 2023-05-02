//const { normalize } = require("path");
const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];

  const dom = new JSDOM(htmlBody);

  linkElements = dom.window.document.querySelectorAll("a");

  // checks if elements of 'linkElements' are valid and - if they are - pushes them into 'urls'
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative url
      try {
        const urlObj = new URL(baseURL.concat(linkElement.href));
        urls.push(urlObj.href);
      } catch (err) {
        console.log("Error with relative URL: " + err.message);
      }
    } else {
      // absolute url
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("Error with absolute URL: " + err.message);
      }
    }
  }
  return urls;
}

function normalizeURL(url) {
  // removes trailing slash and converts to lowercase
  const urlArr = url.split("");

  const urlObj = new URL(
    urlArr[urlArr.length - 1] === "/"
      ? urlArr.slice(0, -1).join("")
      : urlArr.join("")
  );

  // strips protocol
  return urlObj.host.concat(urlObj.pathname);
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
