const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const clipboardy = require('node-clipboardy');
const webdriver = require('selenium-webdriver');

const { KpopNews } = require('../../../models')

require("dotenv").config();
const env = process.env;

class KpopNewsUpdateController {

    UpdateKpopNews = async (req, res, next) => {
        // headless로 크롬 드라이버 실행
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions()
            // .setChromeOptions(new chrome.Options().addArguments("--headless", "--disable-gpu", "--window-size=1920,1080"))
            .build();
    
        try {
            // 테이블의 데이터를 싹 비운다.
            await KpopNews.destroy({ where: {} })
            // Navigate to login page
            await driver.get('https://partners.newspic.kr/login');
            await driver.manage().setTimeouts({ implicit: 2 });
    
            // Enter username and password
            const id = await driver.findElement(By.name('id'));
            await id.click();
            clipboardy.writeSync(env.NEWS_PICK_ID);
            await id.sendKeys(webdriver.Key.CONTROL, 'v');
            await driver.sleep(200);
    
            const pw = await driver.findElement(By.name('password'));
            await pw.click();
            clipboardy.writeSync(env.NEWS_PICK_PW);
            await pw.sendKeys(webdriver.Key.CONTROL, 'v');
            await driver.sleep(200);
    
            // Click login button
            const loginBtn = await driver.findElement(By.xpath('/html/body/div/section/div[2]/div/div[1]/form/button'));
            await loginBtn.click();
            await driver.sleep(300);
    
            // Click kMusicBtn button
            const kMusicBtn = await driver.findElement(By.xpath('//*[@id="tab_57"]'));
            await kMusicBtn.click();
            await driver.sleep(300);
    
            // Click kpopMusicBtn button
            const kpopMusicBtn = await driver.findElement(By.xpath('//*[@id="sub-66"]'));
            await kpopMusicBtn.click();
            await driver.sleep(300);

            // Get Top1 news   ---------------------
            async function getTop1News() {
                const section       = await driver.findElement(By.tagName('section'))
                const tabBlockBig   = await section.findElement(By.id('tabBlockBig'));
                const imageElements = await tabBlockBig.findElement(By.tagName('img'))
                const titleContents = await tabBlockBig.findElement(By.className('text-overflow2'));
                const pressATags    = await tabBlockBig.findElement(By.css('li > div > div.info > div.article-info.d-flex > a'))
                const dates         = await tabBlockBig.findElement(By.css('li > div > div.info > div.article-info.d-flex > span'))
                const link          = await tabBlockBig.findElement(By.css('li > div > div.box-share > a'))

                let newsLink  = await link.getAttribute('href');
                let newsImg   = await imageElements.getAttribute('src');
                let newsTitle = await titleContents.getText();
                let press     = await pressATags.getText();
                let newsDate  = await dates.getText();
        
                if (newsTitle == '') {
                    console.log("pass")
                }else {
                    await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate })
                }
            }
        
            // Get Top2~4 news ---------------------
            async function getTop4News() {
                const section       = await driver.findElement(By.tagName('section'))
                const tabBlockSmall = await section.findElement(By.id('tabBlockSmall'));
                const imageElements = await tabBlockSmall.findElements(By.tagName('img'))
                const titleContents = await tabBlockSmall.findElements(By.className('text-overflow2'));
                const pressATags    = await tabBlockSmall.findElements(By.css('li > div > div.info > div.article-info.d-flex > a'))
                const dates         = await tabBlockSmall.findElements(By.css('li > div > div.info > div.article-info.d-flex > span'))
                const link          = await tabBlockSmall.findElements(By.css('li > div > div.box-share > a'))

                for (let i = 0; i < imageElements.length; i++) {
                    let newsLink  = await link[i].getAttribute('href');
                    let newsImg   = await imageElements[i].getAttribute('src');
                    let newsTitle = await titleContents[i].getText();
                    let press     = await pressATags[i].getText();
                    let newsDate  = await dates[i].getText();
        
                    if (newsTitle == '') {
                        console.log("pass")
                    }else {
                        await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate })
                    }
                }
            }
        
            async function otherNews() {
                const sectionBody   = await driver.findElement(By.className('section-body'))
                const channelList   = await sectionBody.findElement(By.id('channelList'));
                const imageElements = await channelList.findElements(By.css('li > div.thumb > img'))
                const titleContents = await channelList.findElements(By.css('li > div.info > a > span'));
                const pressATags    = await channelList.findElements(By.css('li > div.info > div > a'))
                const dates         = await channelList.findElements(By.css('li > div.info > div > span'))
                const link          = await channelList.findElements(By.css('li > div.thumb > div.box-share > a'))

                for (let i = 0; i < imageElements.length; i++) {
                    let newsLink  = await link[i].getAttribute('href');
                    let newsImg   = await imageElements[i].getAttribute('src');
                    let newsTitle = await titleContents[i].getText();
                    let press     = await pressATags[i].getText();
                    let newsDate  = await dates[i].getText();
        
                    const allKpopNews = await KpopNews.findAll({})
 
                    if (newsTitle == '') {
                        console.log("pass")
                    }else if (allKpopNews.length <= 100) {
                        await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate })
                    }
                }
            }
    
    
            await getTop1News()
            await getTop4News()
            await otherNews()     
            
            res.status(200).json({ message: "News saved success" })
    
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
            
        } finally {
                driver.quit();
            }
    }
}

module.exports = KpopNewsUpdateController;