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
app.listen(5000,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{

        database=client.db(DATABASENAME);
        console.log("Succesfully connected to MongoDB");
    })

})


    app.post('/AddGroups', (req, res) => {
        console.log(req.body); 
        // Assuming the data is sent as JSON in the request body
        const { groupName, ownersName, subjectsName, meetingTime, meetingDays } = req.body;
        console.log(groupName)
        // Perform any necessary validation or processing
        // ...
        database.collection("mygroupscollection").insertOne({
            groupName : groupName,
            ownersName: ownersName,
            courseName : subjectsName,
            meetingTime: meetingTime,
            meetingDays: meetingDays
        });
        // Send a response back to the client
        res.json({ message: 'Form data received successfully!' });
    });

//pull all data into this link http://localhost:5000/mygroupslist
app.get('/mygroupslist',(request,reposnse)=>{
    database.collection("mygroupscollection").find({}).toArray((error,result)=>{
        reposnse.send(result);
    })

})

//from mongoDB tutorial video
/*
app.post('/backend/todoapp/AddNotes',multer().none(),(request,response)=>{
    database.collection("todoappcollection").count({},function(error,numOfDocs){
        database.collection("todoappcollection").insertOne({
            id: (numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Succesfully");

    })
})

app.delete('/backend/todoapp/DeleteNotes' ,(request,response)=>{
    database.collection("todoappcollection").deleteOne({
        id:request.query.id

    });
    response.json("deleted succesfully");
})
*/