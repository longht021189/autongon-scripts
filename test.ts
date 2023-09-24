import { By, until } from 'selenium-webdriver';
import { getDriver } from './src/driver';
import { getRemoteUrl } from './src/input';
import * as actions from './src/actions';
import { ExitCode } from './src/code';
import fs from 'fs';

async function main() {
  const remoteUrl = getRemoteUrl();
  const driver = getDriver(remoteUrl);

  try {
    await actions.visitWeb(driver, 1, 'google.com');
    await actions.searchWithGoogle(driver, 2, 'addias running shoes');

    const script = fs.readFileSync('./src/scrollToBottom.js');
    await (driver).executeScript(script.toString());

    const element = await driver.findElement(By.id('sfooter'));
    await driver.wait(until.elementIsVisible(element), 10000);

    await actions.wait(driver, 0, '2');

    const script2 = fs.readFileSync('./src/scrollToTop.js');
    await (driver).executeScript(script2.toString());

    await actions.wait(driver, 0, '2');

    await actions.clickGoogleItem(driver, 3, '2');

    await actions.wait(driver, 0, '2');

    
  } catch(error: any) {
    console.log('ERROR', error);
  }
}

main();