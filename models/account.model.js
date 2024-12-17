const mongoose = require("mongoose")



const AccountSchema = mongoose.Schema({
    role:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    profilePhoto:{type:String,required:true},
    dob:{type:String,required:true},
    licenseImage: { type: String, default: null },
    insuranceImage: { type: String, default: null },
    carPhoto:{ type: Array, required: true },
})



const Account = mongoose.model("Account",AccountSchema,"Account")


module.exports ={ Account }
