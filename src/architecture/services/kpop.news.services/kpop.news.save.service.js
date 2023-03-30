require("chromedriver");
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// const clipboardy = require('node-clipboardy');
// const webdriver = require('selenium-webdriver');

const KpopNewsRepository = require('../../repositories/kpop.news.repositories/kpop.news.save.repository');

require("dotenv").config();
const env = process.env;

class KpopNewsService {
    kpopNewsRepository = new KpopNewsRepository();

    // Get Top1 news   ---------------------
    getTop1News = async (driver) => {
        const section       = await driver.findElement(By.tagName('section'))
        const tabBlockBig   = await section.findElement(By.id('tabBlockBig'));
        const imageElements = await tabBlockBig.findElement(By.tagName('img'))
        const titleContents = await tabBlockBig.findElement(By.className('text-overflow2'));
        const pressATags    = await tabBlockBig.findElement(By.css('li > div > div.info > div.article-info.d-flex > a'));
        const dates         = await tabBlockBig.findElement(By.css('li > div > div.info > div.article-info.d-flex > span'));
        const link          = await tabBlockBig.findElement(By.css('li > div > div.box-share > a'));

        let newsLink  = await link.getAttribute('href');
        let newsImg   = await imageElements.getAttribute('src');
        let newsTitle = await titleContents.getText();
        let press     = await pressATags.getText();
        let newsDate  = await dates.getText();
        let newsType  = 'Top3';

        if (newsTitle == '') {
            console.log("pass");
        }else {
            await this.kpopNewsRepository.createNews(newsLink, newsImg, newsTitle, press, newsDate, newsType);
        }
    }

    // Get Top2~4 news ---------------------
    getTop4News = async (driver) => {
        const section       = await driver.findElement(By.tagName('section'))
        const tabBlockSmall = await section.findElement(By.id('tabBlockSmall'));
        const imageElements = await tabBlockSmall.findElements(By.tagName('img'));
        const titleContents = await tabBlockSmall.findElements(By.className('text-overflow2'));
        const pressATags    = await tabBlockSmall.findElements(By.css('li > div > div.info > div.article-info.d-flex > a'));
        const dates         = await tabBlockSmall.findElements(By.css('li > div > div.info > div.article-info.d-flex > span'));
        const link          = await tabBlockSmall.findElements(By.css('li > div > div.box-share > a'));

        for (let i = 0; i < imageElements.length; i++) {
            let newsLink  = await link[i].getAttribute('href');
            let newsImg   = await imageElements[i].getAttribute('src');
            let newsTitle = await titleContents[i].getText();
            let press     = await pressATags[i].getText();
            let newsDate  = await dates[i].getText();
            let newsType  = 'Top3'

            let exTop3 = await this.kpopNewsRepository.exTop3News(newsType);

            if (newsTitle == '') {
                console.log("pass")
            }else if (exTop3.length < 3) {
                await this.kpopNewsRepository.createNews(newsLink, newsImg, newsTitle, press, newsDate, newsType);
            }else {
                await this.kpopNewsRepository.createNews(newsLink, newsImg, newsTitle, press, newsDate);
            }
        }
    }

    // Get other news ---------------------
    otherNews = async (driver) => {
        const sectionBody   = await driver.findElement(By.className('section-body'))
        const channelList   = await sectionBody.findElement(By.id('channelList'));
        const imageElements = await channelList.findElements(By.css('li > div.thumb > img'));
        const titleContents = await channelList.findElements(By.css('li > div.info > a > span'));
        const pressATags    = await channelList.findElements(By.css('li > div.info > div > a'));
        const dates         = await channelList.findElements(By.css('li > div.info > div > span'));
        const link          = await channelList.findElements(By.css('li > div.thumb > div.box-share > a'));

        for (let i = 0; i < imageElements.length; i++) {
            let newsLink  = await link[i].getAttribute('href');
            let newsImg   = await imageElements[i].getAttribute('src');
            let newsTitle = await titleContents[i].getText();
            let press     = await pressATags[i].getText();
            let newsDate  = await dates[i].getText();

            const exKpopNews = await this.kpopNewsRepository.exKpopNews(newsImg, newsTitle, newsDate);

            if (newsTitle == '' || exKpopNews) {
                console.log("제목이 비어있거나, 동일한 기사가 있습니다.");

            } else {
                const KpopNewsLength = await this.kpopNewsRepository.KpopNewsLength()
                if (KpopNewsLength <= 200) {
                    let newsType = 'Other'
                    await this.kpopNewsRepository.createNews(newsLink, newsImg, newsTitle, press, newsDate, newsType);
                }
            }
        }
    }

    // headless로 크롬 드라이버 실행
    // .forBrowser('chrome')
    // .setChromeOptions(new chrome.Options().addArguments("--headless", "--disable-gpu", "--window-size=1920,1080"))     
    saveKpopNews = async (req, res, next) => {
        // let driver = await new Builder().forBrowser('chrome').build();
        let chromeOptions = new chrome.Options().headless().addArguments("--no-sandbox");
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();

        try {
            // 테이블의 데이터를 싹 비운다.
            await this.kpopNewsRepository.deleteAllNews()

            // Navigate to login page
            await driver.get('https://partners.newspic.kr/login');
            await driver.manage().setTimeouts({ implicit: 2 });
            
            // await driver.findElement(By.id('아이디 입력 필드 ID')).sendKeys('아이디');
            // await driver.findElement(By.id('비밀번호 입력 필드 ID')).sendKeys('비밀번호');


            // Enter username and password
            const id = await driver.findElement(By.name('id'));
            await id.sendKeys(env.NEWS_PICK_ID)
            // await id.click();
            // clipboardy.writeSync(env.NEWS_PICK_ID);
            // await id.sendKeys(webdriver.Key.CONTROL, 'v');
            await driver.sleep(200);
    
            const pw = await driver.findElement(By.name('password'));
            await pw.sendKeys(env.NEWS_PICK_PW);
            // await pw.click();
            // clipboardy.writeSync(env.NEWS_PICK_PW);
            // await pw.sendKeys(webdriver.Key.CONTROL, 'v');
            await driver.sleep(200);
    
            // Click login button
            const loginBtn = await driver.findElement(By.css('body > div > section > div.section-body.mt-32 > div > div.login-form > form > button'));
            await loginBtn.submit();
            // await loginBtn.click();
            await driver.sleep(300);
    
            // Click kMusicBtn button
            // const kMusicBtn = await driver.findElement(By.css('#tab_57'));
            // await kMusicBtn.click();
            // await driver.sleep(300);
    
            // Click kpopMusicBtn button
            await driver.get('https://partners.newspic.kr/main/index#66');
            // const kpopMusicBtn = await driver.findElement(By.css('#sub-66'));
            // await kpopMusicBtn.click();
            await driver.sleep(300);
    
            await this.getTop1News(driver)
            await this.getTop4News(driver)
            await this.otherNews(driver)
            
            for (let i = 0; i < 1; i++) {
                await driver.executeScript("window.scrollBy(0, 1800)");
                await driver.sleep(1000);
                await this.otherNews(driver)
                await driver.sleep(1000);
            }
            return
    
        } catch(error) {
            console.error(error);
            next();
            
        } finally {
            driver.quit();
        };
    };
};

module.exports = KpopNewsService;