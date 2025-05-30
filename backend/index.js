const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require('./config/databse');
const signUpRoute = require('./routes/signUpRoute.js');
const logInRoute = require('./routes/logInRoute.js');
const chatRoute = require('./routes/chatRoute.js');
const Message = require('./models/messages.js'); //import the messages model

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// signup and login routes 
app.use('/api/auth', signUpRoute);
app.use('/api/auth', logInRoute);
app.use('/api/chat', chatRoute);



// connect to database and start the server 
sequelize.sync().then(()=>{
    app.listen(5000, ()=>console.log("Server is running on port 5000"));
});