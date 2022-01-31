class SkyUnit{

    height = 100
    constructor(v){
        this.height = height
    }
    run = () => {
        console.log('날라서 도망가자!!')
    }
}

class GroundUnit{
    run = () => {
        console.log('뛰어서 도망가자!!')
    }
}

class Monster extends SkyUnit{
    power = 10

    constructor(v){
        super(v)
        if(v) this.power = v
    }

    attack = () =>{
        console.log('공격~~!!')
        console.log('내 공격력은 '+this.power+" 이야!!" )
    }

}

const myMonster = new Monster()
myMonster.attack()
myMonster.run()


