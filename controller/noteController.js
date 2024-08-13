import Note from "../models/Note.model.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const existingNote = await Note.findOne({ title: title });

    if (existingNote) {
      return res
        .status(400)
        .json({ error: "A note with this title already exists" });
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    return res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create note" });
  }
};

// Get a note by title
export const getNote = async (req, res) => {
  try {
    const { title } = req.params;

    const note = await Note.findOne({ title });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve note" });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    if (!notes.length) {
      return res.status(404).json({ error: "No notes found" });
    }

    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve notes" });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title },
      { content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update note" });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    // const { title } = req.params;

    const deletedNote = await Note.findOneAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete note" });
  }
};
