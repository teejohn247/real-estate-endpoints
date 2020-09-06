import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
    },
    phone_number:{
        type:String,
        required:true,
    },
    message:{
        type:String,
    },
});

const Contact = mongoose.model("contact", ContactSchema);
export default Contact;
