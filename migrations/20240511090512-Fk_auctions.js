'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('auctions',{
      fields: ['seller_id'],
      type: 'foreign key',
      name: 'fk_seller', 
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
     });

     await queryInterface.addConstraint('auctions',{
      fields: ['status_id'],
      type: 'foreign key',
      name: 'fk_status_id', 
      references: {
        table: 'auctions_statuses',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
     });
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeConstraint('auctions');
   
  }
};
