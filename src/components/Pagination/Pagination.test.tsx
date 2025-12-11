import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

const defaultProps = {
  currentPage: 5,
  totalPages: 10,
  totalItems: 250,
  itemsPerPage: 25,
  onPageChange: vi.fn(),
};

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders pagination controls', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('displays current page info', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText('Page 5 of 10')).toBeInTheDocument();
    });

    it('displays item range info', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText('Showing 101-125 of 250 items')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Pagination {...defaultProps} className="custom-class" />);

      expect(screen.getByRole('navigation')).toHaveClass('custom-class');
    });

    it('renders nothing when totalItems is 0', () => {
      const { container } = render(
        <Pagination {...defaultProps} totalItems={0} />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('page navigation', () => {
    it('calls onPageChange with previous page when Previous clicked', async () => {
      const handlePageChange = vi.fn();
      const user = userEvent.setup();

      render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);
      await user.click(screen.getByRole('button', { name: /previous/i }));

      expect(handlePageChange).toHaveBeenCalledWith(4);
    });

    it('calls onPageChange with next page when Next clicked', async () => {
      const handlePageChange = vi.fn();
      const user = userEvent.setup();

      render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);
      await user.click(screen.getByRole('button', { name: /next/i }));

      expect(handlePageChange).toHaveBeenCalledWith(6);
    });

    it('does not call onPageChange when Previous clicked on first page', async () => {
      const handlePageChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          onPageChange={handlePageChange}
        />
      );
      await user.click(screen.getByRole('button', { name: /previous/i }));

      expect(handlePageChange).not.toHaveBeenCalled();
    });

    it('does not call onPageChange when Next clicked on last page', async () => {
      const handlePageChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Pagination
          {...defaultProps}
          currentPage={10}
          onPageChange={handlePageChange}
        />
      );
      await user.click(screen.getByRole('button', { name: /next/i }));

      expect(handlePageChange).not.toHaveBeenCalled();
    });
  });

  describe('button states', () => {
    it('disables Previous button on first page', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      render(<Pagination {...defaultProps} currentPage={10} />);

      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('enables both buttons on middle page', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled();
      expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
    });

    it('disables both buttons on single page', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          totalPages={1}
          totalItems={15}
        />
      );

      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });
  });

  describe('items per page', () => {
    it('renders items per page selector when showItemsPerPage is true', () => {
      const handleItemsPerPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          showItemsPerPage={true}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('does not render items per page selector when showItemsPerPage is false', () => {
      render(<Pagination {...defaultProps} showItemsPerPage={false} />);

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('does not render items per page selector without onItemsPerPageChange', () => {
      render(<Pagination {...defaultProps} showItemsPerPage={true} />);

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('calls onItemsPerPageChange when selection changes', async () => {
      const handleItemsPerPageChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Pagination
          {...defaultProps}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      );

      await user.selectOptions(screen.getByRole('combobox'), '50');

      expect(handleItemsPerPageChange).toHaveBeenCalledWith(50);
    });

    it('renders custom items per page options', () => {
      const handleItemsPerPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          itemsPerPageOptions={[10, 20, 30]}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveTextContent('10 per page');
      expect(select).toHaveTextContent('20 per page');
      expect(select).toHaveTextContent('30 per page');
    });
  });

  describe('item range calculation', () => {
    it('calculates correct range for first page', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          totalItems={250}
          itemsPerPage={25}
        />
      );

      expect(screen.getByText('Showing 1-25 of 250 items')).toBeInTheDocument();
    });

    it('calculates correct range for middle page', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          totalItems={250}
          itemsPerPage={25}
        />
      );

      expect(screen.getByText('Showing 101-125 of 250 items')).toBeInTheDocument();
    });

    it('calculates correct range for last page with partial items', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={10}
          totalPages={10}
          totalItems={243}
          itemsPerPage={25}
        />
      );

      expect(screen.getByText('Showing 226-243 of 243 items')).toBeInTheDocument();
    });

    it('handles edge case where end exceeds total', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={3}
          totalPages={3}
          totalItems={55}
          itemsPerPage={25}
        />
      );

      expect(screen.getByText('Showing 51-55 of 55 items')).toBeInTheDocument();
    });
  });

  describe('visibility options', () => {
    it('hides item range when showItemRange is false', () => {
      render(<Pagination {...defaultProps} showItemRange={false} />);

      expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
    });

    it('shows item range by default', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText(/Showing/)).toBeInTheDocument();
    });
  });

  describe('custom labels', () => {
    it('renders custom previous label', () => {
      render(<Pagination {...defaultProps} previousLabel="Back" />);

      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('renders custom next label', () => {
      render(<Pagination {...defaultProps} nextLabel="Forward" />);

      expect(screen.getByText('Forward')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has navigation landmark', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByRole('navigation')).toHaveAttribute(
        'aria-label',
        'Pagination navigation'
      );
    });

    it('indicates current page', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText('Page 5 of 10')).toHaveAttribute('aria-current', 'page');
    });

    it('has aria-live on item range for screen readers', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText(/Showing/)).toHaveAttribute('aria-live', 'polite');
    });

    it('Previous button has appropriate aria-label when disabled', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      expect(screen.getByRole('button', { name: /previous/i })).toHaveAttribute(
        'aria-label',
        expect.stringContaining('disabled')
      );
    });

    it('Next button has appropriate aria-label when disabled', () => {
      render(<Pagination {...defaultProps} currentPage={10} />);

      expect(screen.getByRole('button', { name: /next/i })).toHaveAttribute(
        'aria-label',
        expect.stringContaining('disabled')
      );
    });

    it('items per page select has aria-label', () => {
      const handleItemsPerPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      );

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Items per page');
    });
  });

  describe('keyboard navigation', () => {
    it('Previous button can be activated with keyboard', async () => {
      const handlePageChange = vi.fn();
      const user = userEvent.setup();

      render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      prevButton.focus();
      await user.keyboard('{Enter}');

      expect(handlePageChange).toHaveBeenCalledWith(4);
    });

    it('Next button can be activated with keyboard', async () => {
      const handlePageChange = vi.fn();
      const user = userEvent.setup();

      render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      nextButton.focus();
      await user.keyboard('{Enter}');

      expect(handlePageChange).toHaveBeenCalledWith(6);
    });
  });
});
