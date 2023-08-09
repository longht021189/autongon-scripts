import { ThenableWebDriver, Builder, Capabilities } from 'selenium-webdriver';

function getChromeDriver() {
  require("chromedriver");

  return new Builder().forBrowser('chrome').build();
}

function getRemoteDriver(remoteUrl: string) {
  let capabilities = Capabilities.chrome();
  
  return new Builder()
    .usingServer(remoteUrl)   
    .withCapabilities(capabilities)
    .build();
}

export function getDriver(remoteUrl: string | undefined): ThenableWebDriver {
  if (remoteUrl) {
    return getRemoteDriver(remoteUrl);
  } else {
    return getChromeDriver();
  }
}