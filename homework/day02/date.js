// 날짜/시간을 생성하는 함수를 하나 만들고, 해당 함수를 실행하면 “오늘은 2020년 12월 2일 11:30:29 입니다.” 라는 메시지가 콘솔에 출력되도록 만들어 주세요.

function createDateTimeFn(){

    const date = new Date('2020-12-2 11:30:29')

    const yyyy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    const HH = date.getHours()
    const MM = date.getMinutes()
    const ss = date.getSeconds()

    const str =  `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${HH}:${MM}:${ss} 입니다.`
    
    console.log(str)
}




createDateTimeFn()