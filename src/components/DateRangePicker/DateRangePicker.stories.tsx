import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRangePicker, dateToISOString } from './DateRangePicker';
import 'react-datepicker/dist/react-datepicker.css';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Search/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-datepicker@4.25.0/dist/react-datepicker.min.css"
        />
        <Story />
      </>
    ),
  ],
  argTypes: {
    dateFormat: {
      control: 'text',
      description: 'Date format string',
    },
    startPlaceholder: {
      control: 'text',
      description: 'Placeholder for start date',
    },
    endPlaceholder: {
      control: 'text',
      description: 'Placeholder for end date',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Basic Interactive
export const Default: Story = {
  render: function DefaultExample() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: '500px' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          <p>Start: {startDate?.toLocaleDateString() || 'Not selected'}</p>
          <p>End: {endDate?.toLocaleDateString() || 'Not selected'}</p>
        </div>
      </div>
    );
  },
};

// With Pre-selected Dates
export const WithPreselectedDates: Story = {
  render: function PreselectedExample() {
    const [startDate, setStartDate] = useState<Date | null>(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    );
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    return (
      <div style={{ maxWidth: '500px' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>
    );
  },
};

// Custom Labels
export const CustomLabels: Story = {
  render: function CustomLabelsExample() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: '500px' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          labels={{ start: 'Check-in', end: 'Check-out' }}
          startPlaceholder="Select check-in date"
          endPlaceholder="Select check-out date"
        />
      </div>
    );
  },
};

// Custom Date Format
export const CustomDateFormat: Story = {
  render: function CustomFormatExample() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: '500px' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          dateFormat="dd/MM/yyyy"
          startPlaceholder="DD/MM/YYYY"
          endPlaceholder="DD/MM/YYYY"
        />
      </div>
    );
  },
};

// With Min/Max Date Constraints
export const WithConstraints: Story = {
  render: function ConstraintsExample() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const minDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const maxDate = new Date(); // Today

    return (
      <div style={{ maxWidth: '500px' }}>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Only dates from the last 30 days can be selected
        </p>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  },
};

// Disabled State
export const Disabled: Story = {
  render: function DisabledExample() {
    return (
      <div style={{ maxWidth: '500px' }}>
        <DateRangePicker
          startDate={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
          endDate={new Date()}
          onStartDateChange={() => {}}
          onEndDateChange={() => {}}
          disabled
        />
      </div>
    );
  },
};

// With ISO String Output
export const WithISOOutput: Story = {
  render: function ISOOutputExample() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: '500px' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f5f5f5',
            borderRadius: '8px',
            fontSize: '0.875rem',
          }}
        >
          <strong>ISO String Output (for API):</strong>
          <pre style={{ marginTop: '0.5rem', overflow: 'auto' }}>
            {JSON.stringify(
              {
                dateFrom: dateToISOString(startDate),
                dateTo: dateToISOString(endDate),
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  },
};

// In Filter Context
export const InFilterContext: Story = {
  render: function FilterContextExample() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleSearch = () => {
      console.log('Search with dates:', {
        dateFrom: dateToISOString(startDate),
        dateTo: dateToISOString(endDate),
      });
    };

    const handleClear = () => {
      setStartDate(null);
      setEndDate(null);
    };

    return (
      <div
        style={{
          maxWidth: '600px',
          padding: '1.5rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Filter by Date</h3>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleSearch}
            style={{
              padding: '0.5rem 1rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Apply
          </button>
          <button
            onClick={handleClear}
            style={{
              padding: '0.5rem 1rem',
              background: '#f0f0f0',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};
