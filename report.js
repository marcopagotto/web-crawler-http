function printReport(pages) {
  console.log("==============================================================================================================================");
  console.log("                                                            REPORT                                                            ");
  console.log("==============================================================================================================================");
  const sortedPages = sortPages(pages);
  for(const sortedPage of sortedPages){
    const url = sortedPage[0];
    const links = sortedPage[1];
    console.log(`Found ${links} links to page URL: ${url}`);
  }
  console.log("==============================================================================================================================");
  console.log("                                                        REPORT END                                                            ");
  console.log("==============================================================================================================================");
}
function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  return pagesArr.sort((a, b) => {
    aCrawls = a[1];
    bCrawls = b[1];
    return bCrawls - aCrawls;
  });
}

module.exports = {
  sortPages,
  printReport
};
