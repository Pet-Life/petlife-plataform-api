module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'api_info',
      [
        {
          version: 1.0,
          description: 'API REST Petlife Plataform',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('api_info', null, {});
  },
};
