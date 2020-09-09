const express = require('express');
const Images = require('../userimage/userimageModel');
const Users = require('../profile/profileModel');
const authRequired = require('../middleware/authRequired');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb (null, './uploads/')
    },
    filename: function (req, file, cb) {
        console.log(req.body)
        const test = new Date().toISOString() + file.originalname
        cb (null, test)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }   
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.post('/:id/upload', upload.single('userimage'), (req, res) => {
    console.log(req.file)

    const imageData = req.file
    console.log(imageData)
    const userid = req.params.id
    // console.log(id)
    // const { userid } = id
    const userimage = req.file.path
    console.log(userimage)
    console.log(req.body)
    if (!userid || !userimage) {
        res.status(400).json({errorMessage: "Please provide user id to upload image."})
    } 
    else if (userid && userimage) {
        Users.getUserById(userid)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to add image because no user with such id found'})
            } 
            else {
                Images.insertUserImage({userid, userimage})
                .then( image => {
                    res.status(201).json(image)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add image. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to add image.'})
        })
    
    }
})

module.exports = router;