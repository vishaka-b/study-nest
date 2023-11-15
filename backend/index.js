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

app.listen(5000, ()=>console.log("app is running"));

