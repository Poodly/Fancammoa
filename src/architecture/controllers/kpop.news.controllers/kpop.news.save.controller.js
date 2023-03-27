const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const clipboardy = require('node-clipboardy');
const webdriver = require('selenium-webdriver');

const { KpopNews } = require('../../../models')

require("dotenv").config();
const env = process.env;

class KpopNewsController {

    saveKpopNews = async (req, res, next) => {
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
                let newsType  = 'Top3'

                // console.log("newsLink---------------", newsLink)
        
                if (newsTitle == '') {
                    console.log("pass")
                }else {
                    await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate, newsType })
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
                    let newsType  = 'Top3'

                    // console.log("newsLink---------------", newsLink)
                    // console.log("newsImg----------------", newsImg)
                    // console.log("newsTitle--------------", newsTitle)
                    // console.log("press------------------", press)
                    // console.log("newsDate---------------", newsDate)
        
                    const exTop3 = await KpopNews.findAll({ where: { newsType } })
                    console.log("exTop3---------------", exTop3)

                    if (newsTitle == '') {
                        console.log("pass")
                    }else if (exTop3.length < 3) {
                        await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate, newsType })
                    }else {
                        await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate })
                    }
                }
            }
        
            async function otherNews() {
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
     
                    const exKpopNews = await KpopNews.findOne({ where: { newsImg, newsTitle, newsDate } })
 
                    if (newsTitle == '' || exKpopNews) {
                        console.log("제목이 비어있거나, 동일한 기사가 있습니다.");

                    } else {
                        const KpopNewsLength = await KpopNews.count() - 3;
                        if (KpopNewsLength <= 200) {
                            await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate });
                        }
                    }
                }
            }
    
            await getTop1News()
            await getTop4News()
            await otherNews()
            
            for (let i = 0; i < 15; i++) {
                await driver.executeScript("window.scrollBy(0, 800)");
                await driver.sleep(1000);
                await otherNews()
                await driver.sleep(1000);
              }
            
            res.status(200).json({ message: "News saved success" })
    
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
            
        } finally {
                driver.quit();
            }
    }
}

module.exports = KpopNewsController;


// JavaScript Selenium에서 가장 많이 사용되는 WebElement 인터페이스에서 사용 가능한 주요 메소드는 다음과 같습니다:

// clear(): 현재 입력란에 입력된 값을 지웁니다.
// click(): 해당 요소를 클릭합니다.
// findElement(by): 지정된 방법(by)에 따라 해당하는 첫 번째 하위 요소를 찾습니다.
// findElements(by): 지정된 방법(by)에 따라 해당하는 모든 하위 요소를 찾습니다.
// getAttribute(attributeName): 해당 속성의 값을 반환합니다.
// getCssValue(propertyName): 해당 속성의 CSS 값을 반환합니다.
// getTagName(): 태그 이름을 반환합니다.
// getText(): 해당 요소의 텍스트 값을 반환합니다.
// isDisplayed(): 요소가 현재 화면에 표시되는지 여부를 반환합니다.
// isEnabled(): 요소가 활성화되어 있는지 여부를 반환합니다.
// isSelected(): 해당 요소가 선택되어 있는지 여부를 반환합니다.
// sendKeys(...var_args): 현재 입력란에 문자열을 입력합니다.
// submit(): 해당 폼을 제출합니다.
// 위의 메소드 중 getAttribute()은 WebElement의 속성을 가져오는 데 사용되는 메소드입니다