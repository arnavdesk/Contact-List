// library required
const mongoose = require("mongoose");

// connect to database
mongoose.connect('mongodb://localhost/contact_list_db', { useNewUrlParser: true });

// acquire the connection to check if it is succcesful
const db = mongoose.connection;

// print error if it fails
db.on('error', console.error.bind(console, 'Error connecting to db'));

// up and running so print msg
db.once('open', function () {
    console.log("Voila! DB running");

});