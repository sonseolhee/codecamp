import axios from 'axios'
import cheerio from 'cheerio'


import { Token } from '../models/token.model.js'
import { User } from '../models/user.model.js'

import { EmailService } from './services/member.email.service.js'
import { EncryptService } from './services/member.encrypt.service.js'
import { GetOpenGraphService } from './services/member.og.service.js'


const emailService = new EmailService()
const encryptService = new EncryptService()
const ogService = new GetOpenGraphService()


export class UserController{

    memberRegister = async (req, res) =>{

        const token = await Token.findOne({phone: req.body.phone})
        if(!token.isAuth){
            res.status(422).send('에러!!! 핸드폰 번호가 인증되지 않았습니다.')
            return
        }

        if(token.isAuth && await User.findOne({email: req.body.email})){
            res.status(404).send('이미 가입된 회원 정보가 존재합니다.')
            return
        }

        // ogInfo
        //질문!!! 내가 만든 function도 await로 받아야하나?? 다른 이메일 관련 펑션은 그냥쓰는데?
        const preferAdd = req.body.prefer
        const ogInfo = await ogService.getOpenGraph(preferAdd)

        //personal encrypt
        const personal = req.body.personal
        const encPersonal = encryptService.encryptPersonal(personal)
        
        //가입환영 메일
        const email = req.body.email
        const isValidEmail = emailService.emailValidation(email)
        if(!isValidEmail){
            res.send('이메일을 다시 입력해 주세요.')
            return
        }
        
        const userInfo = req.body
        const template = emailService.getWelcomeTemplate(userInfo)
        emailService.sendWelcomeMail(email, template)
        
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            personal: encPersonal,
            prefer: req.body.prefer,
            pwd: req.body.pwd,
            phone: req.body.phone,
            og : {
                title: ogInfo.title,
                description: ogInfo.description,
                image: ogInfo.image
            }

        })
        
        await user.save()

        const user_final = await User.findOne({ phone : req.body.phone})
        res.send(user_final._id)

    }


    memberList = async (req , res) => {
        const users = await User.find({}, {
            _id:0,
            name:1,
            email:1,
            personal:1,
            prefer:1,
            phone:1,
            og:1
        } )
        res.send(users)

    }

}