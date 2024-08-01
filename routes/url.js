const express = require("express");
const {handleGenerateNewShortURL,handleRedirectUser,handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/",handleGenerateNewShortURL);
router.get("/:shortId",handleRedirectUser);
router.get("/analytics/:shortId",handleGetAnalytics);
module.exports = router;