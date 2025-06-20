const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require('./config/databse');
const signUpRoute = require('./routes/signUpRoute.js');
const logInRoute = require('./routes/logInRoute.js');
const chatRoute = require('./routes/chatRoute.js');
// Import Group Routes
const groupRoute = require('./routes/groupRoute');

// models 
const Message = require('./models/messages.js'); //import the messages model
const User = require('./models/user');
const Group = require('./models/groupModel');
const GroupMember = require('./models/groupMember.js');


// Setup associations im models group and user
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' });

Group.hasMany(Message, { foreignKey: 'groupId' });
Message.belongsTo(Group, { foreignKey: 'groupId' });


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// signup and login routes 
app.use('/api/auth', signUpRoute);
app.use('/api/auth', logInRoute);
app.use('/api/chat', chatRoute);

// Add group routes
app.use('/api/group', groupRoute);  // For group-related operations



// connect to database and start the server 
sequelize.sync().then(() => {
    console.log("Database synced")
    app.listen(5000, () => console.log("Server is running on port 5000"));
}).catch((err) => console.error("Sync failed", err));