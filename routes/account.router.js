const router = require("express").Router()
const { createAccount, loginAccount, getAccountById } = require("../services/account.service")
const { multipleupload } = require("../config/multer.config")

router.post("/register",multipleupload.fields([{ name: 'profilePhoto', maxCount: 1 },{ name: 'licenseImage', maxCount: 1},{ name: 'carPhotos', maxCount: 1},{ name: 'insuranceImage', maxCount: 1},]),createAccount)
router.post("/login",loginAccount)
router.get("/single/:id",getAccountById)


module.exports = router