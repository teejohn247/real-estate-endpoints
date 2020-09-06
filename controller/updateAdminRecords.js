import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import AdminRecords from '../model/AdminRecords';
import gravatar from 'gravatar';
import utils from '../config/utils';
import admin from './admin';
import moment from 'moment-timezone';
import adminRecords from './adminRecords';



const updateAdminRecords = async (req, res) => {
  try {
        const adminrecords = await AdminRecords.findOne({_id: req.params.id});
        // console.log(moment().tz('Africa/Lagos').format('YYYY-MM-DD'))
        console.log(adminrecords)

        // let clockOut = adminrecords.clock_out.toLocaleString().split('/')[0];
        // console.log(clockOut)
        // console.log(Date.getDay())
        // if(adminrecords.clock_out ==  Date.getDay()){
        //     res.status(403).json({
        //         status:403,
        //         msg:"You can't clock in more than once in a day"
        //     })
        // }
        if(!adminrecords){
            res.status(404).json({
                status:404,
                error:'No record Found'
            })
            return
        }
        // if(adminrecords.clock_out_time){
        //     res.status(404).json({
        //         status:403,
        //         error:'You have clocked out already'
        //     })
        //     return
        // }
        // console.log(adminrecords)
        
        adminrecords.updateOne({name:req.body.name, description: req.body.description, condition: req.body.condition, amenities: req.body.amenities},adminrecords).then(
            () => {
              res.status(200).json({
                status:200,
                "name":req.body.name,
                "description": req.body.description,
                "condition": req.body.condition, 
                "amenities": req.body.amenities
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

export default updateAdminRecords;
