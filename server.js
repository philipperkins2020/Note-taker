const express = require('express');
const path = require('path')

const app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('assets'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes.html')));



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

