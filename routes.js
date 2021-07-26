const express = require ('express'); 
const router = express.Router(); 
const Note = require('./note'); 

// Route to Home and Display all Notes
router.get('/notes', function(req, res) { 
  Note.find(function(err, notes) {
    if (!err) {
      res.json(notes);
   } else {
      res.status(400).json({"error": err});
   }
  });
});

router.get('/note/:id', function(req, res) {  
  Note.findById(req.params.id, function(err, note) {
    if (!note) {
      res.status(404).send('No result found');
    } else {
      res.json(note);
    }
  });
});

// Route to Add a Note
router.post('/add', function(req, res) {     
  let note = new Note(req.body);
  note.save()
    .then(note => {
      res.send(note);
    })
    .catch(function(err) {
      res.status(422).send('Note add failed');
    });
});

// Route to Edit a Note
router.patch('/edit/:id', function(req, res){    
  Note.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('Note updated');
    })
    .catch(function(err) {
      res.status(422).send("Note update failed.");
    });
});

// Route to Delete a Note
router.delete('/delete/:id', function(req, res) {  
  Note.findById(req.params.id, function(err, note) {
    if (!note) {
      res.status(404).send('Note not found');
    } else {
      Note.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Note deleted") })
        .catch(function(err) {
          res.status(400).send("Note delete failed.");
        })
    }
  });
})

module.exports = router; 
