const express = require("express");
const app = express();

const { seed } = require("./index");
const { Show, User, association } = require("./Models/index");
const PORT = 8080;
const { Op } = require("sequelize");

// Body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`I'm getting data!`);
});

// A route that will get all the users.
app.get("/users", async (req, res) => {
  const allUsers = await User.findAll();
  res.json({ allUsers });
});

// A route that will get one user.
app.get("/users/:id", async (req, res) => {
  const userId = await User.findByPk(req.params.id);
  res.json({ userId });
});

// A route that will get all the shows.
app.get("/shows", async (req, res) => {
  const allShows = await Show.findAll();
  res.json({ allShows });
});

// A route that will get one show.
app.get("/shows/:id", async (req, res) => {
  const showId = await Show.findByPk(req.params.id);
  res.json({ showId });
});

// A route that can create a user and show.
app.post("/users", async (req, res) => {
  await User.create(req.body);
  res.send(`New user has been created!😎`);
});

app.post("/shows", async (req, res) => {
  await Show.create(req.body);
  res.send(`New show has been created!📺`);
});

// A route that will get all the shows that the user has watched.
app.get("/users/:id/shows", async (req, res) => {
  const userId = await User.findByPk(req.params.id);
  const allShows = await Show.findAll({
    where: { UserId: userId },
  });

  res.json({ allShows });
});

// A route that will ‘add’ a show if you have watched it.
app.put("/users/:userid/shows/:showid", async (req, res) => {
  const userID = req.params.userid;
  const showid = req.params.showid;
  await Show.update({ UserId: userID }, { where: { id: showid } });

  res.send(`New show has added!`);
});

// A route that will ‘update’ a show if they include more seasons.
app.put("/shows/:id", async (req, res) => {
  await Show.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  );

  res.send(`Show is updated!`);
});

// A route that will ‘rate’ a show that you have already watched.
app.put("/shows/:id/rating", async (req, res) => {
  const showId = req.params.id;
  const show = await Show.findByPk(showId);
  const origRating = show.dataValues.rating;
  const newRating = req.body.rating;

  await Show.update(
    { rating: (newRating + origRating) / 2 },
    { where: { id: showId } }
  );

  res.send(`Rating is updated!`);
});

// A route that will ‘remove’ a show if the series gets cancelled.
app.delete("/shows", async (req, res) => {
  await Show.destroy({ where: { status: "canceled" } });
  res.send(`Show is deleted because it's cancelled`);
});

// A route that will get shows of a specific genre.
app.get("/shows/genres/:genre", async (req, res) => {
  const genres = req.params.genre;
  console.log(genres);
  const shows = await Show.findAll({
    where: { genre: { [Op.like]: `%${genres}%` } },
  });
  res.json({ shows });
});

app.listen(PORT, async () => {
  await seed();
  await association();
  console.log(`The server is listening to PORT: ${PORT}`);
});
