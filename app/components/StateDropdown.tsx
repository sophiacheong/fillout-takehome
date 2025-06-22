import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { UsaStates } from "usa-states";

const usStates = new UsaStates();
const states = usStates.states;

type StateDropdownProps = {
  setState: Dispatch<SetStateAction<string>>;
  state: string;
};

export const StateDropdown: React.FC<StateDropdownProps> = ({
  setState,
  state,
}) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setState(e.currentTarget.value);
    },
    [setState]
  );

  return (
    <>
      <label
        htmlFor="state"
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        State
      </label>
      <select
        id="state"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={state}
        onChange={onChange}
      >
        <option>Choose a state</option>
        {states.map((state) => (
          <option key={state.name} value={state.name}>
            {state.abbreviation}
          </option>
        ))}
      </select>
    </>
  );
};
