module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
          'order_items_again',{
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
        },
          { transaction: t },
        ),
        queryInterface.addConstraint('order_items_again',{
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_order_itemsOrder',
          references: {
            table: 'orders',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        },{transaction:t}),

        queryInterface.addConstraint('order_items_again',{
          fields: ['product_id'],
          type: 'foreign key',
          name: 'fk_order_itemsProduct',
          references: {
            table: 'products',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        },{transaction:t})
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      console.log("down");
      return Promise.all([
         queryInterface.dropTable('order_items_again',{transaction:t}) 
      ]);
    });
  },
};