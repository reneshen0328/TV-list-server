const path = require("path");
const fs = require("fs").promises;

const {db, DataTypes} = require("./db");
const { Show } = require("./Models/Show");
const { User } = require("./Models/User");

const seed = async () => {
    await db.sync({ force : true });

    const seedPathShow = path.join(__dirname,"shows.json");
    const seedPathUser = path.join(__dirname,"users.json")

    const bufferShow = await fs.readFile(seedPathShow);
    const { dataShows } = JSON.parse(bufferShow);

    const bufferUser = await fs.readFile(seedPathUser);
    const { dataUsers } = JSON.parse(bufferUser);

    const showPromises = dataShows.map(show => Show.create(show));
    const userPromises = dataUsers.map(user => User.create(user));

    await showPromises.all();
    await userPromises.all();

    console.log(`All of the shows and users model have been created!`)
}

seed();

Show.hasOne(User);
User.hasMany(Show);