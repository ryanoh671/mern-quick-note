import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import * as notesAPI from '../../utilities/notes-api';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]);

  useEffect(function() {
    async function getNotes() {
      const data = await notesAPI.getAllUserNotes();
      setNotes(data);
    }
    getNotes();
  }
  , [user]);

  async function addNote(newNote) {
    const data = await notesAPI.createNote(newNote);
    setNotes([...notes, data]);
  }

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <HomePage notes={notes} addNote={addNote}/>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
