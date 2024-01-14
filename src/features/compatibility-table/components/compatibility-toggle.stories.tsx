import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CompatibilityToggle } from "./compatibility-toggle";
import { Compatibility } from "@/types/compatibility";

const meta: Meta<typeof CompatibilityToggle> = {
  component: CompatibilityToggle,
};

export default meta;
type Story = StoryObj<typeof CompatibilityToggle>;

const CompatibilityToggleWithHooks = () => {
  const [value, setValue] = React.useState<Compatibility>("Even");
  return (
    <CompatibilityToggle
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const Primary: Story = {
  render: () => <CompatibilityToggleWithHooks />,
};
