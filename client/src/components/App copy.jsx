import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));

    // async function getNotes() {
    //   try {
    //     const res = await axios.get("/notes");
    //     setNotes(res.data);
    //   } catch(error) {
    //     console.log('error', error);
    //   }
    // }        
    // getNotes();
  }, []);

  function addNote(newNote) {
    axios.post("/add", newNote)
      .then(res => setNotes([...notes, res.data]))
    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    // });
  }

  // function deleteNote(id){

    // setNotes(prevNotes => {
    //   return prevNotes.filter((note, idx) => {
    //     return idx !== id;
    //   });
    // })  

    // axios.delete(`/delete/${id}`)
    //   .then()
    //   .catch(err => console.log(err));

      // .then(setNotes(notes => {
      //   notes.filter((note, index) => { return index !== id})
      // }))

  // }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })} 
      <Footer />
    </div>
  );
}

export default App;
