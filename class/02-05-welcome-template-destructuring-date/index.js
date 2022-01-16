
function getCurrentDate(){

    const date = new Date()
    const yyyy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()

    return `${yyyy}-${mm}-${dd}`

}


function getWelcomeTemplate( {name, age, school} ){
    
    const createdAt = getCurrentDate()

    return `
        <html>
            <body>
                <h1>${name}}님 가입을 환영합니다!!!</h1>
                <hr/>
                <div>이름 : ${name}</div>
                <div>나이 : ${age}살</div>
                <div>학교 : ${school}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
    `
    
}

const myuser = {
    name : "철수", 
    age : 8,
    school : "다람쥐초등학교",
    email : "a@gmail.com"
}


getWelcomeTemplate(myuser)

