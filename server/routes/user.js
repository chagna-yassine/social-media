import express from "express";
import multer, {diskStorage} from 'multer'
import path from 'path';
import ffmpeg from "fluent-ffmpeg";
import { User } from "../metadatServise/user.js";
import  fs from "fs";

const router = express.Router();

const coverStorage = diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./Blob/ImageBlob')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    },
})

const uploadCover = multer({storage : coverStorage});

// uploding just a tet post for now
router.post('/updateCover', uploadCover.single('cover') , async (req, res) => {
    try {
        // get the text that the user want to post
        const {user_id} = req.body;

        const user = await User.findOne({_id:user_id})

        if(user.cover !== 'DefaultCover.jpeg'){
            fs.unlinkSync(`Blob/ImageBlob/${user.cover}`)
        }

        await User.findByIdAndUpdate({_id : user_id},{
            cover: req.file.filename
        })

        res.status(201).json({message: 'Cover Updated Successfully'});
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const profilePicStorage = diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./Blob/ImageBlob')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    },
})

const uploadProfilePic = multer({storage : profilePicStorage});

// uploding just a tet post for now
router.post('/updateProfilePic', uploadProfilePic.single('profilePic') , async (req, res) => {
    try {
        // get the text that the user want to post
        const {user_id} = req.body;

        const user = await User.findOne({_id:user_id})

        if(user.profilePic !== 'DefaultPic.jpeg'){
            fs.unlinkSync(`Blob/ImageBlob/${user.profilePic}`)
        }

        await User.findByIdAndUpdate({_id : user_id},{
            profilePic: req.file.filename
        })

        res.status(201).json({message: 'ProfilePic Updated Successfully'});
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/updateUser', async (req, res) => {
    try {
        // get the text that the user want to post
        const {user_id , username , bio} = req.body;

        const oldUsername = await User.findById({_id : user_id})

        const usernameExist = await User.findOne({ username });

        if(usernameExist){
           if(usernameExist.username !== oldUsername.username){
                return res.status(201).json({ errName: 'usernameErr' });
           }
        }

        await User.findByIdAndUpdate({_id : user_id},{
            username,
            bio
        })

        res.status(201).json({message: 'User Updated Successfully'});
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;