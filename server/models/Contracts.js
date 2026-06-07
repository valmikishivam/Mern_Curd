import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true })

const contractModel = mongoose.model('contract', contractSchema);
export default contractModel;