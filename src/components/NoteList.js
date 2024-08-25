import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getAllNotes"
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Error fetching notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []); // Empty dependency array to fetch notes on component mount

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteNotes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Error deleting note. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Notes</h1>
      <Link to="/create">Create New Note</Link>
      <ul>
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <div className="buttons">
                <Link to={`/edit/${note._id}`}>
                  <button className="edit">Edit</button>
                </Link>
                <button className="delete" onClick={() => deleteNote(note._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No notes available.</li>
        )}
      </ul>
    </div>
  );
};

export default NoteList;
