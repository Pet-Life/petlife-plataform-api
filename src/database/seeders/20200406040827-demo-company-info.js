module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'company',
      [
        {
          name_company: 'Petlife',
          description: 'Petlife é uma plataforma de e-commerce para Pet Shop',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('company', null, {});
  },
};
