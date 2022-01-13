const express = require("express");
const app = express();

const { db, Show, User, seed} = require("./index");
const PORT = 8080;

app.listen(PORT, () =>{
    console.log(`The server is listening to PORT: ${PORT}`)
})