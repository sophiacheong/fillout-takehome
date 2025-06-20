import { Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useRef, useState } from "react";
import { PageContext } from "../context/Page";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Flag,
  BorderColor,
  ContentPaste,
  ContentCopy,
  Delete,
  Add,
} from "@mui/icons-material";
import AddPage from "./AddPage";

export default function PageNavigation() {
  const { pages, setPages, activePageId, setActivePageId, addPage } =
    useContext(PageContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activePageTab, setActivePageTab] = useState<string | null>(null);
  const [selectedAddPage, setSelectedAddPage] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleAddButtonChange = useCallback(() => {
    setSelectedAddPage((prev) => !prev);
  }, [setSelectedAddPage]);

  return (
    <Droppable droppableId="pages" direction="horizontal">
      {(provided) => (
        <Stack
          className="w-full justify-center"
          direction="row"
          spacing={1}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {pages.map((page, index) => (
            <>
              <Draggable key={page.id} draggableId={page.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    key={`${page.id}`}
                    className={`flex items-center space-x-1 rounded-[8px] ${
                      snapshot.isDragging
                        ? "bg-yellow-500 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      tabIndex={0}
                      onClick={() => setActivePageId(page.id)}
                      onMouseDown={() => setActivePageTab(page.id)}
                      onMouseUp={() => setActivePageTab(null)}
                      onMouseLeave={() => setActivePageTab(null)}
                      className={`rounded-[8px] border-[0.5px] border-gray-300
              pt-1 pr-[10px] pb-1 pl-[10px]
              focus:border-[#2F72E2] focus:bg-white focus:shadow-[0px_1px_3px_0px_#0000000A,0px_1px_1px_0px_#00000005,0px_0px_0px_1.5px_#2F72E240]
              outline-none
              bg-[rgba(157,164,178,0.15)] hover:bg-[rgba(157,164,178,0.35)]
              ${activePageId === page.id ? "bg-white" : ""}`}
                      {...provided.dragHandleProps}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignContent="center"
                        alignItems="center"
                        className="flex-1"
                      >
                        <Stack spacing={1} direction="row" alignItems="center">
                          <div
                            className={`text-[#677289] focus-visible:text-yellow-500 ${
                              activePageId === page.id ? "text-yellow-500" : ""
                            }`}
                          >
                            {page.icon}
                          </div>
                          <div
                            className={`text-[#677289]
                    group-hover:text-[#677289]
                    group-focus-visible:text-black
                    group-active:text-black ${
                      activePageId === page.id ? "text-black" : ""
                    }`}
                          >
                            {page.title}
                          </div>
                        </Stack>

                        {activePageTab === page.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(e);
                            }}
                            className="rounded"
                            aria-label="More options"
                          >
                            <MoreVertIcon
                              fontSize="small"
                              style={{ fill: "#9DA4B2" }}
                            />
                          </button>
                        )}
                      </Stack>
                    </div>

                    {/* {isMenuOpen && (
                    <Paper
                      sx={{
                        m: 1.5,
                        border: "0.5px solid #E1E1E1",
                        borderRadius: "12px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          px: 2.5,
                          py: 0.5,
                          fontWeight: 700,
                          borderRadius: "12px",
                          backgroundColor: "#FAFBFC",
                        }}
                      >
                        Settings
                      </Typography>
                      <Divider />

                      <Stack px={1}>
                        <MenuList style={{ paddingBottom: 0 }}>
                          <MenuItem>
                            <ListItemIcon>
                              <Flag
                                fontSize="small"
                                style={{ fill: "#2F72E2" }}
                              />
                            </ListItemIcon>
                            <ListItemText>Set as first page</ListItemText>
                          </MenuItem>
                        </MenuList>
                        <MenuList style={{ paddingBottom: 0, paddingTop: 0 }}>
                          <MenuItem>
                            <ListItemIcon>
                              <BorderColor fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Rename</ListItemText>
                          </MenuItem>
                        </MenuList>
                        <MenuList style={{ paddingBottom: 0, paddingTop: 0 }}>
                          <MenuItem>
                            <ListItemIcon>
                              <ContentPaste fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Copy</ListItemText>
                          </MenuItem>
                        </MenuList>
                        <MenuList style={{ paddingTop: 0 }}>
                          <MenuItem>
                            <ListItemIcon>
                              <ContentCopy fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Duplicate</ListItemText>
                          </MenuItem>
                        </MenuList>
                        <Divider />
                        <MenuList>
                          <MenuItem>
                            <ListItemIcon>
                              <Delete
                                fontSize="small"
                                style={{ fill: "red" }}
                              />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography color="red">Delete</Typography>
                            </ListItemText>
                          </MenuItem>
                        </MenuList>
                      </Stack>
                    </Paper>
                  )} */}
                  </div>
                )}
              </Draggable>
              {index < pages.length - 1 && (
                <div className="flex items-center relative group w-[40px] h-[40px] justify-center">
                  <button
                    // onClick={() => handleAddPageAt(index + 1)}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity
                    w-[16px] h-[16px] border-[0.5px] border-[#E1E1E1] rounded-[8px]
                    pt-1 pr-[10px] pb-1 pl-[10px] bg-white hover:bg-gray-100 flex items-center justify-center"
                  >
                    <Add fontSize="small" />
                  </button>
                </div>
              )}
            </>
          ))}
          <AddPage
            selected={selectedAddPage}
            onChange={handleAddButtonChange}
          />
        </Stack>
      )}
    </Droppable>
  );
}
