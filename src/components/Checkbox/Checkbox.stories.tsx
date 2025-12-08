import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
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
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'We will send you weekly updates',
  },
};

// States
export const Checked: Story = {
  args: {
    label: 'This is checked',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'This is unchecked',
    checked: false,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    checked: true,
  },
};

// Interactive example
const InteractiveTemplate = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Click me to toggle"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Indeterminate example with children
const IndeterminateTemplate = () => {
  const [checkedItems, setCheckedItems] = useState([false, true, false]);

  const allChecked = checkedItems.every(Boolean);
  const someChecked = checkedItems.some(Boolean) && !allChecked;

  const handleParentChange = () => {
    setCheckedItems(allChecked ? [false, false, false] : [true, true, true]);
  };

  const handleChildChange = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={handleParentChange}
      />
      <div style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Checkbox
          label="Option 1"
          checked={checkedItems[0]}
          onChange={() => handleChildChange(0)}
        />
        <Checkbox
          label="Option 2"
          checked={checkedItems[1]}
          onChange={() => handleChildChange(1)}
        />
        <Checkbox
          label="Option 3"
          checked={checkedItems[2]}
          onChange={() => handleChildChange(2)}
        />
      </div>
    </div>
  );
};

export const IndeterminateWithChildren: Story = {
  render: () => <IndeterminateTemplate />,
};

// Form example
const FormTemplate = () => {
  const [values, setValues] = useState({
    terms: false,
    newsletter: true,
    marketing: false,
  });

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox
        label="I accept the terms and conditions"
        checked={values.terms}
        onChange={(e) => setValues({ ...values, terms: e.target.checked })}
        error={!values.terms ? 'Required' : undefined}
      />
      <Checkbox
        label="Subscribe to newsletter"
        checked={values.newsletter}
        onChange={(e) => setValues({ ...values, newsletter: e.target.checked })}
        helperText="Get weekly updates about new features"
      />
      <Checkbox
        label="Receive marketing emails"
        checked={values.marketing}
        onChange={(e) => setValues({ ...values, marketing: e.target.checked })}
      />
    </form>
  );
};

export const FormExample: Story = {
  render: () => <FormTemplate />,
};

// All States Gallery
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Default unchecked" />
      <Checkbox label="Checked" checked onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="With helper text" helperText="This is helper text" />
      <Checkbox label="With error" error="This field has an error" />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled checked onChange={() => {}} />
    </div>
  ),
};
