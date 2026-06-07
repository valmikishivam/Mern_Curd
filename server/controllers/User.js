import userModel from '../models/User.js';
import contractModel from '../models/Contracts.js'

//crud opertions

//create data
export const addContract = async (req, res) => {
    try {
        const { username, email, role, phone } = req.body;
        const userExit = await userModel.findById(req.userid);
        if (!userExit) {
            return res.status(400).json({ status: false, msg: 'authorized user permission only' })
        }

        await contractModel.create({
            userId: req.userid,
            name: username,
            email,
            phone,
            role
        })
        res.status(201).json({ status: true, msg: 'contract added' })
    } catch (error) {
        res.status(400).json({ status: false, msg: "internal server error" })
        console.log(error.message);
    }
}
//update data
export const updateContract = async (req, res) => {
    try {
        const contractid = req.params.id;
        const { username, phone, role, email } = req.body;

        const updatedData = {};
        if (username) updatedData.name = username;
        if (email) updatedData.email = email;
        if (role) updatedData.role = role;
        if (phone) updatedData.phone = phone;
        await contractModel.findByIdAndUpdate(contractid, updatedData,{returnDocument:'after'})

        res.status(200).json({ status: true, msg: 'contract updated' })
    } catch (error) {

        console.log(error.message);
        res.status(400).json({ status: false, msg: "internal server error" })
    }
}
//delete data
export const deleteContract = async (req, res) => {
    try {
        const {id} = req.params;
        await contractModel.findByIdAndDelete(id);
        res.status(200).json({status:true,msg:'contract deleted'})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ status: false, msg: "internal server error" })
    }
}
//read data
export const contracts = async (req, res) => {
    try {
        const page=req.query.page||1;
        const limit=6;
        const totalContract = await contractModel.countDocuments()
        const totalPage = Math.ceil(totalContract/limit)
        const contacts = await contractModel.find({ userId: req.userid }).limit(limit).skip((page-1)*limit).select('email name phone role _id');

        res.status(200).json({ status: true, msg: 'success', contacts,totalContract,page,totalPage })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ status: false, msg: "internal server error" })
    }
}
