const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const clipboardy = require('node-clipboardy');
const webdriver = require('selenium-webdriver');

require("dotenv").config();
const env = process.env;

exports.newsPickLogin = async (req, res, next) => {
    // headless로 크롬 드라이버 실행
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions()
        // .setChromeOptions(new chrome.Options().addArguments("--headless", "--disable-gpu", "--window-size=1920,1080"))
        .build();

    try {
        // Navigate to login page
        await driver.get('https://partners.newspic.kr/login');
        await driver.manage().setTimeouts({ implicit: 2 });

        // Enter username and password
        const id = await driver.findElement(By.name('id'));
        await id.click();
        clipboardy.writeSync(env.NEWS_PICK_ID);
        await id.sendKeys(webdriver.Key.CONTROL, 'v');
        await driver.sleep(1000);

        const pw = await driver.findElement(By.name('password'));
        await pw.click();
        clipboardy.writeSync(env.NEWS_PICK_PW);
        await pw.sendKeys(webdriver.Key.CONTROL, 'v');
        await driver.sleep(1000);

        // Click login button
        const loginBtn = await driver.findElement(By.xpath('/html/body/div/section/div[2]/div/div[1]/form/button'));
        await loginBtn.click();
        await driver.sleep(2000);

    } catch (error) {
        console.log(error);
        next();
    } 
    // finally {
    //     driver.quit();
    // }
}
