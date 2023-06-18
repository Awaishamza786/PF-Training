const { default: mongoose } = require("mongoose");

const offline_user=mongoose.Schema({
    email:{
        type:String,
        required:['true','Please add email of online user']
    }
})

module.exports=mongoose.model('offline_user',offline_user,'offline_user')