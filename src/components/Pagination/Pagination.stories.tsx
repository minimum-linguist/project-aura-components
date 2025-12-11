import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Data Display/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current page number (1-indexed)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items',
    },
    itemsPerPage: {
      control: { type: 'number', min: 1 },
      description: 'Number of items per page',
    },
    showItemsPerPage: {
      control: 'boolean',
      description: 'Show items per page selector',
    },
    showItemRange: {
      control: 'boolean',
      description: 'Show item range info',
    },
    previousLabel: {
      control: 'text',
      description: 'Previous button text',
    },
    nextLabel: {
      control: 'text',
      description: 'Next button text',
    },
    onPageChange: {
      action: 'pageChanged',
    },
    onItemsPerPageChange: {
      action: 'itemsPerPageChanged',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Default pagination
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
  },
};

// Middle page
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
  },
};

// Last page
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
  },
};

// First page (Previous disabled)
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
  },
};

// Single page (both disabled)
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 15,
    itemsPerPage: 25,
  },
};

// Without items per page selector
export const WithoutItemsPerPage: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
    showItemsPerPage: false,
  },
};

// Without item range info
export const WithoutItemRange: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
    showItemRange: false,
  },
};

// Minimal (only controls)
export const Minimal: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
    showItemsPerPage: false,
    showItemRange: false,
  },
};

// Custom items per page options
export const CustomItemsPerPageOptions: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    totalItems: 1000,
    itemsPerPage: 50,
    itemsPerPageOptions: [10, 25, 50, 100, 200],
  },
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
    previousLabel: '← Back',
    nextLabel: 'Forward →',
  },
};

// Large dataset
export const LargeDataset: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    totalItems: 10000,
    itemsPerPage: 100,
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const totalItems = 250;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Reset to first page when items per page changes
    };

    return (
      <div>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 0.5rem 0' }}><strong>State:</strong></p>
          <p style={{ margin: '0', fontSize: '0.875rem', color: '#666' }}>
            Current Page: {currentPage} | Items Per Page: {itemsPerPage} | Total Pages: {totalPages}
          </p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    );
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Default (all features)</h4>
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={250}
          itemsPerPage={25}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>First page (Previous disabled)</h4>
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={250}
          itemsPerPage={25}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Last page (Next disabled)</h4>
        <Pagination
          currentPage={10}
          totalPages={10}
          totalItems={250}
          itemsPerPage={25}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Without items per page</h4>
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={250}
          itemsPerPage={25}
          showItemsPerPage={false}
          onPageChange={() => {}}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Minimal (controls only)</h4>
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={250}
          itemsPerPage={25}
          showItemsPerPage={false}
          showItemRange={false}
          onPageChange={() => {}}
        />
      </div>
    </div>
  ),
};
