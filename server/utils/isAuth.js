import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next)=>{
    try {
        const token =req.cookies.token;
        
       if(!token){
            return res.status(500).json({ status: false, msg: 'authorised user permision only' });
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET);
        req.userid =decode.id
        next()
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, msg: 'authorised user permision only' });

    }
}
export default userAuth