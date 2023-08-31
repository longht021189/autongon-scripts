import { By, until } from 'selenium-webdriver';
import { getDriver } from '../src/driver';
import { getRemoteUrl } from '../src/input';
import * as actions from '../src/actions';
import { ExitCode } from '../src/code';

async function main() {
  const remoteUrl = getRemoteUrl();
  const driver = getDriver(remoteUrl);

  try {
    // TODO

    await actions.exitDriver(driver, ExitCode.Success);
  } catch(error: any) {
    console.log('ERROR', error);
    await actions.exitDriver(driver, ExitCode.UnknownError);
  }
}

main();