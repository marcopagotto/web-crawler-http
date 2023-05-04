//const { normalize } = require("path");
const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  // filters URLs that have the provided baseURL
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  // checks if the page has already been crawled
  // pages contains each URL and how many times it has been crawled
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++; // increments the number of times the page has been crawled/viewed
    return pages;
  }

  // initializes the URL
  pages[normalizedCurrentURL] = 1;

  console.log(`Currently crawling ${currentURL} ...`);

  try {
    const resp = await fetch(currentURL);

    // checks for valid status code
    if (resp.status >= 399) {
      console.log(
        `Error: ${currentURL} not found - status code: ${resp.status}`
      );
      return pages;
    }

    // checks for valid "text/html" response
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Error: invalid contentType: ${contentType} - page ${currentURL}`
      );
      return pages;
    }

    // recursively calls crawl page with an old "pages" variable and a new "htmlURL" that stores
    // into an updated "pages" variable, when done, it escapes the loop and returns pages
    const htmlBody = await resp.text();
    const htmlURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const htmlURL of htmlURLs) {
      pages = await crawlPage(baseURL, htmlURL, pages);
    }
  } catch (err) {
    console.log(`Error with fetch: ${err.message}, current URL: ${currentURL}`);
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];

  const dom = new JSDOM(htmlBody);

  linkElements = dom.window.document.querySelectorAll("a");

  // checks if elements of 'linkElements' are valid and - if they are - pushes them into 'urls'
  for (const linkElement of linkElements) {
    if (linkElement.href.startsWith("/")) {
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
  const urlObj = new URL(url);
  // strips protocol
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  // removes trailing slash and converts to lowercase
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
