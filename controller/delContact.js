import dotenv from 'dotenv';
import Contact from '../model/Contact';

const delContact = async(req, res) => {
    try{
        console.log(req.params._id);
        // const admin = await Admin.findById(req.params._id);
        // console.log(admin)
        await Contact.deleteOne({ _id: req.params.id});
        res.status(200).json({
            status:200,
            msg:'Contact Deleted'
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default delContact;