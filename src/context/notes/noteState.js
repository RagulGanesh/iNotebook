import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props)=>{
    const notesInitial=[
        {
          "_id": "643a3d334b2b6f027251f83e",
          "user": "643977009c5b31e63c8a294c",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2023-04-15T05:59:15.768Z",
          "__v": 0
        },
        {
          "_id": "643a3d334b2b6f027251f840",
          "user": "643977009c5b31e63c8a294c",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2023-04-15T05:59:15.935Z",
          "__v": 0
        },
        {
          "_id": "643a3d344b2b6f027251f842",
          "user": "643977009c5b31e63c8a294c",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2023-04-15T05:59:16.067Z",
          "__v": 0
        },
        {
          "_id": "643a3d344b2b6f027251f844",
          "user": "643977009c5b31e63c8a294c",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2023-04-15T05:59:16.213Z",
          "__v": 0
        },
        {
          "_id": "643a3d344b2b6f027251f846",
          "user": "643977009c5b31e63c8a294c",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2023-04-15T05:59:16.617Z",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState