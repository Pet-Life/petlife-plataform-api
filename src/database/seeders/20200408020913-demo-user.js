module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@gmail.com',
          password: 'admin',
          permissionLevel: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
