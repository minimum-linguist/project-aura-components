import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterPanel, FilterGroup } from './FilterPanel';
import { Input } from '../Input';
import { Select } from '../Select';

describe('FilterPanel', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(
        <FilterPanel>
          <div data-testid="child">Child content</div>
        </FilterPanel>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(
        <FilterPanel title="Search Filters">
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('heading', { name: 'Search Filters' })).toBeInTheDocument();
    });

    it('renders without title', () => {
      render(
        <FilterPanel>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <FilterPanel className="custom-class">
          <div>Content</div>
        </FilterPanel>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('action buttons', () => {
    it('renders apply button when onApply is provided', () => {
      render(
        <FilterPanel onApply={() => {}}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('button', { name: 'Apply Filters' })).toBeInTheDocument();
    });

    it('renders clear button when onClear is provided', () => {
      render(
        <FilterPanel onClear={() => {}}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    });

    it('calls onApply when apply button is clicked', async () => {
      const handleApply = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel onApply={handleApply}>
          <div>Content</div>
        </FilterPanel>
      );

      await user.click(screen.getByRole('button', { name: 'Apply Filters' }));
      expect(handleApply).toHaveBeenCalled();
    });

    it('calls onClear when clear button is clicked', async () => {
      const handleClear = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel onClear={handleClear}>
          <div>Content</div>
        </FilterPanel>
      );

      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(handleClear).toHaveBeenCalled();
    });

    it('uses custom button text', () => {
      render(
        <FilterPanel
          onApply={() => {}}
          onClear={() => {}}
          applyButtonText="Search Now"
          clearButtonText="Reset"
        >
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('button', { name: 'Search Now' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });

    it('hides action buttons when showActions is false', () => {
      render(
        <FilterPanel showActions={false} onApply={() => {}} onClear={() => {}}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('does not render actions when no callbacks provided', () => {
      render(
        <FilterPanel>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.queryByRole('button', { name: 'Apply Filters' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('disables apply button when loading', () => {
      render(
        <FilterPanel isLoading onApply={() => {}}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('button', { name: 'Apply Filters' })).toBeDisabled();
    });

    it('disables clear button when loading', () => {
      render(
        <FilterPanel isLoading onClear={() => {}}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
    });

    it('sets aria-busy when loading', () => {
      render(
        <FilterPanel isLoading>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('columns', () => {
    it('renders with column prop', () => {
      // Just verify component renders without error with various column values
      const { rerender } = render(
        <FilterPanel columns="auto">
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toBeInTheDocument();

      rerender(
        <FilterPanel columns={2}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toBeInTheDocument();

      rerender(
        <FilterPanel columns={3}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toBeInTheDocument();

      rerender(
        <FilterPanel columns={4}>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has search role', () => {
      render(
        <FilterPanel>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toBeInTheDocument();
    });

    it('has aria-label from title', () => {
      render(
        <FilterPanel title="My Filters">
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'My Filters');
    });

    it('has default aria-label when no title', () => {
      render(
        <FilterPanel>
          <div>Content</div>
        </FilterPanel>
      );
      expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'Filter panel');
    });
  });
});

describe('FilterGroup', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(
        <FilterGroup>
          <Input placeholder="Test" />
        </FilterGroup>
      );
      expect(screen.getByPlaceholderText('Test')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(
        <FilterGroup label="Name" htmlFor="name">
          <Input id="name" placeholder="Enter name" />
        </FilterGroup>
      );
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <FilterGroup className="custom-group">
          <Input />
        </FilterGroup>
      );
      expect(container.firstChild).toHaveClass('custom-group');
    });
  });

  describe('label association', () => {
    it('associates label with input via htmlFor', () => {
      render(
        <FilterGroup label="Email" htmlFor="email-input">
          <Input id="email-input" />
        </FilterGroup>
      );
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', 'email-input');
    });
  });
});

describe('FilterPanel with FilterGroup integration', () => {
  it('renders multiple filter groups', () => {
    render(
      <FilterPanel title="Filters" onApply={() => {}} onClear={() => {}}>
        <FilterGroup label="Name" htmlFor="name">
          <Input id="name" placeholder="Name..." />
        </FilterGroup>
        <FilterGroup label="Status" htmlFor="status">
          <Select id="status">
            <option value="">All</option>
            <option value="active">Active</option>
          </Select>
        </FilterGroup>
      </FilterPanel>
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  it('handles form interactions', async () => {
    const user = userEvent.setup();
    const handleApply = vi.fn();

    render(
      <FilterPanel onApply={handleApply}>
        <FilterGroup label="Search" htmlFor="search">
          <Input id="search" />
        </FilterGroup>
      </FilterPanel>
    );

    const input = screen.getByLabelText('Search');
    await user.type(input, 'test query');
    await user.click(screen.getByRole('button', { name: 'Apply Filters' }));

    expect(handleApply).toHaveBeenCalled();
    expect(input).toHaveValue('test query');
  });
});
