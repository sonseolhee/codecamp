// const express = require('express')


import express from "express"
import  a from "./index copy.js"
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import {options} from './swagger/config.js'


const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));



app.get('/boards', function (req, res) {
  
 
  res.send([
    
    {number : 1, writer : '철수', title : '(철수)제목', contents : '철수내용'},
    {number : 2, writer : '영희', title : '(영희)제목', contents : '영희내용'},
    {number : 3, writer : '훈이', title : '(훈이)제목', contents : '훈이내용'}

  ])

})



app.post('/boards', function (req, res){

  console.log(req.body)

  res.send('등록에 성공하였습니다.')
})



// {"phoneNum" : "01067411673"}
app.post('/tokens/phone', function (req, res){

  const num = req.body.phoneNum
  console.log(num)
  const token = a(num, 6)

  res.send(token)

})

app.listen(3000)