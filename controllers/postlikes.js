const models = require('../models');
const jwt = require('jsonwebtoken');


const addLike = async (req, res, next) => {
    try {
        // const token = req.headers['access-token']
        // const payload = jwt.decode(token)
        // const user = await models.User.findOne({
        //     where: {
        //         userName: payload.userName
        //     }
        // })
        // const post=await models.Post.findOne({
        //     where:{
        //         postId:req.body.postId
        //     }
        // })

        
        // const post1 = {userId: user.id ,postId:post.id}

        const like=await models.Post_Like.findOne({
            where:{
                userId:req.body.userId,
                postId:req.body.postId
            }
        })
        console.log(req.body)
        console.log(like)
        if(!like)
        {
            const post2 = await models.Post_Like.create({postId:req.body.postId,userId:req.body.userId})
            console.log(post2)

        }
        else{
            const dislike=await models.Post_Like.destroy({
                where:{
                    userId:req.body.userId,
                    postId:req.body.postId
                }
            })
        }
       
        res.status(200).json({
            message:"ssuccess"
        })
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports = addLike;