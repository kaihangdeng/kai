const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

const Doctor = require('./models/doctor');
const Patient = require('./models/patient');
const doctor = require('./models/doctor');
const patient = require('./models/patient');

let url = 'mongodb://localhost:27017/clinicDB';
mongoose.connect(url, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    };
});

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.listen(8080);
app.use(express.static("images"));
app.use(express.static("css"));

var db;

app.get("/", function (req, res) {
    res.render("index.html");
});


app.get('/addpatient', function (req, res) {
    patient.find({}, function (err, d) {
        res.render('addpatient.html', {patient:d});
    });
});

app.post('/addpatient', function (req, res) {
    let patient = new Patient({
        
        fullname: req.body.fullname,
        
        age: req.body.age,
        dateOfVisit: req.body.dateOfVisit,
        caseDescription: req.body.caseDescription
    });
    patient.save(function (err) {
        if (err) throw err;
        console.log('Task successfully added to DB');
    });
    res.redirect('/listpatient');
});


app.get('/listpatient', function (req, res) {
    patient.find({}, function (err, d) {
        res.render("listpatient.html", {patient: d});
    });
});


app.get('/deletepatient', function (req, res) {
    patient.find({}, function (err, d) {
        res.render("deletepatient.html", {patient: d});
    });
});

app.post('/deletepatient', function (req, res) {
    let fullName = new mongoose.Types.ObjectId(req.body.name);
    patient.deleteOne({name: fullName}, function (err) {
        if (err) throw err;
    });
    res.redirect('/listpatient');
});



app.get('/updatedoctor', function (req, res) {
    doctor.find({}, function (err, d) {
        res.render("updatedoctor.html", {patient: d});
    });
});

app.post('/updatedoctor', function (req, res) {
    let numOfPatients = new req.body.numOfPatients;
    doctor.updateOne({name: fullName}, function (err) {
        if (err) throw err;
    });
    res.redirect('/listdoctor');
});









app.get('/adddoctor', function (req, res) {
    res.render('adddoctor.html');

});

app.post('/adddoctor', function (req, res) {
    let doctor = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.firstName,
            lastname: req.body.lastName
        },
        dateOfBirth: req.body.dateOfBirth,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        },
        numOfPatients: req.body.numOfPatients
    });
    
    doctor.save(function (err) {
        if (err) throw err;
        console.log('Task successfully added to DB');
    });
    res.redirect('/listdoctor');
});

app.get('/listdoctor', function (req, res) {
    doctor.find({}, function (err, d) {
        res.render("listdoctor.html", {doctor: d});
    });



    

});

app.get('/*', function (req, res) {
    res.render("invailddata.html");
});
//et
app.get('/listdoctor/victoria', function (req, res) {
    doctor.find({'state': 'VIC'}, function (err, d) {
        res.render("listdoctor.html", {doctor: d});
    });
});