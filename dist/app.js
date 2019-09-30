"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = 4000;
// const port = process.env.NODE_ENV == "production" ? (process.env.port || 80) : 4000;
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.get("/", (req, res) => res.render("index"));
app.get("/test", (req, res) => res.send("Hello world!"));
const server = app.listen(port, () => {
    // console.log("Server listening on port " + port);
});
//# sourceMappingURL=app.js.map