import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../model/Admin';
import gravatar from 'gravatar';
import utils from '../config/utils';


const updateAdminRecord = async (req, res) => {
  try {
        const admin = await Admin.findById(req.payload.id).select('-password');
        if(!admin){
            res.status(404).json({
                status:404,
                msg:'No user Found'
            })
            return
        }
        admin.updateOne({name: req.body.name, email: req.body.email}, admin).then(
            () => {
              res.status(200).json({
                status:200,
                "name": req.body.name,
                "email": req.body.email
              });
            }
          )     
    }
    catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
};

export default updateAdminRecord;
