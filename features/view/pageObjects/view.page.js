import { expect } from 'chai';
import dashboardPage from '../../dashboard/pageObjects/dashboard.page.js';

export default new class viewPage {
    async openPage(subMenu, scrollTimeout = 30000) {
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

    async dragDrop(dragCons, element1, element2) {
        const mainElement = await this.dragDot(element1);
        const targetElement = await this.dragDot(element2);

        const mainElementLocation = await mainElement.getLocation();
        const targetElementLocation = await targetElement.getLocation();

        switch (dragCons) {
            case 'complete':
                await driver.execute('mobile: dragGesture', {
                    elementId: await mainElement.elementId,
                    endX: await targetElementLocation.x,
                    endY: await targetElementLocation.y,
                    speed: 2000,
                });
                break;
            case 'cancelled':
                await driver.execute('mobile: dragGesture', {
                    elementId: await mainElement.elementId,
                    endX: 10,
                    endY: 10,
                    speed: 2000,
                });
                break;
            case 'hold':
                await driver.action('pointer', { parameter: { pointerType: 'touch' } })
                    .move({ x: mainElementLocation.x, y: mainElementLocation.y })
                    .down({ button: 0 })
                    .pause(5000)
                    .move({ x: mainElementLocation.x, y: mainElementLocation.y })
                    .perform();
                break;
            default:
                break;
        }
    }

    async validateTextResult(expected) {
        const actualResult = await this.textResult.getText();
        switch (expected) {
            case 'success':
                expect(await actualResult).to.equal('Dropped!');
                break;
            case 'cancelled':
                expect(await actualResult).to.equal('No drop');
                break;
            case 'holding':
                expect(await actualResult).to.equal('Dragging...');
                break;
            default:
                break;
        }
    }

    dragDot(number) {
        return driver.isAndroid ? $(`//android.view.View[@resource-id="io.appium.android.apis:id/drag_dot_${number}"]`) : $('~');
    }

    get dotHidden() {
        return driver.isAndroid ? $('//android.view.View[@resource-id="io.appium.android.apis:id/drag_dot_hidden"]') : $('~');
    }

    get textResult() {
        return driver.isAndroid ? $('//android.widget.TextView[@resource-id="io.appium.android.apis:id/drag_result_text"]') : $('~');
    }
}();
