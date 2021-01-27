import { Router } from "express";
import PostSchema, { PostObject } from '../models/post.model';

// const lorem = new LoremIpsum({
//     sentencesPerParagraph: {
//         max: 8,
//         min: 4
//     },
//     wordsPerSentence: {
//         max: 16,
//         min: 4
//     }
// });

const router: Router = Router();

router.get("/blog", (req, res) => {
    PostSchema.find().sort({time: 'desc'}).exec((err, models) => {
        if (!err) {
            const previews = models.map(x => PostObject.getPreview(x));
            res.render('blog', {posts: previews});
        }
    });
});

router.get("/blog/:id", (req, res, next) => {
    PostSchema.findOne({id: req.params.id}).exec((err, model) => {
        if (!err && model) {
            res.render("post", {post: PostObject.getFormatted(model)});
        } else {
            next();
        }
    });
});

export default router;