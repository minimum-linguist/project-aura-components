import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateRangePicker, dateToISOString, isoStringToDate } from './DateRangePicker';

// Mock react-datepicker to avoid complex date picker interactions in unit tests
vi.mock('react-datepicker', () => {
  return {
    default: ({
      id,
      selected,
      onChange,
      placeholderText,
      disabled,
      className,
    }: {
      id: string;
      selected: Date | null;
      onChange: (date: Date | null) => void;
      placeholderText?: string;
      disabled?: boolean;
      className?: string;
    }) => (
      <input
        id={id}
        type="text"
        value={selected ? selected.toISOString().split('T')[0] : ''}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value ? new Date(value) : null);
        }}
        placeholder={placeholderText}
        disabled={disabled}
        className={className}
        data-testid={`datepicker-${id}`}
      />
    ),
  };
});

describe('DateRangePicker', () => {
  const defaultProps = {
    startDate: null,
    endDate: null,
    onStartDateChange: vi.fn(),
    onEndDateChange: vi.fn(),
  };

  describe('rendering', () => {
    it('renders two date inputs', () => {
      render(<DateRangePicker {...defaultProps} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(2);
    });

    it('renders with default labels', () => {
      render(<DateRangePicker {...defaultProps} />);
      expect(screen.getByText('From Date')).toBeInTheDocument();
      expect(screen.getByText('To Date')).toBeInTheDocument();
    });

    it('renders with custom labels', () => {
      render(
        <DateRangePicker
          {...defaultProps}
          labels={{ start: 'Check-in', end: 'Check-out' }}
        />
      );
      expect(screen.getByText('Check-in')).toBeInTheDocument();
      expect(screen.getByText('Check-out')).toBeInTheDocument();
    });

    it('renders with placeholders', () => {
      render(
        <DateRangePicker
          {...defaultProps}
          startPlaceholder="Start"
          endPlaceholder="End"
        />
      );
      expect(screen.getByPlaceholderText('Start')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End')).toBeInTheDocument();
    });

    it('renders with default placeholders', () => {
      render(<DateRangePicker {...defaultProps} />);
      expect(screen.getByPlaceholderText('Start date')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End date')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <DateRangePicker {...defaultProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('values', () => {
    it('displays start date value', () => {
      const startDate = new Date('2024-01-15');
      render(<DateRangePicker {...defaultProps} startDate={startDate} />);
      expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
    });

    it('displays end date value', () => {
      const endDate = new Date('2024-01-20');
      render(<DateRangePicker {...defaultProps} endDate={endDate} />);
      expect(screen.getByDisplayValue('2024-01-20')).toBeInTheDocument();
    });

    it('displays both dates', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-20');
      render(
        <DateRangePicker {...defaultProps} startDate={startDate} endDate={endDate} />
      );
      expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2024-01-20')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onStartDateChange when start date changes', async () => {
      const onStartDateChange = vi.fn();
      const user = userEvent.setup();

      render(
        <DateRangePicker {...defaultProps} onStartDateChange={onStartDateChange} />
      );

      const startInput = screen.getByPlaceholderText('Start date');
      await user.clear(startInput);
      await user.type(startInput, '2024-01-15');

      expect(onStartDateChange).toHaveBeenCalled();
    });

    it('calls onEndDateChange when end date changes', async () => {
      const onEndDateChange = vi.fn();
      const user = userEvent.setup();

      render(
        <DateRangePicker {...defaultProps} onEndDateChange={onEndDateChange} />
      );

      const endInput = screen.getByPlaceholderText('End date');
      await user.clear(endInput);
      await user.type(endInput, '2024-01-20');

      expect(onEndDateChange).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('disables both inputs when disabled is true', () => {
      render(<DateRangePicker {...defaultProps} disabled />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it('does not disable inputs when disabled is false', () => {
      render(<DateRangePicker {...defaultProps} disabled={false} />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).not.toBeDisabled();
      });
    });
  });

  describe('label associations', () => {
    it('associates labels with inputs', () => {
      render(<DateRangePicker {...defaultProps} />);
      expect(screen.getByLabelText('From Date')).toBeInTheDocument();
      expect(screen.getByLabelText('To Date')).toBeInTheDocument();
    });
  });
});

describe('utility functions', () => {
  describe('dateToISOString', () => {
    it('converts date to ISO string', () => {
      const date = new Date('2024-01-15T12:00:00.000Z');
      expect(dateToISOString(date)).toBe('2024-01-15T12:00:00.000Z');
    });

    it('returns null for null input', () => {
      expect(dateToISOString(null)).toBeNull();
    });
  });

  describe('isoStringToDate', () => {
    it('converts ISO string to date', () => {
      const result = isoStringToDate('2024-01-15T12:00:00.000Z');
      expect(result).toBeInstanceOf(Date);
      expect(result?.toISOString()).toBe('2024-01-15T12:00:00.000Z');
    });

    it('returns null for null input', () => {
      expect(isoStringToDate(null)).toBeNull();
    });
  });
});
