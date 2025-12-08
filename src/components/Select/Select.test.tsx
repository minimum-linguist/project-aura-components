import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  describe('rendering', () => {
    it('renders a select element', () => {
      render(<Select options={defaultOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders all options', () => {
      render(<Select options={defaultOptions} />);
      expect(screen.getAllByRole('option')).toHaveLength(3);
    });

    it('renders placeholder option when provided', () => {
      render(<Select options={defaultOptions} placeholder="Select an option" />);
      expect(screen.getByRole('option', { name: 'Select an option' })).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(4);
    });

    it('placeholder option is disabled', () => {
      render(<Select options={defaultOptions} placeholder="Select an option" />);
      expect(screen.getByRole('option', { name: 'Select an option' })).toBeDisabled();
    });

    it('applies custom className', () => {
      render(<Select options={defaultOptions} className="custom-class" />);
      expect(screen.getByRole('combobox')).toHaveClass('custom-class');
    });

    it('renders with children instead of options', () => {
      render(
        <Select>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
      );
      expect(screen.getAllByRole('option')).toHaveLength(2);
    });
  });

  describe('label', () => {
    it('renders label when provided', () => {
      render(<Select options={defaultOptions} label="Country" />);
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });

    it('associates label with select using htmlFor', () => {
      render(<Select options={defaultOptions} label="Country" id="country-select" />);
      const label = screen.getByText('Country');
      expect(label).toHaveAttribute('for', 'country-select');
    });

    it('generates unique id when not provided', () => {
      render(<Select options={defaultOptions} label="Country" />);
      const select = screen.getByLabelText('Country');
      expect(select).toHaveAttribute('id');
    });
  });

  describe('error state', () => {
    it('renders error message when provided', () => {
      render(<Select options={defaultOptions} error="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Select options={defaultOptions} error="Error" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error with select via aria-describedby', () => {
      render(<Select options={defaultOptions} error="Error message" id="test-select" />);
      const select = screen.getByRole('combobox');
      const error = screen.getByRole('alert');
      expect(select).toHaveAttribute('aria-describedby', expect.stringContaining(error.id));
    });

    it('does not show helper text when error is present', () => {
      render(<Select options={defaultOptions} error="Error" helperText="Helper" />);
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('helper text', () => {
    it('renders helper text when provided', () => {
      render(<Select options={defaultOptions} helperText="Select a country" />);
      expect(screen.getByText('Select a country')).toBeInTheDocument();
    });

    it('associates helper text with select via aria-describedby', () => {
      render(<Select options={defaultOptions} helperText="Helper text" id="test-select" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', expect.stringContaining('helper'));
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Select options={defaultOptions} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('cannot be focused when disabled', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} disabled />);

      await user.tab();
      expect(screen.getByRole('combobox')).not.toHaveFocus();
    });

    it('renders disabled options', () => {
      const optionsWithDisabled = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
      ];
      render(<Select options={optionsWithDisabled} />);
      expect(screen.getByRole('option', { name: 'B' })).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('calls onChange when value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Select options={defaultOptions} onChange={handleChange} />);
      await user.selectOptions(screen.getByRole('combobox'), 'option2');

      expect(handleChange).toHaveBeenCalled();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.tab();
      expect(screen.getByRole('combobox')).toHaveFocus();
    });

    it('updates value when option is selected', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.selectOptions(screen.getByRole('combobox'), 'option2');
      expect(screen.getByRole('combobox')).toHaveValue('option2');
    });
  });

  describe('controlled vs uncontrolled', () => {
    it('works as controlled component', async () => {
      const handleChange = vi.fn();
      render(
        <Select
          options={defaultOptions}
          value="option1"
          onChange={handleChange}
        />
      );
      expect(screen.getByRole('combobox')).toHaveValue('option1');
    });

    it('works as uncontrolled component with defaultValue', () => {
      render(<Select options={defaultOptions} defaultValue="option2" />);
      expect(screen.getByRole('combobox')).toHaveValue('option2');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to select element', () => {
      const ref = { current: null } as React.RefObject<HTMLSelectElement>;
      render(<Select ref={ref} options={defaultOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it('allows focusing via ref', () => {
      const ref = { current: null } as React.RefObject<HTMLSelectElement>;
      render(<Select ref={ref} options={defaultOptions} />);
      ref.current?.focus();
      expect(screen.getByRole('combobox')).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('has no aria-invalid when no error', () => {
      render(<Select options={defaultOptions} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('arrow indicator is hidden from screen readers', () => {
      render(<Select options={defaultOptions} />);
      const arrow = document.querySelector('[aria-hidden="true"]');
      expect(arrow).toBeInTheDocument();
    });
  });
});
