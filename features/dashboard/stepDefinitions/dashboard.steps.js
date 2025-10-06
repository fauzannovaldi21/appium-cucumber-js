import { Given, When } from "@wdio/cucumber-framework";
import dashboardPage from "../pageObjects/dashboard.page";
import allure from '@wdio/allure-reporter';

Given(/^I am on (.*) api-demos page$/, async (menu) => {
    await dashboardPage.isOnPage(menu);
});

When(/^I open menu (.*) from dashboard$/, async (menu) => {
    await dashboardPage.openMenu(menu);
});

Given('I open the app', async () => {
  allure.addFeature('Smoke Test');
  allure.addSeverity('normal');
  allure.addDescription('Just a test to validate Allure reporting');
  await driver.pause(1000);
});