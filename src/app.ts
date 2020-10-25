import express from "express";
import path from "path";
import compression from "compression";

const app = express();
const port = 4000;

app.use(compression());

app.use("/static", express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index"));

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
