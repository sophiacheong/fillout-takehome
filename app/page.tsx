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

const defaultPage = [
  {
    id: uuidv4(),
    title: PageTitle.Info,
    component: Info,
    icon: <InfoOutlineIcon />,
  },
  {
    id: uuidv4(),
    title: PageTitle.Details,
    component: Details,
    icon: <DescriptionIcon />,
  },
  {
    id: uuidv4(),
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
  const [pages, setPages] = useState<Page[]>(defaultPage);
  const [activePageId, setActivePageId] = useState<string>(defaultPage[0].id);

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
    </InfoContext.Provider>
  );
}
