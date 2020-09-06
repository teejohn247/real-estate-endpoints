import mongoose from 'mongoose';
import moment from 'moment';

const BookingsSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    service:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
    },
    address:{
        type:String,
        required:true,

    },
    date:{
        type: Date,
        default:moment().format('YYYY-MM-DD')
    },
    time:{
        type: String,
        required:true,

    },
    message:{
        type:String,
    },
});

const Bookings = mongoose.model("bookings", BookingsSchema);
export default Bookings;
