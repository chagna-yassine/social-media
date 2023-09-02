import express from "express";
import nodemailer from 'nodemailer'
import { User } from "../metadatServise/user.js";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    const {email , username} = req.body
    const CampCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    try {
        const config = {
            service : "gmail",
            auth : {
                user : process.env.EMAIL,
                pass : process.env.PWD
            }
        }

        const transporter = nodemailer.createTransport(config);

        const msg = {
            from: process.env.EMAIL,
            to: email,
            subject: "Recover Your Account",
            html:`<div>
                <h1 style="color: cadetblue;">Hey ${username}</h1>
                <p>It looks like you forget your password. Here is your CampCode you need to resset your password.</p>
            </div>
            <table style="width: 100%;
                height: 200px;
                background-color: #42464A;">
                <tr>
                    <td style="text-align:center;
                        color: dodgerblue;">
                        <p style="font-size: 40px;">${CampCode}</p>
                    </td>
                </tr>
            </table>`
            
        }

        transporter.sendMail(msg).then(()=>{
            res.status(201).json({CampCode});
        })
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.post('/checkEmail', async (req, res) => {
try {
    //get the data
    const { email } = req.body;

    const user =  await User.findOne({ email });
    
    if(!user){
        return res.status(201).json({err: "notFound"})
    }

    res.status(201).json({username: user.firstName});
}catch (error) {
    res.status(500).json({ error: error.message });
}
});

router.post('/updatePassword', async (req, res) => {
try {
    //get the data
    const { email , password } = req.body;

    const hashedPassword = bcrypt.hashSync(password,10)

    await User.findOneAndUpdate({ email },{
        password : hashedPassword
    });

    res.status(201).json({message: "Updated"});
}catch (error) {
    res.status(500).json({ error: error.message });
}
})

export default router;