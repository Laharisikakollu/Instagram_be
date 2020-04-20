const models = require('../models');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const addPost = async (req, res, next) => {
    try {
        // const token = req.headers['access-token']
        // const payload = jwt.decode(token)
        const payload = jwt.decode(req.body.token)

        const newPost = await models.Post1.create(
            {
                description: req.body.description,
                userId: payload.id
            });

            console.log(newPost)
            const image={};
            req.body.imageList.map(async (el, key) => {
 
             image = await models.Images.create(
                {
                    imageName:el.name,
                    postId: newPost.id,
                    imageUrl: el.thumbUrl,
                    lastModified: moment(el.lastModified)
                });
        })
        console.log(image)
        res.status(200).json({
            success: true,
            image
        });

    } catch (error) {
        res.status(404).json({
            success: false
        });
        next(error);
    }
}
       
module.exports = addPost;