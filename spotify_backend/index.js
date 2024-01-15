const express= require("express");

const mongoose= require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport");
const User=require("./models/user");
const authRoutes=require("./routes/auth");
const songRoutes=require("./routes/song");
const playlistRoutes=require("./routes/playlist");
require("dotenv").config();
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://pradeep_9034:"+process.env.MONGO_PASSWORD+"@spotify-clone.sxcksrs.mongodb.net/?retryWrites=true&w=majority",
    {
    useNewUrlParser:true,
    useUnifiedTopology:true
    }
).then((x) => {
    console.log("connected to database");
})
.catch((err) => {
    console.log("Error while connecting to database");
});

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            
        }
    });
}));


app.get("/",function(req,res){
    res.send("Hello World")
});

app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);

app.listen(8080,function(){
    console.log("server started on port 8080")
});