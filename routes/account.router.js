const router = require("express").Router()
const { createAccount, loginAccount, getAccountById } = require("../services/account.service")
const { multipleupload } = require("../config/multer.config")

router.post("/register",multipleupload.fields([{ name: 'profilePhoto', maxCount: 1 },{ name: 'licenseImage', maxCount: 3},{ name: 'carPhotos', maxCount: 3},{ name: 'insuranceImage', maxCount: 3},]),createAccount)
router.post("/login",loginAccount)
router.get("/single/:id",getAccountById)


module.exports = router