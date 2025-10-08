import allureService from '../runner/services/allure.instance.js';

export async function beforeScenario(world) {
    const isFreshInstall = String(process.env.FRESHINSTALL).toLowerCase() === 'true';
    const appId = process.env.APP_PACKAGE;
    const appAct = process.env.APP_ACTIVITY;
    const appPath = process.env.APP;

    console.log(`🧩 Starting Scenario: ${world.pickle.name}`);
    console.log(`🔹 freshInstall=${isFreshInstall}`);

    try {
        if (!driver) {
            console.warn('⚠️ No driver instance found.');
            return;
        }

        if (isFreshInstall) {
            await driver.execute('mobile: removeApp', { appId }).catch(() => {});
            await driver.execute('mobile: installApp', { appPath });
            await driver.execute('mobile: activateApp', { appId, appAct });
            console.log('📱 App freshly installed and activated.');
        } else {
            await driver.execute('mobile: activateApp', { appId, appAct });
            console.log('🚀 App activated (no fresh install).');
        }

        allureService.attachMetadata();
    } catch (err) {
        console.error(`❌ Before hook failed: ${err.message}`);
    }
}
