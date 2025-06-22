import { useState } from "react";
import { Box, Stack } from "@mui/material";

export default function ContactInformationForm() {
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [preferredContact, setPreferredContact] = useState<
    "mobile" | "email" | null
  >(null);

  return (
    <Box display="flex" justifyContent="center">
      <Stack padding={2}>
        <form>
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
                    onChange={(e) => setEmail(e.currentTarget.value)}
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
                    maxLength={12}
                    value={number}
                    onChange={(e) => setNumber(`+1${e.currentTarget.value}`)}
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
                        onChange={() => setPreferredContact("mobile")}
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
                        onChange={() => setPreferredContact("email")}
                      />
                      <span className="ml-2 text-base text-gray-900 dark:text-gray-100">
                        Email
                      </span>
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      </Stack>
    </Box>
  );
}
