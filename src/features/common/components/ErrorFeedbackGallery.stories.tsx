import type { Meta, StoryObj } from "@storybook/nextjs";
import ErrorFeedbackGallery from "./ErrorFeedbackGallery";

const meta: Meta<typeof ErrorFeedbackGallery> = {
  component: ErrorFeedbackGallery,
  title: "Common/ErrorFeedbackGallery",
};
export default meta;

export const Default: StoryObj<typeof ErrorFeedbackGallery> = {};
