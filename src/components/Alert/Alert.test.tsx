import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Alert>Test message</Alert>);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renders with role="alert"', () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Alert className="custom-class">Alert</Alert>);
      expect(screen.getByRole('alert')).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it.each(['info', 'success', 'warning', 'error'] as const)(
      'renders %s variant',
      (variant) => {
        render(<Alert variant={variant}>{variant} alert</Alert>);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      }
    );

    it('defaults to info variant', () => {
      render(<Alert>Default</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('title', () => {
    it('renders without title by default', () => {
      render(<Alert>No title</Alert>);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Alert title="Alert Title">Content</Alert>);
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
    });

    it('renders title as strong element', () => {
      render(<Alert title="Strong Title">Content</Alert>);
      const title = screen.getByText('Strong Title');
      expect(title.tagName).toBe('STRONG');
    });
  });

  describe('close button', () => {
    it('does not render close button by default', () => {
      render(<Alert>No close button</Alert>);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('renders close button when onClose is provided', () => {
      render(<Alert onClose={() => {}}>Dismissible</Alert>);
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(<Alert onClose={handleClose}>Dismissible</Alert>);
      await user.click(screen.getByLabelText('Close alert'));

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has correct role for screen readers', () => {
      render(<Alert>Accessible alert</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('close button has accessible label', () => {
      render(<Alert onClose={() => {}}>Dismissible</Alert>);
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });

    it('close button can be activated with keyboard', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(<Alert onClose={handleClose}>Dismissible</Alert>);
      const closeButton = screen.getByLabelText('Close alert');

      closeButton.focus();
      await user.keyboard('{Enter}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('combinations', () => {
    it('renders with all props', () => {
      const handleClose = vi.fn();
      render(
        <Alert
          variant="error"
          title="Error Title"
          onClose={handleClose}
          className="extra-class"
        >
          Error message content
        </Alert>
      );

      expect(screen.getByRole('alert')).toHaveClass('extra-class');
      expect(screen.getByText('Error Title')).toBeInTheDocument();
      expect(screen.getByText('Error message content')).toBeInTheDocument();
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });
  });
});
