const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const cookieParser = require("cookie-parser");

const express = require('express');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require('./routes/maps.routes')
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use("/captain", captainRoutes);
app.use('/maps', mapRoutes);



module.exports = app;
