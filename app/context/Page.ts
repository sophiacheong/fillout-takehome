"use client";

import { createContext, JSX, useContext } from "react";

export enum PageTitle {
  Info = "Info",
  Details = "Details",
  Contact = "Contact",
}

export const TitleToIcon = {
  [PageTitle.Info]: "InfoOutlineIcon",
  [PageTitle.Details]: "DescriptionIcon",
  [PageTitle.Contact]: "GradingIcon",
} as const;

export type ContactInfo = {
  email?: string;
  number?: string;
  preferredContact?: "mobile" | "email" | null;
}

export type DetailInfo = {
  rsvp?: string;
  guest?: number | null;
}

export type Info = {
  first?: string;
  last?: string;
  streetAddress?: string;
  streetAddress2?: string;
  city?: string;
  state?: string;
  postal?: string;
}

export interface Page {
  id: string;
  title: PageTitle;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (props: any) => JSX.Element;
  icon: React.ReactNode;
  contactInfo?: ContactInfo;
  detailInfo?: DetailInfo;
  info?: Info;
}

interface PageContextType {
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  activePageId: string;
  setActivePageId: React.Dispatch<React.SetStateAction<string>>;
  addPage: (
    index: number,
    title: PageTitle,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: (props: any) => JSX.Element
  ) => void;
}

const defaultContext: PageContextType = {
  pages: [],
  setPages: () => null,
  activePageId: "",
  setActivePageId: () => null,
  addPage: () => null,
};

export const PageContext = createContext<PageContextType>(defaultContext);

export function usePageContext() {
  const context = useContext(PageContext);
  if (!context)
    throw new Error("usePageContext must be used within PageProvider");
  return context;
}
