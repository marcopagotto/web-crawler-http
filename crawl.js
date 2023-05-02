const { normalize } = require("path");

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
};
