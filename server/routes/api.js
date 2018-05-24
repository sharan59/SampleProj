var app = require('express')();

//var Book = require('../models/bookModel');
var mongo = require('mongodb').MongoClient;
//mongoose.Promise = global.Promise;
//mongo.connect("mongodb://localhost:27017/booktest");
//var db = mongo.connection

var mongoose = require('mongoose');    

    app.post('/adduser', function(req, res) {
        //var userName=req.body.userName;
        //var pw=req.body.pw;
        //var age=req.body.age;
        var obj={username:req.body.username,address:req.body.address,contact:req.body.contact,email:req.body.email};
      mongo.connect("mongodb://localhost:27017/userdb",function(err,db){
    
        if(err) throw err;
        db.collection('adduser').insert(obj,function(err,res){
            if(err)
            console.log.apply(err);
            console.log("successfully inserted");
            
    
        })
        res.send("inserted");
        });
        });

    


          app.get('/all', function(req, res) {

            mongo.connect("mongodb://localhost:27017/userdb",function(err,db){
      
                      if(!err)
                      {
                          db.collection('adduser').find({}).toArray(function(err,result){
                           
                              console.log(result);
                              if(err||result.length<=0)
                              console.log('no data');
                              else
                              console.log("data retrieved");
                              res.send(result);
                      })
                }
          })})

          app.delete('/all/:username', function(req, res) {

     
            console.log("name is"+req.params.username);
               var rname=req.params.username;
               console.log("param is"+rname)
        mongo.connect("mongodb://localhost:27017/userdb",function(err,db)
        
        {
           console.log("before");
           db.collection('adduser').deleteOne({username:rname},function(err,result){
        
                   if(err) throw err;
        
                   console.log("result is"+result);
        
                   
                   db.collection('adduser').find({}).toArray(function(err, data) {
                       if(err) throw err;
                       console.log('mongo connected');
                       console.log(data);
                       res.send(data);
                   });
        
           });
        
        })})

        app.put('/data/:_id', function(req, res) {
       
            console.log("_id in api to update is"+req.params._id);
            console.log("_id in api to update is"+req.body.username); 
            console.log("_id in api to update is"+req.body.address);
            console.log("_id in api to update is"+req.body.email);
           
            mongoose.connect("mongodb://localhost:27017/userdb",function(err,db){
        
            if(err) throw err;
           
        console.log("connected to db successfully to save update");
        var id = new mongoose.Types.ObjectId(req.params._id);
        db.collection('adduser').find(id).toArray(function(err, data) {
            if(err) throw err;
           
            console.log(data);
            db.collection('adduser').update({'_id':id},{$set:{username:req.body.username,address:req.body.address,
            email:req.body.email,contact:req.body.contact}});
            res.send(data);
        });
           
            //res.send(res);
           // res.send({message:"successfully registred"});
            });
            });
    
        

module.exports = app;

