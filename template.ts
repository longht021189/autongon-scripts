import { By, until } from 'selenium-webdriver';
import { getDriver } from '../src/driver';
import { getRemoteUrl } from '../src/input';
import * as actions from '../src/actions';

async function main() {
  const remoteUrl = getRemoteUrl();
  const driver = getDriver(remoteUrl);

  try {
    // TODO
  } catch(error: any) {
    console.log('ERROR', error);
  } finally {
    await driver.quit();
  }
}

Promise.all([
  main(),
]);
