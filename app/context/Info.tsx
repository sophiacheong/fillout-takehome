"use client";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface InfoContextType {
  first: string;
  setFirst: Dispatch<SetStateAction<string>>;
  last: string;
  setLast: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const defaultContext: InfoContextType = {
  first: "",
  setFirst: () => null,
  last: "",
  setLast: () => null,
  email: "",
  setEmail: () => null,
};

export const InfoContext = createContext<InfoContextType>(defaultContext);

export const useInfo = () => {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error("useInfo must be used within an InfoProvider");
  }
  return context;
};
