import compression from "compression";
import express, { Request, Response } from "express";
import path from "path";
import connect from "./connect";
import blog from "./routes/blog";

const app = express();
const port = 4000;

connect('mongodb://127.0.0.1:27017');

app.use(compression());

app.use("/static", express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

// index page
app.get("/", (req, res) => res.render("index"));

// blog routes
app.use("/", blog);

// project routes
app.get("/projects", (req, res) => {
    res.render("projects");
});

// 500
app.use((req: Request, res: Response) => {
    res.status(404);
    res.render('error', {
        code: res.statusCode,
        message: 'An error occurred'
    });
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});