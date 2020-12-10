const Page = require('./page');

class ClientDetails extends Page {
  get customerDetailsHeaderText() {return $('//div//p//b[contains(text(),"Customer Details")]');}
  get customerDetailsText() {return $('//div//p//b[contains(text(),"Customer Details")]//parent::p//parent::div');}
  get navigateBackButton() {return $('div input');}

  /**
   * a method to return whether the page is displayed or not
   * @return {boolean} returns true or false
   */
  isDisplayed() {
    return this.customerDetailsHeaderText.isExisting();
  }

  /**
   * a method to return the customer details text
   * @return {string} returns customer details text
   */
  getCustomerDetails() {
    return this.customerDetailsText.getText();
  }

  getTableContentsForClient(table, name) {
    let count = 0;
    for (const chunk of table) {
      if (chunk['name'] == name) {
        break;
      } else {
        count +=1;
      }
    }
    return table[count];
  }

  clickNavigateBack() {
    this.navigateBackButton.click();
  }
}

module.exports = new ClientDetails();
