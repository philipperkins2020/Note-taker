const express = require('express');
const util = require('util')
const path = require('path')
const fs = require('fs')
const uuid = require('uuid-random');
const app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes.html')));



const readFile = util.promisify(fs.readFile)
app.get('/api/notes', (req, res) => {
    let db = [];
    readFile('./db.json', 'utf8').then(notes => {
        try {
            db = JSON.parse(notes)
            console.log(db)
        }
        catch (error) {
            console.log('error: ' + error)
            db = []
        }
        return res.json(db);
    })
});
const writeFileAsync = util.promisify(fs.writeFile);
app.post('/api/notes', (req, res) => {
    readFile('./db.json', 'utf8').then(notes => {
        const currentNotes = JSON.parse(notes);
        currentNotes.push({...req.body, id: uuid()});
        writeFileAsync('./db.json', JSON.stringify(currentNotes));
        res.json(200);
    });
});

app.delete('/api/notes/:id', (req, res) => {
    readFile('./db.json', 'utf8').then(notes => {
        let currentNotes = JSON.parse(notes);
        currentNotes = currentNotes.filter((note)=>{
            return note.id !== req.params.id
        });
        writeFileAsync('./db.json', JSON.stringify(currentNotes));
        res.json(200);
    });
});





app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

