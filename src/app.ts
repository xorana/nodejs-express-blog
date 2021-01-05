import express from "express";
import path from "path";
import compression from "compression";

import connect from "./connect";
import Post from './models/post.model'

const app = express();
const port = 4000;

const db = connect('mongodb://localhost:27017');

app.use(compression());

app.use("/static", express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index", {cache: true}));
app.get("/blog", (req, res) => {
    res.render("blog", {
        cache: true,
        'posts': [{
            'title': 'Post title',
            'time': new Date().toDateString(),
            'content': [
                'This is the first sentence to a blog post on my website. This is now the second sentence and the content I\'m typing is just to fill up the space here.'
            ]
        },
        {
            'title': 'Post title',
            'time': new Date().toLocaleDateString(),
            'content': [
                'this is the second line'
            ]
        }
        ]
    })
});
app.get("/emptyblog", (req, res) => {
    res.render("blog", {posts: []})
})
app.get("/addpost", async (req, res) => {
    const postObj = {
        title: 'Post title',
        time: Date.now(),
        content: ['this is some content']
    }
    const post = new Post(postObj);

    await post.save();
    res.json(postObj)
});
app.get('/testblog', async (req, res) => {
    Post.find({}, (err, posts) => {
        if (!err) res.render('blog', {posts: posts});
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});