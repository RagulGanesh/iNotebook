import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";


export const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [title,setTitle]=useState("")
    const [description,setdescription]=useState("")
    const [tags,setTags]=useState("")
    // const handleChange=(e)=>{
        
    // }
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(title,description,tags)
    }
  return (
    <>
    <div className="container">
          <h2>Add Notes</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title" name="title"
                aria-describedby="emailHelp" onChange={e=>{setTitle(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description" name="description"
                className="form-control" onChange={e=>{setdescription(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Tag
              </label>
              <input
                type="text"
                id="tag" name="tag"
                className="form-control" onChange={e=>{setTags(e.target.value)}}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              Add Note
            </button>
          </form>
        </div>
    </>
  )
}
