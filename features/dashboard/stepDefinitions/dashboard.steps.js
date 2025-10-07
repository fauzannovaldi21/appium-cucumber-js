import { Given, When, Then } from '@wdio/cucumber-framework';
import dashboardPage from '../pageObjects/dashboard.page.js';

Given(/^I verify all menu in dashboard$/, async () => {
    await dashboardPage.verifyAllDashboardMenusExist();
});

When(/^I open each menu in dashboard$/, async () => {
    await dashboardPage.openAllDashboardMenus();
});

When(/^I open menu (.*) in dashboard$/, async (menu) => {
    await dashboardPage.openMenu(menu);
});

Then(/^I verify sub-menu in menu (.*)$/, async (menu) => {
    await dashboardPage.verifySubMenu(menu);
});
