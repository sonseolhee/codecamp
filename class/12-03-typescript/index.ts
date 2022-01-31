
//문자타입 - 타입추론
let aaa: string = 'Hello'
aaa = 'AAA'
// aaa = 3 //error


//문자타입
let bbb: string = '반갑습니다.'
bbb = '반가워요!!!'
// bbb = 123

//숫자타입
let ccc: number = 5
ccc = 100

//불린타입
let ddd: boolean = true
// ddd = 11
ddd = false


//배열타입
let eee: number[] = [1,2,3,4,5]
let fff: string[] = ['a', 'b', 'x']
let ggg: (number|string)[] = [1, 'a', 3, 'c']

let mymoney: number[] | string[] = [100, 200, 300]
mymoney = ['100원', '200원','300원']

//객체타입
interface IProfile {
    name: string
    age: number | string
    school: string
}

let profile: IProfile = {
    'name': '설희',
    'age': 13,
    'school': '다람쥐초등학교'
}
profile.age = '10살'

//함수타입
function qqq(a: number,b: number): number{
    return a+b
}
qqq(1, 2)
// qqq(1, "0")
// qqq('a', 'b')

