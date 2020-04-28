const express = require('express');
const router = express.Router(); 

const signup = require('../controllers/signup')
const signuprequest = require('../controllers/signuprequest')
const login = require('../controllers/login')
const getuserlist=require('../controllers/getUserList');
const getrequestlist=require('../controllers/getRequestList');
const acceptrequest=require('../controllers/acceptrequest');
const declinerequest=require('../controllers/declinerequest');

const addPost=require('../controllers/addPost');
const getPosts=require('../controllers/getPosts');
const deletePost=require('../controllers/deletePost');
const addLike=require('../controllers/postlikes');
const LikeCount=require('../controllers/likeCount');
const followrequest=require('../controllers/Followrequests');
const timeline=require('../controllers/timeline')
const addComment=require('../controllers/addComment');
const getComment=require('../controllers/getComment')



const follow=require('../controllers/follow');
const unfollow=require('../controllers/unfollow');
const getfollowrequest=require('../controllers/getFollowrequest')
const acceptfollowrequest=require('../controllers/acceptFollowrequest');
const declinefollowrequest=require('../controllers/declineFollowrequest');
const fetchfollowers=require('../controllers/fetchFollowers');
const fetchfollowing=require('../controllers/fetchFollowing');


router.post('/signup', signup)
router.post('/signuprequest', signuprequest)
router.post('/login', login)
router.post('/sendmail',sendmail)
router.get('/getuserlist',getuserlist)
router.get('/getrequestlist',getrequestlist)
router.put('/acceptrequest',acceptrequest)
router.put('/declinerequest',declinerequest)

router.post('/addPost',addPost)
router.post('/deletePost',deletePost)
router.get('/getPosts/:id', getPosts)
router.get('/timeline/:userName',timeline)
router.post('/addLike',addLike)
router.post('/addComment',addComment)
router.get('/getComment/:postId',getComment)



router.post('/follow',follow)
router.post('/unfollow',unfollow)
router.get('/fetchfollowers/:userName',fetchfollowers)
router.get('/fetchfollowing/:userName',fetchfollowing)
router.get('/getfollowrequest/:userName',getfollowrequest)
router.post('/acceptfollowrequest',acceptfollowrequest)
router.post('/declinefollowrequest',declinefollowrequest)




module.exports = router;

