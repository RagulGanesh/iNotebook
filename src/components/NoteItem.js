import React from "react";

export const NoteItem = (props) => {
  return (
    <>
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <i className="fa-solid fa-trash mx-2"></i>
          <i className="fa-regular fa-pen-to-square mx-2"></i>
        </div>
      </div>
      </div>
    </>
  );
};
