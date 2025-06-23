import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Box, Stack } from "@mui/material";
import { usePageTurner } from "../hooks/usePageTurner";
import { PageContext } from "../context/Page";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function ContactInformationForm() {
  const { pages, setPages } = useContext(PageContext);
  const { onSubmit, showSubmitButton, currentPage, currentPageIndex } =
    usePageTurner();

  const email = useMemo(
    () => currentPage?.contactInfo?.email ?? "",
    [currentPage?.contactInfo?.email]
  );
  const number = useMemo(
    () => currentPage?.contactInfo?.number ?? "",
    [currentPage?.contactInfo?.number]
  );
  const preferredContact = useMemo(
    () => currentPage?.contactInfo?.preferredContact ?? null,
    [currentPage?.contactInfo?.preferredContact]
  );

  const handleEmailOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        contactInfo: {
          ...newPages[currentPageIndex].contactInfo,
          email: e.currentTarget.value ?? "",
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handleNumberOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        contactInfo: {
          ...newPages[currentPageIndex].contactInfo,
          number: e.currentTarget.value ?? "",
        },
      };
      setPages(newPages);
    },
    [currentPageIndex, pages, setPages]
  );

  const handleContactMethodChange = useCallback(
    (preferredContact: "mobile" | "email") => {
      const newPages = [...pages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        contactInfo: {
          ...newPages[currentPageIndex].contactInfo,
          preferredContact: preferredContact ?? null,
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
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    value={email}
                    onChange={handleEmailOnChange}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="number"
                    name="number"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                    maxLength={10}
                    value={number}
                    onChange={handleNumberOnChange}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <fieldset className="col-span-2 sm:col-span-1">
                  <legend className="text-sm font-medium text-gray-900 dark:text-white">
                    Preferred Contact Method
                  </legend>
                  <div className="mt-2 flex space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="preferred-contact"
                        value="mobile"
                        className="h-5 w-5 accent-red-800 cursor-pointer"
                        checked={preferredContact === "mobile"}
                        onChange={() => handleContactMethodChange("mobile")}
                      />
                      <span className="ml-2 text-base text-gray-900 dark:text-gray-100">
                        Mobile
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="preferred-contact"
                        value="email"
                        className="h-5 w-5 accent-red-800 cursor-pointer"
                        checked={preferredContact === "email"}
                        onChange={() => handleContactMethodChange("email")}
                      />
                      <span className="ml-2 text-base text-gray-900 dark:text-gray-100">
                        Email
                      </span>
                    </label>
                  </div>
                </fieldset>
              </div>

              {showSubmitButton && (
                <div className="col-span-2 sm:col-span-1">
                  <button
                    className="bg-transparent hover:bg-amber-200 text-base font-semibold hover:text-white py-1 px-1 border border-yellow-500 hover:border-transparent rounded"
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
