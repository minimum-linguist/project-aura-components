import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders as a div element', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('applies custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it.each(['default', 'outlined', 'elevated'] as const)(
      'renders %s variant',
      (variant) => {
        render(<Card variant={variant}>{variant}</Card>);
        expect(screen.getByText(variant)).toBeInTheDocument();
      }
    );

    it('defaults to default variant', () => {
      render(<Card>Default</Card>);
      expect(screen.getByText('Default')).toBeInTheDocument();
    });
  });

  describe('padding', () => {
    it.each(['none', 'sm', 'md', 'lg'] as const)(
      'renders with %s padding',
      (padding) => {
        render(<Card padding={padding}>Content</Card>);
        expect(screen.getByText('Content')).toBeInTheDocument();
      }
    );

    it('defaults to md padding', () => {
      render(<Card>Default padding</Card>);
      expect(screen.getByText('Default padding')).toBeInTheDocument();
    });
  });

  describe('header', () => {
    it('renders without header when no title or subtitle', () => {
      render(<Card>Content only</Card>);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Card title="Card Title">Content</Card>);
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Card Title');
    });

    it('renders subtitle when provided', () => {
      render(<Card subtitle="Card subtitle">Content</Card>);
      expect(screen.getByText('Card subtitle')).toBeInTheDocument();
    });

    it('renders both title and subtitle', () => {
      render(
        <Card title="Title" subtitle="Subtitle">
          Content
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });
  });

  describe('footer', () => {
    it('renders without footer when not provided', () => {
      const { container } = render(<Card>Content only</Card>);
      expect(container.querySelector('.footer')).not.toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(<Card footer={<button>Action</button>}>Content</Card>);
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('renders complex footer content', () => {
      render(
        <Card
          footer={
            <div>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          }
        >
          Content
        </Card>
      );
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });
  });

  describe('combinations', () => {
    it('renders complete card with all sections', () => {
      render(
        <Card
          variant="elevated"
          padding="lg"
          title="Complete Card"
          subtitle="With all sections"
          footer={<button>Submit</button>}
          className="extra-class"
        >
          Main content
        </Card>
      );

      const { container } = render(<Card>x</Card>);
      expect(screen.getByText('Complete Card')).toBeInTheDocument();
      expect(screen.getByText('With all sections')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
  });
});
