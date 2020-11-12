let Task = require('../models/taskModel');

exports.create = async (req,res)=>{
  try{
    const task = new Task(req.body);
    await task.save()
       res.status(201).send(task)
  }catch (e) {
     res.status(500).send(e.message)
  }
};

exports.readAllTasks = async (req,res)=>{
    try{
        const tasks = await Task.find({});
            res.status(201).send(tasks)
    }catch (e) {
        res.status(500).send(e.message);
    }
};

exports.readATask = async (req,res)=>{
     const _id = req.params.id;
    try{
      const task =  await Task.findById(_id);
           if (!task){
             return res.status(404).send('no task with that id');
           }
           res.status(201).send(task);
    }catch (e) {
        res.status(500).send(e.message);
    }
}
exports.updateATask =async (req,res)=>{
    try{
        const task = await Task.findOneAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if (!task){
            return res.status(404).send('No task found');
        }
        res.status(201).send(task);
    }catch (e) {
        res.status(400).send(e.message);
    }
}

exports.deleteATask =async (req,res)=>{
    try{
       const task = await Task.findByIdAndDelete(req.params.id);
       if (!task){
           return res.status(404).send('No task to delete');
       }
       res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e.message);
    }
}
