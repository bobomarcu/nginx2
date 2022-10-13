const express = require('express')
const cors = require('cors')
const app = express()

function getReq(req,res,next){

    console.log({'Method': req.method ,'url': req.originalUrl, 'IP': req.headers['x-forwarded-for'] || req.socket.remoteAddress })
    next()

}

app.use(getReq);
app.use(express.json())
app.use(cors(
    {
        origin: 'http://192.168.7.150:3000'
    }
))
app.set('trust proxy', true)

app.get('/',(req,res)=>{

    res.send('aplicatia 2')

})

app.get('/api',(req,res)=>{

    res.send('aplicatia 2');

})

app.listen(5000,()=>{

    console.log("server is runnig")

})