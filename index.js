const express = require('express')
const app = express()

function getReq(req,res,next){

    console.log({'Method': req.method ,'url': req.originalUrl, 'IP': req.ip })
    next()

}

app.use(getReq);
app.set('trust proxy', true)

app.get('/',(req,res)=>{

    res.send('aplicatia 2')

})

app.get('/api',(req,res)=>{

    res.send('ok');

})

app.listen(5000,()=>{

    console.log("server is runnig")

})