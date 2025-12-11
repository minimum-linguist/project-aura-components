import React, { useCallback, useMemo } from 'react';
import styles from './Pagination.module.css';
import { Button } from '../Button';
import { Select } from '../Select';

export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Available items per page options */
  itemsPerPageOptions?: number[];
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when items per page changes */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  /** Show items per page selector */
  showItemsPerPage?: boolean;
  /** Show item range info (e.g., "Showing 1-10 of 100") */
  showItemRange?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Previous button text */
  previousLabel?: string;
  /** Next button text */
  nextLabel?: string;
}

/**
 * Pagination component with page navigation and items per page selection.
 * Uses Button and Select components from the library for consistent styling.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions = [25, 50, 100],
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showItemRange = true,
  className,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) => {
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handleItemsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (onItemsPerPageChange) {
        onItemsPerPageChange(Number(event.target.value));
      }
    },
    [onItemsPerPageChange]
  );

  const { startItem, endItem } = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { startItem: start, endItem: end };
  }, [currentPage, itemsPerPage, totalItems]);

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  // Don't render if there are no items
  if (totalItems === 0) {
    return null;
  }

  const containerClasses = [styles.pagination, className || ''].filter(Boolean).join(' ');

  const itemsPerPageSelectOptions = itemsPerPageOptions.map((option) => ({
    value: String(option),
    label: `${option} per page`,
  }));

  return (
    <nav className={containerClasses} aria-label="Pagination navigation">
      {showItemRange && (
        <div className={styles.info} aria-live="polite">
          Showing {startItem}-{endItem} of {totalItems} items
        </div>
      )}

      <div className={styles.controls}>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          aria-label={`Go to previous page${isPreviousDisabled ? ' (disabled)' : ''}`}
        >
          {previousLabel}
        </Button>

        <span className={styles.pageInfo} aria-current="page">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label={`Go to next page${isNextDisabled ? ' (disabled)' : ''}`}
        >
          {nextLabel}
        </Button>
      </div>

      {showItemsPerPage && onItemsPerPageChange && (
        <div className={styles.itemsPerPage}>
          <Select
            value={String(itemsPerPage)}
            onChange={handleItemsPerPageChange}
            options={itemsPerPageSelectOptions}
            aria-label="Items per page"
          />
        </div>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';
