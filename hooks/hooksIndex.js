import {
    Before, After, AfterStep, BeforeAll, AfterAll,
} from '@wdio/cucumber-framework';
import allureService from '../runner/services/allure.instance.js';
import { beforeScenario } from './beforeHooks.js';
import { afterScenario } from './afterHooks.js';
import { afterStep } from './afterStepHooks.js';

BeforeAll(async () => {
    console.log('🚀 Starting all test execution');
});

Before(async (scenario) => {
    await beforeScenario(scenario);
    if (String(process.env.RECORD_ALLURE).toLowerCase() === 'true') {
        await allureService.startRecording();
    }
});

AfterStep(async (step) => {
    await afterStep(step);
});

After(async (scenario, result) => {
    await afterScenario(scenario, result);
    try {
        const appId = process.env.APP_PACKAGE;
        const isFreshInstall = String(process.env.FRESHINSTALL).toLowerCase() === 'true';

        if (!isFreshInstall && driver && appId) {
            await driver.execute('mobile: clearApp', { appId }).catch(() => { });
            await driver.execute('mobile: terminateApp', { appId }).catch(() => { });
            console.log('🧼 App closed after Before() failure (no fresh install)');
        }
    } catch (cleanupErr) {
        console.warn(`⚠️ Failed to clean up app: ${cleanupErr.message}`);
    }
});

AfterAll(async () => {
    console.log('✅ All tests completed');
});
