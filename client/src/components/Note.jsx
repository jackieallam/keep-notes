import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {

  function handleEdit() {
    props.onEdit(props.id);
  }

  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}><DeleteIcon /></button>
      <button onClick={handleEdit}><EditIcon /></button>
    </div>
  );
}

export default Note;

