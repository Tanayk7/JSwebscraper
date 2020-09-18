const puppeteer = require("puppeteer");

function isSubStringOf(str1, str2) {
  if (str1.search(str2) !== -1) {
    return true;
  }
  return false;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const page_url = "https://www.indiatimes.com/news";
  const domain_name = "www.indiatimes.com";

  let num_images = 0;
  let num_links = 0;
  let exitLinks = [];

  await page.goto(page_url);

  const links = await page.evaluate(() => {
    return [...document.body.getElementsByTagName("a")].map((element) =>
      element.href.toString()
    );
  });

  const images = await page.evaluate(() => {
    return [...document.body.getElementsByTagName("img")].map(
      (element) => element.src
    );
  });

  for (let link of links) {
    if (!isSubStringOf(link, domain_name) && link !== "") {
      exitLinks.push(link);
    }
  }

  console.log("------------------------------------------------------------");
  console.log("Total number of images: ", images.length);
  console.log("Total number of links: ", links.length);
  console.log("Total number of exit links: ", exitLinks.length);
  console.log("------------------------------------------------------------");
  console.log("\n");

  console.log("------------------------------------------------------------");
  console.log("Links: ", links);
  console.log("------------------------------------------------------------");
  console.log("\n");

  console.log("------------------------------------------------------------");
  console.log("Images: ", images);
  console.log("------------------------------------------------------------");
  console.log("\n");

  console.log("------------------------------------------------------------");
  console.log("Exit Links", exitLinks);
  console.log("------------------------------------------------------------");
  console.log("\n");

  await browser.close();
})();
