import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  describe('rendering', () => {
    it('renders a textarea element', () => {
      render(<TextArea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<TextArea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<TextArea value="test value" onChange={() => {}} />);
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<TextArea className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });
  });

  describe('label', () => {
    it('renders label when provided', () => {
      render(<TextArea label="Description" />);
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });

    it('associates label with textarea using htmlFor', () => {
      render(<TextArea label="Description" id="desc-input" />);
      const label = screen.getByText('Description');
      expect(label).toHaveAttribute('for', 'desc-input');
    });

    it('generates unique id when not provided', () => {
      render(<TextArea label="Description" />);
      const textarea = screen.getByLabelText('Description');
      expect(textarea).toHaveAttribute('id');
    });
  });

  describe('error state', () => {
    it('renders error message when provided', () => {
      render(<TextArea error="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('sets aria-invalid when error is present', () => {
      render(<TextArea error="Error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error with textarea via aria-describedby', () => {
      render(<TextArea error="Error message" id="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      const error = screen.getByRole('alert');
      expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining(error.id));
    });

    it('does not show helper text when error is present', () => {
      render(<TextArea error="Error" helperText="Helper" />);
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('helper text', () => {
    it('renders helper text when provided', () => {
      render(<TextArea helperText="Enter a description" />);
      expect(screen.getByText('Enter a description')).toBeInTheDocument();
    });

    it('associates helper text with textarea via aria-describedby', () => {
      render(<TextArea helperText="Helper text" id="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining('helper'));
    });
  });

  describe('character count', () => {
    it('shows character count when showCharCount and maxLength are set', () => {
      render(<TextArea showCharCount maxLength={100} value="" onChange={() => {}} />);
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('updates character count with value', () => {
      render(<TextArea showCharCount maxLength={100} value="hello" onChange={() => {}} />);
      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    it('does not show character count without maxLength', () => {
      render(<TextArea showCharCount value="hello" onChange={() => {}} />);
      expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
    });
  });

  describe('resize options', () => {
    it('applies resize-vertical class by default', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');
      // CSS Modules adds hash to class names, so check for pattern
      expect(textarea.className).toMatch(/resize-vertical/);
    });

    it('applies resize-none class', () => {
      render(<TextArea resize="none" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.className).toMatch(/resize-none/);
    });

    it('applies resize-horizontal class', () => {
      render(<TextArea resize="horizontal" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.className).toMatch(/resize-horizontal/);
    });

    it('applies resize-both class', () => {
      render(<TextArea resize="both" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.className).toMatch(/resize-both/);
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<TextArea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('cannot be focused when disabled', async () => {
      const user = userEvent.setup();
      render(<TextArea disabled />);

      await user.tab();
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });
  });

  describe('interactions', () => {
    it('calls onChange when value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<TextArea onChange={handleChange} />);
      await user.type(screen.getByRole('textbox'), 'hello');

      expect(handleChange).toHaveBeenCalled();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<TextArea />);

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('respects maxLength', async () => {
      const user = userEvent.setup();
      render(<TextArea maxLength={5} />);

      await user.type(screen.getByRole('textbox'), 'hello world');
      expect(screen.getByRole('textbox')).toHaveValue('hello');
    });
  });

  describe('rows', () => {
    it('accepts rows prop', () => {
      render(<TextArea rows={5} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to textarea element', () => {
      const ref = { current: null } as React.RefObject<HTMLTextAreaElement>;
      render(<TextArea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('allows focusing via ref', () => {
      const ref = { current: null } as React.RefObject<HTMLTextAreaElement>;
      render(<TextArea ref={ref} />);
      ref.current?.focus();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('has no aria-invalid when no error', () => {
      render(<TextArea />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });
  });
});
