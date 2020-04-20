const models = require('../models');

const getuserlist = async (req, res, next) => {
    try {
        
        let names=[]
        console.log("hi")
        const users = await models.User.findAll({
            attributes: ['userName'],
            where: {
                isaccept:true
            }
        });
        obj = [...JSON.parse(JSON.stringify(users, null, 4))]
       obj.map(item => {
        names.push(item.userName)
       })

        res.json({
            names
        })

        
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "could not find list",
            error
        })
        next(error)
    }
}

module.exports = getuserlist;