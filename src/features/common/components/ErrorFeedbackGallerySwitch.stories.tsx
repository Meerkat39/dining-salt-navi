import type { Meta, StoryObj } from "@storybook/nextjs";
import ErrorFeedbackGallery from "./ErrorFeedbackGallery";

const meta: Meta<typeof ErrorFeedbackGallery> = {
  component: ErrorFeedbackGallery,
  title: "Common/ErrorFeedbackGallery",
  parameters: {
    layout: "centered",
  },
};
export default meta;

export const SwitchGallery: StoryObj<typeof ErrorFeedbackGallery> = {
  render: () => <ErrorFeedbackGallery />,
};
