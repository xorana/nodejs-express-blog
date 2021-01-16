import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
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

// 404
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Not found');
    res.status(404);
    next(err);
});

// 500
app.use((err: Error, req: Request, res: Response) => {
    res.status(res.statusCode || 500);
    res.render('error', {
        code: res.statusCode,
        message: err ? err.message : 'An error occurred'
    });
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});