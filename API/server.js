const express = require('express');
//const mongo = require('mongos');

const app = express();
const PORT = 5000;
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());
const url = 'mongodb://prageeth:prageeth.456@ac-7uzrxvy-shard-00-00.ldnh0s1.mongodb.net:27017,ac-7uzrxvy-shard-00-01.ldnh0s1.mongodb.net:27017,ac-7uzrxvy-shard-00-02.ldnh0s1.mongodb.net:27017/test?replicaSet=atlas-unu9wn-shard-0&ssl=true&authSource=admin';


app.get('/', (req, res) => {
    res.send("You are done!");
});

//login
app.post('/login', (req, res) => {
    console.log("request received for get Login");
	console.log(req.body.Email + "-" + req.body.Password);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("application");
        dbo.collection("user").findOne({ Email: req.body.Email, password: req.body.Password }, function (err1, result) {
            if (err) throw err;
			if(result == null){
				res.send("Not Found");
				console.log("respose Null");
			}
			else {
				res.send(result);
			}
            db.close();
        });
    });
});

app.post('/signUp', (req, res) => {
    console.log(req.body);
    var userObject = new Object();

    userObject.FirstName = req.body.FirstName;
    userObject.LastName = req.body.LastName;
	userObject.companyName = req.body.companyName;
	userObject.companyAddress = req.body.companyAddress;
    userObject.Email = req.body.Email;
	userObject.password = req.body.password;
	userObject.type = "user";

    var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("application");
		console.log("Called");
		dbo.collection("user").insertOne(userObject, function (err1, res1) {
			if (err1) throw err1;
			console.log("Item was added to the category added.");
			res.send(true);
			db.close();
		});
	});
});


app.listen(PORT, () => {
console.info('Server is running on PORT:', PORT);
});
