const express = require("express");
const router = express.Router();
const models = require("../models");
const md5 = require("md5")
const helper = require("../helper");
const Auth = require("../middleware/auth")

router.get("/", async (req, res) => {
    const {page, limit, role} = req.query
    const User = await models.User.findAndCountAll({
        offset: page ? parseInt((page * limit)) : 0,
        limit: limit ? parseInt(limit) : 100,
        include: [{
            model: models.Kelas,
            as: 'kelas',
        }],
        where : {
            role_id : role,
        },
    })
    res.status(200).send({
        succsess : true,
        message: "Success get all user!",
        data : User
    })
});

module.exports = router