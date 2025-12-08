import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Content padding',
    },
    title: {
      control: 'text',
      description: 'Header title',
    },
    subtitle: {
      control: 'text',
      description: 'Header subtitle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'This is the card content.',
    variant: 'default',
  },
};

export const Outlined: Story = {
  args: {
    children: 'This card has a thicker border.',
    variant: 'outlined',
  },
};

export const Elevated: Story = {
  args: {
    children: 'This card has a shadow for elevation effect.',
    variant: 'elevated',
  },
};

// With header
export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title in the header.',
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle with additional context',
    children: 'This card has both a title and subtitle in the header.',
  },
};

// With footer
export const WithFooter: Story = {
  args: {
    children: 'This card has a footer section.',
    footer: (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    ),
  },
};

// Complete card
export const Complete: Story = {
  args: {
    title: 'Complete Card',
    subtitle: 'With all sections',
    children: (
      <div>
        <p>This card demonstrates all available sections:</p>
        <ul>
          <li>Header with title and subtitle</li>
          <li>Main content area</li>
          <li>Footer with actions</li>
        </ul>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Last updated: Today</span>
        <button>View Details</button>
      </div>
    ),
  },
};

// Padding variants
export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <img
        src="https://via.placeholder.com/400x200"
        alt="Placeholder"
        style={{ width: '100%', display: 'block' }}
      />
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: 'This card has small padding.',
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: 'This card has large padding.',
  },
};

// All Variants Gallery
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <Card variant="default">
          <strong>Default</strong>
          <p>Standard border</p>
        </Card>
        <Card variant="outlined">
          <strong>Outlined</strong>
          <p>Thicker border</p>
        </Card>
        <Card variant="elevated">
          <strong>Elevated</strong>
          <p>Shadow effect</p>
        </Card>
      </div>
      <Card title="With Header" subtitle="And subtitle">
        Card content goes here.
      </Card>
      <Card
        title="Complete Card"
        footer={<button>Action</button>}
      >
        This card has header and footer.
      </Card>
    </div>
  ),
};
