import type { Meta, StoryObj } from "@storybook/nextjs";
import { StoreInfoWindowDebug } from "./StoreInfoWindowDebug";

const meta: Meta<typeof StoreInfoWindowDebug> = {
  component: StoreInfoWindowDebug,
  title: "MapView/StoreInfoWindowDebug",
};
export default meta;

export const Default: StoryObj<typeof StoreInfoWindowDebug> = {};
