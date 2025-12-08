import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Container>Container content</Container>);
      expect(screen.getByText('Container content')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      const { container } = render(<Container>Content</Container>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Container className="custom-class">Content</Container>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('maxWidth', () => {
    it.each(['sm', 'md', 'lg', 'xl', 'full'] as const)(
      'renders with maxWidth-%s',
      (maxWidth) => {
        render(<Container maxWidth={maxWidth}>{maxWidth}</Container>);
        expect(screen.getByText(maxWidth)).toBeInTheDocument();
      }
    );

    it('defaults to lg maxWidth', () => {
      render(<Container>Default</Container>);
      expect(screen.getByText('Default')).toBeInTheDocument();
    });
  });

  describe('centering', () => {
    it('is centered by default', () => {
      const { container } = render(<Container>Centered</Container>);
      // CSS modules mangle class names, so we check for partial match
      const classList = container.firstChild?.className || '';
      expect(classList).toMatch(/centered/i);
    });

    it('can be not centered', () => {
      const { container } = render(<Container centered={false}>Not centered</Container>);
      const classList = container.firstChild?.className || '';
      expect(classList).not.toMatch(/centered/i);
    });
  });

  describe('padding', () => {
    it.each(['none', 'sm', 'md', 'lg'] as const)(
      'renders with padding-%s',
      (padding) => {
        render(<Container padding={padding}>Content</Container>);
        expect(screen.getByText('Content')).toBeInTheDocument();
      }
    );

    it('defaults to md padding', () => {
      render(<Container>Default padding</Container>);
      expect(screen.getByText('Default padding')).toBeInTheDocument();
    });
  });

  describe('semantic elements', () => {
    it('renders as main when specified', () => {
      const { container } = render(<Container as="main">Main content</Container>);
      expect(container.firstChild?.nodeName).toBe('MAIN');
    });

    it('renders as section when specified', () => {
      const { container } = render(<Container as="section">Section content</Container>);
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('renders as article when specified', () => {
      const { container } = render(<Container as="article">Article content</Container>);
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });
  });

  describe('combinations', () => {
    it('renders with all props', () => {
      const { container } = render(
        <Container
          maxWidth="xl"
          centered={true}
          padding="lg"
          as="main"
          className="extra-class"
        >
          Full configuration
        </Container>
      );

      expect(container.firstChild?.nodeName).toBe('MAIN');
      expect(container.firstChild).toHaveClass('extra-class');
      // CSS modules mangle class names, so we check for partial match
      const classList = container.firstChild?.className || '';
      expect(classList).toMatch(/centered/i);
      expect(screen.getByText('Full configuration')).toBeInTheDocument();
    });
  });
});
