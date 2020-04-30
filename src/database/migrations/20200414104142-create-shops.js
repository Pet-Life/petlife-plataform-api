module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      permissionLevel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      cnpj: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      deliveryType: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      businessHours: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
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
        type: Sequelize.GEOMETRY('POINT'),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('shops');
  },
};
