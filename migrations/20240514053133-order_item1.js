'use strict';
const db = require("../models/index")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await db.sequelize.transaction();
   try {
     await queryInterface.createTable('order_items1', {

       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       order_id: {
         type: Sequelize.INTEGER
       },
       product_id: {
         type: Sequelize.STRING
       },
       created_at: {
         allowNull: false,
         type: Sequelize.DATE
       },
       updated_at: {
         allowNull: false,
         type: Sequelize.DATE
       },
       deleted_at: {
         type: Sequelize.DATE
       },
     },{transaction:t});
 
     await queryInterface.addConstraint('order_items1',{
       fields: ['order_id'],
       type: 'foreign key',
       name: 'fk_order_items_order1',
       references: {
         table: 'orders',
         field: 'id'
       },
       onDelete: 'cascade',
       onUpdate: 'cascade'
     },{transaction:t})
 
     await queryInterface.addConstraint('order_items1',{
       fields: ['product_id'],
       type: 'foreign key',
       name: 'fk_order_items_product1',
       references: {
         table: 'products',
         field: 'id'
       },
       onDelete: 'cascade',
       onUpdate: 'cascade'
     },{transaction:t})

     console.log("commit");
     t.commit();
   } catch (error) {
    console.log("Roll back1", error);
    await t.rollback();
    console.log("Roll back2", error);
   }
  },
  async down(queryInterface, Sequelize) {
    const t = await db.sequelize.transaction();
    try{

      await queryInterface.dropTable('order_items1',{transaction:t});
      await t.commit();
    }
    catch{
      await t.rollback();
    }
  }
};