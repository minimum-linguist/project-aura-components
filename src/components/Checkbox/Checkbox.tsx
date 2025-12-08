import React, { forwardRef, useId, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text displayed below the checkbox */
  helperText?: string;
  /** Set indeterminate state (partially checked) */
  indeterminate?: boolean;
}

/**
 * Checkbox component with label, error states, and indeterminate support.
 * Uses forwardRef to allow parent components to access the input element.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      indeterminate = false,
      className,
      id,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;

    // Internal ref for indeterminate handling
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge refs
    const setRefs = (element: HTMLInputElement | null) => {
      internalRef.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    // Handle indeterminate state
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const wrapperClasses = [
      styles.wrapper,
      error ? styles.hasError : '',
      disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Determine aria-describedby based on what's present
    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={wrapperClasses}>
        <label className={styles.label}>
          <span className={styles.checkboxContainer}>
            <input
              ref={setRefs}
              type="checkbox"
              id={checkboxId}
              className={`${styles.checkbox} ${className || ''}`}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              {...props}
            />
            <span className={styles.checkmark} aria-hidden="true">
              {indeterminate ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </span>
          </span>
          {label && <span className={styles.labelText}>{label}</span>}
        </label>
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={helperId} className={styles.helper}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
