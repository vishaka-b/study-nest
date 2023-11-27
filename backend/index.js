const Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer=require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app=Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var CONNECTION_STRING = "mongodb+srv://mbajji:mongoDB@cluster0.cpyo7ca.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME="mygroups";
var database;





const groupSchema = {
    title: String,
    content: String
}

const Group = mongoose.model("Note", groupSchema);
app.listen(8888,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{

        database=client.db(DATABASENAME);
       // database.collection("mygroupscollection").createIndex( { ownersName: 1 }, { unique: true } )

        console.log("Succesfully connected to MongoDB");
    })

})


    app.post('/AddGroups', (req, res) => {
        console.log(req.body); 
        // Assuming the data is sent as JSON in the request body
        const { groupName, ownersName, subjectsName, meetingTime, meetingDays, subjectClassification, selectedSubject } = req.body;
        //console.log(groupName)
       
        database.collection("mygroupscollection").insertOne({
            
            groupName : groupName,
            ownersName: ownersName ,
            courseName : subjectsName,
            meetingTime: meetingTime,
            meetingDays: meetingDays,
            //subjectClassification: JSON.parse(subjectClassificationString), //subjectClassification,
            subjectClassification: subjectClassification,
            selectedSubject: selectedSubject
            
            
        });
        //console.log("IND SUBG:",console.log(selectedSubject))
        // Send a response back to the client
        res.json({ message: 'Succesfully created new Group' });
    });
app.post('/createNewUser', (req, res)=>{
    console.log(req.body); 
    const {email, pwd, name} = req.body;
    database.collection("myusercollection").insertOne({
        email: email,
        pwd: pwd,
        name: name
    });
    res.json({ message: 'Succesfully created new User. Please Login with your newest data' });
})
//pull all data into this link http://localhost:8888/mygroupslist
app.get('/mygroupslist',(request,reposnse)=>{
    database.collection("mygroupscollection").find({}).toArray((error,result)=>{
        reposnse.send(result);
    })

})

app.get('/myuserlist',(request,reposnse)=>{
    database.collection("myusercollection").find({}).toArray((error,result)=>{
        reposnse.send(result);
    })

})

//from mongoDB tutorial video
/*
app.delete('/backend/todoapp/DeleteNotes' ,(request,response)=>{
    database.collection("todoappcollection").deleteOne({
        id:request.query.id

    });
    response.json("deleted succesfully");
})
*/