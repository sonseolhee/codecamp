const aaa = new Date()

console.log(aaa.getFullYear())
console.log(aaa.getMonth() + 1)



class Monster{
    power = 10

    constructor(power){
        this.power = power
    }

    attack = () =>{
        console.log('공격~~!!')
        console.log('내 공격력은 '+this.power+" 이야!!" )
    }

    run = () => {
        console.log('도망가자!!')
    }

}

const myMonster = new Monster(50)
myMonster.attack()
myMonster.run()


const myMonster1 = new Monster(20)
myMonster1.attack()
myMonster1.run()



