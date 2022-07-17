const express=require("express");
const app=express();
const PORT=process.env.PORT_ONE || 7070;
const User = require("./User");
const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
app.use(express.json());
const db = mongoose.connect("mongodb://localhost/auth-service",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(async() => {
    console.log("Auth-Service DB Connected");
    
//Register
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    } else 
    {
        if (password !== user.password) {
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
    }
});
app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({ message: "User already exists" });
    } else {
        const newUser = new User({
            email,
            name, 
            password,
        });
        newUser.save();
        return res.json(newUser);
    }
});

app.listen(PORT,()=>{
    console.log(`Auth-Service at${PORT}`);
});
    
})
