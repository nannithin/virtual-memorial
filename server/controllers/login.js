import Users from '../models/users.js';

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Tribute from '../models/tribute.js';

export const Login = async (req, res) => {
    const { name, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashp) => {
        if (err) {
            console.log(err.message);
            return;
        }
        try {
            const user = await new Users({ name, password: hashp, role : "admin" }).save();
            return res.status(200).json(user)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    })
}

export const admin = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json("All fields are required")
    }
    const user = await Users.findOne({ name });
    try {
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const payload = {
                    id: user._id,
                    name: user.name,
                    role : user.role
                }
                const token = jwt.sign(payload, process.env.JWT_PASS, { expiresIn: "7d" });
                res.cookie('token', token, {
                    path: '/',
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    httpOnly: true,
                    sameSite: "lax"
                })
                return res.status(200).json({name : user.name,role : user.role});
            } else {
                return res.json("incorrect password")
            }
        } else {
            return res.json("User not found")
        }
    } catch (error) {
        return res.status(401).json(error.message);
    }
}

export const getAllTri = async (req, res) => {
    try {
        const data = await Tribute.find({approved : false});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

export const isAdmin = async(req,res) => {
    const user = req.user;
    if(user.role === "admin"){
        return res.status(200).json({user,islogin : false})
    }else{
        return res.status(401).json({error : "You are not an admin"})
    }
}