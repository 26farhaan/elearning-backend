'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JadwalPelajarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hari: {
        type: Sequelize.INTEGER
      },
      mataPelajaran: {
        type: Sequelize.INTEGER
      },
      kelas: {
        type: Sequelize.INTEGER
      },
      jamMulai: {
        type: Sequelize.STRING
      },
      jamSelesai: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('JadwalPelajarans');
  }
};