'use client'; // Only required if you're using Next.js App Router

import axios from "axios";
import { createContext , useState } from "react";

// Create the context
const FirstContext = createContext();

// Create the provider
export const MyProvider = ({ children }) => {
  const [done, setDone] = useState("");

  // Example function to update the state
  const postShift = async (job , date, hours) => {
    try {
        const reqbody = {
            job,
            date,
            hours
        };
        const response = await axios.post("http://localhost:3001/api/budget/postshift", reqbody);
        setDone("Submitted", response);

    }catch (error) {console.error("Error getting res from server", error.message);}
  }

  return (
    <FirstContext.Provider value={{postShift }}>
      {children}
    </FirstContext.Provider>
  );
};