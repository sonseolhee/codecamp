import axios from "axios";
import cheerio from "cheerio";

//mongoDB
// filter -> scraping ->save
async function getOpenGraph(mydata){

    const myaddress = mydata.contents.split(' ').filter( e => e.includes('http'))
    console.log(myaddress)
    const html = await axios.get( myaddress[0] )
    console.log(html)


    const ogInfo = {}
    const $ = cheerio.load(html.data)
    $('meta').each(( _ , el ) => {
        const key = $(el).attr('property')?.split(':')[1]
        if(key){
            const value = $(el).attr('content')
            console.log(key, value)
            ogInfo[key] = value
        }
    })

    console.log(ogInfo)

}

const mydata = {
    title : "안녕하세요~~",
    contents : "여기좋음 일로오셈 https://naver.com"
}


getOpenGraph(mydata)