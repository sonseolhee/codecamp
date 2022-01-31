class AutoCar{
    isAuto = false
    constructor(isAuto){
        this.isAuto = isAuto
    }
    startAutoRobotDrive = () =>{
        if(this.isAuto){
            console.log('자율주행 모드 시작')
        }
    }
}



class MyCar extends AutoCar{

    model = 'BMW'
    hp = 1
    color = 'black'

    constructor(model, hp, color, isAuto){
        super(isAuto)
        this.model = model
        this.hp = hp
        this.color = color
    }

    drive = () => {
        console.log('start driving')
    }

    stop = () => {
        console.log('stop driving')
    }
}

const myCar = new MyCar('Audi', 10, 'red', true)
console.log(myCar.model)
console.log(myCar.hp)
console.log(myCar.color)
console.log(myCar.isAuto)
myCar.startAutoRobotDrive()

