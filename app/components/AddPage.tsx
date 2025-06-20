import AddIcon from "@mui/icons-material/Add";
import { Button, Popover, Stack } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { initialPages } from "../page";
import { PageContext } from "../context/Page";
import { v4 as uuidv4 } from "uuid";

type AddPageProps = {
  selected: boolean;
  onChange: () => void;
};

export default function AddPage({ selected, onChange }: AddPageProps) {
  const { setPages, setActivePageId } = useContext(PageContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onChange();
      setAnchorEl(event.currentTarget);
    },
    [onChange, setAnchorEl]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        className="rounded-[8px] border-[0.5px] border-gray-300
              pt-1 pr-[10px] pb-1 pl-[10px]
              focus:border-[#2F72E2] focus:bg-white focus:shadow-[0px_1px_3px_0px_#0000000A,0px_1px_1px_0px_#00000005,0px_0px_0px_1.5px_#2F72E240]
              outline-none
              bg-[rgba(157,164,178,0.15)] hover:bg-[rgba(157,164,178,0.35)]"
        onClick={handleClick}
      >
        <Stack direction="row" spacing={1}>
          <AddIcon
            className={`text-[#677289] focus-visible:text-yellow-500 ${
              selected ? "text-yellow-500" : ""
            }`}
          />
          Add Page
        </Stack>
      </button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack spacing={1}>
          {initialPages.map((page) => (
            <Button
              key={page.id}
              style={{ justifyContent: "flex-start" }}
              onClick={() => {
                const id = uuidv4();
                setPages((prev) => [
                  ...prev,
                  {
                    id,
                    title: page.title,
                    component: page.component,
                    icon: page.icon,
                  },
                ]);
                setActivePageId(id);
                handleClose();
              }}
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
