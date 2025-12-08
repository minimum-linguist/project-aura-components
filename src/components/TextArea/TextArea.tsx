import React, { forwardRef, useId } from 'react';
import styles from './TextArea.module.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Resize behavior of the textarea */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Show character count */
  showCharCount?: boolean;
}

/**
 * TextArea component with label, error states, and resize options.
 * Uses forwardRef to allow parent components to access the textarea element.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      resize = 'vertical',
      showCharCount = false,
      className,
      id,
      disabled,
      maxLength,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const wrapperClasses = [
      styles.wrapper,
      error ? styles.hasError : '',
      disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClasses = [
      styles.textarea,
      styles[`resize-${resize}`],
      className || '',
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

    // Calculate character count
    const currentLength = typeof value === 'string'
      ? value.length
      : typeof defaultValue === 'string'
        ? defaultValue.length
        : 0;

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        <div className={styles.footer}>
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
          {showCharCount && maxLength && (
            <span className={styles.charCount}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
