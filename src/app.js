const express = require("express");
const path = require("path"); //is a middleware to host static website
const app = express();
const hbs = require("hbs");


require("./db/conn");

const Register = require("./models/registers");
const { json } = require("express");

const port = process.env.PORT || 3000;  

const static_path = path.join(__dirname, "../public"); //hosting  static website from public 
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine", "hbs"); //using view engine 

app.set("views", template_path);
hbs.registerPartials(partials_path );


app.get("/", (req,res)   => {
    res.render("index") //pasing index of view engine
});

app.get("/login", (req,res) => {
    res.render("login")
});
app.get("/register", (req,res) => {
    res.render("register")
});

app.get("/tindog", (req,res) => {
    res.render("tindog")
});

//creating a new user in our database
app.post("/register", async (req,res) => {
    try {

        const registerEmployee = new Register ({
            username : req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const registered = await registerEmployee.save();
        res.send(201).render("index");

    }   catch(error) {
            res.status(400).send(error);
    }
})

app.post("/login", async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
       
        const useremail = await Register.findOne({email: email})
        
        if(useremail.password === password){
            res.status(201).render("index");
        }

        else{   
            res.send("Wrong Credentials");
        }

    } catch(error) {
        res.status(400).send("Wrong Credentials")
    }
})




app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});