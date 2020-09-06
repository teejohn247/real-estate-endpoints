import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/Admin';
import Properties from '../model/AdminRecords';

import AdminRecords from '../model/AdminRecords';
import gravatar from 'gravatar';
import utils from '../config/utils';


const adminRecords = async (req, res) => {
  try {
        const user = await User.findById(req.payload.id);
        if(!user){
            res.status(404).json({
                status:404,
                msg:'No user Found'
            })
            return
        }

        const properties = await Properties.find();
        if(!properties){
            res.status(404).json({
                status:404,
                msg:'No record Found'
            })
            return
        }
        // let adminrecords = new AdminRecords({
        //     user_id: user._id,
        //     name: user.name,
        //     description: user.description,
        //     condition: user.condition,
        //     amenities: user.amenities,
        //     images: user.images,
        //     creation_date: user.creation_date,
        //     // clock_out: user.date
        // });
        // await adminrecords.save();

        console.log(properties)
        res.status(200).json({
            properties
        })
    }
    catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
};

export default adminRecords;
