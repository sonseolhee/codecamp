//BE컴퓨터 <=> 外BE컴퓨터 통신

import axios from "axios"

//비동기
function fetchPost() {
    const result = axios.get('https://koreanjson.com/posts/1')
    console.log(result) //Promise {<pending>}
}


//동기
async function fetchPost2(){
    const result = await axios.get('https://koreanjson.com/posts/1')
    console.log(result.data) //실제 데이터 {id: , title, ...}
} 


// fetchPost()
fetchPost2()