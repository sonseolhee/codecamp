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
  console.time("========개별 Promise 각각========");
  const result1 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 2000);
  });

  const result2 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 3000);
  });

  const result3 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 1000);
  });

  console.timeEnd("========개별 Promise 각각========");
}

async function fetchData2() {
  console.time("========한방에 Promise all========");

  const results = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 2000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 3000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 1000);
    }),
  ]);

  console.timeEnd("========한방에 Promise all========");
}

fetchData();
fetchData2();
