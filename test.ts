import { By, until } from 'selenium-webdriver';
import { getDriver } from './src/driver';
import { getRemoteUrl } from './src/input';
import * as actions from './src/actions';
import { ExitCode } from './src/code';

async function main() {
  const remoteUrl = getRemoteUrl();
  const driver = getDriver(remoteUrl);

  try {
    await actions.visitWeb(driver, 1, 'google.com');
    await actions.searchWithGoogle(driver, 2, 'macys shoes tommy');

    const footer = await driver.findElement(By.id("sfooter"));
    const deltaY = (await footer.getRect()).y;

    await driver.actions()
        .scroll(0, 0, 0, deltaY)
        .perform();

    // await actions.clickGoogleItem(driver, 3, '2');
  } catch(error: any) {
    console.log('ERROR', error);
  }
}

main();