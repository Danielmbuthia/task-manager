let user = require('../controllers/userController');
let task = require('../controllers/taskController');

let auth = require('../middleware/authMiddleware');

module.exports =(app)=>{
   ////user routes
   app.post('/user/login',user.loginUser);
   app.post('/users',user.create);
   app.get('/users',auth,user.readAllUsers);
   app.get('/users/:id',auth,user.readAUser)
   app.patch('/users/:id',auth,user.updateAUser);
   app.delete('/users/:id',auth,user.deleteAUser);
   //// task routes
   app.post('/tasks',auth,task.create);
   app.get('/tasks',auth,task.readAllTasks);
   app.get('/tasks/:id',auth,task.readATask);
   app.patch('/tasks/:id',auth,task.updateATask);
   app.delete('/tasks/:id',auth,task.deleteATask);
}
