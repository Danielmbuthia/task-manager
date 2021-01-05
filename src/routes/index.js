let user = require('../controllers/userController');
let task = require('../controllers/taskController');

let auth = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({
   limits:{
      fileSize: 1000000
   },
   fileFilter(req,file,cb){
      if (!file.originalname.match("\.(jpg|jpeg|png)$")){
         return cb(new Error('Please use an image'))
      }
      cb(undefined,true)
   }
})

module.exports =(app)=>{
   ////user routes
   app.post('/user/login',user.loginUser);
   app.post('/users',user.create);
   app.get('/user/profile',auth,user.readAllUsers);
   app.get('/users/:id',auth,user.readAUser)
   app.patch('/users/me',auth,user.updateAUser);
   app.delete('/users/me',auth,user.deleteAUser);
   app.post('/user/logout',auth,user.logoutUser);
   app.post('/users/logoutAll',auth,user.logoutAll);
   app.post('/user/me/avatar',auth, upload.single('avatar'), user.uploadProfilePic,
       (error,req,res,next)=>{res.status(500).send({
         error:error.message
      })//// error handling from multer
   });
   //// task routes
   app.post('/tasks',auth,task.create);
   app.get('/tasks',auth,task.readAllTasks);
   app.get('/tasks/:id',auth,task.readATask);
   app.patch('/tasks/:id',auth,task.updateATask);
   app.delete('/tasks/:id',auth,task.deleteATask);
}
