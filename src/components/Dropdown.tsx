import React from "react";
// import * as Select from "@radix-ui/react-select";
// import { ChevronDownIcon } from "@radix-ui/react-icons";

interface DropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border py-[0.5vw] px-[1vw] rounded-md flex items-center justify-center"
    >
      <option value="Status Condition" disabled>
        Status Condition...
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
