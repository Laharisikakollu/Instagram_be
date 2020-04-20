const models = require('../models');

const declinerequest = async (req, res, next) => {
    try {
        
        // const token = req.headers['access-token']
        // const payload = jwt.decode(token)

        // const users = await models.User.findOne({
        //     where: {
        //         userName:payload.token
        //     }
        // });
       
    //   const value=await models.User.update({
    //       isaccept:req.body.isaccept,
    //       where:{
    //           userName:req.body.userName,
    //       }
    //   })
    //     res.json({
    //        value
    //     })


    const users = await models.User.destroy({
        where: {
            userName: req.body.userName
        }
    })
    res.status(200).json({
        users,
        success: true
    })

} catch (error) {
    res.status(404).json({
        success: false
    });
    next(error);
}

        
    }
    // catch (error) {
    //     res.status(404).json({
    //         success: false,
    //         message: "could not accept",
    //         error
    //     })
    //     next(error)
    // }


module.exports = declinerequest;