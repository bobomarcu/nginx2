const express = require('express')
const app = express()

app.get('/',(req,res)=>{

    res.send('aplicatia 2')
    console.log(req)

})

app.listen(5000,()=>{

    console.log("server is runnig")

})