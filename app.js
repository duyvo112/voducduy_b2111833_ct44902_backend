const express = require('express');
const cors = require('cors');
const app=express();
const contactRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.json("Hello World");
// });

app.use("/api/contacts",contactRouter);

module.exports = app;