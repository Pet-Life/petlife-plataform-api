module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('adresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.INTEGER,
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      complement: {
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      coordinates: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.REAL),
      },
      consumerId: {
        references: {
          model: 'consumers',
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
    return queryInterface.dropTable('adresses');
  },
};
