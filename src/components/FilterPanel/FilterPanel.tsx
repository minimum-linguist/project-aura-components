import React, { createContext, useContext } from 'react';
import { Button } from '../Button';
import styles from './FilterPanel.module.css';

export interface FilterPanelProps {
  /** Filter form content */
  children: React.ReactNode;
  /** Optional title for the filter panel */
  title?: string;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Callback when apply button is clicked */
  onApply?: () => void;
  /** Loading state - disables all interactions */
  isLoading?: boolean;
  /** Show action buttons (Clear/Apply) */
  showActions?: boolean;
  /** Number of columns for the filter grid */
  columns?: 1 | 2 | 3 | 4 | 'auto';
  /** Text for the apply button */
  applyButtonText?: string;
  /** Text for the clear button */
  clearButtonText?: string;
  /** Additional class name */
  className?: string;
}

interface FilterPanelContextValue {
  isLoading: boolean;
}

const FilterPanelContext = createContext<FilterPanelContextValue>({ isLoading: false });

/**
 * Hook to access FilterPanel context (loading state)
 */
export const useFilterPanel = () => useContext(FilterPanelContext);

/**
 * FilterPanel component - a container for filter inputs with grid layout
 * and optional action buttons.
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  children,
  title,
  onClear,
  onApply,
  isLoading = false,
  showActions = true,
  columns = 'auto',
  applyButtonText = 'Apply Filters',
  clearButtonText = 'Clear',
  className,
}) => {
  const columnClass = columns === 'auto' ? styles.columnsAuto : styles[`columns${columns}`];

  return (
    <FilterPanelContext.Provider value={{ isLoading }}>
      <div
        className={`${styles.filterPanel} ${isLoading ? styles.loading : ''} ${className || ''}`}
        role="search"
        aria-label={title || 'Filter panel'}
        aria-busy={isLoading}
      >
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={`${styles.filtersGrid} ${columnClass}`}>{children}</div>

        {showActions && (onApply || onClear) && (
          <div className={styles.actions}>
            {onApply && (
              <Button
                variant="primary"
                onClick={onApply}
                disabled={isLoading}
                isLoading={isLoading}
              >
                {applyButtonText}
              </Button>
            )}
            {onClear && (
              <Button variant="outline" onClick={onClear} disabled={isLoading}>
                {clearButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </FilterPanelContext.Provider>
  );
};

FilterPanel.displayName = 'FilterPanel';

/**
 * FilterGroup component - wrapper for individual filter inputs
 */
export interface FilterGroupProps {
  /** Filter input content */
  children: React.ReactNode;
  /** Label for the filter group */
  label?: string;
  /** HTML for attribute to associate label with input */
  htmlFor?: string;
  /** Additional class name */
  className?: string;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  children,
  label,
  htmlFor,
  className,
}) => {
  return (
    <div className={`${styles.filterGroup} ${className || ''}`}>
      {label && (
        <label htmlFor={htmlFor} className={styles.filterLabel}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

FilterGroup.displayName = 'FilterGroup';
