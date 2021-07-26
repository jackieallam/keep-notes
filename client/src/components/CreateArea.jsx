import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {

  const initialState = { title: "", content: "" }
  const [note, setNote] = useState(initialState);
  const [entryMode, setEntryMode] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote({...note, [name]: value })
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote(initialState);
    event.preventDefault();
    setEntryMode(false);
  }

  return (
    <div>
      <form className="create-note">
        {entryMode && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={() => setEntryMode(true)}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={entryMode ? 3 : 1}
        />

        <Zoom in={entryMode}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

//Fab = Floating Action Button (material-ui)
