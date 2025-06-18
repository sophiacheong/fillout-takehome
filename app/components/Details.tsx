"use client";

import { Box, Stack } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";

export default function Details() {
  const [rsvp, setRSVP] = useState<string>("");
  const [last, setLast] = useState<string>("");

  const handleRSVPChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRSVP(e.currentTarget.value);
    },
    [setRSVP]
  );

  const handleLastNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLast(e.currentTarget.value);
    },
    [setLast]
  );

  return (
    <Box display="flex" justifyContent="center">
      <Stack padding={2}>
        <form>
          <div className="space-y-12">
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
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
                        onChange={() => setRsvp("yes")}
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
                        onChange={() => setRsvp("no")}
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
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    value={last}
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Stack>
    </Box>
  );
}
