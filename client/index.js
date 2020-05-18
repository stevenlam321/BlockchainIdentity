const express = require('express')
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cors = require('cors');

const app = express()
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/post', (req, res) => {
    console.log(req.body);
    console.log('data reached');
    res.send('ok')
});

const port = process.env.PORT || 8083;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});