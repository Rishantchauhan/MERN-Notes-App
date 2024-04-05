
const ConnectToMongoose = require('./db.js');
var cors = require('cors')
const express = require('express');

const app = express();
const port = 5000; // Corrected port number

app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./Routes/auth.js'));
app.use('/api/notes', require('./Routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

ConnectToMongoose();
