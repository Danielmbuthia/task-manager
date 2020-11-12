const User = require('../models/userModel');

exports.create = async (req,res) =>{
    const user = new User(req.body);
 try{
     await user.save();
         res.status(201).send(user);
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
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if (!user){
            return res.status(404).send('No user found');
        }
        res.status(201).send(user);
    }catch (e) {
        res.status(400).send(e)
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


