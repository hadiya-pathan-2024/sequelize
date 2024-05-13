'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('Users',['first_name','email'])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Users')
  }
};
