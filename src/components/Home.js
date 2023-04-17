import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { Notes } from "./Notes";
import { Addnote } from "./Addnote";
export const Home = () => {
  return (
    <>
      <div>
        <Addnote/>
        <Notes/>
      </div>
    </>
  );
};
