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
});

AfterAll(async () => {
  console.log('✅ All tests completed');
  // Report generated once in parent process (wdio.runner.js)
});
