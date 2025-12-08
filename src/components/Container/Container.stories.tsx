import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width variant',
    },
    centered: {
      control: 'boolean',
      description: 'Center horizontally',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Horizontal padding',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main'],
      description: 'HTML element to render',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#f0f0f0', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Container>;

const DemoContent = () => (
  <div
    style={{
      backgroundColor: 'white',
      padding: '1rem',
      border: '2px dashed #667eea',
    }}
  >
    <p style={{ margin: 0 }}>
      This content is inside a Container. Resize the window to see responsive behavior.
    </p>
  </div>
);

// Max-width variants
export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: <DemoContent />,
  },
};

export const Medium: Story = {
  args: {
    maxWidth: 'md',
    children: <DemoContent />,
  },
};

export const Large: Story = {
  args: {
    maxWidth: 'lg',
    children: <DemoContent />,
  },
};

export const ExtraLarge: Story = {
  args: {
    maxWidth: 'xl',
    children: <DemoContent />,
  },
};

export const Full: Story = {
  args: {
    maxWidth: 'full',
    children: <DemoContent />,
  },
};

// Centering
export const NotCentered: Story = {
  args: {
    maxWidth: 'md',
    centered: false,
    children: <DemoContent />,
  },
};

// Padding variants
export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: <DemoContent />,
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: <DemoContent />,
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: <DemoContent />,
  },
};

// Semantic elements
export const AsMain: Story = {
  args: {
    as: 'main',
    children: <DemoContent />,
  },
};

export const AsSection: Story = {
  args: {
    as: 'section',
    children: <DemoContent />,
  },
};

// All Widths Gallery
export const AllWidths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Container maxWidth="sm">
        <div
          style={{
            backgroundColor: '#667eea',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          sm (640px)
        </div>
      </Container>
      <Container maxWidth="md">
        <div
          style={{
            backgroundColor: '#764ba2',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          md (768px)
        </div>
      </Container>
      <Container maxWidth="lg">
        <div
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          lg (1024px)
        </div>
      </Container>
      <Container maxWidth="xl">
        <div
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          xl (1280px)
        </div>
      </Container>
      <Container maxWidth="full">
        <div
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          full (100%)
        </div>
      </Container>
    </div>
  ),
};
