import { When } from '@wdio/cucumber-framework';
import viewPage from '../pageObjects/view.page.js';

When(/^I open sub-menu (.*)$/, async (subMenu) => {
    await viewPage.checkVisibility(subMenu);
});
