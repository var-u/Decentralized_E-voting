const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');
const electionName = require('./models/electionName');
const admin = require('./models/admin')
const userLogin=require('./models/userLogin');
const md5 = require('md5');
require('./db/mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', function(req, res) {
    res.json('Works!');
});

app.get('/api/electionName', function(req, res) {
    // var electionNames = []
    // var electionOrganizers = []
    // var electionIds = []
    var final = []
    electionName.find({}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++){
            // electionNames[i] = eachOne[i].election_name ;
            // electionOrganizers[i] = eachOne[i].election_organizer;
            // electionIds[i] = eachOne[i].election_id;
            final.push({
                'election_id': eachOne[i].election_id,
                'election_organizer': eachOne[i].election_organizer,
                'election_name': eachOne[i].election_name
            })
        }
        res.send(final);
    })
})

app.post('/api/electionName', async function(req, res) {
    electionName.create({
        election_id: Math.floor(Math.random() * 100),
        election_name: req.body.election_name,
        election_organizer: req.body.election_organizer,
        election_password: md5(req.body.election_password),
    }).then(election => {
        res.json(election);
        console.log(election);
    });
});

app.post('/api/adminLogin', async function(req, res) {
   
    const username= req.body.username;
    const  password= req.body.password;

    

   
    admin.findOne({_id:username+password},function(response,err){
       
        if(response){
            res.send(true);
        }
        else{
            res.send(false);
        }
    });

});


// app.post("/api/userLogin", function(req,res){
//     const username= req.body.username;
//    const  aadhaar= req.body.aadhaar;
  
//    userLogin.find({}).then(a => {
//     console.log(a);
//     for (i = 0; i < a.length; i++){
//         console.log(a[i].aadhaar);
//       if(a[i].aadhaar==aadhaar){
//         res.send(false);
//       }
//     }
//     res.send(true);
// })
// });
app.post("/api/userLogin", function(req,res){
    const username= req.body.username;
   const  aadhaar= req.body.aadhaar;
  
   userLogin.find({aadhaar:aadhaar},function(err,response){
    console.log(response);
    if(err){
        res.send(false);
    }
    else{
        res.send(true);
    }
   })
    
});



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});