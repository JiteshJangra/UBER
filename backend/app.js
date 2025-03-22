const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const cookieParser = require("cookie-parser");

const express = require('express');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes');
const connectToDb = require('./db/db');
const app = express();

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use("/captain", captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);



module.exports = app;
