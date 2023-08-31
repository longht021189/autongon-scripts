import { ThenableWebDriver, By, until } from 'selenium-webdriver';
import { ExitCode } from './code';

export async function visitWeb(driver: ThenableWebDriver, actionIndex: number, url: string) {
  try {
    await driver.get(url);
  } catch (error) {
    console.log('[visitWeb] ERROR', error);
    process.exit(ExitCode.VisitWebError + actionIndex * 10000);
  }
}

export async function searchWithGoogle(driver: ThenableWebDriver, actionIndex: number, keywords: string) {
  const array = keywords.split(',')
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);

  console.log(`[searchWithGoogle] keywords count: ${array.length}`);

  if (array.length === 0) {
    process.exit(ExitCode.SearchKeywordsEmpty + actionIndex * 10000);
  }
  if (array.length === 1 && array[0] === '') {
    process.exit(ExitCode.SearchKeywordsEmpty + actionIndex * 10000);
  }

  const keyword = array[Math.floor(Math.random() * array.length)];
  console.log(`[searchWithGoogle] keyword: ${keyword}`);

  try {
    const element = await driver.findElement(By.name('q'));
    console.log(`[searchWithGoogle] q elements = null? ${element == null}`);
    await element.sendKeys(keyword);
    await driver.wait(until.elementLocated(By.xpath("//ul")), 5 * 1000);
    await element.submit();
  } catch (error) {
    console.log('[searchWithGoogle] ERROR', error);
    process.exit(ExitCode.AccessSearchInputError + actionIndex * 10000);
  }
}

export async function clickGoogleItem(driver: ThenableWebDriver, actionIndex: number, index: string) {
  try {
    const element = await driver.findElement(By.xpath("//div[@id='search']//div[@class='g']//a"));
    console.log(`[clickGoogleItem] find element search = null? ${element == null}`);
    await element.click();
    await driver.wait(until.elementLocated(By.xpath("//title")), 5 * 1000);
  } catch (error) {
    console.log('[clickGoogleItem] ERROR', error);
    process.exit(ExitCode.GetSearchResultError + actionIndex * 10000);
  }
}