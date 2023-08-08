const { Builder, Capabilities, By, until } = require('selenium-webdriver');

function getRemoteUrl() {
  if (process.argv.length > 2) {
    return process.argv[2]
  } else {
    return undefined;
  }
}

const remoteUrl = getRemoteUrl();
console.log('remoteUrl', remoteUrl);

async function getChromeDriver() {
  require("chromedriver");

  return await new Builder().forBrowser('chrome').build();
}

async function getRemoteDriver(url) {
  let capabilities = Capabilities.chrome();
  return await new Builder()
    .usingServer(url)   
    .withCapabilities(capabilities)
    .build();
}

async function helloSelenium() {
  let driver;
  let needQuit = false;
  try {
    console.log('start -----');
    if (remoteUrl) {
      console.log('start remoteUrl');
      driver = await getRemoteDriver(remoteUrl);
    } else {
      console.log('start chrome');
      driver = await getChromeDriver();
    }

    console.log('start get google page');
    needQuit = true;
    await driver.get('http://www.google.com');
    console.log('get sucess');
    const elements = await driver.findElement(By.name('q'));
    console.log(`find element q: ${elements}`);
    await elements.sendKeys('Nike');
    console.log('send Nike sucess');
    await driver.wait(until.elementLocated(By.xpath("//ul")), 5 * 1000);
    await elements.submit();
    const elements2 = await driver.findElement(By.xpath("//div[@id='search']//div[@class='g']//a"));
    console.log(`find element search: ${elements2}`);
    await elements2.click();
    await driver.wait(until.elementLocated(By.xpath("//title")), 5 * 1000);
    console.log('end4');
  } catch (error) {
    console.log('error', error);
  } finally {
    if (needQuit) {
      await driver.quit();
    }
    console.log('end3');
  }

  console.log('end2');
}

const promises = [helloSelenium()];

Promise.all(promises);
console.log('end1');