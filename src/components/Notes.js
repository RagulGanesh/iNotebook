import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import { Addnote } from "./Addnote";
export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;

  const [title,setTitle]=useState("")
  const [description,setdescription]=useState("")
  const [tags,setTags]=useState("")
  const [id,setId]=useState("")

  const handleClick=(e)=>{
    e.preventDefault();
    editNote(id,title,description,tags)
    refClose.current.click();
}

  useEffect(() => {
    getAllNotes();
  }, [notes]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (note) => {
    ref.current.click();
    setTitle(note.title)
    setdescription(note.description)
    setTags(note.tag)
    setId(note._id)
  };

  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp" value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control" value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    className="form-control" value={tags}
                    onChange={(e) => {
                      setTags(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button" ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-4">
          <h2>Your notes</h2>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};
