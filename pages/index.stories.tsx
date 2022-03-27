import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import Index from "./index";

export default {
  title: "Index",
  component: Index,
} as Meta;

export const Default: Story<ComponentProps<typeof Index>> = () => <Index />;
