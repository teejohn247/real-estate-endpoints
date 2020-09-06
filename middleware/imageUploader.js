// import cloudinary from 'cloudinary';

// const imageUploader = async (req, res, next) => {
//     var ings = [];
//     console.log(req.files);
//      const promises = req.files.map(async (file) => {
//      cloudinary.v2.uploader.upload(file.path, (error, result) => {
//      console.log(result.secure_url);
//      ings.push(result.secure_url)
//     //  req.body.images = result.secure_url;
//      console.log(ings)
//     })
//     req.body.images = ings;
//     });

//     await Promise.all(promises);
//     console.log(ings)
//     if(!req.body.images){
//         return next();
//     }
// };

// const imageUploader = (req, res, next) => {
//     const reqFiles = []
//     const url = req.protocol + '://' + req.get('host')
//     for (var i = 0; i < req.files.length; i++) {
//       reqFiles.push(url + '/uploads/' + req.files[i].filename)
//     }

//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     avatar: reqFiles
//   });
//   user.save().then(result => {
//     console.log(result);
//     res.status(201).json({
//       message: "Done upload!",
//       userCreated: {
//         _id: result._id,
//         avatar: result.avatar
//       }
//     })
//   }).catch(err => {
//     console.log(err),
//       res.status(500).json({
//         error: err
//       });
//   })
// }

// export default imageUploader;
