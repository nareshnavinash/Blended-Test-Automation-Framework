const ClientListPage = require('../pageobjects/client_list.page');
const TestData = require('../testdata/client_library.data.json');
const WelcomePage = require('../pageobjects/welcome.page');
const ClientDetails = require('../pageobjects/client_details.page');
const strftime = require('strftime');
const { assert } = require('chai');


describe('Customer library tests', () => {
  before(() => {
    browser.navigateTo(config.url);
    assert.equal(WelcomePage.isDisplayed(), true, 'Welcome page is not displayed');
  });

  describe('Give Username and validate the client list and client details page for a client with contact info -> regression, sanity', () => {
    let finalTable = [];
    let customerDetailsFromUI = [];

    it('Enter the valid name and submit in welcome page', () => {
      assert.equal('Welcome to Customer App', WelcomePage.getNameFromHeader(), 'Welcome page header is not as expected');
      assert.equal('Please provide your name:', WelcomePage.getHelpText(), 'Welcome page help text is not as expected');
      WelcomePage.enterNameAndSubmit(TestData.name);
    });
    it('Validate weather client list page is displayed and its help text', () => {
      assert.equal(ClientListPage.isDisplayed(), true, 'Client list page is not displayed');
      const formattedDate = strftime('%A').substring(0, 3) + strftime(' %B').substring(0, 4) + strftime(' %d %Y');
      const message = 'Hi ' + TestData.name + '. It is now ' + formattedDate + ' and here is our customer list. Click on each of them to view their contact details.';
      assert.equal(ClientListPage.getHelpText(), message, 'Help text in the client list page is not as expected');
    });
    it('Get the details from the client table', () => {
      headerContents = ClientListPage.getHeaderContents();
      tableContents = ClientListPage.getTableContents();
      finalTable = ClientListPage.listToMatrix(tableContents, headerContents);
      console.log(finalTable);
    });
    it('Click on the company to validate the company details page and client details page is displayed', () => {
      ClientListPage.clickOnComapy(TestData.client_with_contact_details.name);
      assert.equal(ClientDetails.isDisplayed(), true, 'Client Details page is not displayed');
    });
    it('Get Customer Details text and validate', () => {
      customerDetailsFromUI = ClientDetails.getCustomerDetails();
      customerDetailsfromTable = ClientDetails.getTableContentsForClient(TestData.client_with_contact_details.name);
      console.log(customerDetailsfromTable);
      Object.keys(customerDetailsfromTable).forEach(function(key) {
        const value = customerDetailsfromTable[key];
        assert.include(customerDetailsFromUI, value, 'Value from table is not available in details page' + value);
      });
    });
    it('Assert weather the contact details is available in the UI', () => {
      assert.include(customerDetailsFromUI, TestData.client_with_contact_details.contact, 'Contact details is not available for the client');
    });
    it('Navigate back to the client list page and validate client list page is displayed', () => {
      ClientDetails.clickNavigateBack();
      assert.equal(ClientListPage.isDisplayed(), true, 'Client list page is not displayed');
    });
    it('Assert the table size field population', () => {
      for (const chunk of finalTable) {
        if (chunk['# of Employees'] <= 100) {
          assert.equal(chunk['Size'], 'Small', 'Company size is wrong for the company ' + chunk['Name']);
        } else if (chunk['# of Employees'] <= 1000) {
          assert.equal(chunk['Size'], 'Medium', 'Company size is wrong for the company ' + chunk['Name']);
        } else {
          assert.equal(chunk['Size'], 'Big', 'Company size is wrong for the company ' + chunk['Name']);
        }
      }
    });
  });

  describe('Give empty Username and validate the popup -> regression', () => {
    it('Navigate to the welcome page', () => {
      browser.navigateTo(config.url);
      assert.equal(WelcomePage.isDisplayed(), true, 'Welcome page is not displayed');
    });
    it('Enter the valid name and submit in welcome page', () => {
      assert.equal('Welcome to Customer App', WelcomePage.getNameFromHeader(), 'Welcome page header is not as expected');
      assert.equal('Please provide your name:', WelcomePage.getHelpText(), 'Welcome page help text is not as expected');
      WelcomePage.enterNameAndSubmit(TestData.empty_string);
    });
    it('Check if the alert is present', () => {
      assert.equal(browser.isAlertOpen(), true, 'Alert is not present');
      assert.equal(browser.getAlertText(), 'Please provide your name', 'Alert text is not as expected');
    });
    it('Accept the alert', () => {
      browser.acceptAlert();
    });
    it('Try sending an empty space and click on submit', () => {
      WelcomePage.enterNameAndSubmit(TestData.space_string);
    });
    it('Check if the alert is present', () => {
      assert.equal(browser.isAlertOpen(), true, 'Alert is not present');
      assert.equal(browser.getAlertText(), 'Please provide your name', 'Alert text is not as expected');
    });
  });

  describe('Give Username and validate the client list and client details page for a client without contact info -> regression', () => {
    let finalTable = [];
    let customerDetailsFromUI = [];

    it('Navigate to the welcome page', () => {
      browser.navigateTo(config.url);
      assert.equal(WelcomePage.isDisplayed(), true, 'Welcome page is not displayed');
    });
    it('Enter the valid name and submit in welcome page', () => {
      assert.equal('Welcome to Customer App', WelcomePage.getNameFromHeader(), 'Welcome page header is not as expected');
      assert.equal('Please provide your name:', WelcomePage.getHelpText(), 'Welcome page help text is not as expected');
      WelcomePage.enterNameAndSubmit(TestData.name);
    });
    it('Validate weather client list page is displayed and its help text', () => {
      assert.equal(ClientListPage.isDisplayed(), true, 'Client list page is not displayed');
      const formattedDate = strftime('%A').substring(0, 3) + strftime(' %B').substring(0, 4) + strftime(' %d %Y');
      const message = 'Hi ' + TestData.name + '. It is now ' + formattedDate + ' and here is our customer list. Click on each of them to view their contact details.';
      assert.equal(ClientListPage.getHelpText(), message, 'Help text in the client list page is not as expected');
    });
    it('Get the details from the client table', () => {
      headerContents = ClientListPage.getHeaderContents();
      tableContents = ClientListPage.getTableContents();
      finalTable = ClientListPage.listToMatrix(tableContents, headerContents);
      console.log(finalTable);
    });
    it('Click on the company to validate the company details page and client details page is displayed', () => {
      ClientListPage.clickOnComapy(TestData.client_without_contact_details.name);
      assert.equal(ClientDetails.isDisplayed(), true, 'Client Details page is not displayed');
    });
    it('Get Customer Details text and validate', () => {
      customerDetailsFromUI = ClientDetails.getCustomerDetails();
      customerDetailsfromTable = ClientDetails.getTableContentsForClient(TestData.client_without_contact_details.name);
      console.log(customerDetailsfromTable);
      Object.keys(customerDetailsfromTable).forEach(function(key) {
        const value = customerDetailsfromTable[key];
        assert.include(customerDetailsFromUI, value, 'Value from table is not available in details page' + value);
      });
    });
    it('Assert weather the contact details is available in the UI', () => {
      assert.include(customerDetailsFromUI, TestData.client_without_contact_details.contact, 'Contact details is not available for the client');
    });
    it('Navigate back to the client list page and validate client list page is displayed', () => {
      ClientDetails.clickNavigateBack();
      assert.equal(ClientListPage.isDisplayed(), true, 'Client list page is not displayed');
    });
  });
});
