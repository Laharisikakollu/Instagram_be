const models = require('../models');

const signup = async (req, res, next) => {
    try {
        // console.log("re")
        console.log(req.body)
        const users = await models.User.findOne({
            where: {
                userName: req.body.userName
            }
        });
        console.log(users)
        if(users)
        {
            res.status(201).json({
                message:"Username already exists"
            })
        }
        else
        {
            if(req.body.role === "admin")
            req.body={...req.body,isaccept:true}
            const user = await models.User.create(req.body)
            res.status(201).json({
                user,
                success:true
        })
    }
        
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "could not signup",
            error
        })
        next(error)
    }
}

module.exports = signup;