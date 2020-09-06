import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
// import Homes from '../model/AdminRecords'
// import Bookings from '../model/Bookings';
import nodemailer from 'nodemailer';
import config from '../config/config';
import gravatar from 'gravatar';
import utils from '../config/utils';
import Properties from '../model/AdminRecords';

dotenv.config();




const homes = async (req, res) => {

    // var transport = {
    //     host: 'smtp.gmail.com',
    //     auth: {
    //       user: config.USER,
    //       pass: config.PASS
    //     }
    //   }
      
    //   var transporter = nodemailer.createTransport(transport);
    
    //   transporter.verify((error, success) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Server is ready to take messages');
    //     }
    //   });

    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/uploads/' + req.files[i].filename)
    }

    try{ 
        const {name, description, condition, amenities, images} = req.body;
        // console.log(req.body.images);
      
        let properties = new Properties({
            // user_id: user._id,
            name: name,
            description: description,
            condition: condition,
            amenities: amenities,
            images: reqFiles,
            // creation_date: creation_date,
            // clock_out: user.date
        });
        console.log(properties);
        await properties.save();

     
        // let bookings = new Bookings({
        //     first_name: first_name,
        //     last_name: last_name,
        //     email: email,
        //     phone: phone,
        //     service: service,
        //     price: price,
        //     address: address,
        //     date: date,
        //     time: time,
        //     message: message
        // });
        // console.log(bookings);

        // await bookings.save();
        
        // var mail = {
        //     from: name,
        //     to: 'teejohn247@gmail.com',  //Change to email address that you want to receive messages on
        //     subject: 'New Message from Relationship expert',
        //     text: email
        //   }
        
        //   transporter.sendMail(mail, (err, data) => {
        //     if (err) {
        //       res.json({
        //         msg: 'fail'
        //       })
        //     } else {
        //       res.json({
        //         msg: 'success'
        //       })
        //     }
        //   })

        res.status(200).json({
             status:200,
             properties
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}

export default homes;
