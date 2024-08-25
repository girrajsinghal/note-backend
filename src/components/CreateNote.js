import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createNote = async () => {
    try {
      await axios.post("http://localhost:5000/api/createnote", {
        title,
        content,
      });
      navigate("/"); // Navigate to the page displaying all notes
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="container">
      <h1>Create Note</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="create" onClick={createNote}>
        Create
      </button>
    </div>
  );
};

export default CreateNote;
