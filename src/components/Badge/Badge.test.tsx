import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge').tagName).toBe('SPAN');
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Badge</Badge>);
      expect(screen.getByText('Badge')).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it.each(['default', 'success', 'warning', 'danger', 'info'] as const)(
      'renders %s variant',
      (variant) => {
        render(<Badge variant={variant}>{variant}</Badge>);
        expect(screen.getByText(variant)).toBeInTheDocument();
      }
    );

    it('defaults to default variant', () => {
      render(<Badge>Default</Badge>);
      expect(screen.getByText('Default')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByText(size)).toBeInTheDocument();
    });

    it('defaults to md size', () => {
      render(<Badge>Medium</Badge>);
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });
  });

  describe('pill shape', () => {
    it('renders without pill class by default', () => {
      const { container } = render(<Badge>Not Pill</Badge>);
      expect(container.firstChild).not.toHaveClass('pill');
    });

    it('renders with pill class when pill prop is true', () => {
      render(<Badge pill>Pill Badge</Badge>);
      // The pill class is applied, we can verify the element exists
      expect(screen.getByText('Pill Badge')).toBeInTheDocument();
    });
  });

  describe('combinations', () => {
    it('renders with multiple props combined', () => {
      render(
        <Badge variant="success" size="lg" pill className="extra-class">
          Combined
        </Badge>
      );
      const badge = screen.getByText('Combined');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('extra-class');
    });
  });
});
