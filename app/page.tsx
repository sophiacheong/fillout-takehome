"use client";
import { Stack } from "@mui/material";
import { JSX, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  initialPages,
  Page,
  PageContext,
  PageTitle,
  TitleToIcon,
} from "./context/Page";
import PageNavigation from "./components/PageNavigation";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

export default function Home() {
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
    const newPage = {
      id: uuidv4(),
      title,
      component,
      icon: TitleToIcon[title],
    };
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <PageContext.Provider
        value={{ pages, setPages, activePageId, setActivePageId, addPage }}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Stack>
              <CurrentPage />
            </Stack>
          </main>

          <footer className="text-center">
            <PageNavigation />
          </footer>
        </div>
      </PageContext.Provider>
    </DragDropContext>
  );
}
