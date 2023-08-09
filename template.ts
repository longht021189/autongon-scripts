import { By, until } from 'selenium-webdriver';
import { getDriver } from './src/driver';
import { getRemoteUrl } from './src/input';
import { searchWithGoogle, visitWeb } from './src/actions';

async function main() {
  const remoteUrl = getRemoteUrl();
  const driver = getDriver(remoteUrl);

  try {
    await visitWeb(driver, 'http://www.google.com');
    await searchWithGoogle(driver, 'Nike,Adiddas,Sephora');
  } finally {
    await driver.quit();
  }
  
  /*let driver;
  let needQuit = false;
  try {
    console.log('start -----');
    driver = getDriver(remoteUrl);

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

  console.log('end2');*/
}

Promise.all([
  main(),
]);
