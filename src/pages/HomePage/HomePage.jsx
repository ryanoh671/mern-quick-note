import { useState } from 'react';

export default function HomePage({notes, addNote}) {
  const [newNote, setNewNote] = useState({
    text: ''
  })

  function handleChange(evt) {
    const newNoteData = {...newNote, [evt.target.name]: evt.target.value};
    setNewNote(newNoteData);
  }

  function handleAddNote(evt) {
    evt.preventDefault();
    addNote(newNote);
    setNewNote({text: ''})
  }

  return (
    <>
         <h2>Home Page</h2>
          <form onSubmit={handleAddNote}>
            <label>Notes</label>
            <input type="text" name="text" value={newNote.text} onChange={handleChange} />
            <button type="submit">Add Note</button>
          </form>
          <ul>
            {notes.map(n => (<li key={n._id}>{n.text}</li>))}
          </ul>
    </>
  );
}