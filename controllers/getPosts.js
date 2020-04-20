const models = require("../models");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const getPosts = async (req, res, next) => {
  try {
    // const token = req.headers['access-token']
    // const payload = jwt.decode(token)
    // const user = await models.User.findOne({
    //     where: {
    //         userName: payload.userName
    //     }
    // })
    const user=await models.User.findOne({
        where:{
            userName:req.params.id
        }
    })
    console.log("get posts");
    const posts = await models.Post1.findAll({
      //   attributes: ["id"],
      where: {
        userId: user.id
      },
    });

    console.log("posts1");

    let names = [];
    let posts1 = [];
    obj = [...JSON.parse(JSON.stringify(posts, null, 4))];
    // console.log(obj);
    for (var i = 0; i < obj.length; i++) {
      const name = await models.Images.findAll({
        where: {
          postId: obj[i].id,
        },
      });
    //   console.log(obj[i].id)

      imj = [...JSON.parse(JSON.stringify(name, null, 4))];
      console.log(imj[0].imageName);
      const likes = await models.Post_Like.findAll({
        where: {
          postId: obj[i].id,
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
        description: obj[i].description,
        likes: likes.length,
        id: obj[i].id,
      });


      names = [];
    }

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
module.exports = getPosts;

// const getPosts = async (req, res, next) => {
//         try {

//             const images=await models.Images.findAll({

//                 include: [{
//                     model: models.Post1,
//                     required: true,
//                     where: {
//                         userId: req.params.userId
//                     }
//                 }]

//             })
//             console.log(images)

//                 res.status(200).json({
//                     images
//                  })

//         }
//         catch (error) {
//             res.status(400).json({
//                 status: false,
//                 error
//             })
//         }
//     }
// module.exports = getPosts;
