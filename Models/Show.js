const { db, DataTypes, Model } = require("../db");

class Show extends Model{};

Show.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.NUMBER,
    status: DataTypes.STRING
},{
    sequelize: db
})

const genres = ["sitcom","office humor","pseudo documentary","comedy","police procedural","satire","surreal humor","horror","thriller","teen","rom com","drama","reality tv","mystery","sci-fi"]

module.exports = { Show , genres };