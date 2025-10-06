export function capabilities(deviceConfig = {}) {
  const caps = [{
    maxInstances: 1,
    'appium:platformName': process.env.PLATFORM_NAME || 'Android',
    'appium:platformVersion': process.env.PLATFORM_VERSION || '13',
    'appium:deviceName': process.env.DEVICE_NAME || 'emulator-5554',
    'appium:automationName': process.env.AUTOMATION_NAME || 'UiAutomator2',
    'appium:app': process.env.APP || './apps/ApiDemos-debug.apk',
    ...deviceConfig,
  }];
  return caps;
}
