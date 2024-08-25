import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
