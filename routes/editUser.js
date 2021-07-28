const express = require("express");
const router = express.Router();
const models = require("../models");
const md5 = require("md5")
const helper = require("../helper");

router.post("/add-user", async (req, res) => {
    try {
        var {fullName, username, email, password, role_id, phoneNumber, id_kelas} = req.body
        if(password !== undefined){password = md5(password)}
        var body = {fullName, username, email, password, role_id, phoneNumber}
        if(helper.bodyValidation(body, res)){
            if(body.role_id === 3){
                Object.assign(body, {id_kelas : id_kelas})
            }
            body.phoneNumber = parseInt(body.phoneNumber)
            var User = await models.User.create(body)
            res.status(200).send({
                success : true,
                message : "Success add new user!",
                data : User
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.parent.errno === 1062 ? Object.keys(error.fields).map(res => res) + " sudah digunakan!" : error.message
        })
    }
})

router.post("/delete-user", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.put("/edit-user/:id", async (req, res) => {
    var {id} = req.params
    var {fullName, username, email, password, role_id, phoneNumber} = req.body
    const body = {fullName, username, email, md5password, role_id, phoneNumber}
    console.log(body)
    // try {
    //     if(helper.bodyValidation(body, res)){
    //         var User = await models.User.update({...body, password : md5(password)}, role_id, phoneNumber, {where : {
    //             id : req.params.id
    //         }})
    //         res.status(200).send({
    //             success: true,
    //             message: "Success update user!",
    //             data : User
    //         })
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
})

module.exports = router