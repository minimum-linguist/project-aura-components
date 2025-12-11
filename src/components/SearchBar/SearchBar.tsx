import React, { useState, useCallback, useEffect, useRef, useId } from 'react';
import { Input } from '../Input';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  /** Current search value (controlled mode) */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Callback when search value changes (debounced) */
  onSearch: (value: string) => void;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Show clear button when there's a value */
  showClearButton?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Label for the search input */
  label?: string;
  /** Additional class name */
  className?: string;
}

/**
 * SearchBar component with debounced search and clear functionality.
 * Uses the Input component internally for consistent styling.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  placeholder = 'Search...',
  debounceMs = 300,
  onSearch,
  onClear,
  showClearButton = true,
  isLoading = false,
  label,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputId = useId();

  // Sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      // Clear previous timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Set new debounced search
      debounceRef.current = setTimeout(() => {
        onSearch(newValue);
      }, debounceMs);
    },
    [debounceMs, onSearch]
  );

  const handleClear = useCallback(() => {
    // Clear the timeout to prevent stale search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setInternalValue('');
    onSearch('');
    onClear?.();
  }, [onSearch, onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && internalValue) {
        handleClear();
      }
    },
    [internalValue, handleClear]
  );

  const showClear = showClearButton && internalValue && !isLoading;

  const clearButton = showClear ? (
    <button
      type="button"
      className={styles.clearButton}
      onClick={handleClear}
      aria-label="Clear search"
      tabIndex={-1}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  ) : undefined;

  const searchIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );

  return (
    <div className={`${styles.searchBar} ${className || ''}`}>
      <Input
        id={inputId}
        type="search"
        value={internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        label={label}
        leftIcon={searchIcon}
        rightIcon={clearButton}
        aria-label={label ? undefined : 'Search'}
      />
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
