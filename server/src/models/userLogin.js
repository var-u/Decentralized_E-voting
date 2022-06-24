const mongoose = require('mongoose')

const userLogin = mongoose.model('userlogin',{
    username:{
        type: String
    },
    aadhaar: {
        type: Number
    },
});

module.exports = userLogin