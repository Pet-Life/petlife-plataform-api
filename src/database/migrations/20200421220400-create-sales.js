module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      priceTotal: {
        allowNull: false,
        type: Sequelize.REAL,
      },
      shopId: {
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      consumerId: {
        allowNull: false,
        references: {
          model: 'consumers',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('sales');
  },
};
