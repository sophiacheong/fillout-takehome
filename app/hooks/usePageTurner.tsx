import { useCallback, useContext, useMemo } from "react";
import { Page, PageContext } from "../context/Page";

export const usePageTurner = () => {
  const { pages, setPages, setActivePageId, activePageId } =
    useContext(PageContext);

  const currentPage = useMemo(
    () => pages.find((page) => page.id === activePageId),
    [pages, activePageId]
  );
  const currentPageIndex = useMemo(
    () => pages.findIndex((page) => page.id === activePageId),
    [pages, activePageId]
  );

  const onSubmit = useCallback(
    (pageInfo?: Partial<Page>) => {
      const next = pages[currentPageIndex + 1];
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        ...pageInfo,
      };
      setPages(newPages);
      setActivePageId(next.id);
    },
    [currentPageIndex, pages, setActivePageId, setPages]
  );

  const showSubmitButton = currentPageIndex < pages.length - 1;

  return {
    onSubmit,
    showSubmitButton,
    currentPage,
    currentPageIndex,
  };
};
