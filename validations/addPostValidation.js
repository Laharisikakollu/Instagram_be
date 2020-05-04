const Joi = require('joi');

const addPostValidation = async (req, res, next) => {

    try {
        const addPostSchema = Joi.object({
            description: Joi.string().min(5).max(30).required(),
            
        })

        await addPostSchema.validate({ description: req.body.description});
        next();

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message:  error.details[0].message
        })
    }
}

module.exports = addPostValidation;