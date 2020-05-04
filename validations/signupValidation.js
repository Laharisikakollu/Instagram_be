const Joi = require('joi');

const signUpValidation = async (req, res, next) => {

    try {
        const signupDataSchema = Joi.object({
            userName: Joi.string().min(4).max(30).required(),
            password: Joi.string().min(5).max(30).required(),
            email:Joi.string().email().required(),
            phone:Joi.string().regex(/^\d{10}$/).required(),
            
        })

        await signupDataSchema.validate({ userName: req.body.userName, password: req.body.password,email:req.body.email,phone:req.body.phone });
        next();

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message:  error.details[0].message
        })
    }
}

module.exports = signUpValidation;