const express = require("express");
const router = express.Router();
const models = require("../models");
const md5 = require("md5")
const helper = require("../helper");

router.get("/", async (req, res) => {
    const {page, limit, role} = req.query
    const mapel = await models.Mapel.findAndCountAll({
        offset: page ? parseInt(page) : 0,
        limit: limit ? parseInt(limit) : 100,
        include: [{
            model: models.User,
            as: 'pengajar',
        }]
        // where : {
        //     role_id : role
        // }
    })
    res.status(200).send({
        succsess : true,
        message: "Success get all mata pelajaran!",
        data : mapel
    })
});

router.post("/", async (req, res) => {
    const {mapelName, description, id_pengajar} = req.body
    try {
        var Mapel = await models.Mapel.create({
            mapelName : mapelName,
            description : description,
            id_pengajar : parseInt(id_pengajar)
        })
        res.status(200).send({
            success : true,
            message : "Success menambahkan mata pelajaran baru!",
            data : Mapel
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router