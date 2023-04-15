import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
  return (
    <>
    <div className="container">
          <h2>Your notes</h2>
          {notes.map((note)=>{
            return note.title
          })}
    </div></>
  )
}
