import { expect } from 'chai'

export default new class dashboard {
  async isOnPage(page) {
    let headerText = ''
    switch (page) {
    case 'dashboard':
    { const element = await this.menuItem('API Demos')
      headerText = await element.getText()
      expect(headerText).to.equal('API Demos')
      break; }
    default:
      break;
    }
  }

  async openMenu(item) {
    switch (item) {
    case 'view':
    { const element = await this.menuItem('Views')
      await element.click()
      break; }
    default:
      throw new Error("Invalid menu");
    }
  }

  async menuItem(item) {
    return driver.isAndroid ? $(`//android.widget.TextView[@text="${item}"]`) : $("~");
  }
}