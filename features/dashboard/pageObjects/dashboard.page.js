/* eslint-disable no-restricted-syntax */
import { expect } from 'chai';
import { MENU_STRUCTURE } from './../dataTest/menus.js';

export default new class dashboard {
    async verifyAllDashboardMenusExist() {
        for (const menuName of MENU_STRUCTURE.Dashboard) {
            const element = await this.menuItem(menuName);
            await element.waitForDisplayed({ timeout: 4000 });
            expect(await element.getText()).to.equal(`${menuName}`);
        }
    }

    async openAllDashboardMenus() {
        for (const menuName of MENU_STRUCTURE.Dashboard) {
            await this.openMenu(menuName);
            await driver.back();
        }
    }

    async openMenu(menu) {
        const element = await this.menuItem(menu);
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();
    }

    async verifySubMenu(menu) {
        const subMenu = MENU_STRUCTURE[menu];
        for (const menus of subMenu) {
            const elementSubMenu = await this.subMenuItem(menus);
            await elementSubMenu.waitForDisplayed({ timeout: 4000 });
            expect(await elementSubMenu.getText()).to.equal(`${menus}`);
        }
    }

    async menuItem(item) {
        return driver.isAndroid ? $(`//android.widget.TextView[@text="${item}"]`) : $('~');
    }

    async subMenuItem(item) {
        return driver.isAndroid ? $(`//android.widget.TextView[@content-desc="${item}"]`) : $('~');
    }
}();
