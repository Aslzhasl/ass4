const express =require('express');
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require("./confid");
const {authCourse,authPage}=require('./middleware');
/*
const exp = require('constants');
*/
const app=express();
//convert data into json
app.use(express.json());

app.use(express.urlencoded({extended:false}));
//admin code

/*
app.get("/pages/admin.ejs",authPage(["teacher","admin"]),(req,res)=>{
res.send("You have permission")
});
*/


//for ejs
app.set('view engine','ejs');


app.use(express.static("public"));


app.get("/",(req,res) => {
    res.render("login.ejs");
});

app.get("/views/signup.ejs",(req,res) => {
    res.render("signup.ejs");
});

// Register the user
app.post("/signup", async (req,res)=>{

const data = {
    name: req.body.username,
    password: req.body.password
}

//chech the user 

const existingUser = await collection.findOne({name: data.name}); 
if (existingUser){
    res.send("user already exist")
}else{
    //bscrypt usage
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password,saltRounds);
    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
console.log(userdata);
}
});


//Login user
app.post("/login", async(req,res) => {
try{
    const check =await collection.findOne({name: req.body.username});
    if(!check){
        res.send("user name connot found :(");
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if(isPasswordMatch){
        res.render("pages/home.ejs");
    }else{
        req.send("wrond password");
    }
}catch{
res.send("wrong");
}
});




const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port:${port}`);
});
