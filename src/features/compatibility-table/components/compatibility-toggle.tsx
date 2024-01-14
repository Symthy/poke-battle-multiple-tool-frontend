import React from "react";
import { Compatibility } from "@/types/compatibility";
import { RiTriangleLine } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

export interface CompatibilityToggleProps {
  value: Compatibility;
  onChange: (newValue: Compatibility) => void;
}

export const CompatibilityToggle = ({
  value,
  onChange,
}: CompatibilityToggleProps) => {
  const handleDoubleClick = () => {
    if (value === "Advantage") {
      onChange("Even");
    } else if (value === "Even") {
      onChange("Disadvantage");
    } else {
      onChange("Advantage");
    }
  };

  const resolveIcon = (value: Compatibility) => {
    if (value === "Advantage") {
      return <RiCheckboxBlankCircleLine style={{ color: "red" }} />;
    } else if (value === "Disadvantage") {
      return <RiCloseLine style={{ color: "blue" }} />;
    } else {
      return <RiTriangleLine style={{ color: "gray" }} />;
    }
  };

  return <div onDoubleClick={handleDoubleClick}>{resolveIcon(value)}</div>;
};
