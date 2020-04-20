const models = require("../models");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const timeline = async (req, res, next) => {
  try {
    console.log("")
    const user=await models.User.findOne({
        where:{
            userName:req.params.userName
        }
    })
    console.log("get posts");
    const following = await models.Followers.findAll({
        where:{
            followerId:user.id
        }
    })
    followings = [...JSON.parse(JSON.stringify(following, null, 4))];
    console.log(followings)
    let posts=[]
    for (var i = 0; i < followings.length; i++) {
        const post = await models.Post1.findAll({
            //   attributes: ["id"],
            where: {
              userId: followings[i].userId
            },
          });
         
      
          followerposts = [...JSON.parse(JSON.stringify(post, null, 4))];
          console.log(followerposts)
          followerposts.map(item=>{
              posts.push(item)
          })
        }

       

   
    console.log("posts1");
        console.log(posts)
    let names = [];
    let posts1 = [];
    
    for (var i = 0; i < posts.length; i++) {
      const name = await models.Images.findAll({
        where: {
          postId: posts[i].id,
        },
      });
    

      imj = [...JSON.parse(JSON.stringify(name, null, 4))];
      console.log(imj[0].imageName);
      const likes = await models.Post_Like.findAll({
        where: {
          postId: posts[i].id,
        },
      });


      for(j=0;j<imj.length;j++)
      {
          names.push(imj[j].imageUrl)
      }

      imj = [];
    //   console.log(obj[i].description);
    //   console.log(names)
      posts1.push({
        images: names,
        description: posts[i].description,
        likes: likes.length,
        id: posts[i].id,
      });


      names = [];
    }

    posts1.reverse()
    res.status(200).json({
      posts1,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
  }
};
module.exports = timeline;

