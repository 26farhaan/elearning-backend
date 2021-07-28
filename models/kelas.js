'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kelas.belongsTo(models.User, {as: "wali_kelas", foreignKey : 'waliKelas'})
    }
  };
  Kelas.init({
    namaKelas: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    waliKelas: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Kelas',
  });
  return Kelas;
};