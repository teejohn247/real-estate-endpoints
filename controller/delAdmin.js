import dotenv from 'dotenv';
import Admin from '../model/Admin';

const delAdmin = async(req, res) => {
    try{
       const result = await Admin.findOne({_id: req.payload.id});
       await Admin.deleteOne({ _id: req.payload.id});
       if(!result){
        {
            res.status(404).json({
                status:404,
                error:'ACCESS DENIED. Only the admin is allowed to delete this account'
            })
            return
        }
       }
        
        res.status(200).json({
            status:200,
            msg:'Admin account deleted'
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default delAdmin;