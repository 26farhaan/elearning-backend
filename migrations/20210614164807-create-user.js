'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      password: {
        type : Sequelize.STRING,
        allowNull : false
      },
      role_id: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true
      },
      id_kelas: {
        type: Sequelize.INTEGER(3)
      },
      id_mapel: {
        type: Sequelize.INTEGER(3)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};