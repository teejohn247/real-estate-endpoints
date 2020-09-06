import mongoose from 'mongoose';

const PropertiesSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        // required:true,
    },
    condition:{
        type:String,
        // required:true
    },
    amenities:{
       type:String,
    //    required:true
    },
    images: {
        type: Array
      },
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    creation_date:{
        type: Date,
        default: new Date()
    }
});

const Properties = mongoose.model("properties", PropertiesSchema);
export default Properties;
