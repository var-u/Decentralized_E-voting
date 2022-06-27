const mongoose = require('mongoose')

const userLogin = mongoose.model('userlogin',{
    username:{
        type: String
    },
    aadhaar: {
        type: Number
    },
    voter_id:{
        type:String
    },
    wallet:{
        type:String,
    }
  
});

module.exports = userLogin