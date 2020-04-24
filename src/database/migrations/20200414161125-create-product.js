module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      photo: {
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      manufacturer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      unityPrice: {
        allowNull: false,
        type: Sequelize.REAL,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shopId: {
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('products');
  },
};
