import axios from 'axios'
import cheerio from 'cheerio'


export class GetOpenGraphService {

    getOpenGraph = async (preferAdd) => {
        let ogInfo = {}
        const html = await axios.get(preferAdd)
        const $ = cheerio.load(html.data)  
        $('meta').each((_ , el) => {
            const key = $(el).attr('property')?.split(':')[1]
            if(key){
                const value = $(el).attr('content')
                // console.log(key, value)
                ogInfo[key] = value
            }
        })
    
        // console.log(ogInfo)
        return ogInfo
    }
}