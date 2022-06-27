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

 app.post('/api/adminLogin',  function(req, res) {
   
//       admin.create({
//     username: req.body.username,
//     password: req.body.password,
  
// }).catch(err=>{
   
// });

    

    admin.find({}).then(a => {
       
       for (i = 0; i < a.length; i++){
             
           if(a[i].password==req.body.password &&a[i].username==req.body.username ){
            console.log(a[i].password);
             res.send(true);
             return;
           }
         }
         res.send(false);
     }).catch(err=>{
        console.log(err);
     })

});


app.post("/api/userLogin", function(req,res){
   
//    userLogin.create({
//     username: req.body.username,
//     aadhaar: req.body.aadhaar,
//     voter_id: req.body.voter_id,
// }).catch(err=>{
//     console.log(err);
// });
userLogin.find({}).then(a => { //create userlogin(s) db in database elections
       
       for (i = 0; i < a.length; i++){
             
           if(a[i].aadhaar==req.body.aadhaar && a[i].username==req.body.username && a[i].voter_id==req.body.voter_id){
            console.log(a[i].aadhaar);
             res.send(true);
             return;
           }
         }
         res.send(false);
     }).catch(err=>{
        console.log(err);
     })
    
});




const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});