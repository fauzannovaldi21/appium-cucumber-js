import allureService from '../runner/services/allure.instance.js';

export async function afterStep(step) {
    await allureService.attachScreenshot(step);
}
