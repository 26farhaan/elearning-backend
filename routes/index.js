const express = require("express");
const router = express.Router();
const getAllUser = require("./allUser");
const editUser = require("./editUser")
const login = require("./login")
const kelas = require("./kelas")
const mataPelajaran = require("./mapel")
const JadwalPelajaran = require("./jadwalPelajaran")
const Auth = require("../middleware/auth")

router.use("/login", login);
router.use("/all-user", getAllUser);
router.use("/user", Auth([1]), editUser);
router.use("/mata-pelajaran", Auth([1]), mataPelajaran);
router.use("/jadwal-pelajaran", Auth([1, 3]), JadwalPelajaran);
router.use("/kelas", Auth([1]), kelas);

module.exports = router