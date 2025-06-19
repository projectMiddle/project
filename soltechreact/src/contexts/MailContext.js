import { createContext, useContext } from "react";

export const MailContext = createContext();

export const useMail = () => useContext(MailContext);
