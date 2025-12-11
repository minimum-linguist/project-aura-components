import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterPanel, FilterGroup } from './FilterPanel';
import { Input } from '../Input';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof FilterPanel> = {
  title: 'Search/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 'auto'],
      description: 'Number of columns',
    },
    showActions: {
      control: 'boolean',
      description: 'Show action buttons',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    applyButtonText: {
      control: 'text',
      description: 'Apply button text',
    },
    clearButtonText: {
      control: 'text',
      description: 'Clear button text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

// Basic
export const Default: Story = {
  args: {
    title: 'Filters',
    onApply: () => console.log('Apply clicked'),
    onClear: () => console.log('Clear clicked'),
    children: (
      <>
        <FilterGroup label="Name" htmlFor="name">
          <Input id="name" placeholder="Enter name..." />
        </FilterGroup>
        <FilterGroup label="Status" htmlFor="status">
          <Select id="status">
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </FilterGroup>
      </>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    onApply: () => console.log('Apply clicked'),
    onClear: () => console.log('Clear clicked'),
    children: (
      <>
        <FilterGroup label="Search" htmlFor="search">
          <Input id="search" placeholder="Search..." />
        </FilterGroup>
        <FilterGroup label="Category" htmlFor="category">
          <Select id="category">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
          </Select>
        </FilterGroup>
      </>
    ),
  },
};

// Column variants
export const OneColumn: Story = {
  args: {
    title: 'Single Column',
    columns: 1,
    onApply: () => {},
    onClear: () => {},
    children: (
      <>
        <FilterGroup label="Field 1" htmlFor="field1">
          <Input id="field1" placeholder="Enter value..." />
        </FilterGroup>
        <FilterGroup label="Field 2" htmlFor="field2">
          <Input id="field2" placeholder="Enter value..." />
        </FilterGroup>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Two Columns',
    columns: 2,
    onApply: () => {},
    onClear: () => {},
    children: (
      <>
        <FilterGroup label="First Name" htmlFor="firstName">
          <Input id="firstName" placeholder="First name..." />
        </FilterGroup>
        <FilterGroup label="Last Name" htmlFor="lastName">
          <Input id="lastName" placeholder="Last name..." />
        </FilterGroup>
        <FilterGroup label="Email" htmlFor="email">
          <Input id="email" type="email" placeholder="Email..." />
        </FilterGroup>
        <FilterGroup label="Phone" htmlFor="phone">
          <Input id="phone" type="tel" placeholder="Phone..." />
        </FilterGroup>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    title: 'Three Columns',
    columns: 3,
    onApply: () => {},
    onClear: () => {},
    children: (
      <>
        <FilterGroup label="Field 1" htmlFor="f1">
          <Input id="f1" placeholder="Value..." />
        </FilterGroup>
        <FilterGroup label="Field 2" htmlFor="f2">
          <Input id="f2" placeholder="Value..." />
        </FilterGroup>
        <FilterGroup label="Field 3" htmlFor="f3">
          <Input id="f3" placeholder="Value..." />
        </FilterGroup>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    title: 'Four Columns',
    columns: 4,
    onApply: () => {},
    onClear: () => {},
    children: (
      <>
        <FilterGroup label="A" htmlFor="a">
          <Input id="a" placeholder="..." />
        </FilterGroup>
        <FilterGroup label="B" htmlFor="b">
          <Input id="b" placeholder="..." />
        </FilterGroup>
        <FilterGroup label="C" htmlFor="c">
          <Input id="c" placeholder="..." />
        </FilterGroup>
        <FilterGroup label="D" htmlFor="d">
          <Input id="d" placeholder="..." />
        </FilterGroup>
      </>
    ),
  },
};

// States
export const Loading: Story = {
  args: {
    title: 'Loading State',
    isLoading: true,
    onApply: () => {},
    onClear: () => {},
    children: (
      <>
        <FilterGroup label="Name" htmlFor="name-loading">
          <Input id="name-loading" placeholder="Enter name..." />
        </FilterGroup>
        <FilterGroup label="Status" htmlFor="status-loading">
          <Select id="status-loading">
            <option value="">All</option>
            <option value="active">Active</option>
          </Select>
        </FilterGroup>
      </>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    title: 'No Action Buttons',
    showActions: false,
    children: (
      <>
        <FilterGroup label="Search" htmlFor="search-no-actions">
          <Input id="search-no-actions" placeholder="Search..." />
        </FilterGroup>
      </>
    ),
  },
};

export const CustomButtonText: Story = {
  args: {
    title: 'Custom Button Text',
    applyButtonText: 'Search Now',
    clearButtonText: 'Reset All',
    onApply: () => {},
    onClear: () => {},
    children: (
      <>
        <FilterGroup label="Query" htmlFor="query">
          <Input id="query" placeholder="Enter query..." />
        </FilterGroup>
      </>
    ),
  },
};

// Interactive Example
export const Interactive: Story = {
  render: function InteractiveExample() {
    const [filters, setFilters] = useState({
      name: '',
      status: '',
      category: '',
      active: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<typeof filters | null>(null);

    const handleApply = () => {
      setIsLoading(true);
      setTimeout(() => {
        setAppliedFilters({ ...filters });
        setIsLoading(false);
      }, 1000);
    };

    const handleClear = () => {
      setFilters({ name: '', status: '', category: '', active: false });
      setAppliedFilters(null);
    };

    return (
      <div style={{ maxWidth: '800px' }}>
        <FilterPanel
          title="Search Filters"
          columns={2}
          isLoading={isLoading}
          onApply={handleApply}
          onClear={handleClear}
        >
          <FilterGroup label="Name" htmlFor="interactive-name">
            <Input
              id="interactive-name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              placeholder="Enter name..."
            />
          </FilterGroup>
          <FilterGroup label="Status" htmlFor="interactive-status">
            <Select
              id="interactive-status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Select>
          </FilterGroup>
          <FilterGroup label="Category" htmlFor="interactive-category">
            <Select
              id="interactive-category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="tech">Technology</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
            </Select>
          </FilterGroup>
          <FilterGroup>
            <Checkbox
              checked={filters.active}
              onChange={(e) => setFilters({ ...filters, active: e.target.checked })}
              label="Active only"
            />
          </FilterGroup>
        </FilterPanel>

        {appliedFilters && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
            <strong>Applied Filters:</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              {JSON.stringify(appliedFilters, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
};

// Complex Example
export const ComplexFilters: Story = {
  render: () => (
    <FilterPanel
      title="Advanced Search"
      columns="auto"
      onApply={() => console.log('Apply')}
      onClear={() => console.log('Clear')}
    >
      <FilterGroup label="Date From" htmlFor="date-from">
        <Input id="date-from" type="date" />
      </FilterGroup>
      <FilterGroup label="Date To" htmlFor="date-to">
        <Input id="date-to" type="date" />
      </FilterGroup>
      <FilterGroup label="Endpoint" htmlFor="endpoint">
        <Input id="endpoint" placeholder="e.g., /api/chat" />
      </FilterGroup>
      <FilterGroup label="Status Code" htmlFor="status-code">
        <Select id="status-code">
          <option value="">All</option>
          <option value="200">200 - Success</option>
          <option value="400">400 - Bad Request</option>
          <option value="500">500 - Server Error</option>
        </Select>
      </FilterGroup>
      <FilterGroup label="Min Response Time (ms)" htmlFor="min-time">
        <Input id="min-time" type="number" placeholder="0" min="0" />
      </FilterGroup>
      <FilterGroup label="Max Response Time (ms)" htmlFor="max-time">
        <Input id="max-time" type="number" placeholder="10000" min="0" />
      </FilterGroup>
    </FilterPanel>
  ),
};
