const app = require("./app");
const config = require("./app/config");

//start server
const PORT = config.app.port;
app.listen(PORT,()=>{
    console.log(`Sever is running on ${PORT}.`);
})