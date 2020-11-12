let user = require('../controllers/userController');
let task = require('../controllers/taskController');

module.exports =(app)=>{
   app.route('/users')
       .post(user.create);
   app.route('/users')
       .get(user.readAllUsers);
   app.route('/users/:id')
       .get(user.readAUser);
   app.route('/users/:id')
       .patch(user.updateAUser)
   app.route('/users/:id')
       .delete(user.deleteAUser);
   app.route('/tasks')
       .post(task.create);
   app.route('/tasks')
       .get(task.readAllTasks);
   app.route('/tasks/:id')
       .get(task.readATask)
   app.route('/tasks/:id')
       .patch(task.updateATask)
   app.route('/tasks/:id')
       .delete(task.deleteATask)
}
