import puppeteer from 'puppeteer'

async function startCrawling(){

    const browser = await puppeteer.launch({ headless: false})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto('https://finance.naver.com/item/sise.naver?code=005930')
    await page.waitForTimeout(1000)
    const myIframPage = await page.frames().find(iframe => iframe.url().includes("/item/sise_day.naver?code=005930"))


    // for(){
        await page.waitForTimeout(5000)
        const price = await myIframPage.$eval("body > table.type2 > tbody > tr:nth-child(3) > td:nth-child(2) > span", el => el.textContent)
        console.log(price)
    // }
    

    await browser.close()
}


startCrawling()