const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

class Utilities {
  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * a method to take screenshot and attach to allure
   * @param {string} name Name of the screenshot
   * @param {boolean} failure To mention whether the screenshot is because of failure
   * @return {void} returns nothing
   */
  static takeScreenshot(name, failure=false) {
    if (!name) name = moment().format('YYYY-MM-DDTH:mm:ss');
    const path = './reports/screenshot/';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    if (failure) {
      name = name + '_fail';
    }
    name = name.replace(/ /g, '_') + '.png';
    browser.saveScreenshot( path + name);
    const data = fs.readFileSync(`${path}/${name}`);
    allure.addAttachment(name, data, 'image/png');
  }

  /**
   * a method to clear the files from the reports directory
   * @param {string} directory Gets the path from which the files needs to be removed
   * @return {void} returns nothing
   */
  static removeDirectory(directory) {
    try {
      fs.readdir(directory, (err, files) => {
        if (err) throw err;
        console.log('Removing files from: ' + directory);
        for (const file of files) {
          if (file != '.keep') {
            fs.unlink(path.join(directory, file), (err) => {
              if (err) {
                console.log('Cannot clear the files from the directory using rimraf');
                rimraf(directory + '/*', function() {console.log('done');});
              }
            });
          }
        }
      });
    }
    catch (e) {
      console.log('Cannot clear the files from the directory using rimraf');
      rimraf(directory + '/*', function() {console.log('done');});
    }
  }
}

module.exports = Utilities;
