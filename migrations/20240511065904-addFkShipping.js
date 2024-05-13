'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint('shipping_addresses',{
    fields: ['user_id'],
    type: 'foreign key',
    name: 'FK_projectType_project', 
    references: {
      table: 'Users',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
   });    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint('shipping_addresses');
     
  }
};
