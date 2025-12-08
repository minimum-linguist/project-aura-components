import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
    title: {
      control: 'text',
      description: 'Optional title',
    },
    onClose: {
      action: 'closed',
      description: 'Close button callback',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Basic variants
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review before proceeding.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while processing your request.',
  },
};

// With title
export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This alert has a title for additional context.',
  },
};

export const SuccessWithTitle: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
};

export const ErrorWithTitle: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Failed to save changes. Please try again.',
  },
};

// Dismissible (with close button)
export const Dismissible: Story = {
  args: {
    variant: 'info',
    children: 'This alert can be dismissed.',
    onClose: () => {},
  },
};

export const DismissibleWithTitle: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session will expire in 5 minutes.',
    onClose: () => {},
  },
};

// Long content
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Important Notice',
    children:
      'This is a longer alert message that contains more detailed information. It demonstrates how the alert component handles multiple lines of text and wraps content appropriately within the container.',
  },
};

// All Variants Gallery
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info">This is an info alert.</Alert>
      <Alert variant="success">This is a success alert.</Alert>
      <Alert variant="warning">This is a warning alert.</Alert>
      <Alert variant="error">This is an error alert.</Alert>
      <Alert variant="info" title="With Title">
        This alert has a title.
      </Alert>
      <Alert variant="success" onClose={() => {}}>
        This alert is dismissible.
      </Alert>
      <Alert variant="error" title="Error" onClose={() => {}}>
        This alert has both a title and close button.
      </Alert>
    </div>
  ),
};
