import { ThenableWebDriver, By, until } from 'selenium-webdriver';

const googleDomain = 'https://www.google.com/';

let appState: any = {}

export async function visitWeb(driver: ThenableWebDriver, url: string) {
  await driver.get(url);
  appState.url = url;
}

export async function searchWithGoogle(driver: ThenableWebDriver, keywords: string) {
  if (appState.url && appState.url.startsWith(googleDomain)) {
    const array = keywords.split(',');
    const keyword = array[Math.floor(Math.random() * array.length)];
    const elements = await driver.findElement(By.name('q'));
    await elements.sendKeys(keyword);
    await driver.wait(until.elementLocated(By.xpath("//ul")), 5 * 1000);
    await elements.submit();
  } else {
    throw 'Cannot search without Google Site';
  }
}

export async function clickGoogleItem(driver: ThenableWebDriver, index: number) {
  const elements2 = await driver.findElement(By.xpath("//div[@id='search']//div[@class='g']//a"));
  console.log(`find element search: ${elements2}`);
  await elements2.click();
  await driver.wait(until.elementLocated(By.xpath("//title")), 5 * 1000);
}