import React, { useState, useCallback } from 'react';
import styles from './DataTable.module.css';

export interface Column<T> {
  /** Unique key for the column, can be a property of T or a custom string */
  key: keyof T | string;
  /** Column header text */
  header: string;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Custom render function for cell content */
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Column width (CSS value) */
  width?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  /** Array of data objects to display */
  data: T[];
  /** Column configuration array */
  columns: Column<T>[];
  /** Property to use as unique key for each row */
  keyField: keyof T;
  /** Currently sorted column key */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
  /** Callback when sort changes */
  onSort?: (column: string, order: 'asc' | 'desc') => void;
  /** Enable expandable rows */
  expandable?: boolean;
  /** Render function for expanded row content */
  renderExpanded?: (row: T) => React.ReactNode;
  /** Message to display when data is empty */
  emptyMessage?: string;
  /** Show loading state */
  isLoading?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Accessible label for the table */
  ariaLabel?: string;
}

/**
 * Generic data table component with sorting, expandable rows, and loading states.
 * Supports custom column rendering and type-safe data handling.
 */
export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  sortBy,
  sortOrder = 'asc',
  onSort,
  expandable = false,
  renderExpanded,
  emptyMessage = 'No data available',
  isLoading = false,
  className,
  ariaLabel = 'Data table',
}: DataTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<unknown>>(new Set());

  const toggleRow = useCallback((key: unknown) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleSort = useCallback(
    (column: string) => {
      if (onSort) {
        const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        onSort(column, newOrder);
      }
    },
    [sortBy, sortOrder, onSort]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, column: string, sortable?: boolean) => {
      if (sortable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleSort(column);
      }
    },
    [handleSort]
  );

  const handleRowKeyDown = useCallback(
    (event: React.KeyboardEvent, rowKey: unknown) => {
      if (expandable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        toggleRow(rowKey);
      }
    },
    [expandable, toggleRow]
  );

  const getCellValue = (row: T, key: keyof T | string): unknown => {
    if (typeof key === 'string' && key.includes('.')) {
      // Handle nested properties like 'data.http.method'
      return key.split('.').reduce<unknown>((obj, k) => {
        if (obj && typeof obj === 'object' && k in obj) {
          return (obj as Record<string, unknown>)[k];
        }
        return undefined;
      }, row);
    }
    return row[key as keyof T];
  };

  const tableClasses = [styles.tableWrapper, className || ''].filter(Boolean).join(' ');

  if (isLoading) {
    return (
      <div className={tableClasses}>
        <div className={styles.loading} role="status" aria-live="polite">
          <div className={styles.loadingSpinner} aria-hidden="true" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={tableClasses}>
        <div className={styles.empty} role="status">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={tableClasses}>
      <table className={styles.table} aria-label={ariaLabel}>
        <thead className={styles.thead}>
          <tr>
            {expandable && <th className={styles.expandColumn} aria-label="Expand row" />}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={[
                  styles.th,
                  col.sortable ? styles.sortable : '',
                  col.align ? styles[`align${col.align.charAt(0).toUpperCase()}${col.align.slice(1)}`] : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ width: col.width }}
                onClick={() => col.sortable && handleSort(String(col.key))}
                onKeyDown={(e) => handleKeyDown(e, String(col.key), col.sortable)}
                tabIndex={col.sortable ? 0 : undefined}
                role={col.sortable ? 'columnheader button' : 'columnheader'}
                aria-sort={
                  col.sortable && sortBy === col.key
                    ? sortOrder === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
              >
                <span className={styles.headerContent}>
                  {col.header}
                  {col.sortable && (
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sortBy === col.key ? (sortOrder === 'asc' ? '▲' : '▼') : '⇅'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row) => {
            const rowKey = row[keyField];
            const isExpanded = expandedRows.has(rowKey);

            return (
              <React.Fragment key={String(rowKey)}>
                <tr
                  className={[
                    styles.tr,
                    expandable ? styles.expandableRow : '',
                    isExpanded ? styles.expanded : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => expandable && toggleRow(rowKey)}
                  onKeyDown={(e) => handleRowKeyDown(e, rowKey)}
                  tabIndex={expandable ? 0 : undefined}
                  role={expandable ? 'row button' : 'row'}
                  aria-expanded={expandable ? isExpanded : undefined}
                >
                  {expandable && (
                    <td className={styles.expandCell} aria-hidden="true">
                      <span className={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</span>
                    </td>
                  )}
                  {columns.map((col) => {
                    const value = getCellValue(row, col.key);
                    return (
                      <td
                        key={String(col.key)}
                        className={[
                          styles.td,
                          col.align ? styles[`align${col.align.charAt(0).toUpperCase()}${col.align.slice(1)}`] : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {col.render ? col.render(value, row) : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>
                {expandable && isExpanded && renderExpanded && (
                  <tr className={styles.expandedRow}>
                    <td colSpan={columns.length + 1} className={styles.expandedContent}>
                      {renderExpanded(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

DataTable.displayName = 'DataTable';
