const models = require('../models');
const jwt = require('jsonwebtoken');

const followrequest = async (req, res, next) => {

    try
    {
        console.log("h1")
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        // const user = await models.Followrequest.findOne({
        //     where: {
        //         userId: payload.userId
        //     }
        // })  

        const user=await models.User.findOne({
            where:{
                userName:req.body.acceptingName
            }
        })
       
    if(req.body.accept == true)
    {
        const request=await models.Followrequest.findOne({where:{userId:user.id}})
        request.update({accept:true})
        
        const follower = await models.Followers.create({userId:payload.userId,followerId:user.id})
            res.json({
            follower
        })

        // const following = await models.Following.create({userId:req.body.followingId,followingId:payload.userId})
        // res.json({
        //     following
        // })
    }

    // const follower = await models.Followrequest.create(req.body)
    //     return res.json({
    //         follower
    //     })

}
catch (error) {
    res.status(404).json({
        success: false,
        message: "ERROR",
        error
    })
    next(error)
}

}
    

    

   

module.exports = followrequest;