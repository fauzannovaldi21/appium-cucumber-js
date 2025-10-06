// import { expect } from 'chai'

// export default new class dashboard {
//     async isOnPage(page) {
//         let headerText = ''
//         switch (page) {
//             case 'dashboard':
//                 const element = await this.menuItem('API Demos')
//                 headerText = await element.getText()
//                 expect(headerText).to.equal('API Demos')
//                 break;
//             default:
//                 break;
//         }
//     }

//     async menuItem(item) {
//         return driver.isAndroid ? $(`//android.widget.TextView[@text="${item}"]`) : $("~");
//     }    

//     get headerDashboard() {
//         return driver.isAndroid ? $('//android.widget.TextView[@text="API Demos"]') : $("~");
//     }
// }