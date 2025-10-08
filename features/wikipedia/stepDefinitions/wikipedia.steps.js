import { When } from '@wdio/cucumber-framework';
import wikipediaPage from '../pageObjects/wikipedia.page.js';

When(/^I skip onboarding page$/, async () => {
    await wikipediaPage.skipOnboarding();
});

When(/^I input (.*) in search Bar$/, async (textVal) => {
    await wikipediaPage.searchItem(textVal);
});

When(/^I check the api$/, async () => {
    await wikipediaPage.checkAPI();
    await wikipediaPage.compareresp();
});

When(/^I scroll to find (.*)$/, async (content) => {
    await wikipediaPage.findContent(content);
});
