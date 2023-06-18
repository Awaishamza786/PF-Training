const { default: mongoose } = require("mongoose");

const online_user=mongoose.Schema({
    email:{
        type:String,
        required:['true','Please add email of online user']
    }
})

module.exports=mongoose.model('online_user',online_user,'online_user')