import React, { useState, useEffect } from "react";
import axios from 'axios';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function EditArea(props) {

//   const initialState = { title: "", content: "" }
  const [note, setNote] = useState({});

  useEffect(() => {
    axios.get(`/note/${props.id}`)
      .then(res => setNote(res.data))
      .catch(err => console.error(err));
    // console.log(note);
  }, [props]);
    
  function handleChange(event) {
    const { name, value } = event.target;
    setNote({...note, [name]: value })
  }

  function updateNote(event) {
    props.onUpdate(note);
    // setNote(initialState);  // Why is this not resetting the fields?????
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">

        <input
          name="title"
          onChange={handleChange}
          value={note.title}
        />
        
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
        />

        <Zoom in={true}>
          <Fab onClick={updateNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default EditArea;

// <p>{props.id}</p>
// <p>{note.title}</p>