import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Components/Note";
import Footer from "./Components/Footer";
import noteService from "./Services/notes";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [errorMessage, setErrorMessage] = useState("some error happened...");
  useEffect(() => {
    console.log("Effect");
    noteService.getAll().then((initialNote) => {
      setNotes(initialNote);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(newObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })

      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  );
};

export default App;
