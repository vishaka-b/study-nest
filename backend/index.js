import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/getGroupsYoureIn", (req,res)=> {
    res.send("GROUP 1");
});

app.get("/getGroupsYouveMade", (req,res)=> {
    res.send("GROUP 2");
});

//code to add authentication for login NOT WORKING
/*
app.use('/login', (req, res) => {
    res.send({
        email: 'hannah@email',
        password: '12345',
    });
});
*/

app.listen(5000, ()=>console.log("app is running"));

