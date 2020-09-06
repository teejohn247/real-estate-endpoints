import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Contact from '../model/Contact';
import nodemailer from 'nodemailer';
import config from '../config/config';
import gravatar from 'gravatar';
import utils from '../config/utils';

dotenv.config();




const contact = async (req, res) => {

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

    try{ 
        const {name, email, subject, phone_number, message} = req.body;
        console.log(req.body.name);
     
        let contact = new Contact({
            name: name,
            email: email,
            subject: subject,
            phone_number: phone_number,
            message: message
        });
        console.log(contact);

        await contact.save();
        
        // var mail = {
        //     from: name,
        //     to: 'teejohn247@gmail.com',  
        //     subject: 'New Message from Relationship expert',
        //     text: message
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
             contact
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}

export default contact;
