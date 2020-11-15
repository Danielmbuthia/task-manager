let Task = require('../models/taskModel');

exports.create = async (req,res)=>{
  try{

      const task = new Task({
          ...req.body,
          owner:req.user.id
      });
      await task.save()
      res.status(201).send(task)
  }catch (e) {
     res.status(500).send(e.message)
  }
};

exports.readAllTasks = async (req,res)=>{
    try{
        await req.user.populate('tasks').execPopulate();
        res.status(200).send(req.user.tasks)
    }catch (e) {
        res.status(500).send(e.message);
    }
};

exports.readATask = async (req,res)=>{
     const _id = req.params.id;
    try{
      const task =  await Task.findOne({_id,owner:req.user._id});
           if (!task){
             return res.status(404).send('no task with that id');
           }
           res.status(200).send(task);
    }catch (e) {
        res.status(500).send(e.message);
    }
}
exports.updateATask =async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed','description'];
    const isValidUpdated = updates.every((update)=>allowedUpdates.includes(update));
    if (!isValidUpdated){
        return res.status(400).send('An invalid request')
    }
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id});
        if (!task){
            return res.status(404).send('No task found');
        }
        updates.forEach((update)=>task[update]=req.body[update]);
        await task.save();

        res.status(200).send(task);
    }catch (e) {
        res.status(400).send(e.message);
    }
}

exports.deleteATask =async (req,res)=>{
    try{
       const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
       if (!task){
           return res.status(404).send('No task to delete');
       }
       res.status(200).send(task)
    }catch (e) {
        res.status(400).send(e.message);
    }
}
