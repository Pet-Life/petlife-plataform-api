module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'api',
      [
        {
          version: 1.0,
          description: 'API REST Petlife Plataform',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('api', null, {});
  },
};
