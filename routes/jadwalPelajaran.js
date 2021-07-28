const express = require("express");
const router = express.Router();
const models = require("../models");
const md5 = require("md5")
const helper = require("../helper");
const { parse } = require("dotenv");

router.get("/", async (req, res) => {
    const japel = await models.JadwalPelajaran.findAndCountAll({
        include: [{
            model: models.Kelas,
            as: 'data_kelas',
        }, {
            model: models.Mapel,
            as: 'data_pelajaran',
        }]
    })

    const Pengajar = await models.User.findAndCountAll({
        where : {
            role_id : 2,
        }
    })
    
    japel.rows.map(res => {
        res.dataValues.data_pelajaran.dataValues = {...res.dataValues.data_pelajaran.dataValues, namaPengajar : Pengajar.rows.filter(data => data.dataValues.id === res.dataValues.data_pelajaran.dataValues.id_pengajar)[0].fullName}
    })
    
    res.status(200).send({
        succsess : true,
        message: "Success get all jadwal pelajaran!",
        data : japel
    })
});

router.get("/by-siswa/:id", async (req, res) => {
    console.log(req.params)
    const japel = await models.JadwalPelajaran.findAndCountAll({
        include: [{
            model: models.Kelas,
            as: 'data_kelas',
        }, {
            model: models.Mapel,
            as: 'data_pelajaran',
        }],
        where : {
            kelas : parseInt(req.params.id),
        },
    })

    const Pengajar = await models.User.findAndCountAll({
        where : {
            role_id : 2,
        }
    })
    
    japel.rows.map(res => {
        res.dataValues.data_pelajaran.dataValues = {...res.dataValues.data_pelajaran.dataValues, namaPengajar : Pengajar.rows.filter(data => data.dataValues.id === res.dataValues.data_pelajaran.dataValues.id_pengajar)[0].fullName}
    })
    
    res.status(200).send({
        succsess : true,
        message: "Success get all jadwal pelajaran!",
        data : japel
    })
});

router.post("/", async (req, res) => {
    const {hari, kelas, jamMulai, jamSelesai, mataPelajaran} = req.body
    try {
        var japel = await models.JadwalPelajaran.create({
            hari : parseInt(hari),
            mataPelajaran : parseInt(mataPelajaran),
            kelas : parseInt(kelas),
            jamMulai: jamMulai,
            jamSelesai : jamSelesai
        })
        res.status(200).send({
            success : true,
            message : "Success menambahkan jadwal pelajaran baru!",
            data : japel
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