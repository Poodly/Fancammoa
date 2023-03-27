from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.commom.by import By
import time
import pyperclip
import pyautogui
import openpyxl
from datetime import datetime

def chromeWebdriver():
    chrome_service = ChromeService(executable_path=ChromeDriverManager().install())
    options = Options()
    options.add_experimental_option('detach', True)
    options.add_experimental_option('excludeSwitches', ['enable-loggin'])
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
    options.add_argument(f'user-agent={user_agent}')
    
    driver = webdriver.Chrome(service=chrome_service, options=options)

    return driver


# const webdriver = require('selenium-webdriver');
# const chrome = require('selenium-webdriver/chrome');
# const {ServiceBuilder} = require('selenium-webdriver/chrome');
# const {By} = require('selenium-webdriver');

# async function chromeWebdriver() {
#   // Set up ChromeDriver service
#   let service = new ServiceBuilder().build();
  
#   // Set up Chrome options
#   let options = new chrome.Options();
#   options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36');
#   options.setExperimentalOption('detach', true);
#   options.excludeSwitches('enable-logging');
  
#   // Create Chrome WebDriver instance
#   let driver = await new webdriver.Builder()
#     .forBrowser('chrome')
#     .setChromeOptions(options)
#     .setChromeService(service)
#     .build();
  
#   return driver;
# }

# 이 코드는 ServiceBuilder 클래스를 사용하여 ChromeDriver 서비스를 설정하고 chrome.Options 클래스를 사용하여 Chrome 옵션을 설정하며 
# webdriver.Builder 클래스를 사용하여 Chrome WebDriver 인스턴스를 만듭니다. 
# 이 코드가 작동하려면 selenium-webdriver 및 chromedriver와 같은 필수 패키지를 설치해야 할 수도 있습니다.


driver = chromeWebdriver()
driver.get('https://partners.newspic.kr/login')
driver.implicitly_wait(2)
time.sleep(2)

id = driver.find_element(By.NAME, 'id')
id.click()
pyperclip.copy('아이디_메일')
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)

pw = driver.find_element(By.NAME, 'password')
pw.click()
pyperclip.copy('패스워드')
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)

login_btn = driver.find_element(By.XPATH, '/html/body/div[1]/section/div[2]/div[1]/from/button')
login_btn.click()
time.sleep(2)

# const webdriver = require('selenium-webdriver');
# const {By} = require('selenium-webdriver');
# const chrome = require('selenium-webdriver/chrome');
# const {Options} = require('selenium-webdriver/chrome');
# const clipboardy = require('clipboardy');
# const {sleep} = require('sleep');

# async function login() {
#   let driver = await chromeWebdriver();
#   await driver.get('https://partners.newspic.kr/login');
#   await driver.manage().setTimeouts({implicit: 2000});
#   await sleep(2);

#   let idInput = await driver.findElement(By.name('id'));
#   await idInput.click();
#   await clipboardy.write('ID_Mail');
#   await driver.actions().keyDown(webdriver.Key.CONTROL).sendKeys('v').keyUp(webdriver.Key.CONTROL).perform();
#   await sleep(1);

#   let pwInput = await driver.findElement(By.name('password'));
#   await pwInput.click();
#   await clipboardy.write('password');
#   await driver.actions().keyDown(webdriver.Key.CONTROL).sendKeys('v').keyUp(webdriver.Key.CONTROL).perform();
#   await sleep(1);

#   let loginButton = await driver.findElement(By.xpath('/html/body/div[1]/section/div[2]/div[1]/form/button'));
#   await loginButton.click();
#   await sleep(2);

#   await driver.quit();
# }

# async function chromeWebdriver() {
#   let options = new Options();
#   options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36');
#   options.setExperimentalOption('detach', true);
#   options.excludeSwitches('enable-logging');

#   let service = new chrome.ServiceBuilder().build();
#   let driver = await new webdriver.Builder()
#     .forBrowser('chrome')
#     .setChromeOptions(options)
#     .setChromeService(service)
#     .build();

#   return driver;
# }

# login();

# 이 코드는 로그인 페이지로 이동하고, 로그인 자격 증명을 입력하고, 
# 로그인 버튼을 클릭하는 등 사용자가 제공한 Python 코드와 동일한 단계를 수행합니다. 
# 이 코드는 sleep 패키지의 sleep 함수를 사용하여 단계 사이에 지정된 시간(초) 동안 대기합니다. 
# 이 코드가 작동하려면 selenium-webdriver, selenium-webdriver/chrome, clipboardy 및 sleep과 같은 필수 패키지를 설치해야 할 수 있습니다.



