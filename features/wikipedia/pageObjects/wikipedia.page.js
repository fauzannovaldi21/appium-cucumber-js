import axios from 'axios';
import { expect } from 'chai';

let respAPI = '';
let respUI = '';

export default new class searchPage {
    async skipOnboarding() {
        try {
            await this.skipbutton.waitForDisplayed({ timeout: 5000 });
            await this.skipbutton.click();
        } catch (error) {
            console.log(`Element not found with error ${error}`);
        }
    }

    async searchItem(textVal) {
        await this.searchBar.waitForDisplayed({ timeout: 5000 });
        await this.searchBar.click();
        await this.searchField.setValue(textVal);
        respUI = await this.searchResult.getText();
        driver.hideKeyboard();
    }

    async checkAPI() {
        const etst = await axios.get('https://restcountries.com/v3.1/name/indonesia?fullText=true')
            .then((response) => {
                console.log(response.data[0].capital);
                return response.data[0].capital[0];
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        respAPI = etst;
    }

    async compareresp() {
        expect(respAPI).to.equal(respUI);
        return respAPI === respUI;
    }

    async findContent(content) {
        const el = await this.lblContent(content);
        let found = await el.isDisplayed();
        console.log('HISTORYY', found);

        const screenSize = driver.getWindowSize();
        const midPointX = Math.round(screenSize.width * 0.50);
        const startPointY = Math.round(screenSize.height * 0.75);
        const endPointY = startPointY - Math.round(screenSize * 0.15);

        while (found === false) {
            await driver.action('pointer', { parameter: { pointerType: 'touch' } })
                .move({ x: midPointX, y: startPointY })
                .down({ button: 0 })
                .move({ x: midPointX, y: endPointY, duration: 1000 })
                .up({ button: 0 })
                .perform();

            found = await this.lblHistory.isDisplayed();
        }
    }

    get skipbutton() {
        return driver.isAndroid ? $('//android.widget.TextView[@resource-id="org.wikipedia:id/fragment_onboarding_skip_button"]') : $();
    }

    get searchBar() {
        return $('//android.widget.TextView[@text="Search Wikipedia"]');
    }

    get searchField() {
        return $('//android.widget.AutoCompleteTextView[@resource-id="org.wikipedia:id/search_src_text"]');
    }

    get searchResult() {
        return $('//android.widget.TextView[@resource-id="org.wikipedia:id/page_list_item_title" and @text="Jakarta"]');
    }

    async lblContent(content) {
        return $(`//android.widget.TextView[@resource-id="org.wikipedia:id/page_list_item_title" and @text="${content}"]`);
    }

    get clearQuery() {
        return $('~Clear query');
    }
}();
