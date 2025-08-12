import { createContext, useContext } from "react";

export const NoteContext = createContext();

export const useNote = () => useContext(NoteContext);
