const express = require('express');
// Main router again?
const mainRouter = require('./routes/mainRouter');

const port = process.env.PORT || 8080;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Main router again?
app.use('/', mainRouter);

app.use(express.static('public'));

app.listen(port, () => {
	console.log('Listening on port:' + port);
});

app.use((err, req, res, next) => {
	console.error(err);
	res.render('404');
});
