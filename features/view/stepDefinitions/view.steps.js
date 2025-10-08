import { Then, When } from '@wdio/cucumber-framework';
import viewPage from '../pageObjects/view.page.js';

When(/^I open sub-menu (.*)$/, async (subMenu) => {
    await viewPage.openPage(subMenu);
});

When(/^I (.*) drag element dot (.*) to dot (.*)$/, async (dragConds, mainElement, targetElement) => {
    await viewPage.dragDrop(dragConds, mainElement, targetElement);
});

Then(/^I verify text after (.*) drag element$/, async (resultText) => {
    await viewPage.validateTextResult(resultText);
});

