const express=require("express");

const router=express.Router();
const passport=require("passport");
const Song=require("../models/Song");
const User=require("../models/user");

router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {name,thumbnail,track}=req.body;
    const artist=req.user._id;
    const songDetails={name,thumbnail,track,artist};
    const createdSong=await Song.create(songDetails);
    if(!name||!thumbnail||!track){
        return res.status(301).json({err:"Insufficient details to create song"});
    }
    return res.status(200).json(createdSong);
});

//want to get self created songs
router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    // const currentUser=req.body;
    const songs=await Song.find({artist:req.user._id}).populate("artist");
    return res.status(200).json({data:songs});
});

//want to get all songs by artist name
router.get("/get/artist/:artistId", passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {artistId}=req.params;
    const artist=await User.findOne({_id:artistId});
    if(!artist){
        return res.status(301).json({err:"Artist does not exist"})
    }
    const songs=await Song.find({artist:artistId});
    return res.status(200).json({data:songs});
})

//want to get song by name
router.get("/get/songname/:songName", passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {songName}=req.params;
    
    const songs=await Song.find({name:songName}).populate("artist");
    return res.status(200).json({data:songs});
})
module.exports=router;