from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.commom.by import By
import time
import pyperclip
import pyautogui
import openpyxl
from datetime import datetime

def chromeWebdriver():
    chrome_service = ChromeService(executable_path=ChromeDriverManager().install())
    options = Options()
    options.add_experimental_option('detach', True)
    options.add_experimental_option('excludeSwitches', ['enable-loggin'])
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
    options.add_argument(f'user-agent={user_agent}')
    
    driver = webdriver.Chrome(service=chrome_service, options=options)

    return driver

driver = chromeWebdriver()
driver.get('https://partners.newspic.kr/login')
driver.implicitly_wait(2)
time.sleep(2)

id = driver.find_element(By.NAME, 'id')
id.click()
pyperclip.copy('아이디_메일')
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)

pw = driver.find_element(By.NAME, 'password')
pw.click()
pyperclip.copy('패스워드')
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)

login_btn = driver.find_element(By.XPATH, '/html/body/div[1]/section/div[2]/div[1]/from/button')
login_btn.click()
time.sleep(2)

# const webdriver = require('selenium-webdriver');
# const chrome = require('selenium-webdriver/chrome');
# const chromedriver = require('chromedriver');
# const clipboardy = require('clipboardy');

# // Set up Chrome options
# const options = new chrome.Options();
# options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36');
# options.addArguments('--disable-logging');
# options.addArguments('--disable-extensions');
# options.addArguments('--disable-popup-blocking');
# options.addArguments('--profile-directory=Default');
# options.addArguments('--disable-plugins-discovery');
# options.addArguments('--incognito');
# options.addArguments('--start-maximized');
# options.excludeSwitches('enable-logging');

# // Set up Chrome driver
# const service = new chrome.ServiceBuilder(chromedriver.path).build();
# chrome.setDefaultService(service);
# const driver = new webdriver.Builder()
#   .withCapabilities(webdriver.Capabilities.chrome())
#   .setChromeOptions(options)
#   .build();

# // Navigate to login page
# driver.get('https://partners.newspic.kr/login');
# driver.manage().timeouts().implicitlyWait(2000);

# // Enter username and password
# const id = driver.findElement(webdriver.By.name('id'));
# id.click();
# clipboardy.writeSync('아이디_메일');
# id.sendKeys(webdriver.Key.CONTROL, 'v');
# driver.sleep(1000);

# const pw = driver.findElement(webdriver.By.name('password'));
# pw.click();
# clipboardy.writeSync('패스워드');
# pw.sendKeys(webdriver.Key.CONTROL, 'v');
# driver.sleep(1000);

# // Click login button
# const loginBtn = driver.findElement(webdriver.By.xpath('/html/body/div[1]/section/div[2]/div[1]/form/button'));
# loginBtn.click();
# driver.sleep(2000);







# const webdriver = require('selenium-webdriver');
# const chrome = require('selenium-webdriver/chrome');
# const chromedriver = require('chromedriver');
# const clipboardy = require('clipboardy');

# // Set up Chrome options
# const options = new chrome.Options();
# options.addArguments('--headless');
# options.addArguments('--disable-gpu');
# options.addArguments('--no-sandbox');
# options.addArguments('--disable-dev-shm-usage');
# options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36');
# options.addArguments('--disable-logging');
# options.addArguments('--disable-extensions');
# options.addArguments('--disable-popup-blocking');
# options.addArguments('--profile-directory=Default');
# options.addArguments('--disable-plugins-discovery');
# options.addArguments('--incognito');
# options.addArguments('--start-maximized');
# options.excludeSwitches('enable-logging');

# // Set up Chrome driver
# const service = new chrome.ServiceBuilder(chromedriver.path).build();
# chrome.setDefaultService(service);
# const driver = new webdriver.Builder()
#   .withCapabilities(webdriver.Capabilities.chrome())
#   .setChromeOptions(options)
#   .build();

# // Navigate to website
# driver.get('https://example.com');

# // Find and interact with elements on the page
# const searchBox = driver.findElement(webdriver.By.name('q'));
# searchBox.sendKeys('example search query');
# searchBox.submit();

