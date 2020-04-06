module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'company_info',
      [
        {
          name_company: 'Petlife',
          description: 'Petlife é uma plataforma de e-commerce para Pet Shop',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('company_info', null, {});
  },
};
