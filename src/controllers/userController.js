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
    res.send(req.user);
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
        updates.forEach((update)=>req.user[update] = req.body[update]);

        await req.user.save();

        res.status(201).send(req.user);
    }catch (e) {
        res.status(400).send(e.message)
    }
}

exports.deleteAUser =async (req,res)=>{
    try{
       await req.user.remove();
        res.status(200).send(req.user);
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

exports.logoutUser = async (req,res)=>{
    try{
       req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token;
       })
        await req.user.save();
       res.send('logged out successfully');
    }catch (e) {
        res.status(500).send(e.message);
    }
}

exports.logoutAll =async (req,res)=>{
    try{
        req.user.tokens =[];
        await req.user.save();
        res.send('all logged out successfully');
    }catch (e) {
        res.status(500).send(e.message);
    }
}
exports.uploadProfilePic = async (req,res)=>{
    try{
        req.user.avatar = req.file.buffer;
        await req.user.save();
        res.send()
    }catch (e) {
        res.status(500).send(e.message)
    }
}

