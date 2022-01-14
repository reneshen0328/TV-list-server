const { Show } = require("./Show");
const { User } = require("./User");

Show.belongsTo(User);
User.hasMany(Show);

async function association() {
  let testShow = await Show.create({
    title: "New Girl",
    genre: "sitcom, rom com, drama",
    rating: 4.7,
    status: "ended",
  });
  let testUser = await User.create({
    emailaddress: "z@gmail.com",
    password: "abkdfalij",
  });

  await testUser.addShow(testShow);

  // Sequelize method to test if addShow is succeed
  const userShow = await testUser.getShows();
  console.log(userShow)
}

module.exports = { Show, User, association };
