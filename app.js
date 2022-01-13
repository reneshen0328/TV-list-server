const express = require("express");
const app = express();

const { seed } = require("./index");
const { Show, User } = require("./Models/index")
const PORT = 8080;

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
app.get("/user/:id", async (req, res) => {
  const userId = await User.findByPk(req.params.id);
  res.json({ userId });
});

// A route that will get all the shows.
app.get("/shows", async (req, res) => {
  const allShows = await Show.findAll();
  res.json({ allShows });
});

// A route that will get one show.
app.get("/show/:id", async (req, res) => {
  const showId = await Show.findByPk(req.params.id);
  res.json({ showId });
});

// A route that can create a user and show.
app.post("/users", async (req,res) => {
    await User.create(req.body);
    res.send(`New user has been created!😎`);
})

app.post("/shows", async(req,res) => {
    await Show.create(req.body);
    res.send(`New show has been created!📺`)
})

// A route that will get all the shows that the user has watched.
app.get("/user/:id/shows", async(req,res) => {
    const userId = await User.findByPk(req.params.id);
    const allShows = await Show.findAll({ 
        where: { UserId: userId }
    });

    res.json({ allShows });
})

// READ ENUM DOCUMENT!!!
// // A route that will get shows of a specific genre.
// app.get("/shows/mystery", async (req,res) => {
//     const includeMystery = await Show.findAll({ where: { genre: "mystery" } })
//     res.json({ includeMystery })
// })

app.listen(PORT, async () => {
    await seed();
    console.log(`The server is listening to PORT: ${PORT}`);
});
