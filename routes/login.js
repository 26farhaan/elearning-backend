const express = require("express");
const router = express.Router();
const models = require("../models");
const helper = require("../helper")
const md5 = require("md5");
const jwt = require("jsonwebtoken")
const ip = require("ip")

router.post("/", async (req, res) => {
    console.log(req.body)
    try {
        var {email, password, username} = req.body
        if(email){
            await models.User.findOne({
                where : {
                    email : email
                }
            }).then(result => {
                if(result !== null){
                    if(password === undefined){
                        res.status(200).send({
                            success: false,
                            message: "Password tidak boleh kosong!"
                        })
                    } else {
                        const thisPassword = md5(password)
                        if(thisPassword === result.dataValues.password){
                            const token = jwt.sign(result.dataValues, process.env.JWT_KEY, {expiresIn : '1h'})
                            res.status(200).send({
                                success: true,
                                message: "Berhasil login!",
                                data : {...result.dataValues, token : token}
                            })
                        } else {
                            res.status(200).send({
                                success: false,
                                message: "Password salah!"
                            })
                        }
                    }
                } else {
                    res.status(200).send({
                        success : false,
                        message : "Cannot find user!"
                    })
                }
            })
        } else {
            res.status(200).send({
                success : false,
                message : "Email is required!"
            })
        }
    } catch (error) {
        console.log("ERROR =========>", error)
        res.status(500).send({
            success : false,
            message : error.message
        })
    }
})

module.exports = router