import express from 'express';
import admin from '../controller/admin';
import adminAuth from '../middleware/adminAuth';
import userRegister from '../controller/userRegister';
import adminLogin from '../controller/adminLogin';
import login from '../controller/signin';
import clockOut from '../controller/updateClockOut';
import records from '../controller/adminRecords';
import updateAdminRecords from '../controller/updateAdminRecords';
import adminView from '../controller/adminView';
import userHistory from '../controller/userHistory';
import filterDate from '../controller/filterDate';
import editProfile from '../controller/editProfile';
import userClockIn from '../controller/userClockIn';
import changePassword from '../controller/changePassword';
import csv from '../controller/downloadCsv';
import adminHistory from '../controller/adminHistory';
import adminEdit from '../controller/adminEdit';
import adminPassword from '../controller/adminPassword';
import adminFilter from '../controller/adminFilter';
import admins from '../controller/totalAdmins';
import users from '../controller/totalUsers';
import bookings from '../controller/homes';
import contact from '../controller/contact';
// import imageUploader from '../middleware/imageUploader';
import upload from '../config/multer.config';





// import exp from '../controller/addExperience';
// import edu from '../controller/addEducation';
// import delEdu from '../controller/deleteEducation';
// import delExp from '../controller/deleteExperience';
// import post from '../controller/post';
// import getPosts from '../controller/getPosts';
// import getPost from '../controller/getPost';
// import like from '../controller/likes';
// import unlike from '../controller/unlike';
// import comment from '../controller/comment';
// import delComment from '../controller/delComment';

import auth from '../middleware/auth';
import adminBookings from '../controller/adminBookings';
import delAdmin from '../controller/delAdmin';
import delBookings from '../controller/delBookings';
import delContact from '../controller/delContact';
import updateAdminRecord from '../controller/updateAdminRecord';
import viewAdmin from '../controller/viewAdmin';
import {Donor} from '../model/donor';
import request from 'request';
const _ = require('lodash');
// import pug from 'pug';

// const {Donor} = require('../models/donor');
const {initializePayment, verifyPayment} = require('../config/paystack')(request);
const router = express.Router();

router.post('/admin/signup', admin);
router.post('/admin', adminLogin);
router.get('/properties',auth, records);
router.post('/post/properties', upload.array('images', 6), bookings);
router.delete('/del/property/:id',auth, delBookings);
router.patch('/update/admin',auth, updateAdminRecord);
router.patch('/update/property/:id', auth, updateAdminRecords);





router.post('/register', userRegister);
// router.post('/bookings', bookings);
router.post('/contact', contact);
router.get('/view/contact/:page/:limit',auth, adminView);
router.get('/view/bookings/:page/:limit',auth, adminBookings);
router.delete('/del/admin/',auth, delAdmin);
router.delete('/del/contact/:id',auth, delContact);
router.get('/view/admin/:page/:limit',auth, viewAdmin);

router.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body,['amount','email','first_name', 'last_name', 'phone', 'service']);
    form.metadata = {
        full_name : form.full_name
    }
    console.log(form);
    form.amount *= 100;
    
    initializePayment(form, (error, body) => {
        if(error){
            //handle errors
            console.log(error);
            res.status(400).json({
                status: 400,
              })
            return res.redirect('/error');
            return;
        }
       var response = JSON.parse(body);
        // res.status(200).json({
        //     status: 200,
        //   })
        res.redirect(response.data.authorization_url)
    });
});


router.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body) => {
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);        

        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);

        [reference, amount, email, full_name] =  data;
        
        newDonor = {reference, amount, email, full_name}

        const donor = new Donor(newDonor)

        donor.save().then((donor)=>{
            if(!donor){
                return res.redirect('/error');
            }
            res.redirect('/receipt/'+donor._id);
        }).catch((e)=>{
            res.redirect('/error');
        })
    })
});


router.get('/receipt/:id', (req, res)=>{
    const id = req.params.id;
    Donor.findById(id).then((donor)=>{
        if(!donor){
            //handle error when the donor is not found
            res.redirect('/error')
        }
        res.render('success.pug',{donor});
    }).catch((e)=>{
        res.redirect('/error')
    })
});




// router.post('/bookings',auth, records);
router.get('/view/all',[auth, adminAuth], adminView);
router.patch('/admin/edit-profile',[auth, adminAuth], adminEdit);
router.post('/admin/history', [auth, adminAuth], adminHistory);
router.post('/admin/filter-date',[auth, adminAuth], adminFilter);
router.get('/admin/admins',[auth, adminAuth], admins);
router.get('/admin/users',[auth, adminAuth], users);
router.patch('/admin/change-password',[auth, adminAuth], adminPassword);
router.get('/csv',auth, csv);
router.post('/history',auth, userHistory);
router.post('/filter-date',auth, filterDate);
router.patch('/clock-in',auth, userClockIn);
router.patch('/edit-profile',auth, editProfile);
router.patch('/change-password',auth, changePassword);

// router.patch('/logout', auth, clockOut);

// router.get('/logout', function(req,res){
//     req.logout();
//     console.log('logged out')
// });
// router.post('/profile', auth, profiles);
// router.get('/profile/me', auth, getProfile);
// router.get('/all', getAll);
// router.delete('/del', auth, del);
// router.delete('/del/post/:id', auth, delPost);
// router.get('/specific/:id', auth, getSpecific);
// router.post('/exp', auth, exp);
// router.delete('/exp/del/:exp_id', auth, delExp);
// router.delete('/edu/del/:edu_id', auth, delEdu);
// router.post('/edu', auth, edu);
// router.post('/post', auth, post);
// router.post('/post/like/:post_id', auth, like);
// router.get('/allposts', auth, getPosts);
// router.get('/allposts/:id', auth, getPost);
// router.post('/comment/:post_id', auth, comment);
// router.delete('/post/unlike/:id', auth, unlike);
// router.delete('/comment/:id/:comment_id', auth, delComment);


export default router;