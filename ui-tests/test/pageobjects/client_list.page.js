const Page = require('./page');

class ClientListPage extends Page {
  get welcomeText() {return $('div p');}
  get tableConetentItr() {return 'div table tbody tr td';}
  get tableHeaderItr() {return 'div table thead tr th';}
  companySelectorWithName(name) {return $('//tbody//a[contains(text(),"' + name + '")]');}
  // newWorkspaceTypeToggle(text) {return $('.pm-toggle-switch__item=' + text);}

  /**
   * a method to validate whether the page is displayed or not
   * @return {boolean} returns true or false
   */
  isDisplayed() {
    return this.welcomeText.isExisting();
  }

  /**
   * a method to validate whether the page is displayed or not
   * @return {string} returns text from the ui
   */
  getHelpText() {
    return this.welcomeText.getText();
  }

  /**
   * a method to validate whether the page is displayed or not
   * @param {Array} list list of contents from the table
   * @param {Int} headerList number of splices to be made
   * @return {string} returns text from the ui
   */
  listToMatrix(list, headerList) {
    const matrix = []; const finalTable = []; let i; let k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % headerList.length === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }

    for (const chunk of matrix) {
      const individualContents = {};
      chunk.forEach(constructHash);

      function constructHash(item, index) {
        individualContents[headerList[index]] = item;
      }
      finalTable.push(individualContents);
    }
    return finalTable;
  }

  /**
   * a method to get the list of workspaces available
   * @return {None} returns list of header texts
   */
  getHeaderContents() {
    const headerItr = $$(this.tableHeaderItr).filter(function(eachEle) {
      return eachEle.getText();
    });
    const headText = [];
    for (const res of headerItr) {
      headText.push(res.getText());
    }
    return headText;
  }

  /**
   * a method to get the list of workspaces available
   * @return {Array} returns list of table contents
   */
  getTableContents() {
    const contentItr = $$(this.tableConetentItr).filter(function(eachEle) {
      return eachEle.getText();
    });
    const contentText = [];
    for (const res of contentItr) {
      contentText.push(res.getText());
    }
    return (contentText);
  }

  /**
   * a method to get the list of workspaces available
   * @param {string} name Name of the company
   */
  clickOnComapy(name) {
    this.companySelectorWithName(name).click();
  }
}

module.exports = new ClientListPage();
