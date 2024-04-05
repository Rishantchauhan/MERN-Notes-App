const express=require('express');
const router= express.Router();
const fetchuser = require('../Middleware/fetchuser');
const Note = require('../Models/Notes');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
    const notes=await Note.find({user:req.user});
    res.json(notes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while Geting' });
      }

});

router.post('/addnotes', [
    body('title', 'Enter title').notEmpty(),
    body('description', 'Enter Description').notEmpty(),
  ],fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    const {title,description,tag}=req.body;
     console.log(req.user);
    const note= new Note({
        title,description,tag,user:req.user
    })
    const Savednotes=await note.save();
    res.json(Savednotes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while Saving the note.' });
      }
});
router.put('/updatenotes/:id',fetchuser, async (req, res) => {
    const {title,description,tag}=req.body;
    const newnote={};
    if(title){
       newnote.title=title;
    }
    if(description){
       newnote.description=description;
    }
    if(tag){
       newnote.tag=tag;
    }
    let note=await Note.findById(req.params.id);
    if(!note)
       return res.status(401).send("Not Found");
    console.log(req.params.id);  
    console.log(req.user);  
    if(note.user.toString()!=req.user)
       return res.status(401).send("Not Found");
    delete newnote._id;  
    note= await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json(note);
});

router.delete('/deletenotes/:id',fetchuser, async (req, res) => {
    let note=await Note.findById(req.params.id);
    if(!note)
       return res.status(401).send("Not Found");
    console.log(req.params.id);  
    console.log(req.user);  
    if(note.user.toString()!=req.user)
       return res.status(401).send("Not Found");  
    note= await Note.findByIdAndDelete(req.params.id);
    res.json({success: "Deleted",note:note});
});



module.exports=router;

