const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const db = require('./db')


function getReq(req,res,next){

    console.log({'Method': req.method ,'url': req.originalUrl, 'IP': req.headers['x-forwarded-for'] || req.socket.remoteAddress })
    next()

}


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(getReq);
app.use(express.json())
app.use(cors(
    {origin:['http://192.168.7.150:3000', 'http://192.168.56.1:3000', 'http://192.168.100.50:3000']}
))
app.set('trust proxy', true)

app.get('/',(req,res)=>{

    res.send('aplicatia 2')

})




app.get('/login/:username-:password',(req,res)=>{

    const username = req.params.username
    const password = req.params.password

    db.query(`SELECT * FROM user_data WHERE username = '${username}' `, (err, result)=>{

            if(err) throw err

            if(result.length > 0 ){

                if (result[0].password == password){

                        console.log({id: result[0].id , username: result[0].username})
                        res.send({id: result[0].id , username: result[0].username})

                }
                else{
                    res.status(208).send('bad pass')
                }
    

            }
            else{
                res.status(208).send('bad user')
            }


    })

})

app.get('/register/:username-:password',(req,res)=>{

    const username = req.params.username
    const password = req.params.password


    db.query(`INSERT INTO user_data (id,username,password) VALUES (0,'${username}','${password}')`,(err,result)=>{

        if(err) throw err
        res.send('ok')

    })

})

app.post('/server-status' , (req,res)=>{

    const host = req.body.host
    const port = req.body.port
    const status = req.body.status

    res.send(host + " " + port + " " + status)
})

app.get('/get-pc-data',(req,res)=>{

    db.query('SELECT * FROM pcData',(err,result)=>{
        
        if (err) res.status(500).send('Something went wrong!')
        if(result.length>0){

            var pcArray = [] 

            for (var i = 0 ; i < result.length ; i++){

                var data = {

                        id:result[i].id,
                        user:result[i].user,
                        mem:result[i].mem,
                        cpu:result[i].cpu,
                        host:result[i].host,
                        gpu:result[i].gpu,
                        ip:result[i].ip,
                        os:result[i].os,
                        data:result[i].data

                }
                
                pcArray.push(data)

            }

            res.send(pcArray)

        }
        else{
            res.send(208).send('No pc scanned :(')
        }

    })

})



app.post('/pc-data',(req,res)=>{

    // const procesor = req.params.procesor
    // const os = req.params.os
    // const ip = req.params.ip
    // const numeAdmin = req.params.numeAdmin

    const user = req.body.user;
    const mem = req.body.mem;
    const cpu = req.body.cpu;
    const host = req.body.host;
    const gpu = req.body.gpu;
    const os = req.body.os;
    const data = req.body.data; 

    console.log(data)

    // var pc = {

    //     procesor: procesor,
    //     os: os,
    //     ip: ip,
    //     numeAdmin: numeAdmin

    // }

    db.query(`INSERT INTO pcData (id,user,mem,cpu,host,gpu,os,data) VALUES (0, '${user}', '${mem}' ,'${cpu}' ,'${host}','${gpu}' ,'${os}','${data}')`,(err , result)=>{

        if (err) throw err;
            res.status(200).send('Scan complete');


    })


} )

app.listen(5000,()=>{

    console.log("server is runnig")

})