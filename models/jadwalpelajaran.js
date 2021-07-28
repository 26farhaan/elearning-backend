'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JadwalPelajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JadwalPelajaran.belongsTo(models.Kelas, {as: "data_kelas", foreignKey : 'kelas'})
      JadwalPelajaran.belongsTo(models.Mapel, {as: "data_pelajaran", foreignKey : 'mataPelajaran'})
      // define association here
    }
  };
  JadwalPelajaran.init({
    hari: DataTypes.INTEGER,
    mataPelajaran: DataTypes.INTEGER,
    kelas: DataTypes.INTEGER,
    jamMulai: DataTypes.STRING,
    jamSelesai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JadwalPelajaran',
  });
  return JadwalPelajaran;
};