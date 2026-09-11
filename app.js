const express = require('express');

const mainRouter = require('./routes/mainRouter');

const port = process.env.PORT || 8080;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', mainRouter);

app.listen(port, () => {
	console.log('Listening on port:' + port);
});
// Add routing for 404
app.use((err, req, res, next) => {
	console.error(err);
	res.render('404');
});
