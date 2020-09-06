import mongoose from 'mongoose';
import moment from 'moment';

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
});

const Admin = mongoose.model("adminRegister", AdminSchema);
export default Admin;
