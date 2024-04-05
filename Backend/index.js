
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
<<<<<<< HEAD
// app.use(cors({
//   
//   // Replace with your allowed origin(s)
// }));
=======
>>>>>>> 1351fe56916b4ae85f5e10abcbcdb118a3f94907
app.use(express.json());
app.use('/api/auth', require('./Routes/auth.js'));
app.use('/api/notes', require('./Routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

ConnectToMongoose();
module.exports = app;
