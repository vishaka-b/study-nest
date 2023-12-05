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
        const { groupName, ownersName, subjectsName, meetingTime, meetingDays, subjectClassification, selectedSubject, members, maxMembers, usernames, resources} = req.body;
        //console.log(groupName)
       
        database.collection("mygroupscollection").insertOne({
            
            groupName : groupName,
            ownersName: ownersName ,
            courseName : subjectsName,
            meetingTime: meetingTime,
            meetingDays: meetingDays,
            subjectClassification: subjectClassification,
            selectedSubject: selectedSubject,
            members: members,
            maxMembers: maxMembers,
            usernames: usernames,
            resources: new Array()
        });
        console.log(usernames);
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
   /* let index = members.indexOf(user);
    database.collection("mygroupscollection").usernames.splice(index, 1);*/
    try {
      const result = database.collection("mygroupscollection").updateOne(
        { groupName: groupName },
        { $pull: { members: user } },
        );
      
      res.json({ message: 'Succesfully left group:', groupName });
    } catch (error) {
      res.status(404).json({message: "Error!"})
    }
    
    }
  );
  
app.post('/AddResource', async (req, res) => {
    console.log(req.body);
 
 
    try {
        // Connect to the MongoDB database
        const collection = database.collection('mygroupscollection');
   
        // Assuming you have a groupId in the request body and a resource to add
        //const { groupID, resource } = req.body;
        const groupID=req.body.groupName;
        const resource=req.body.resource;
      
        if (!resource) {
          alert("Please enter resource before adding");
          return;
        }
        // Find the group document by its _id (assuming groupId is the _id)
        const group = await collection.findOne({ groupName: groupID });
        //console.log("GROUP", group);
   
        if (!group) {
          // Group not found
          return res.status(404).json({ message: 'Group not found' });
        }
   
        // Add the resource to the resources array
        if (group.resources==null){
            group.resources=new Array();
        }

        group.resources.push(resource);
        console.log(group.resources);
   
        // Update the group document in the database
        const result = await collection.updateOne(
          { groupName: groupID },
          { $push: { resources: resource } }
        );
   
        if (result.modifiedCount === 1) {
          // Resource added successfully
          res.json({ message: 'Resource added successfully' });
        } else {
          // Resource addition failed
          res.json({ message: 'Failed to add resource' });
        }
      } catch (error) {
        console.error('Error adding resource:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
 });

 
app.post('/addToGroup/', async (req,res) => {
    try{
        const groupID = req.body.groupName;
        const newMember = req.body.user;
        const username = req.body.username;
        
        const groupCollection = database.collection("mygroupscollection");

        // Check if the member already exists in the array
        const existingMember = await groupCollection.findOne({ groupName: groupID, members: newMember });

        if (!existingMember) {

        // Member doesn't exist, proceed with the update
        await groupCollection.updateOne(
            { groupName: groupID },
            { $push: { members: newMember } },
            { $push: {usernames: username}}
        );
        res.json({ message: 'Successfully joined (meow):)' });
        } else {
        // Member already exists in the array
        res.json({ message: 'You are already a member of this group' });
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }

        
        }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
