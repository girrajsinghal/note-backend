import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote();
  }, [id]); // Ensure the effect runs when id changes

  const fetchNote = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getNoteById/${id}`
      );
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching the note:", error);
    }
  };

  const updateNote = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updateNotes/${id}`, {
        title,
        content,
      });
      navigate("/"); // Navigate to home page after updating
    } catch (error) {
      console.error("Error updating the note:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Note</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button className="update" onClick={updateNote}>
        Update
      </button>
    </div>
  );
};

export default EditNote;
