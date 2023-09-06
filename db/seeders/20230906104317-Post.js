/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Posts', [{
      title: 'Анклав был прав или почему 3-ья часть говно',
      body: 'Как вам известно, 3-тья часть Фоллыча крайне прямолинейна и её буквально можно охарактеризовать так: Ты не любишь Братство Стали? Мы ЗАСТВИМ тебя полюбить братство Стали. Мол, серьезно - кто придумал сюжет? Почему нельзя присоединиться к Анклаву?',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'The Divide story',
      body: 'Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bull, Bear-Bear, Bear-Bull, Bull-Bull',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Какой ДЛС вы считаете самым плохим? Поделитесь своим мнением',
      body: 'Лично я считаю, что это MotherShip Zeta. И дело тут не в пришельцах - в Фоллыче всегда было полно странных и забавных вещей. Чего только стоят говорящие кротокрысы, псайкеры и постуронняя фигня. Но, бля - тот, кто придумал эту херню заслуживает бана.',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
