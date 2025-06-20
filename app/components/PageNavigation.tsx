import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { PageContext } from "../context/Page";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Flag,
  BorderColor,
  ContentPaste,
  ContentCopy,
  Delete,
} from "@mui/icons-material";

export default function PageNavigation() {
  const { pages, setPages, activePageId, setActivePageId, addPage } =
    useContext(PageContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activePageTab, setActivePageTab] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    console.log("hi");
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedPages = Array.from(pages);
    const [movedPage] = reorderedPages.splice(result.source.index, 1);
    reorderedPages.splice(result.destination.index, 0, movedPage);

    setPages(reorderedPages);
  };

  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <Stack direction="row" spacing={2}>
        {pages.map((page, index) => (
          <div key={`${page.id}`} className="flex items-center space-x-1">
            <button
              role="button"
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

                {/* {activePageTab === page.id && ( */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(e);
                  }}
                  className="rounded"
                  aria-label="More options"
                >
                  <MoreVertIcon fontSize="small" style={{ fill: "#9DA4B2" }} />
                </button>
                {/* )} */}
              </Stack>
            </button>

            {isMenuOpen && (
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
                        <Flag fontSize="small" style={{ fill: "#2F72E2" }} />
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
                        <Delete fontSize="small" style={{ fill: "red" }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography color="red">Delete</Typography>
                      </ListItemText>
                    </MenuItem>
                  </MenuList>
                </Stack>
              </Paper>
            )}
          </div>
        ))}
        {/* <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pages" direction="horizontal">
          {(provided) => (
            <Stack
              direction="row"
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 bg-gray-100 rounded-lg"
            >
              {pages.map((page, index) => (
                <Draggable key={page.id} draggableId={page.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative px-4 py-2 rounded cursor-grab transition
                      ${
                        snapshot.isDragging
                          ? "bg-indigo-400 text-white"
                          : "bg-white text-gray-900"
                      }
                      ${
                        page.id === activePageId
                          ? "ring-2 ring-indigo-500"
                          : "hover:bg-indigo-100"
                      } relative`}
                    >
                      <button
                        onClick={() => setActivePageId(page.id)}
                        className="flex-1 text-left p-2"
                      >
                        {page.icon} {page.title}
                      </button>

                      <div ref={menuRef} className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(e);
                          }}
                          className="p-2 hover:bg-gray-200 rounded"
                        >
                          ⋮
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
                            <ul className="py-1">
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Edit
                              </li>
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}

                        <button
                        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white rounded-full w-6 h-6"
                        onClick={() => addPage(index)}
                      >
                        +
                      </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext> */}
      </Stack>
    </Box>
  );
}
