
const ConnectToMongoose = require('./db.js');
var cors = require('cors')
const express = require('express');

const app = express();
const port = 5000; // Corrected port number

app.use(cors());
// app.use(cors({
//   origin: ["https://mern-notes-app-za97.vercel.app/"],
//   methods:["POST","GET","PUT","DELETE"],
//   credentials:true
//   // Replace with your allowed origin(s)
// }));
app.use(express.json());
app.use('/api/auth', require('./Routes/auth.js'));
app.use('/api/notes', require('./Routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

ConnectToMongoose();
