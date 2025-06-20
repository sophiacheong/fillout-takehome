"use client";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface DetailsContextType {
  rsvp: string;
  setRSVP: Dispatch<SetStateAction<string>>;
  guest: number | null;
  setGuest: Dispatch<SetStateAction<number | null>>;
}

const defaultContext: DetailsContextType = {
  rsvp: "",
  setRSVP: () => null,
  guest: null,
  setGuest: () => null,
};

export const DetailsContext = createContext<DetailsContextType>(defaultContext);

export const useDetails = () => {
  const context = useContext(DetailsContext);
  if (!context) {
    throw new Error("useDetails must be used within an DetailsProviders");
  }
  return context;
};
