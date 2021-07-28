const express = require("express");
const router = express.Router();
const models = require("../models");
const md5 = require("md5")
const helper = require("../helper");

router.get("/", async (req, res) => {
    const {page, limit, role} = req.query
    const mapel = await models.Kelas.findAndCountAll({
        offset: page ? parseInt(page) : 0,
        limit: limit ? parseInt(limit) : 100,
        include: [{
            model: models.User,
            as: 'wali_kelas',
        }],
        // where : {
        //     role_id : role
        // }
    })
    res.status(200).send({
        succsess : true,
        message: "Success get all kelas!",
        data : mapel
    })
});

router.post("/", async (req, res) => {
    const {namaKelas, description, waliKelas} = req.body
    try {
        var Kelas = await models.Kelas.create({
            namaKelas : namaKelas,
            deskripsi : description,
            waliKelas : parseInt(waliKelas)
        })
        res.status(200).send({
            success : true,
            message : "Success menambahkan kelas baru!",
            data : Kelas
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

router.put("/", async (req, res) => {
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