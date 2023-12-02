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
        const { groupName, ownersName, subjectsName, meetingTime, meetingDays, subjectClassification, selectedSubject, members } = req.body;
        //console.log(groupName)
       
        database.collection("mygroupscollection").insertOne({
            
            groupName : groupName,
            ownersName: ownersName ,
            courseName : subjectsName,
            meetingTime: meetingTime,
            meetingDays: meetingDays,
           // subjectClassification: JSON.parse(subjectClassification), //subjectClassification,
            subjectClassification: subjectClassification,
            selectedSubject: selectedSubject,
            members: members
            
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

app.post('/checkMembership', async (req, res) => {
    const { groupName, user } = req.body;
  
    const groupsCollection = database.collection('mygroupscollection');
  
    try {
      const isMember = await groupsCollection.findOne({ groupName, members: user });
      res.json({ isMember: !!isMember});
    } catch (error) {
      console.error('Error checking membership:', error);
      res.status(500).json({ error: 'Error checking membership' });
    }
  });

app.post('/checkOwnership',  async (req, res) => {
    const { groupName, user } = req.body;
  
    const groupsCollection = database.collection('mygroupscollection');
    try {
        const isOwner = await groupsCollection.findOne({ groupName, ownersName: user });
        res.json({ isOwner: !!isOwner});
      } catch (error) {
        console.error('Error checking ownership:', error);
        res.status(500).json({ error: 'Error checking ownership' });
      }    
  });

  app.delete('/deleteGroup', async (req, res) => {
    const { groupName } = req.body;
  
    const groupsCollection = database.collection('mygroupscollection');
  
    try {
      const result = await groupsCollection.deleteOne({ groupName} );
      res.json({ message: {result} });
    } catch (error) {
      res.status(404).json({ message: {groupName} }); 
    }
    
});



app.post('/leaveGroup', (req, res) => {
    const {groupName, user} = req.body;
    console.log(groupName)
    console.log(user)
    
    try {
      const result = database.collection("mygroupscollection").updateOne(
        { groupName: groupName },
        { $pull: { members: user } }
        );
      
      res.json({ message: 'Succesfully left group:', groupName });
    } catch (error) {
      res.status(404).json({message: "Error!"})
    }
    
    }
  );
  

app.post('/addToGroup/', async (req,res) => {
    try{
        const groupID = req.body.groupName;
        const newMember = req.body.user;
        
        const groupCollection = database.collection("mygroupscollection");

        // Check if the member already exists in the array
        const existingMember = await groupCollection.findOne({ groupName: groupID, members: newMember });

        if (!existingMember) {
        // Member doesn't exist, proceed with the update
        await groupCollection.updateOne(
            { groupName: groupID },
            { $push: { members: newMember } }
        );
        res.json({ message: 'Successfully joined (meow):)' });
        } else {
        // Member already exists in the array
        res.json({ message: 'You are already a member of this group' });
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }

        /*if (database.collection("mygroupscollection").contains(newMember)){
            console.error(error);
        }*/
        
      /*  database.collection("mygroupscollection").updateOne(
            { groupName: groupID },
            { $addToSet: { members: newMember } },
       // );
       // res.json({ message: 'Succesfully joined :)' });    
        (err, result) => {
            if (err) {
              res.status(500).json({ error: 'Error updating the database' });
            } else {
              if (result.modifiedCount > 0) {
                res.json({ message: 'Successfully joined :)' });
              } else {
                res.json({ message: 'You are already a member of this group' });
              }
            }
          }
         );*/
        }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//from mongoDB tutorial video
/*
app.delete('/backend/todoapp/DeleteNotes' ,(request,response)=>{
    database.collection("todoappcollection").deleteOne({
        id:request.query.id

    });
    response.json("deleted succesfully");
})
*/