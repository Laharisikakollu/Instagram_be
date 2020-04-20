const models = require('../models');
const jwt = require('jsonwebtoken');

const follow = async (req, res, next) => {

    try
    {
        console.log("h888")
        // const token = req.headers['access-token']
        const payload = jwt.decode(req.body.token)
        console.log(req.body)
        const user=await models.User.findOne({where:{
            userName:req.body.requestName
        }})
        console.log(payload.id,user.id)
        const l=await models.Followrequest.findAll({
            where:
            {
                userId:payload.id,
                followingId:user.id //userId requests to follow followingId
            }})

            obj = [...JSON.parse(JSON.stringify(l, null, 4))];

        const a=await models.Followers.findAll({
            where:{
                userId:user.id,
                followerId:payload.id
            }
        })

        obj1 = [...JSON.parse(JSON.stringify(a, null, 4))];
        const follow={}
        
        console.log(obj.length)
        console.log(obj1.length)
        console.log(payload.id,user.id)
        if(obj.length===0 && obj1.length===0)
        {
            follow=await models.Followrequest.create({userId:payload.id,followingId:user.id})
            
        }
        else if(obj1.length!==0)
        {
            await models.Followers.destroy({
                where:
                    {
                        userId:user.id,
                        followerId:payload.id
                    }})
        }
       

        res.status(200).json({
            follow
        })

     

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
    

    

   

module.exports = follow;