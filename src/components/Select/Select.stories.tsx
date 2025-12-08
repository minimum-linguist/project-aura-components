import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'archived', label: 'Archived', disabled: true },
];

// Basic
export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    helperText: 'Select your country of residence',
  },
};

// States
export const WithError: Story = {
  args: {
    label: 'Status',
    options: statusOptions,
    placeholder: 'Select a status',
    error: 'Please select a status',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Status',
    options: statusOptions,
    placeholder: 'Select a status',
    helperText: 'Note: Archived status is not available',
  },
};

// Pre-selected value
export const WithValue: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'uk',
  },
};

// Using children instead of options
export const WithChildren: Story = {
  args: {
    label: 'Size',
    placeholder: 'Select a size',
  },
  render: (args) => (
    <Select {...args}>
      <option value="xs">Extra Small</option>
      <option value="sm">Small</option>
      <option value="md">Medium</option>
      <option value="lg">Large</option>
      <option value="xl">Extra Large</option>
    </Select>
  ),
};

// Grouped options (using children)
export const WithGroups: Story = {
  args: {
    label: 'Vehicle',
  },
  render: (args) => (
    <Select {...args}>
      <optgroup label="Cars">
        <option value="sedan">Sedan</option>
        <option value="suv">SUV</option>
        <option value="sports">Sports Car</option>
      </optgroup>
      <optgroup label="Motorcycles">
        <option value="cruiser">Cruiser</option>
        <option value="sport">Sport Bike</option>
        <option value="touring">Touring</option>
      </optgroup>
    </Select>
  ),
};

// All States Gallery
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <Select
        label="Default"
        options={countryOptions}
        placeholder="Select a country"
      />
      <Select
        label="With Value"
        options={countryOptions}
        value="ca"
        onChange={() => {}}
      />
      <Select
        label="With Helper Text"
        options={countryOptions}
        placeholder="Select a country"
        helperText="This is helper text"
      />
      <Select
        label="With Error"
        options={statusOptions}
        placeholder="Select a status"
        error="This field is required"
      />
      <Select
        label="Disabled"
        options={countryOptions}
        value="us"
        disabled
      />
      <Select
        label="With Disabled Option"
        options={statusOptions}
        placeholder="Select a status"
      />
    </div>
  ),
};
