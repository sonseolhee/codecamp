//Template Literal


function getWelcomeTemplate(user){
    
    const createdAt = "2010-09-07"

    return `
        <html>
            <body>
                <h1>${user.name}님 가입을 환영합니다!!!</h1>
                <hr/>
                <div>이름 : ${user.name}</div>
                <div>나이 : ${user.age}살</div>
                <div>학교 : ${user.school}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
    `
    
}

const myuser = {
    name : "철수", 
    age : 8,
    school : "다람쥐초등학교"
}


getWelcomeTemplate(myuser)

