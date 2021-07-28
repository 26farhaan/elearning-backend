'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mapel.belongsTo(models.User, {as: "pengajar", foreignKey : 'id_pengajar'})
    }
  };
  Mapel.init({
    mapelName: DataTypes.STRING,
    description: DataTypes.STRING,
    id_pengajar : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mapel',
  });
  return Mapel;
};