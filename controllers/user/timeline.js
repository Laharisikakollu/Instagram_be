const models = require("../../models");
const jwt = require("jsonwebtoken");
const logger=require('../../logger')
const moment = require("moment");

/** @description Displaying list of posts of the users whom the loggeddin user is following.
 * @param {object} req - Request object with userName as params.
 * @param {object} res - Reponse object with a boolean variable success and posts1.
  * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/


const timeline = async (req, res, next) => {
  try {
  
    logger.info(req.url)
    const user = await models.User.findOne({
      where: {
        userName: req.params.userName,
      },
    });
  
    const following = await models.Followers.findAll({
      where: {
        followerId: user.id,
      },
    });
    followings = [...JSON.parse(JSON.stringify(following, null, 4))];
  
    let posts = [];
    for (var i = 0; i < followings.length; i++) {
      const post = await models.Post1.findAll({
        where: {
          userId: followings[i].userId,
        },
      });
    

      followerposts = [...JSON.parse(JSON.stringify(post, null, 4))];
     
      followerposts.map((item) => {
        posts.push(item);
      });
    }

   
    let names = [];
    let posts1 = [];

    for (var i = 0; i < posts.length; i++) {
      const name = await models.Images.findAll({
        where: {
          postId: posts[i].id,
        },
      });

    // posts.map(async (item,key)=> {
    //   const name = await models.Images.findAll({
    //         where: {
    //           postId: posts[key].id,
    //         },
    // });
  

      imj = [...JSON.parse(JSON.stringify(name, null, 4))];
     
      const likes = await models.Post_Like.findAll({
        where: {
          postId: posts[i].id,
        },
      });

      for (j = 0; j < imj.length; j++) {
        names.push(imj[j].imageUrl);
      }

      // imj.map((item,key)=>{
      //   names.push(img[key].imageUrl)
      // })

      // console.log(names)
      imj = [];

      posts1.push({
        images: names,
        description: posts[i].description,
        likes: likes.length,
        id: posts[i].id,
      });

      names = [];
    }

    posts1.reverse();
    res.status(200).json({
      posts1,
      success: true,
    });
    logger.info(` Timeline of ${req.params.userName} contain the posts of users whom ${req.params.userName} is following`)
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
    logger.error(error.name)
  }
};
module.exports = timeline;
