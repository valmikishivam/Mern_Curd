import userModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//signup
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existuser = await userModel.findOne({ email: email });
        if (existuser) {
            return res.status(400).json({ status: false, msg: 'user already exists' })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newuser = await userModel.create({
            username: username,
            email: email,
            password: hashPassword
        });

        const token = await jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        res.status(201).json({ status: true, msg: 'register successfully' });
    } catch (error) {
        console.log(error);

        res.status(400).json({ status: false, msg: 'internal server error' })
    }
}
//login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existuser = await userModel.findOne({ email: email });
        if (!existuser) {
            return res.status(400).json({ status: false, msg: 'invalid credentials' })
        }
        const isValid = await bcrypt.compare(password, existuser.password);
        if (!isValid) {
            return res.status(400).json({ status: false, msg: 'invalid credentials' })
        }

        const token = await jwt.sign({ id: existuser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ status: true, msg: 'login successfully' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, msg: 'internal server error' })
    }
}
//logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ status: true, msg: "logout successfully" })
    } catch (error) {
        res.status(400).json({ status: false, msg: 'internal server error' })
    }
}

export const isLogged = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ status: false, isAuth: false });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const userExist = await userModel.findById(decode.id);
        if (!userExist) {
            return res.status(400).json({ status: false, isAuth: false });
        }
        res.status(200).json({ status: true, isAuth: true })
    } catch (error) {
        res.status(500).json({ status: false, isAuth: false })
    }
}