# // Extract data from the page
# const resultTitles = driver.findElements(webdriver.By.css('h3'));
# for (let i = 0; i < resultTitles.length; i++) {
#   console.log(await resultTitles[i].getText());
# }

# // Close the browser
# driver.quit();













# 뉴스 가져오기

recommend_ul = driver.find_element(By.ID, 'recommendNewsList')
recommend_lis = recommend_ul.find_elements(By.CSS_SELECTOR, 'li.d-flex')
print(len(recommend_lis))

for li in recommend_lis:
    _image2 = li.find_element(By.CSS_SELECTOR, 'div.thumb > a > img').get_attribute('src')
    title2 = li.find_element(By.CSS_SELECTOR, 'div.info > a > span').text
    link_url2 = li.find_element(By.CSS_SELECTOR, 'div.info > a').get_attribute('href')
    _link_url2 = link_url2.replace('http://', 'https://').replace('&lcp', '&cp')
    link_list2 = _link_url2.split('&')

    final_url_link2 = ''
    idx = 0

    for link in link_list2:
        if idx == 3:
            continue
        final_url_link2 += link + '&'

    final_url_link2 = final_url_link2[:-1]
    print(f'{_image2}\n{title2}\n{link_list2}\n{final_url_link2}\n')


# const recommendUl = document.querySelector('#recommendNewsList');
# const recommendLis = recommendUl.querySelectorAll('li.d-flex');
# console.log(recommendLis.length);

# for (let li of recommendLis) {
#   const _image2 = li.querySelector('div.thumb > a > img').getAttribute('src');
#   const title2 = li.querySelector('div.info > a > span').textContent;
#   let link_url2 = li.querySelector('div.info > a').getAttribute('href');
#   link_url2 = link_url2.replace('http://', 'https://').replace('&lcp', '&cp');
#   const link_list2 = link_url2.split('&');

#   let final_url_link2 = '';
#   let idx = 0;

#   for (let link of link_list2) {
#     if (idx === 3) {
#       continue;
#     }
#     final_url_link2 += link + '&';
#     idx++;
#   }

#   final_url_link2 = final_url_link2.slice(0, -1);
#   console.log(`${_image2}\n${title2}\n${link_list2}\n${final_url_link2}\n`);
# }

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.commom.by import By
import time
import pyperclip
import pyautogui
import openpyxl
from datetime import datetime

def chromeWebdriver():
    chrome_service = ChromeService(executable_path=ChromeDriverManager().install())
    options = Options()
    options.add_experimental_option('detach', True)
    options.add_experimental_option('excludeSwitches', ['enable-loggin'])
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
    options.add_argument(f'user-agent={user_agent}')
    
    driver = webdriver.Chrome(service=chrome_service, options=options)

    return driver

driver = chromeWebdriver()
driver.get('https://partners.newspic.kr/login')
driver.implicitly_wait(2)
time.sleep(2)

id = driver.find_element(By.NAME, 'id')
id.click()
pyperclip.copy('아이디_메일')
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)

pw = driver.find_element(By.NAME, 'password')
pw.click()
pyperclip.copy('패스워드')
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)

login_btn = driver.find_element(By.XPATH, '/html/body/div[1]/section/div[2]/div[1]/from/button')
login_btn.click()
time.sleep(2)

# 뉴스 가져오기

recommend_ul = driver.find_element(By.ID, 'recommendNewsList')
recommend_lis = recommend_ul.find_elements(By.CSS_SELECTOR, 'li.d-flex')
print(len(recommend_lis))

for li in recommend_lis:
    _image2 = li.find_element(By.CSS_SELECTOR, 'div.thumb > a > img').get_attribute('src')
    title2 = li.find_element(By.CSS_SELECTOR, 'div.info > a > span').text
    link_url2 = li.find_element(By.CSS_SELECTOR, 'div.info > a').get_attribute('href')
    _link_url2 = link_url2.replace('http://', 'https://').replace('&lcp', '&cp')
    link_list2 = _link_url2.split('&')

    final_url_link2 = ''
    idx = 0

    for link in link_list2:
        if idx == 3:
            continue
        final_url_link2 += link + '&'

    final_url_link2 = final_url_link2[:-1]
    print(f'{_image2}\n{title2}\n{link_list2}\n{final_url_link2}\n')