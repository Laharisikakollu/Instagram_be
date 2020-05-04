const Joi = require('joi');

const addCommentValidation = async (req, res, next) => {

    try {
        const addCommentSchema = Joi.object({
            comment: Joi.string().alphanum().min(5).max(30).required(),
            
        })

        await addCommentSchema.validate({ comment: req.body.comment});
        next();

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message:  error.details[0].message
        })
    }
}

module.exports =  addCommentValidation;