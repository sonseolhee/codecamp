// const express = require('express')


import express from "express"
const app = express()
app.use(express.json())

app.get('/boards', function (req, res) {
  
  
  
  // res.send('조회에 성공하였습니다.')
  //{number : 4, writer : '', title : '()제목', contents : ''}
  res.send([
    
    {number : 1, writer : '철수', title : '(철수)제목', contents : '철수내용'},
    {number : 2, writer : '영희', title : '(영희)제목', contents : '영희내용'},
    {number : 3, writer : '훈이', title : '(훈이)제목', contents : '훈이내용'}

  ])

})


app.post('/boards', function (req, res){

  // console.log(req)
  console.log(req.body)

  res.send('등록에 성공하였습니다.')
})

app.listen(3000)