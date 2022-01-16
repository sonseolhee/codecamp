// 회원가입 축하 템플릿 생성

function createWelcomeTemplate( {email, socialNum, phoneNum, myFavWeb } ){

    // 내용 포함 콘솔 출력
    return  console.log(`
        <html>
            <body>
                <div> To : ${email} </div>
                
                <h1> 가입을 환영합니다!!! </h1>
                <hr/>
                <div> 개인정보 </div>
                <div> 주민번호 : ${socialNum}</div>
                <div> 전화번호 : ${phoneNum}</div>
                <div> 관심사이트 : ${myFavWeb}</div>
            </body>
        </html>
    `)
}


// 이메일, 주민번호, 휴대폰 번호, 내가 좋아하는 사이트를 함수의 입력
const userInfo = {
    email : 'elma1673@gamil.com',
    socialNum : '931015-1234567',
    phoneNum : '010-1234-5678',
    myFavWeb : 'codecamp.com'
}


createWelcomeTemplate(userInfo)


