import React, { useId } from 'react';
import DatePicker from 'react-datepicker';
import styles from './DateRangePicker.module.css';

export interface DateRangePickerProps {
  /** Start date value */
  startDate: Date | null;
  /** End date value */
  endDate: Date | null;
  /** Callback when start date changes */
  onStartDateChange: (date: Date | null) => void;
  /** Callback when end date changes */
  onEndDateChange: (date: Date | null) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date (defaults to today) */
  maxDate?: Date;
  /** Date format for display */
  dateFormat?: string;
  /** Placeholder for start date input */
  startPlaceholder?: string;
  /** Placeholder for end date input */
  endPlaceholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Labels for the date inputs */
  labels?: {
    start?: string;
    end?: string;
  };
  /** Additional class name */
  className?: string;
}

/**
 * DateRangePicker component - wraps react-datepicker for date range selection.
 * Validates that end date is >= start date.
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate = new Date(),
  dateFormat = 'yyyy-MM-dd',
  startPlaceholder = 'Start date',
  endPlaceholder = 'End date',
  disabled = false,
  labels = {},
  className,
}) => {
  const startId = useId();
  const endId = useId();

  const defaultLabels = {
    start: 'From Date',
    end: 'To Date',
    ...labels,
  };

  return (
    <div className={`${styles.dateRangePicker} ${disabled ? styles.disabled : ''} ${className || ''}`}>
      <div className={styles.dateField}>
        <label htmlFor={startId} className={styles.label}>
          {defaultLabels.start}
        </label>
        <DatePicker
          id={startId}
          selected={startDate}
          onChange={onStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={maxDate}
          minDate={minDate}
          dateFormat={dateFormat}
          placeholderText={startPlaceholder}
          className={styles.input}
          disabled={disabled}
          autoComplete="off"
        />
      </div>

      <div className={styles.dateField}>
        <label htmlFor={endId} className={styles.label}>
          {defaultLabels.end}
        </label>
        <DatePicker
          id={endId}
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || minDate}
          maxDate={maxDate}
          dateFormat={dateFormat}
          placeholderText={endPlaceholder}
          className={styles.input}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

DateRangePicker.displayName = 'DateRangePicker';

/**
 * Utility function to convert Date to ISO string for API calls
 */
export const dateToISOString = (date: Date | null): string | null => {
  return date ? date.toISOString() : null;
};

/**
 * Utility function to create Date from ISO string
 */
export const isoStringToDate = (isoString: string | null): Date | null => {
  return isoString ? new Date(isoString) : null;
};
