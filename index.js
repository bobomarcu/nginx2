const express = require('express')
const app = express()

app.get('/',(req,res)=>{

    res.send('aplicatia 2')

})

app.get('/api',(req,res)=>{

    res.send({obj:'ok'})

})

app.listen(5000,()=>{

    console.log("server is runnig")

})