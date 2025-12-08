import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Data Display/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    statusCode: {
      control: 'number',
      description: 'HTTP status code',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    pill: {
      control: 'boolean',
      description: 'Use pill shape',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

// Success codes (2xx)
export const OK: Story = {
  args: {
    statusCode: 200,
  },
};

export const Created: Story = {
  args: {
    statusCode: 201,
  },
};

export const NoContent: Story = {
  args: {
    statusCode: 204,
  },
};

// Redirect codes (3xx)
export const MovedPermanently: Story = {
  args: {
    statusCode: 301,
  },
};

export const Found: Story = {
  args: {
    statusCode: 302,
  },
};

// Client error codes (4xx)
export const BadRequest: Story = {
  args: {
    statusCode: 400,
  },
};

export const Unauthorized: Story = {
  args: {
    statusCode: 401,
  },
};

export const Forbidden: Story = {
  args: {
    statusCode: 403,
  },
};

export const NotFound: Story = {
  args: {
    statusCode: 404,
  },
};

// Server error codes (5xx)
export const InternalServerError: Story = {
  args: {
    statusCode: 500,
  },
};

export const BadGateway: Story = {
  args: {
    statusCode: 502,
  },
};

export const ServiceUnavailable: Story = {
  args: {
    statusCode: 503,
  },
};

// With pill shape
export const PillShape: Story = {
  args: {
    statusCode: 200,
    pill: true,
  },
};

// Different sizes
export const SmallSize: Story = {
  args: {
    statusCode: 404,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    statusCode: 500,
    size: 'lg',
  },
};

// All Status Codes Gallery
export const AllStatusCodes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Success (2xx)</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <StatusBadge statusCode={200} />
          <StatusBadge statusCode={201} />
          <StatusBadge statusCode={204} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Redirect (3xx)</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <StatusBadge statusCode={301} />
          <StatusBadge statusCode={302} />
          <StatusBadge statusCode={304} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Client Error (4xx)</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <StatusBadge statusCode={400} />
          <StatusBadge statusCode={401} />
          <StatusBadge statusCode={403} />
          <StatusBadge statusCode={404} />
          <StatusBadge statusCode={429} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Server Error (5xx)</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <StatusBadge statusCode={500} />
          <StatusBadge statusCode={502} />
          <StatusBadge statusCode={503} />
          <StatusBadge statusCode={504} />
        </div>
      </div>
    </div>
  ),
};
