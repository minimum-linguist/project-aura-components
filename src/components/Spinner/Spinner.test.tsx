import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders with accessible label', () => {
      render(<Spinner />);
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Spinner className="custom-class" />);
      expect(screen.getByRole('status')).toHaveClass('custom-class');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Spinner size={size} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('defaults to md size', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('custom color', () => {
    it('applies custom color via CSS variable', () => {
      render(<Spinner color="#ff0000" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ '--spinner-color': '#ff0000' });
    });

    it('uses default color when not specified', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).not.toHaveAttribute('style');
    });
  });

  describe('custom label', () => {
    it('uses default label', () => {
      render(<Spinner />);
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('uses custom label when provided', () => {
      render(<Spinner label="Saving changes" />);
      expect(screen.getByLabelText('Saving changes')).toBeInTheDocument();
    });

    it('includes label text in screen reader only span', () => {
      render(<Spinner label="Processing" />);
      expect(screen.getByText('Processing')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has role="status"', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-label for screen readers', () => {
      render(<Spinner label="Loading data" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading data');
    });
  });

  describe('combinations', () => {
    it('renders with all props', () => {
      render(
        <Spinner
          size="lg"
          color="#28a745"
          label="Loading items"
          className="extra-class"
        />
      );
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('extra-class');
      expect(spinner).toHaveStyle({ '--spinner-color': '#28a745' });
      expect(spinner).toHaveAttribute('aria-label', 'Loading items');
    });
  });
});
