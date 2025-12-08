import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders a checkbox input', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-class" />);
      expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
    });
  });

  describe('label', () => {
    it('renders label text', () => {
      render(<Checkbox label="My Label" />);
      expect(screen.getByText('My Label')).toBeInTheDocument();
    });

    it('clicking label toggles checkbox', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox label="Click me" onChange={handleChange} />);
      await user.click(screen.getByText('Click me'));

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('checked state', () => {
    it('is unchecked by default', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('is checked when checked prop is true', () => {
      render(<Checkbox checked onChange={() => {}} />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('can be toggled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox onChange={handleChange} />);
      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('indeterminate state', () => {
    it('sets indeterminate property', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
    });

    it('updates indeterminate when prop changes', () => {
      const { rerender } = render(<Checkbox indeterminate={false} />);
      expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', false);

      rerender(<Checkbox indeterminate={true} />);
      expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
    });
  });

  describe('error state', () => {
    it('renders error message when provided', () => {
      render(<Checkbox error="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Checkbox error="Error" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error with checkbox via aria-describedby', () => {
      render(<Checkbox error="Error message" id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      const error = screen.getByRole('alert');
      expect(checkbox).toHaveAttribute('aria-describedby', expect.stringContaining(error.id));
    });

    it('does not show helper text when error is present', () => {
      render(<Checkbox error="Error" helperText="Helper" />);
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('helper text', () => {
    it('renders helper text when provided', () => {
      render(<Checkbox helperText="Optional checkbox" />);
      expect(screen.getByText('Optional checkbox')).toBeInTheDocument();
    });

    it('associates helper text with checkbox via aria-describedby', () => {
      render(<Checkbox helperText="Helper text" id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', expect.stringContaining('helper'));
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Checkbox disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('cannot be toggled when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox disabled onChange={handleChange} />);
      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('cannot be focused when disabled', async () => {
      const user = userEvent.setup();
      render(<Checkbox disabled />);

      await user.tab();
      expect(screen.getByRole('checkbox')).not.toHaveFocus();
    });
  });

  describe('interactions', () => {
    it('calls onChange when clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox onChange={handleChange} />);
      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);

      await user.tab();
      expect(screen.getByRole('checkbox')).toHaveFocus();
    });

    it('can be toggled with Space key', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox onChange={handleChange} />);
      await user.tab();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('controlled vs uncontrolled', () => {
    it('works as controlled component', () => {
      render(<Checkbox checked onChange={() => {}} />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('works as uncontrolled component with defaultChecked', () => {
      render(<Checkbox defaultChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to checkbox element', () => {
      const ref = { current: null } as React.RefObject<HTMLInputElement>;
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('allows focusing via ref', () => {
      const ref = { current: null } as React.RefObject<HTMLInputElement>;
      render(<Checkbox ref={ref} />);
      ref.current?.focus();
      expect(screen.getByRole('checkbox')).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('has no aria-invalid when no error', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('checkmark icon is hidden from screen readers', () => {
      render(<Checkbox />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('has proper type attribute', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
    });
  });
});
