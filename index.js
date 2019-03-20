const mongodb = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const Student = require('./model/Students')
var cors = require('cors')

let PORT = process.env.PORT //4000 //
//Set up default mongoose connection
var mongoDB = 'mongodb://admin:admin1234@ds147225.mlab.com:47225/crude';

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors())


mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

//routes

app.get("/", (req, res) => {
    if (req.param.api_key) {
        console.log("ebere");

    }
    res.status(403).json({
        "message": "Mbaku Knows Your Here and Doesnt Want You Access This Page!",
        "passage": "Wakanda Forever!!!!!"
    })

})

app.get("/api/", (req, res) => {

    Student.find({}).then(suc => {
        let data = {
            "status": 200,
            "total_rescued": {
                "hero": "Super Ebere!",
                "total_number": suc.length
            },
            "message": "Wakanda Forever!",
            "title": "Uploads from everyone",
            "link": "https://www.techmice.co/photos/",
            "description": "",
            "modified": "2019-03-21T01:48:14Z",
            "generator": "https://www.techmice.co/",
            "data": {
                "data": {
                    "students": suc
                }
            }
        };

        res.status(200).json(data)
    }).catch(err => {
        console.log(err);

    })
})


app.post("/api/", (req, res) => {

    let student = new Student(req.body)
    // console.log(student);

    student.save().then((s) => {
        console.log(s);

        res.status(200).send({
            "status": "success",
            "message": "Saved!"
        })
    }).catch(e => {
        if (e.code === 11000) {
            res.status(403).send({
                "status": "error",
                "message": "Ebere Cant Have Duplicate Emails!",
                "problem": "duplicate email address"
            })
        } else {
            res.status(403).send({
                "status": "error",
                "message": "Mbaku Said NO!!!! Deal with it!"
            })
        }

    })


})



app.listen(PORT)
//     , "localhost", () => {
//     console.log(`connected on ${PORT}`)
// })