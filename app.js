const express = require('express');
const cors = require('cors');
const app=express();
const contactRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

//define Route
app.get("/",(req,res)=>{
    res.json("Hello World");
});

app.use("/api/contacts",contactRouter);

// Handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource Not Found"));
  });

app.use((error,req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
  });

module.exports = app;