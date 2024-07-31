const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), 'utf8', (err) => {
        if (err) throw err;
        res.json(newNote);
      });
    });
  });

  app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== id);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(filteredNotes), 'utf8', (err) => {
        if (err) throw err;
        res.json({ success: true });
      });
    });
  });
};