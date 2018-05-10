const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
// These below middlewares are applied for all incoming requests.
app.use(bodyParser.json());

// Use cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]      
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

const PORT = process.env.PORT || 5000;

// heroku: https://lychee-tart-89195.herokuapp.com/
app.listen(PORT);
