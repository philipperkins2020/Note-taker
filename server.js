const express = require('express');
const util = require('util')
const path = require('path')
const fs = require('fs')
const app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes.html')));

//const Notes = [ {
//  NoteTitle:'',
// NoteText:'',

// }

// ];
//app.get('/api/notes', (req, res) => res.json(Notes));
const readFile = util.promisify(fs.readFile)
app.get('/api/notes', (req, res) => {
    let db;
    readFile('db.json', 'utf8').then(notes => {
        try {
            db = JSON.parse(notes)
            console.log(db)
        }
        catch (error) {
            console.log('error: ' + error)
            db = []
        }
        //     const NoteTaker = req.params.Notes

        // ;
        // for (let i = 0; i < Notes.length; i++) {
        //     if (NoteTaker === Notes[i].NoteTitle,noteText) {
        //       return res.json(Notes[i]);
        //     }
        //   }

        return res.json(db);


    })

});

app.post('/api/notes', (req, res) => {

    const jsonPath = path.join(__dirname, '/db.json')
    const newNote = req.body;


});






app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

