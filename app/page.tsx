"use client";
import { Stack } from "@mui/material";
import Info from "./components/Info";
import Details from "./components/Details";
import Review from "./components/Review";
import { InfoContext } from "./context/Info";
import { DetailsContext } from "./context/Details";
import { JSX, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Page, PageContext, PageTitle } from "./context/Page";
import PageNavigation from "./components/PageNavigation";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import GradingIcon from "@mui/icons-material/Grading";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

export const initialPages = [
  {
    id: "initial-page-1",
    title: PageTitle.Info,
    component: Info,
    icon: <InfoOutlineIcon />,
  },
  {
    id: "initial-page-2",
    title: PageTitle.Details,
    component: Details,
    icon: <DescriptionIcon />,
  },
  {
    id: "initial-page-3",
    title: PageTitle.Review,
    component: Review,
    icon: <GradingIcon />,
  },
];

export default function Home() {
  const [first, setFirst] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [rsvp, setRSVP] = useState<string>("");
  const [guest, setGuest] = useState<number | null>(null);
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [activePageId, setActivePageId] = useState<string>(initialPages[0].id);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedPages = Array.from(pages);
    const [movedPage] = reorderedPages.splice(result.source.index, 1);
    reorderedPages.splice(result.destination.index, 0, movedPage);

    setPages(reorderedPages);
  };

  const addPage = (
    index: number,
    title: PageTitle,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: (props: any) => JSX.Element
  ) => {
    const newPage = { id: uuidv4(), title, component };
    const newPages = [
      ...pages.slice(0, index + 1),
      newPage,
      ...pages.slice(index + 1),
    ];

    setPages(newPages);
  };

  const CurrentPage = useMemo(() => {
    return pages.find((page) => page.id === activePageId)!.component;
  }, [activePageId, pages]);
  const currentPageRequiresProps = useMemo(() => {
    const current = pages.find((page) => page.id === activePageId);

    return (
      current?.title === PageTitle.Info || current?.title === PageTitle.Details
    );
  }, [activePageId, pages]);

  return (
    <InfoContext.Provider
      value={{ first, setFirst, email, setEmail, last, setLast }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <DetailsContext.Provider value={{ rsvp, setRSVP, guest, setGuest }}>
          <PageContext.Provider
            value={{ pages, setPages, activePageId, setActivePageId, addPage }}
          >
            <Stack>
              {currentPageRequiresProps ? (
                <CurrentPage
                  pages={pages}
                  setActivePageId={setActivePageId}
                  activePageId={activePageId}
                />
              ) : (
                <CurrentPage />
              )}
              <PageNavigation />
            </Stack>
          </PageContext.Provider>
        </DetailsContext.Provider>
      </DragDropContext>
    </InfoContext.Provider>
  );
}
