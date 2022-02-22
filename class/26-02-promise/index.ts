// 1. 가장기본방법

// new Promise((resolve, reject) => {
//   //작업실행

//   if(성공){
//     resolve()
//   }
//   if(실패){
//     reject()
//   }
// })

/*
const result = new Promise((resolve, reject) => {
  //작업실행
  setTimeout(() => {
    //외부에 데이터 보내고 받는데 2초 걸린다 가정
    try {
      resolve("성공시 받는데이터");
    } catch (error) {
      reject("Fail");
    }
  }, 2000);
});

async function fetchData() {
  const result = await new Promise((resolve, reject) => {
    //작업실행
    console.log("작업시작");
    setTimeout(() => {
      //외부에 데이터 보내고 받는데 2초 걸린다 가정
      try {
        resolve("성공시 받는 데이터");
      } catch (error) {
        reject("Fail");
      }
    }, 2000);
  });

  console.log(result);
  console.log("끝");
}

fetchData();
*/

async function fetchData() {
  const result = await new Promise((resolve, reject) => {});
}
