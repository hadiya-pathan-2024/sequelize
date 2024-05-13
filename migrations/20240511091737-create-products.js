'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      auction_id: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      seller_id: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      product_condition: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      starting_price: {
        type: Sequelize.INTEGER
      },
      bid_price_interval: {
        type: Sequelize.INTEGER
      },
      reserved_price: {
        type: Sequelize.INTEGER
      },
      winning_bid: {
        type: Sequelize.INTEGER
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('products',{
      fields: ['auction_id'],
      type: 'foreign key',
      name: 'fk_auction_id', 
      references: {
        table: 'auctions',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
     });

     await queryInterface.addConstraint('products',{
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_category_id', 
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
     });

     await queryInterface.addConstraint('products',{
      fields: ['seller_id'],
      type: 'foreign key',
      name: 'fk_seller_id', 
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
     });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
    await queryInterface.removeConstraint('products');
  }
};