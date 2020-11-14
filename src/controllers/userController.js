const User = require('../models/userModel');

exports.create = async (req,res) =>{
    const user = new User(req.body);
 try{
     await user.save();
     const token = await user.generateAuthToken();
         res.status(201).send({user,token});
 }catch (e){
     res.status(500).send(e.message);
 }
}

exports.readAllUsers = async (req,res)=>{
    try{
      const users = await User.find({});
            res.status(201).send(users);
    }catch (e) {
        res.status(500).send(e.message);
    }
}

exports.readAUser = async (req,res)=>{
    try{
        const _id = req.params.id
       const user = await User.findById(_id);
            if (!user){
              return res.status(404).send('No user with that id');
            }
            res.status(201).send(user);
    }catch (e) {
        res.status(500).send(e.message);
    }
}

exports.updateAUser =async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if (!isValidOperation){
        return res.status(400).send('Not allowed');
    }
    try{
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).send('No user found');
        }
        updates.forEach((update)=>user[update] = req.body[update]);

        await user.save();

        res.status(201).send(user);
    }catch (e) {
        res.status(400).send(e.message)
    }
}

exports.deleteAUser =async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(404).send('No user to delete');
        }
        res.status(200).send(user);
    }catch (e) {
        res.status(500).send(e.message);
    }
}

exports.loginUser = async (req,res)=>{
    try{
       const user = await  User.findByCredentials(req.body.email,req.body.password);
       const token = await user.generateAuthToken();

       res.status(200).send({user,token});
    }catch (e) {
        res.status(400).send('unable to login');
    }
}


