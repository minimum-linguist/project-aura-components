import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Form/TextArea',
  component: TextArea,
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
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

// Basic
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Write a short bio (max 500 characters)',
  },
};

// States
export const WithError: Story = {
  args: {
    label: 'Description',
    value: 'Too short',
    error: 'Description must be at least 50 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled TextArea',
    value: 'This content cannot be edited',
    disabled: true,
  },
};

// Character Count
export const WithCharacterCount: Story = {
  args: {
    label: 'Tweet',
    placeholder: "What's happening?",
    maxLength: 280,
    showCharCount: true,
  },
};

// Interactive Character Count
const CharCountTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <TextArea
      label="Tweet"
      placeholder="What's happening?"
      maxLength={280}
      showCharCount
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const InteractiveCharCount: Story = {
  render: () => <CharCountTemplate />,
};

// Resize Options
export const ResizeNone: Story = {
  args: {
    label: 'No Resize',
    placeholder: 'Cannot be resized...',
    resize: 'none',
  },
};

export const ResizeVertical: Story = {
  args: {
    label: 'Vertical Resize',
    placeholder: 'Can be resized vertically...',
    resize: 'vertical',
  },
};

export const ResizeHorizontal: Story = {
  args: {
    label: 'Horizontal Resize',
    placeholder: 'Can be resized horizontally...',
    resize: 'horizontal',
  },
};

export const ResizeBoth: Story = {
  args: {
    label: 'Resize Both Directions',
    placeholder: 'Can be resized in any direction...',
    resize: 'both',
  },
};

// Custom Rows
export const SmallTextArea: Story = {
  args: {
    label: 'Short Input',
    placeholder: 'A smaller textarea...',
    rows: 2,
  },
};

export const LargeTextArea: Story = {
  args: {
    label: 'Long Form Content',
    placeholder: 'Write your essay here...',
    rows: 10,
  },
};

// All States Gallery
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
      <TextArea label="Default" placeholder="Enter text..." />
      <TextArea label="With Value" value="Some text content here" onChange={() => {}} />
      <TextArea
        label="With Helper Text"
        placeholder="Enter text..."
        helperText="This is helper text"
      />
      <TextArea
        label="With Error"
        value="Invalid content"
        error="This field has an error"
        onChange={() => {}}
      />
      <TextArea label="Disabled" value="Cannot edit this" disabled />
      <TextArea
        label="With Character Count"
        placeholder="Limited input..."
        maxLength={100}
        showCharCount
      />
      <TextArea label="No Resize" placeholder="Fixed size..." resize="none" />
    </div>
  ),
};
