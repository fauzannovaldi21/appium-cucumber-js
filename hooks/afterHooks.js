import allureService from '../runner/services/allure.instance.js';

export async function afterScenario(world, result) {
  const isFreshInstall = String(process.env.FRESHINSTALL).toLowerCase() === 'true';
  const appId = process.env.APP_PACKAGE;

  console.log(`🏁 Scenario finished: ${world.pickle.name}`);
  console.log(`🔹 Result: ${result?.result?.status || 'UNKNOWN'} | freshInstall=${isFreshInstall}`);

  try {
    if (!driver) {
      console.warn('⚠️ No driver instance found.');
      return;
    }

    await allureService.stopRecording(world);

    if (isFreshInstall) {
      await driver.execute('mobile: terminateApp', { appId }).catch(() => {});
      await driver.execute('mobile: removeApp', { appId });
      console.log('🧹 App terminated and uninstalled (fresh install mode).');
    } else {
      await driver.execute('mobile: clearApp', { appId }).catch(() => {});
      await driver.execute('mobile: terminateApp', { appId }).catch(() => {});
      console.log('🧼 App data cleared and terminated (no fresh install).');
    }
  } catch (err) {
    console.error(`❌ After hook failed: ${err.message}`);
  }
}
