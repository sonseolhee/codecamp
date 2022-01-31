


// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {

  //휴대폰번호 가져오기
  let first = document.getElementById("PhoneNumber01").value
  let mid = document.getElementById("PhoneNumber02").value
  let fin = document.getElementById("PhoneNumber03").value

  let phoneNumber = first+mid+fin

  // console.log("========================================" + phoneNumber)
  
  
  
  await axios.post("http://localhost:3000/tokens/phone" ,
  
  {
    phoneNum : phoneNumber 
  }
  
  ).then( (res) =>{
    console.log(res) 
    // data: {
    //   header: { resultCode: 0, resultMessage: 'SUCCESS', isSuccessful: true },
    //   body: { data: [Object] }
    // }
  })

  document.querySelector('#ValidationInputWrapper').style.display = 'flex'

  console.log('인증번호 전송')

}

// 회원 가입 API 요청
const submitSignup = async () => {

  //휴대폰번호 가져오기
  let first = document.getElementById("PhoneNumber01").value
  let mid = document.getElementById("PhoneNumber02").value
  let fin = document.getElementById("PhoneNumber03").value

  let phoneNumber = first+mid+fin

  const userinfo = {
    "name": document.getElementById("SignupName").value ,
    "socialNum": `${document.getElementById("SignupPersonal").value}-*******`,
    "phoneNum": phoneNumber,
    "favoriteSite": document.getElementById("SignupPrefer").value ,
    "email": document.getElementById("SignupEmail").value ,
    "password": document.getElementById("SignupPwd").value
  }
  console.log(userinfo)
  await axios.post("http://localhost:3000/users", {
    user : userinfo
  })

  console.log('회원 가입 이메일 전송')
}

