const models = require('../models');

const getfollowrequest = async (req, res, next) => {
    try {
        
        
        console.log("hi")
        const users = await models.User.findAll({
           
            where: {
                userName:req.params.userName
            }
        });
        obj = [...JSON.parse(JSON.stringify(users ,null, 4))];
        // console.log(obj)
        // console.log(obj[0].id)
        // console.log(req.params.userName)
        const followRequests = await models.Followrequest.findAll({
           
            where: {
                followingId: obj[0].id
            }
        });

        obj1 = [...JSON.parse(JSON.stringify(followRequests, null, 4))];
        let followrequest=[]

        for (var i = 0; i < obj1.length; i++) {
            const name = await models.User.findOne({
              where: { id: obj1[i].userId },
            });
            // console.log(name);
            followrequest.push(name.userName);
          }

        res.status(200).json({
            success: true,
            followrequest,
        });
 
        

        
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "could not find follow requests",
            error
        })
        next(error)
    }
}

module.exports = getfollowrequest;