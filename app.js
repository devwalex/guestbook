const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

// Database Configuration
const db = require('./config/database');

// Connect to Mongoose
mongoose
	.connect(db.mongoURI, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log('MongoDB connected.....');
	})
	.catch((err) => console.log(err));

// Handlebars MiddleWare
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// BodyParser MiddlwWare
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// Express Session Middleware
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

// Flash Middleware
app.use(flash());

// MethodOverride Middleware
app.use(methodOverride('_method'));

// Load Guest Model
require('./models/Guest');
const Guest = mongoose.model('guest');

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// Index Route --View
app.get('/', (req, res) => {
	res.render('index');
});

// Index Route -- Post
app.post('/', (req, res) => {
	let errors = [];
	if (!req.body.fullname || req.body.fullname.trim().length === 0) {
		errors.push({
			text: 'Please enter your name'
		});
	}
	if (!req.body.email || req.body.email.trim().length === 0) {
		errors.push({
			text: 'Please enter your email'
		});
	}
	if (!req.body.comment || req.body.comment.trim().length === 0) {
		errors.push({
			text: 'Please enter a comment'
		});
	}
	if (errors.length > 0) {
		res.render('index', {
			errors: errors,
			fullname: req.body.fullname,
			email: req.body.email,
			comment: req.body.comment
		});
	} else {
		const newGuest = {
			fullname: req.body.fullname,
			email: req.body.email,
			comment: req.body.comment
		};
		new Guest(newGuest).save().then((guest) => {
			req.flash('success_msg', 'Guest Added Sucessfully');
			res.redirect('all-guest');
			console.log('saved', guest);
		});
	}
});

// Edit Route -- View
app.get('/edit/:id', (req, res) => {
	Guest.findOne({
		_id: req.params.id
	}).then((guest) => {
		res.render('edit', {
			guest
		});
	})
});
// Edit Route -- PUT
app.put('/edit/:id', (req, res) => {
	let errors = [];
	if (!req.body.fullname || req.body.fullname.trim().length === 0) {
		errors.push({
			text: 'Please enter your name'
		});
	}
	if (!req.body.email || req.body.email.trim().length === 0) {
		errors.push({
			text: 'Please enter your email'
		});
	}
	if (!req.body.comment || req.body.comment.trim().length === 0) {
		errors.push({
			text: 'Please enter a comment'
		});
	}
	if (errors.length > 0) {
		res.render('edit', {
			errors: errors,
			fullname: req.body.fullname,
			email: req.body.email,
			comment: req.body.comment
		});
	} else {
		Guest.findOne({
			_id: req.params.id
		}).then((guest) => {
			guest.fullname = req.body.fullname;
			guest.email = req.body.email;
			guest.comment = req.body.comment;

			guest.save().then((idea) => {
				console.log('Updated Successfully', idea);
				req.flash('success_msg', 'Guest Updated Successfully');
				res.redirect('/all-guest');
			});
		});
	}

});

// All Guest Route -- View
app.get('/all-guest', (req, res) => {
	Guest.find()
		.sort({
			date: 'desc'
		})
		.then((guest) => {
			res.render('all-guest', {
				guest
			});
		});
});

// Delete Route -- DELETE
app.delete('/guest/:id', (req, res) => {
	Guest.deleteOne({
		_id: req.params.id
	}).then((guest) => {
		console.log('Deleted Succeesfully', guest);
		req.flash('success_msg', 'Guest Entry Deleted Successfully');
		res.redirect('/all-guest');
	})
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening to port: ${port}`);
});