const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/shorten_url1").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", checkAuth, async (req, res) => {
    if(!req.user) return res.redirect("/login");
  const allURLs = await URL.find({
    createdBy: req.user._id
  });
//   console.log(allURLs);
  return res.render("home", {
    urls: allURLs,
  });
});
app.get("/signup", async (req, res) => {
  return res.render("signup");
});
app.get("/login", async (req, res) => {
  return res.render("login");
});

app.use("/user", userRoute);
app.use("/url",restrictToLoggedinUserOnly, urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
