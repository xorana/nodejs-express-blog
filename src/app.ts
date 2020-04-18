import express from "express";
import path from "path";

import connect from './connect';
const app = express();
const port = 4000;
// const port = process.env.NODE_ENV == "production" ? (process.env.port || 80) : 4000;

app.use("/static", express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index"));

app.get("/test", (req, res) => res.send("Hello world!"));

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

const db = 'mongodb://localhost:27017';
connect(db);