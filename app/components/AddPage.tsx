import { Button, Popover, Stack } from "@mui/material";
import React, { PropsWithChildren, useCallback, useContext } from "react";
import { initialPages } from "../page";
import { Page, PageContext } from "../context/Page";
import { v4 as uuidv4 } from "uuid";

type AddPageProps = {
  onChange: (index?: number) => void;
  buttonClassName?: string;
  anchorEl: HTMLButtonElement | null;
  index?: number;
  setAnchorEl: (el: HTMLButtonElement | null) => void;
  currentIndex: number | null;
};

export default function AddPage({
  onChange,
  buttonClassName,
  children,
  anchorEl,
  setAnchorEl,
  index,
  currentIndex,
}: PropsWithChildren<AddPageProps>) {
  const { setPages, setActivePageId, pages } = useContext(PageContext);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onChange(index);
      setAnchorEl(event.currentTarget);
    },
    [onChange, setAnchorEl, index]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const onPageAddClick = useCallback(
    (page: Page) => {
      const id = uuidv4();
      let newPages: Page[] = [];
      if (typeof currentIndex === "number" && currentIndex >= 0) {
        newPages = pages.slice(0, currentIndex + 1);
        newPages.push({
          id,
          title: page.title,
          component: page.component,
          icon: page.icon,
        });
        newPages = newPages.concat(pages.slice(currentIndex + 1, pages.length));
      } else {
        newPages = pages.concat([
          {
            id,
            title: page.title,
            component: page.component,
            icon: page.icon,
          },
        ]);
      }

      setPages(newPages);
      setActivePageId(id);
      handleClose();
    },
    [currentIndex, handleClose, pages, setActivePageId, setPages]
  );

  return (
    <div className="flex items-center space-x-1 justify-center">
      <button
        className={`${
          buttonClassName ??
          `rounded-[8px] border-[0.5px] border-gray-300
              pt-1 pr-[10px] pb-1 pl-[10px]
              focus:border-[#2F72E2] focus:bg-white focus:shadow-[0px_1px_3px_0px_#0000000A,0px_1px_1px_0px_#00000005,0px_0px_0px_1.5px_#2F72E240]
              outline-none
              bg-[rgba(157,164,178,0.15)] hover:bg-[rgba(157,164,178,0.35)]`
        }`}
        onClick={handleClick}
      >
        {children}
      </button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack spacing={1}>
          {initialPages.map((page) => (
            <Button
              key={page.id}
              style={{ justifyContent: "flex-start" }}
              onClick={() => onPageAddClick(page)}
            >
              <Stack spacing={0.5} direction="row" className="text-black">
                {page.icon} {page.title}
              </Stack>
            </Button>
          ))}
        </Stack>
      </Popover>
    </div>
  );
}
