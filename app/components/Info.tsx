"use client";

import { Box, Stack } from "@mui/material";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { usePageTurner } from "../hooks/usePageTurner";
import { StateDropdown } from "./StateDropdown";
import { PageContext } from "../context/Page";

export default function Info() {
  const { pages, setPages } = useContext(PageContext);
  const { onSubmit, showSubmitButton, currentPage, currentPageIndex } =
    usePageTurner();

  const first = useMemo(
    () => currentPage?.info?.first ?? "",
    [currentPage?.info?.first]
  );
  const last = useMemo(
    () => currentPage?.info?.last ?? "",
    [currentPage?.info?.last]
  );
  const streetAddress = useMemo(
    () => currentPage?.info?.streetAddress ?? "",
    [currentPage?.info?.streetAddress]
  );
  const streetAddress2 = useMemo(
    () => currentPage?.info?.streetAddress2 ?? "",
    [currentPage?.info?.streetAddress2]
  );
  const city = useMemo(
    () => currentPage?.info?.city ?? "",
    [currentPage?.info?.city]
  );
  const state = useMemo(
    () => currentPage?.info?.state ?? "",
    [currentPage?.info?.state]
  );
  const postal = useMemo(
    () => currentPage?.info?.postal ?? "",
    [currentPage?.info?.postal]
  );

  // const [first, setFirst] = useState<string>("");
  // const [streetAddress, setStreetAddress] = useState<string>("");
  // const [streetAddress2, setStreetAddress2] = useState<string>("");
  // const [city, setCity] = useState<string>("");
  // const [state, setState] = useState<string>("");
  // const [postal, setPostal] = useState<string>("");
  // const [last, setLast] = useState<string>("");

  // useEffect(() => {
  //   if (currentPage?.info) {
  //     setFirst(currentPage.info.first ?? "");
  //     setLast(currentPage.info.last ?? "");
  //     setStreetAddress(currentPage.info.streetAddress ?? "");
  //     setStreetAddress2(currentPage.info.streetAddress2 ?? "");
  //     setCity(currentPage.info.city ?? "");
  //     setState(currentPage.info.state ?? "");
  //     setPostal(currentPage.info.postal ?? "");
  //   } else {
  //     setFirst("");
  //     setLast("");
  //     setStreetAddress("");
  //     setStreetAddress2("");
  //     setCity("");
  //     setState("");
  //     setPostal("");
  //   }
  // }, [currentPage]);

  const handleFirstChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        info: {
          ...newPages[currentPageIndex].info,
          first: e.currentTarget.value,
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handleLastChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        info: {
          ...newPages[currentPageIndex].info,
          last: e.currentTarget.value,
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handleStreetAddressChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        info: {
          ...newPages[currentPageIndex].info,
          streetAddress: e.currentTarget.value,
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handleStreetAddress2Change = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        info: {
          ...newPages[currentPageIndex].info,
          streetAddress2: e.currentTarget.value,
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handlePostalChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        info: {
          ...newPages[currentPageIndex].info,
          postal: e.currentTarget.value,
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handleCityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        info: {
          ...newPages[currentPageIndex].info,
          city: e.currentTarget.value,
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handleStateChange = useCallback(
    (state: string) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        info: {
          ...newPages[currentPageIndex].info,
          state,
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const formOnSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <Box display="flex" justifyContent="center">
      <Stack padding={2}>
        <form onSubmit={formOnSubmit}>
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
                    onChange={handleFirstChange}
                    required
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
                    onChange={handleLastChange}
                    required
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
                    onChange={handleStreetAddressChange}
                    required
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
                    onChange={handleStreetAddress2Change}
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
                    onChange={handleCityChange}
                    required
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <StateDropdown setState={handleStateChange} state={state} />
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
                    onChange={handlePostalChange}
                    required
                  />
                </div>
              </div>

              {showSubmitButton && (
                <div className="col-span-2">
                  <button
                    className="bg-transparent hover:bg-amber-200 text-base font-semibold hover:text-white pr-2 pl-2 py-1 border border-yellow-500 hover:border-transparent rounded"
                    type="submit"
                  >
                    Next <ArrowRightAltIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Stack>
    </Box>
  );
}
