const mongodb = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const User = require('./model/Users')
var cors = require('cors')


//Set up default mongoose connection
var mongoDB = 'mongodb://admin:admin1234@ds147225.mlab.com:47225/crude';

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//routes
app.get("/api/",(req, res)=>{

    User.find({}).then(suc =>{
        res.json(suc)
    }).catch(err =>{
        console.log(err);
        
    })
})


app.post("/api/",(req, res)=>{

    let user = new User(req.body)
    console.log(user);
    
    user.save()

   res.json({ "status" : "success", "message" : "Saved!"})
})



app.listen(4000,"localhost", (req, res)=>{
    console.log("ready");
    
})