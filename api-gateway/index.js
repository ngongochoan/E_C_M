const express=require("express");
const axios = require('axios');
const { json } = require("express");
const app=express();
const PORT=process.env.PORT_ONE || 30000;
app.use(express.json());

//Register
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const resLogin = await axios.post('http://localhost:7070/auth/login', {email, password})
    return resLogin;
});
app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;    
    const response = await axios.post('http://localhost:7070/auth/register', {email, password, name})
    return res.json(response.data);
});

app.listen(PORT,()=>{
    console.log(`Auth-Service at${PORT}`);
});
    