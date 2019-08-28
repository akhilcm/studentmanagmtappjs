const Express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Mongoose = require('mongoose');

var app = new Express();

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

Mongoose.connect("mongodb://localhost:27017/studentdb");

const StudModel = Mongoose.model("studentdetails",{
    admno:String,
    rollno:String,
    name:String,
    college:String,
    branch:String,
    dob:String,
    email:String
});

app.post('/insertstud',(req,res)=>{
    var stud = new StudModel(req.body);
    var result = stud.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("Inserted!!");
        }
    });

});

app.get('/viewstud',(req,res)=>{
    var result = StudModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

//search
app.post('/search',(req,res)=>{
    var item = req.body.admno;
    var result = StudModel.find({admno:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
  });


  
 //delete
 app.post('/delete',(req,res)=>{
    var item = req.body._id;
    var result = StudModel.deleteOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
  }); 

  //update
  app.post('/update',(req,res)=>{
    const x = req.body._id;
    const AdmNo = req.body.admno;
    const RollNo = req.body.rollno;
    const Name = req.body.name;
    const College = req.body.college;
    const Branch = req.body.branch;
    const DOB = req.body.dob;
    const Email = req.body.email;
    console.log(x);
    var result = StudModel.updateOne({_id:x},{$set:{admno:AdmNo,rollno:RollNo,name:Name,college:College,branch:Branch,dob:DOB,email:Email}},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
  });
app.listen(process.env.PORT || 3005,()=>{
    console.log("Server running on port:http://localhost:3005");
});