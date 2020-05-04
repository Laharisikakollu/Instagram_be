const express = require("express");
const router = express.Router();

const signup = require("../controllers/user/signup");
const signupValidation = require("../validations/signupValidation");
const signuprequest = require("../controllers/admin/signuprequest");
const login = require("../controllers/user/login");

const getuserlist = require("../controllers/admin/getUserList");
const getrequestlist = require("../controllers/admin/getRequestList");
const acceptrequest = require("../controllers/admin/acceptrequest");
const declinerequest = require("../controllers/admin/declinerequest");

const addPost = require("../controllers/user/addPost");
const addPostValidation = require("../validations/addPostValidation");
const getPosts = require("../controllers/user/getPosts");
const deletePost = require("../controllers/user/deletePost");
const addLike = require("../controllers/user/postlikes");
const timeline = require("../controllers/user/timeline");
const addComment = require("../controllers/user/addComment");
const addCommentValidation = require("../validations/addCommentValidation");
const getComment = require("../controllers/user/getComment");

const follow = require("../controllers/user/follow");
const unfollow = require("../controllers/user/unfollow");
const getfollowrequest = require("../controllers/user/getFollowrequest");
const acceptfollowrequest = require("../controllers/user/acceptFollowrequest");
const declinefollowrequest = require("../controllers/user/declineFollowrequest");
const fetchfollowers = require("../controllers/user/fetchFollowers");
const fetchfollowing = require("../controllers/user/fetchFollowing");

router.post("/signup", signupValidation, signup);
router.post("/signuprequest", signuprequest);
router.post("/login", login);

router.get("/getuserlist", getuserlist);
router.get("/getrequestlist", getrequestlist);
router.put("/acceptrequest", acceptrequest);
router.put("/declinerequest", declinerequest);

router.post("/addPost", addPostValidation, addPost);
router.post("/deletePost", deletePost);
router.get("/getPosts/:id", getPosts);
router.get("/timeline/:userName", timeline);
router.post("/addLike", addLike);
router.post("/addComment", addCommentValidation, addComment);
router.get("/getComment/:postId", getComment);

router.post("/follow", follow);
router.post("/unfollow", unfollow);
router.get("/fetchfollowers/:userName", fetchfollowers);
router.get("/fetchfollowing/:userName", fetchfollowing);
router.get("/getfollowrequest/:userName", getfollowrequest);
router.post("/acceptfollowrequest", acceptfollowrequest);
router.post("/declinefollowrequest", declinefollowrequest);

module.exports = router;
