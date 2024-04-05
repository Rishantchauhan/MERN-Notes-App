
const ConnectToMongoose = require('./db.js');
var cors = require('cors')
const express = require('express');

const app = express();
const port = 5000; // Corrected port number

const corsConfig={
  origin:"*",
  methods:["POST","GET","PUT","DELETE"],
  credentials:true
};
app.options("",cors(corsConfig));
app.use(cors(corsConfig));
// app.use(cors({
//   
//   // Replace with your allowed origin(s)
// }));
app.use(express.json());
app.use('/api/auth', require('./Routes/auth.js'));
app.use('/api/notes', require('./Routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

ConnectToMongoose();
module.exports = app;
