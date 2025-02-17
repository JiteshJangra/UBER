const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const express = require('express');
const userRoutes = require('./routes/user.routes');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.send("Hellow");
})



module.exports = app;