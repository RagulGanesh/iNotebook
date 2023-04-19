import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props)=>{
  const host="http://localhost:5000"

    const [notes, setNotes] = useState([])

    const getAllNotes=async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
      });
      const json = await response.json();      
      setNotes(json);
    }
    //add notes
    const addNote=async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      return response.json();
    }

    //delete notes
    const deleteNote=async (id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        // body: JSON.stringify(data),
      });
      return response.json();
    }

    //update notes
    const editNote=async (id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      return response.json();
      // for(let index=0;index<notes.length;index++){
      //   const element=notes[index];
      //   if(element._id === id){
      //     element.title=title;
      //     element.description=description;
      //     element.tag=tag;
      //   }
      // }      
    }
    return (
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState