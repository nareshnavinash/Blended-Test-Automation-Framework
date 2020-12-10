const Page = require('./page');

class WelcomePage extends Page {
  get headerText() {return $('div h1');}
  get helpText() {return $('div p:nth-of-type(1)');}
  get nameTextField() {return $('div p input[type*="text"]');}
  get submitButton() {return $('div p input[type*="button"]');}

  /**
   * a method to return whether the welcome page is displayed or not
   * @return {boolean} returns true or false
   */
  isDisplayed() {
    return this.headerText.isExisting();
  }

  /**
   * a method to return text from header
   * @return {string} returns text displayed in the header
   */
  getNameFromHeader() {
    return this.headerText.getText();
  }

  /**
   * a method to return text from help text
   * @return {string} returns text displayed in the help text
   */
  getHelpText() {
    return this.helpText.getText();
  }

  /**
   * a method to login to postman
   * @param {string} name user name
   * @return {void} returns nothing
   */
  enterNameAndSubmit(name) {
    this.nameTextField.setValue(name);
    this.submitButton.click();
  }
}

module.exports = new WelcomePage();
