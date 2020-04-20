const models = require('../models');

const acceptrequest = async (req, res, next) => {
    try {
        
        // const token = req.headers['access-token']
        // const payload = jwt.decode(token)

    //     const users = await models.User.findOne({
    //         where: {
    //             userName:req.body.userName
    //         }
    //     });

       
    //  const value= users.update({isaccept:req.body.isaccept})
         
    //     res.json({
    //         value
    //     })

    console.log(req.body)
    if (req.body.isaccept === true) {
        const users = await models.User.update(
            { isaccept: req.body.isaccept },
            {
                where: {
                    userName: req.body.userName
                }
            });
        res.status(200).json({
            users,
            success: true
        });
    }

        
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "accepted",
            error
        })
        next(error)
    }
}

module.exports = acceptrequest;