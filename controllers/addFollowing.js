const models = require('../models');
const jwt = require('jsonwebtoken');


const addLike = async (req, res, next) => {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
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
        const following = await models.Following.create(req.body)
        res.status(200).json({
            following
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