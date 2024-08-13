import { Router } from "express";
import {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

// Route to create a new note
router.post("/createnote", authMiddleware, createNote);

// Route to get a specific note by title
router.get("/getnote/:title", authMiddleware, getNote);

// Route to get all notes
router.get("/getAllNotes", authMiddleware, getAllNotes);

// Route to update a specific note by title
router.put("/updateNotes/:title", authMiddleware, updateNote);

// Route to delete a specific note by title
router.delete("/deleteNotes/:title", authMiddleware, deleteNote);

export default router;
