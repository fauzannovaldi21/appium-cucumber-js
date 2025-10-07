import { Before, After, AfterStep, BeforeAll, AfterAll } from '@wdio/cucumber-framework';
import { beforeScenario } from './beforeHooks.js';
import { afterScenario } from './afterHooks.js';
import { afterStep } from './afterStepHooks.js';
import allureService from '../runner/services/allure.instance.js';

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
        await driver.execute('mobile: clearApp', { appId }).catch(() => {});
        await driver.execute('mobile: terminateApp', { appId }).catch(() => {});
        console.log('🧼 App closed after Before() failure (no fresh install)');
      }
    } catch (cleanupErr) {
      console.warn(`⚠️ Failed to clean up app: ${cleanupErr.message}`);
    }
});

AfterAll(async () => {
  console.log('✅ All tests completed');
  // Report generated once in parent process (wdio.runner.js)
});

// /hooks/hooksIndex.js
// import { Before, After, AfterAll, BeforeAll } from '@wdio/cucumber-framework'
// import allureService from '../runner/services/allure.instance.js'

// BeforeAll(async function() {
//   console.log('🚀 Starting all test execution')
//   allureService.attachMetadata()
// })

// Before(async function(world) {
//   console.log(`🧩 Starting Scenario: ${world.pickle.name}`)
// })

// After(async function(world, result) {
//   const status = result.result?.status || 'unknown'
//   console.log(`🏁 Scenario finished: ${world.pickle.name}`)
//   console.log(`🔹 Result: ${status}`)
// })

// AfterAll(async function() {
//   console.log('✅ All tests completed — final cleanup')
//   await cleanupAppSession()
// })
