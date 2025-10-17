
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');

const { connectToMongo } = require('./services/dbService.js');
const { securityMiddlewares } = require('./middlewares/securityMiddleware.js');


dotenv.config();

// setting up express using the default parameters
const app = express();

app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}));

// calling in express.json middleware, so that our app can handle json
app.use(express.json());
app.use(cookieParser());

// set up our security middleware
securityMiddlewares(app);

// log every request
// the logger will look at the request, generate a response, then handle the next incoming request
app.use((req, res, next) => {
    // print out to the console (terminal) what type of method was used and to what endpoint that request was made
    console.log(`${req.method} ${req.url}`)
    // prepare to handle the next incoming request
    next();
});

// call in our router
const testRoutes = require('./routes/testRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

// first we version our api (v1) so that breaking changes can live on a new version
// then we specify an area that we want the routes to live in (in this case /test)
// finally, we point the app to where our routes live.
app.use('/v1/test', testRoutes);
app.use('/v1/payments', paymentRoutes);
app.use('/v1/auth', authRoutes);

const port = process.env.API_PORT || 5000

// call the method from our dbService file to connect to our Mongo database
connectToMongo();

//create a vartible to hold where our certificate lives
//we did 'npm install fs'
const options = {
    key: fs.readFileSync('./certs/localhost+1-key.pem'),
    cert: fs.readFileSync('./certs/localhost+1.pem')

}

// tell the API to start listening on a port we provide (which will eventually move to a .env file)
// app.listen(port, () => {
//     console.log(`The API is now listening on port ${port}.`)
// });

// Testing if the CSP works
app.get('/', (req, res) => {
  res.send('Hello, your CSP is configured!');
});

//The port that the secure connection listen on
https.createServer(options, app).listen(port, () => {
    console.log(`The API is now SECURELY listening on port ${port}.`)
})