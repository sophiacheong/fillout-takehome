import { Dispatch, SetStateAction, useCallback } from "react";
import { Page } from "../context/Page";

type PageTurnerArgs = {
  pages: Page[];
  setActivePageId: Dispatch<SetStateAction<string>>;
  activePageId: string;
};

export const usePageTurner = ({
  pages,
  setActivePageId,
  activePageId,
}: PageTurnerArgs) => {
  const onSubmit = useCallback(() => {
    const current = pages.findIndex((page) => page.id === activePageId);
    const next = pages[current + 1];
    setActivePageId(next.id);
  }, [activePageId, pages, setActivePageId]);

  return {
    onSubmit,
  };
};
