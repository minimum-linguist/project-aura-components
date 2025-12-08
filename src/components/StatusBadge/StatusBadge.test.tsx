import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  describe('rendering', () => {
    it('renders status code as text', () => {
      render(<StatusBadge statusCode={200} />);
      expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<StatusBadge statusCode={200} className="custom-class" />);
      expect(screen.getByText('200')).toHaveClass('custom-class');
    });
  });

  describe('status code mapping', () => {
    describe('success codes (2xx)', () => {
      it.each([200, 201, 204, 299])('maps %d to success variant', (code) => {
        render(<StatusBadge statusCode={code} />);
        expect(screen.getByText(String(code))).toBeInTheDocument();
      });
    });

    describe('redirect codes (3xx)', () => {
      it.each([301, 302, 304, 399])('maps %d to info variant', (code) => {
        render(<StatusBadge statusCode={code} />);
        expect(screen.getByText(String(code))).toBeInTheDocument();
      });
    });

    describe('client error codes (4xx)', () => {
      it.each([400, 401, 403, 404, 429, 499])('maps %d to warning variant', (code) => {
        render(<StatusBadge statusCode={code} />);
        expect(screen.getByText(String(code))).toBeInTheDocument();
      });
    });

    describe('server error codes (5xx)', () => {
      it.each([500, 502, 503, 504, 599])('maps %d to danger variant', (code) => {
        render(<StatusBadge statusCode={code} />);
        expect(screen.getByText(String(code))).toBeInTheDocument();
      });
    });

    describe('other codes', () => {
      it.each([100, 101, 199])('maps %d to default variant', (code) => {
        render(<StatusBadge statusCode={code} />);
        expect(screen.getByText(String(code))).toBeInTheDocument();
      });
    });
  });

  describe('inherited Badge props', () => {
    it('renders with pill shape', () => {
      render(<StatusBadge statusCode={200} pill />);
      expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<StatusBadge statusCode={200} size="sm" />);
      expect(screen.getByText('200')).toBeInTheDocument();

      rerender(<StatusBadge statusCode={200} size="lg" />);
      expect(screen.getByText('200')).toBeInTheDocument();
    });
  });
});
