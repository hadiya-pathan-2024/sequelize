'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.renameColumn('shipping_addresses','createdAt','created_at')
   await queryInterface.renameColumn('shipping_addresses','updatedAt','updated_at')
   await queryInterface.renameColumn('shipping_addresses','deletedAt','deleted_at')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
