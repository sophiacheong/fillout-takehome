"use client";

import { Box, Stack } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";

export default function Details() {
  const [rsvp, setRSVP] = useState<string>("");
  const [guest, setGuest] = useState<number | null>(null);

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

  return (
    <Box display="flex" justifyContent="center">
      <Stack padding={2}>
        <form>
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
                        className="h-5 w-5 accent-blue-600 cursor-pointer"
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
                        className="h-5 w-5 accent-blue-600 cursor-pointer"
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
                      className="inline-flex items-center justify-center w-10 h-10 border rounded text-gray-900 cursor-pointer hover:bg-indigo-50"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="hidden peer"
                        checked={guest === index + 1}
                        onChange={() => handleGuestChange(index + 1)}
                      />
                      <span className="peer-checked:text-white peer-checked:bg-indigo-600 w-full h-full flex items-center justify-center rounded">
                        {index + 1}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Stack>
    </Box>
  );
}
