const models = require('../models');

const getrequestlist = async (req, res, next) => {
    try {
        
        let names=[]
        console.log("hi")
        const users = await models.User.findAll({
            attributes: ['userName'],
            where: {
                isaccept:null
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
            message: "could not find requests",
            error
        })
        next(error)
    }
}

module.exports = getrequestlist;