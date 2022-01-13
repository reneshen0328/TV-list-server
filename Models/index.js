const { Show } = require("./Show");
const { User } = require("./User");

Show.belongsTo(User);
User.hasMany(Show);

// async function association() {
//     let testShow = await Show.create({ title: "New Girl"})
//     let testUser = await User.create({ emailaddress: "z@gmail.com" })

//     await testShow.addUser(testUser);
//     console.log(testShow)
// }

// association();

module.exports = { Show, User }