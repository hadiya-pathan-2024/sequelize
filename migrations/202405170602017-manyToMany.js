'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint('user_bids',{
    fields: ['bidder_id'],
    type: 'foreign key',
    name: 'many_fk_user',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
   })

   await queryInterface.addConstraint('user_bids',{
    fields: ['bids_id'],
    type: 'foreign key',
    name: 'many_fk_bids',
    references: {
      table: 'bids',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
   })
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
