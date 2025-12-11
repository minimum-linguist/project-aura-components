import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  describe('rendering', () => {
    it('renders a search input', () => {
      render(<SearchBar onSearch={() => {}} />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<SearchBar placeholder="Search items..." onSearch={() => {}} />);
      expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
    });

    it('renders with default placeholder', () => {
      render(<SearchBar onSearch={() => {}} />);
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<SearchBar label="Search" onSearch={() => {}} />);
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SearchBar className="custom-class" onSearch={() => {}} />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('has search icon', () => {
      render(<SearchBar onSearch={() => {}} />);
      // Search icon should be visible
      const svgs = document.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('debounced search', () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('calls onSearch after debounce delay', async () => {
      const handleSearch = vi.fn();

      render(<SearchBar onSearch={handleSearch} debounceMs={300} />);

      const input = screen.getByRole('searchbox');

      // Simulate typing without userEvent to avoid timer conflicts
      input.focus();
      await vi.runAllTimersAsync();

      // Fire change event directly
      input.setAttribute('value', 'test');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      (input as HTMLInputElement).value = 'test';
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);

      // Should not be called immediately
      expect(handleSearch).not.toHaveBeenCalled();

      // Advance timers past debounce delay
      await vi.advanceTimersByTimeAsync(300);

      expect(handleSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('controlled mode', () => {
    it('displays controlled value', () => {
      render(<SearchBar value="controlled value" onSearch={() => {}} />);
      expect(screen.getByDisplayValue('controlled value')).toBeInTheDocument();
    });

    it('updates when controlled value changes', () => {
      const { rerender } = render(<SearchBar value="initial" onSearch={() => {}} />);
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();

      rerender(<SearchBar value="updated" onSearch={() => {}} />);
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });
  });

  describe('clear button', () => {
    it('does not show clear button when value is empty', () => {
      render(<SearchBar onSearch={() => {}} />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('hides clear button when showClearButton is false', () => {
      render(<SearchBar value="test" onSearch={() => {}} showClearButton={false} />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('shows clear button when there is a controlled value', () => {
      render(<SearchBar value="test" onSearch={() => {}} />);
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('clears input when clear button is clicked', async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(<SearchBar value="test" onSearch={handleSearch} />);

      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);

      expect(handleSearch).toHaveBeenCalledWith('');
    });

    it('calls onClear callback when clear button is clicked', async () => {
      const handleClear = vi.fn();
      const user = userEvent.setup();

      render(<SearchBar value="test" onSearch={() => {}} onClear={handleClear} />);

      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);

      expect(handleClear).toHaveBeenCalled();
    });

    it('hides clear button when loading', () => {
      render(<SearchBar value="test" onSearch={() => {}} isLoading />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });
  });

  describe('keyboard interactions', () => {
    it('can be focused with Tab', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={() => {}} />);

      await user.tab();
      expect(screen.getByRole('searchbox')).toHaveFocus();
    });
  });

  describe('loading state', () => {
    it('disables input when loading', () => {
      render(<SearchBar onSearch={() => {}} isLoading />);
      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('does not disable input when not loading', () => {
      render(<SearchBar onSearch={() => {}} isLoading={false} />);
      expect(screen.getByRole('searchbox')).not.toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('has aria-label when no label is provided', () => {
      render(<SearchBar onSearch={() => {}} />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('aria-label', 'Search');
    });

    it('does not have aria-label when label is provided', () => {
      render(<SearchBar label="Search Items" onSearch={() => {}} />);
      // When label is provided, aria-label is not needed
      const input = screen.getByLabelText('Search Items');
      expect(input).not.toHaveAttribute('aria-label');
    });

    it('clear button has accessible name when shown', () => {
      render(<SearchBar value="test" onSearch={() => {}} />);
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('search icon is hidden from screen readers', () => {
      render(<SearchBar onSearch={() => {}} />);
      const hiddenElements = document.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});
