const passport = require('passport');
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

// Init Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
require('./config/passport')(passport);

// Connect Database
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/trollo',
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	}
);
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	
}
// Define Routes

require('./routes/api/user')(app);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});
app.listen(PORT, function () {
	console.log(
		'==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
		PORT,
		PORT
	);
});
