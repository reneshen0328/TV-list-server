const { db, DataTypes, Model } = require("../db");

class Show extends Model{};

Show.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.NUMBER,
    status: DataTypes.ENUM("renewed","canceled","ended")
},{
    sequelize: db
})

module.exports = { Show };