import compression from "compression";
import * as dotenv from 'dotenv';
import express, { Request, Response } from "express";
import path from "path";
import connect from "./connect";
import HomepageSchema from './models/homepage.model';
import ProjectSchema from "./models/project.model";
import CommandSchema from './models/terminal.model';
import blog from "./routes/blog";

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const port = process.env.PORT || 4000;

connect(process.env.DB);

app.use(compression());

app.use("/static", express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

// index page
app.get("/", async (req, res, next) => {
    try {
        const homepage = await HomepageSchema.findOne().exec();
        const terminal = await CommandSchema.find().exec();
        res.render('index', {
            title: homepage.name,
            description: homepage.description,
            terminal: terminal
        });
    } catch (err) {
        next();
    }
});

// blog routes
app.use("/", blog);

// project routes
app.get("/projects", async (req, res, next) => {
    try {
        const projects = await ProjectSchema.find().exec();
        res.render('projects', {projects: projects});
    } catch (err) {
        next();
    }
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