const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/guestbook', {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected.....');
}).catch(err => console.log(err));

// Handlebars MiddleWare
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// BodyParser MiddlwWare
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/edit', (req, res) => {
    res.render('edit')
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});