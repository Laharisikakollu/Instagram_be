const models = require('../models');
const jwt = require('jsonwebtoken');

const signuprequest = async (req, res, next) => {

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
                userName:req.body.userName
            }
        })
       
    
       console.log(req.body.isaccept)
        if(req.body.isaccept === 1)
       {
            user.update({isaccept:true})

        res.json({
            message:"Updated"
        })
       }
       else if(req.body.isaccept === 0)
       {
           console.log("he")
           user.update({isaccept:false})
           console.log(user)

        res.json({
            message:"Updated"
        })
        }

        // res.json({
        //     message:"Updated"
        // })
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
    

    

   

module.exports = signuprequest;