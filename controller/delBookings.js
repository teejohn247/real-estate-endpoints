import dotenv from 'dotenv';
import Bookings from '../model/AdminRecords';

const delBookings = async(req, res) => {
    try{
        await Bookings.deleteOne({ _id: req.params.id});
        res.status(200).json({
            status:200,
            msg:'Property Deleted'
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default delBookings;