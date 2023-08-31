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
  } catch(error: any) {
    console.log('ERROR', error);
    process.exit(ExitCode.UnknownError);
  }
}

Promise.all([
  main(),
]);

process.exit(ExitCode.Success);