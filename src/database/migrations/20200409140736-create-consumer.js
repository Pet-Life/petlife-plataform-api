module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('consumers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        references: {
          model: 'users',
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
    return queryInterface.dropTable('consumers');
  },
};
