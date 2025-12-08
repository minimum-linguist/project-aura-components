import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    color: {
      control: 'color',
      description: 'Custom color',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

// Custom colors
export const Primary: Story = {
  args: {
    color: '#667eea',
  },
};

export const Success: Story = {
  args: {
    color: '#28a745',
  },
};

export const Danger: Story = {
  args: {
    color: '#dc3545',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#ff6b6b',
  },
};

// With custom label
export const WithLabel: Story = {
  args: {
    label: 'Saving changes...',
  },
};

// All Sizes Gallery
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

// All Colors Gallery
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Spinner color="#667eea" />
      <Spinner color="#28a745" />
      <Spinner color="#ffc107" />
      <Spinner color="#dc3545" />
      <Spinner color="#17a2b8" />
    </div>
  ),
};

// Usage example: Loading button
export const InButton: Story = {
  render: () => (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      disabled
    >
      <Spinner size="sm" color="white" />
      Loading...
    </button>
  ),
};

// Usage example: Centered loading
export const CenteredLoading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '0.5rem',
      }}
    >
      <Spinner size="lg" />
      <span style={{ color: '#666' }}>Loading content...</span>
    </div>
  ),
};
