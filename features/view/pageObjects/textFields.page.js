export default new class textFieldpage {
    async inputText(textVal) {
        await this.textField1.setValue(textVal);
    }

    get textField1() {
        return driver.isAndroid ? $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/edit"]') : $();
    }
}();
