import { ThenableWebDriver, By, until } from 'selenium-webdriver';

export async function visitWeb(driver: ThenableWebDriver, url: string) {
  await driver.get(url);
}

export async function searchWithGoogle(driver: ThenableWebDriver, keywords: string) {
  const array = keywords.split(',');
  console.log(`[searchWithGoogle] keywords count: ${array.length}`);
  const keyword = array[Math.floor(Math.random() * array.length)];
  console.log(`[searchWithGoogle] keyword: ${keyword}`);
  const elements = await driver.findElement(By.name('q'));
  await elements.sendKeys(keyword);
  await driver.wait(until.elementLocated(By.xpath("//ul")), 5 * 1000);
  await elements.submit();
}

export async function clickGoogleItem(driver: ThenableWebDriver, index: number) {
  const elements2 = await driver.findElement(By.xpath("//div[@id='search']//div[@class='g']//a"));
  console.log(`find element search: ${elements2}`);
  await elements2.click();
  await driver.wait(until.elementLocated(By.xpath("//title")), 5 * 1000);
}