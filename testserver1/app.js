var express = require('express');
var app = express();

app.get('/', require('./routes').index);
app.get('/hello', (req, res) => res.send('Hello World!'))

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
