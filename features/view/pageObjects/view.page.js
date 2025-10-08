import dashboardPage from '../../dashboard/pageObjects/dashboard.page.js';

export default new class viewPage {
    async checkVisibility(subMenu, scrollTimeout = 30000) {
        const element = await dashboardPage.subMenuItem(subMenu);

        let found = await element.isDisplayed();
        const currentTime = Date.now();
        const screenSize = await driver.getWindowSize();
        const midPointX = Math.round(screenSize.width * 0.5);
        const startPointY = Math.round(screenSize.height * 0.75);
        const endPointY = startPointY - (screenSize.height * 0.20);

        while (found === false && Date.now() <= currentTime + scrollTimeout) {
            await driver.action('pointer', { parameters: { pointerType: 'touch' } })
                .move({ x: midPointX, y: startPointY })
                .down({ button: 0 })
                .move({ x: midPointX, y: endPointY, duration: 1000 })
                .up({ button: 0 })
                .perform();
            found = await element.isDisplayed();
        }
        if (found === true) {
            await element.waitForDisplayed({ timeout: 4000 });
            await element.click();
        } else {
            throw new Error(`Element "${await element.selector}" wasn't found after scrolling in ${scrollTimeout} ms.`);
        }
    }
}();
