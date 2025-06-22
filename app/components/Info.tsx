"use client";

import { Box, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Page } from "../context/Page";
import { usePageTurner } from "../hooks/usePageTurner";
import { StateDropdown } from "./StateDropdown";

type InfoProps = {
  pages: Page[];
  setActivePageId: Dispatch<SetStateAction<string>>;
  activePageId: string;
};

export default function Info({
  pages,
  setActivePageId,
  activePageId,
}: InfoProps) {
  const [first, setFirst] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [streetAddress2, setStreetAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postal, setPostal] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const { onSubmit } = usePageTurner({ pages, setActivePageId, activePageId });

  return (
    <Box display="flex" justifyContent="center">
      <Stack padding={2}>
        <form onSubmit={onSubmit}>
          <div className="space-y-12">
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    value={first}
                    onChange={(e) => setFirst(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    value={last}
                    onChange={(e) => setLast(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Street Address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="street-address-2"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address Line 2
                </label>
                <div className="mt-2">
                  <input
                    id="street-address-2"
                    name="street-address-2"
                    type="text"
                    autoComplete="street-address-2"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    value={streetAddress2}
                    onChange={(e) => setStreetAddress2(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="city"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <StateDropdown setState={setState} state={state} />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="postal"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Zipcode
                </label>
                <div className="mt-2">
                  <input
                    id="postal"
                    name="postal"
                    type="text"
                    autoComplete="postal"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    value={postal}
                    onChange={(e) => setPostal(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <button
                  className="bg-transparent hover:bg-amber-200 text-base font-semibold hover:text-white pr-2 pl-2 py-1 border border-yellow-500 hover:border-transparent rounded"
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
