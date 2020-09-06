import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Contact from '../model/Contact';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';

const adminView = async(req, res) => {
    // const { page, limit } = req.body;
    let page = req.params.page;
    let limit = req.params.limit;
    try{
        const adminrecords = await Contact.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log(adminrecords)

        const count = await Contact.find().countDocuments();
        
        console.log(count)
        if(!adminrecords){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }
        
        res.status(200).json({
            status:200,
            adminrecords,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
        console.log(adminrecords)
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default adminView;