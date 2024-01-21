import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PokeNamedIcon } from "./poke-named-icon";

const meta: Meta<typeof PokeNamedIcon> = {
  component: PokeNamedIcon,
};

export default meta;
type Story = StoryObj<typeof PokeNamedIcon>;

export const Primary: Story = {
  render: () => <PokeNamedIcon pokemonId="3-0" />,
};
