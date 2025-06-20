"use client";

import { Box, Stack } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
} from "react";
import { DetailsContext } from "../context/Details";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Page } from "../context/Page";
import { usePageTurner } from "../hooks/usePageTurner";

type DetailsProps = {
  pages: Page[];
  setActivePageId: Dispatch<SetStateAction<string>>;
  activePageId: string;
};

export default function Details({
  pages,
  setActivePageId,
  activePageId,
}: DetailsProps) {
  const { setRSVP, setGuest, guest, rsvp } = useContext(DetailsContext);

  const handleRSVPChange = useCallback(
    (_e: ChangeEvent<HTMLInputElement>, vars: "yes" | "no") => {
      setRSVP(vars);
    },
    [setRSVP]
  );

  const handleGuestChange = useCallback(
    (num: number) => {
      if (guest === num) {
        setGuest(null);
      } else {
        setGuest(num);
      }
    },
    [guest, setGuest]
  );

  const { onSubmit } = usePageTurner({ pages, setActivePageId, activePageId });

  return (
    <Box display="flex" justifyContent="center">
      <Stack padding={2}>
        <form onSubmit={onSubmit}>
          <div className="space-y-12">
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-2 sm:col-span-1">
                <fieldset className="col-span-2 sm:col-span-1">
                  <legend className="text-sm font-medium text-gray-900 dark:text-white">
                    RSVP?
                  </legend>
                  <div className="mt-2 flex space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="rsvp"
                        value="yes"
                        className="h-5 w-5 accent-red-800 cursor-pointer"
                        checked={rsvp === "yes"}
                        onChange={(e) => handleRSVPChange(e, "yes")}
                      />
                      <span className="ml-2 text-base text-gray-900 dark:text-gray-100">
                        Yes
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="rsvp"
                        value="no"
                        className="h-5 w-5 accent-red-800 cursor-pointer"
                        checked={rsvp === "no"}
                        onChange={(e) => handleRSVPChange(e, "no")}
                      />
                      <span className="ml-2 text-base text-gray-900 dark:text-gray-100">
                        No
                      </span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  How many guests?
                </label>
                <div className="mt-2">
                  {Array.from({ length: 10 }, (_, index) => (
                    <label
                      className="inline-flex items-center justify-center w-10 h-10 border rounded text-gray-900 cursor-pointer hover:bg-yellow-50"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="hidden peer"
                        checked={guest === index + 1}
                        onChange={() => handleGuestChange(index + 1)}
                      />
                      <span className="peer-checked:text-white peer-checked:bg-yellow-600 w-full h-full flex items-center justify-center rounded">
                        {index + 1}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <button
                  className="bg-transparent hover:bg-amber-200 text-base font-semibold hover:text-white py-1 px-1 border border-yellow-500 hover:border-transparent rounded"
                  type="submit"
                >
                  Next <ArrowRightAltIcon />
                </button>
              </div>
            </div>
          </div>
        </form>
      </Stack>
    </Box>
  );
}
