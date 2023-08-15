import { By, until } from 'selenium-webdriver';
import { getDriver } from './src/driver';
import { getRemoteUrl } from './src/input';
import { clickGoogleItem, searchWithGoogle, visitWeb } from './src/actions';

async function main() {
  const remoteUrl = getRemoteUrl();
  const driver = getDriver(remoteUrl);

  try {
    await visitWeb(driver, 'http://www.google.com/');
    await searchWithGoogle(driver, 'Nike,Adiddas,Sephora');
    await clickGoogleItem(driver, 0);
  } catch(error: any) {
    console.log('ERROR', error);
  } finally {
    await driver.quit();
  }
}

Promise.all([
  main(),
]);
