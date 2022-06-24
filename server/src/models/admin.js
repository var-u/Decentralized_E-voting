const mongoose = require('mongoose')

const admin = mongoose.model('admin',{
    username:{
        type: String
    },
    password: {
        type: Number
    },
});

module.exports = admin