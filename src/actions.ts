import { ThenableWebDriver, By, until } from 'selenium-webdriver';
import { ExitCode } from './code';

export async function visitWeb(driver: ThenableWebDriver, actionIndex: number, url: string) {
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      await driver.get(url);
    } else {
      await driver.get('https://' + url);
    }
  } catch (error) {
    console.log('[visitWeb] ERROR', error);
    await exitDriver(driver, ExitCode.VisitWebError + actionIndex * 10000);
  }
}

export async function searchWithGoogle(driver: ThenableWebDriver, actionIndex: number, keywords: string) {
  const array = keywords.split(',')
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);

  console.log(`[searchWithGoogle] keywords count: ${array.length}`);

  if (array.length === 0) {
    await exitDriver(driver, ExitCode.SearchKeywordsEmpty + actionIndex * 10000);
  }
  if (array.length === 1 && array[0] === '') {
    await exitDriver(driver, ExitCode.SearchKeywordsEmpty + actionIndex * 10000);
  }

  const keyword = array[Math.floor(Math.random() * array.length)];
  console.log(`[searchWithGoogle] keyword: ${keyword}`);

  try {
    await driver.executeScript('window.focus();');

    for (let i = 0; i < 5; ++i) {
      const element = await driver.findElement(By.name('q'));
      await element.click();
      await element.sendKeys(keyword);

      try {
        await driver.wait(until.elementLocated(By.xpath("//ul")), 1000);
      } catch (ignore) {
        await wait(driver, actionIndex, '2');
      }
      
      const text = await element.getAttribute('value');
      console.log(`[searchWithGoogle] text: ${text}`);
      if (text == keyword) {
        await driver.wait(until.elementLocated(By.xpath("//ul")), 20 * 1000);
        await element.submit();
        await driver.wait(until.elementLocated(By.xpath(`//div[@id='search']/div/div/div`)), 20 * 1000);
        return;
      }
    }

    await exitDriver(driver, ExitCode.FocusSearchInputError + actionIndex * 10000);
  } catch (error) {
    console.log('[searchWithGoogle] ERROR', error);
    await exitDriver(driver, ExitCode.AccessSearchInputError + actionIndex * 10000);
  }
}

export async function clickGoogleItem(driver: ThenableWebDriver, actionIndex: number, index: string) {
  try {
    const xpath = By.xpath(`//div[@id='search']/div/div/div`);
    const elements = await driver.findElements(xpath);
    console.log(`[clickGoogleItem] find elements.length = ${elements.length}`);
    const i = parseInt(index, 10);
    const link = elements[i].findElement(By.xpath('//span[@jscontroller]/a[@href and @jsaction and @jscontroller]'));
    const href = await link.getAttribute('href');
    await link.click();
    await driver.wait(until.urlIs(href), 20 * 1000);
  } catch (error) {
    console.log('[clickGoogleItem] ERROR', error);
    await exitDriver(driver, ExitCode.GetSearchResultError + actionIndex * 10000);
  }
}

export async function exitDriver(driver: ThenableWebDriver, code: number) {
  try {
    await driver.quit();
    process.exit(code);
  } catch (error) {
    console.log('[exitDriver] ERROR', error);
    process.exit(ExitCode.ExitError);
  }
}

export async function wait(driver: ThenableWebDriver, actionIndex: number, seconds: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * parseInt(seconds, 10));
  });
}