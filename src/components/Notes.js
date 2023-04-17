import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
  return (
    <>
    <div className="container">
    <div className="row my-4">
          <h2>Your notes</h2>
          {notes.map((note)=>{
            return <NoteItem note={note}/>
          })}
    </div>
    </div>
    </>
  )
}
