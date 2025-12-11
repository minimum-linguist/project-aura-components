import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Search/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Show clear button when value exists',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    label: {
      control: 'text',
      description: 'Label for the search input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Basic
export const Default: Story = {
  args: {
    placeholder: 'Search...',
    onSearch: (value) => console.log('Search:', value),
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Search',
    placeholder: 'Enter search term...',
    onSearch: (value) => console.log('Search:', value),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search for users, posts, or comments...',
    onSearch: (value) => console.log('Search:', value),
  },
};

// States
export const Loading: Story = {
  args: {
    placeholder: 'Search...',
    isLoading: true,
    onSearch: (value) => console.log('Search:', value),
  },
};

export const WithoutClearButton: Story = {
  args: {
    placeholder: 'Search...',
    showClearButton: false,
    onSearch: (value) => console.log('Search:', value),
  },
};

// Custom debounce
export const FastDebounce: Story = {
  args: {
    placeholder: 'Fast search (100ms debounce)...',
    debounceMs: 100,
    onSearch: (value) => console.log('Search:', value),
  },
};

export const SlowDebounce: Story = {
  args: {
    placeholder: 'Slow search (1000ms debounce)...',
    debounceMs: 1000,
    onSearch: (value) => console.log('Search:', value),
  },
};

// Interactive example
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (searchValue: string) => {
      setValue(searchValue);
      // Simulate search results
      if (searchValue) {
        setSearchResults([
          `Result 1 for "${searchValue}"`,
          `Result 2 for "${searchValue}"`,
          `Result 3 for "${searchValue}"`,
        ]);
      } else {
        setSearchResults([]);
      }
    };

    const handleClear = () => {
      setValue('');
      setSearchResults([]);
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <SearchBar
          value={value}
          placeholder="Search items..."
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Current value: &quot;{value}&quot;
          </p>
          {searchResults.length > 0 && (
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              {searchResults.map((result, index) => (
                <li key={index} style={{ marginBottom: '0.25rem' }}>
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
};

// All States Gallery
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Default</h4>
        <SearchBar placeholder="Search..." onSearch={() => {}} />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>With Label</h4>
        <SearchBar label="Search" placeholder="Enter search term..." onSearch={() => {}} />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Loading</h4>
        <SearchBar placeholder="Search..." isLoading onSearch={() => {}} />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Without Clear Button</h4>
        <SearchBar placeholder="Search..." showClearButton={false} onSearch={() => {}} />
      </div>
    </div>
  ),
};
