"use client";

import { Stack } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";

export default function Info() {
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleFirstNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFirst(e.currentTarget.value);
    },
    [setFirst]
  );

  const handleLastNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLast(e.currentTarget.value);
    },
    [setLast]
  );

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail]
  );

  return (
    <Stack>
      <form>
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  value={first}
                  onChange={handleFirstNameChange}
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  value={last}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Stack>
  );
}
