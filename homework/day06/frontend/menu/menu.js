// 커피 목록 조회 API를 요청해주세요.
const getCoffee = () => {
  
  axios.get("http://localhost:3000/5").then(( {data} ) => {
//기본적으로 JS는 비동기로 실행되기 때문에 받으면 줄게 하는 약속(promise) 방식으로 data를 가져옴
//완벽하게 기다렸다가 받으려면 async/await 사용해야됨

  console.log(data)
    data.forEach(item => (createMenuCard(item)))
  })

  // 받은 데이터로 createMenuCard 함수를 이용해
  // 메뉴 카드를 만들어주세요.
  
}

const createMenuCard = (data) => {
  const menuCardWrapper = document.createElement('div')
  menuCardWrapper.className = 'Menu_Card_Wrapper'

  const menuCardImgBox = document.createElement('div')
  menuCardImgBox.className = 'Menu_Card_ImgBox'

  const menuCardName = document.createElement('div')
  menuCardName.className = 'Menu_Card_Name' 
  menuCardName.textContent = data?.name || '메뉴이름'

  const menuCardInfo = document.createElement('div')
  menuCardInfo.className = 'Menu_Card_Info'
  menuCardInfo.textContent = data?.Kcal || '칼로리'

  const menuWrapper = document.querySelector('#Menu_Background')
  menuCardWrapper.appendChild(menuCardImgBox)
  menuCardWrapper.appendChild(menuCardName)
  menuCardWrapper.appendChild(menuCardInfo)
  menuWrapper.appendChild(menuCardWrapper)
} 
 


