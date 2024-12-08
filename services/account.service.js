const { Account } = require("../models/account.model");
const bcrypt = require("bcryptjs")
const { uploadFile } = require("../utils/function")







const createAccount = async (req, res) => {
    try {
        let { role, username, email, password, dob } = req.body
        let findUser = await Account.findOne({ email })
        if (findUser) {
            return res.status(400).json({ data: null, msg: "Account already exits", code: 400 })
        }
        else {
            if (role == "rider") {
                let profilePhoto = req.files.profilePhoto && req.files.profilePhoto;
                let output;
                if (profilePhoto && profilePhoto.length > 0) {
                    const uploadPromises = profilePhoto.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output = await Promise.all(uploadPromises);
                }
                let hash = await bcrypt.hash(password,10)
                let result = await Account.create({role,username,email,password:hash,dob,profilePhoto:output})
                return res.status(200).json({data:result,msg:null,status:200})
            }
            else{
                let profilePhoto = req.files.profilePhoto && req.files.profilePhoto;
                let licenseImage = req.files.licenseImage && req.files.licenseImage;
                let insuranceImage = req.files.insuranceImage && req.files.insuranceImage;
                let carPhotos = req.files.carPhotos && req.files.carPhotos;

                let output;
                let output2;
                let output3;
                let output4;

                if (profilePhoto && profilePhoto.length > 0) {
                    const uploadPromises = profilePhoto.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output = await Promise.all(uploadPromises);
                }
                if (licenseImage && licenseImage.length > 0) {
                    const uploadPromises = licenseImage.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output2 = await Promise.all(uploadPromises);
                }
                if (insuranceImage && insuranceImage.length > 0) {
                    const uploadPromises = insuranceImage.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output3 = await Promise.all(uploadPromises);
                }
                if (carPhotos && carPhotos.length > 0) {
                    const uploadPromises = carPhotos.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output4 = await Promise.all(uploadPromises);
                }

                let hash = await bcrypt.hash(password,10)
                let result = await Account.create({role,username,email,password:hash,dob,profilePhoto:output,carPhotos:output4,insuranceImage:output3,licenseImage:output2})
                return res.status(200).json({data:result,msg:null,status:200})
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}


const loginAccount = async(req,res)=>{
    try {
        let {email, password} = req.body
        let findUser = await Account.findOne({ email })
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400})
        }
        else{
            let compare = await bcrypt.compare(password,findUser.password)
            if(compare){
                return res.status(200).json({ data: findUser,code: 200 })
            }
            else{
                return res.status(403).json({ data: null, msg: "Invalid credentails", code: 403 }) 
            }
        }
    } 
    catch (error) {
        console.log(error)
    }
}

const getAccountById = async (req,res)=>{
    try {
        let findUser = await Account.findById(req.params.id)
        return res.status(200).json({ data: findUser,code: 200 })

    } 
    catch (error) {
        console.log(error)
    }
}


module.exports = { createAccount,loginAccount,getAccountById}