import { Router } from "express";
import { LoremIpsum } from "lorem-ipsum";
import { nextTick } from "process";
import Post, { IPost } from '../models/post.model';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = date.getDate().toString();
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString();

    return `${day} ${month}, ${year}`;
}

const createPostObject = (model: IPost) => {
    return {
        id: model.urlId,
        title: model.title,
        time: formatDate(model.time),
        content: model.content
    }
}

const router: Router = Router();

router.get("/blog", (req, res) => {
    Post.find().sort({time: 'desc'}).exec((err, models) => {
        if (!err) {
            const posts = models.map(post => {
                post.content = [post.content[0]];
                return createPostObject(post);
            });
            
            res.render('blog', {posts: posts});
        }
    });
});

router.get("/blog/:id", (req, res, next) => {
    Post.findOne({urlId: req.params.id}).exec((err, model) => {
        if (!err && model) {
            res.render("post", {post: createPostObject(model)});
        } else {
            next();
        }
    });
});

router.get("/emptyblog", (req, res) => {
    Post.find().remove().exec(err => {
        if (!err) res.json({deleted: true});
    })
});

router.get("/addpost", async (req, res) => {
    const postObj = {
        title: 'Post title',
        urlId: lorem.generateWords(3).replace(/\s+/g, '-').toLowerCase(),
        time: Date.now(),
        content: lorem.generateParagraphs(20).split('\n')
    }
    const post = new Post(postObj);

    await post.save();
    res.json(postObj);
});

export default router;