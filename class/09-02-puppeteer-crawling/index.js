import puppeteer from 'puppeteer'

async function startCrawling(){

    const browser = await puppeteer.launch({ headless: false})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto('https://www.goodchoice.kr/product/search/2')
    await page.waitForTimeout(1000)

    const name = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > strong", el => el.textContent)
    // #poduct_list_area > li:nth-child(3) > a > div > div.name > strong

    const location = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)", el => el.textContent)
    // #poduct_list_area > li:nth-child(3) > a > div > div.name > p:nth-child(4)


    const price = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b", el => el.textContent)

    console.log(name)
    console.log(location.trim())
    console.log(price)
    
    await browser.close()
}


startCrawling()