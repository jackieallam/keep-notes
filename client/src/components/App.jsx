import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentNoteID, setCurrentNoteID] = useState({})

  useEffect(() => {
    axios.get("/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  function addNote(newNote) {
    axios.post("/add", newNote)
      .then(res => setNotes([res.data].concat(notes)))
  }

  function deleteNote(id) {
    axios.delete(`/delete/${id}`)
      .then(setNotes(notes => notes.filter(note => note._id !== id)))
      .catch(err => console.log(err));
  }

  function setupEditArea(noteID) {
    setCurrentNoteID(noteID);
    setEditMode(true);
    // Remove note being edited from the notes displayed
    setNotes(notes => notes.filter(note => note._id !== noteID))
  }

  function updateNote(changedNote) {
    axios.patch(`/edit/${changedNote._id}`, changedNote)
      .then(() => {
        setNotes([changedNote].concat(notes));
        setEditMode(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Header />
      {editMode ? <EditArea id={currentNoteID} onUpdate={updateNote} /> :
        <CreateArea onAdd={addNote} />}

      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onEdit={setupEditArea}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
// {/* Clicked on Edit word - id passed as argument */ }
// {/* Clicked on Trashcan id passed as argument */ }