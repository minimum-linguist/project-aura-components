import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom color (CSS color value) */
  color?: string;
  /** Additional CSS class */
  className?: string;
  /** Accessible label for screen readers */
  label?: string;
}

/**
 * Spinner component for displaying loading states.
 * Supports multiple sizes and custom colors.
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  className,
  label = 'Loading',
}) => {
  const classNames = [styles.spinner, styles[size], className || '']
    .filter(Boolean)
    .join(' ');

  const style = color ? { '--spinner-color': color } as React.CSSProperties : undefined;

  return (
    <div
      className={classNames}
      style={style}
      role="status"
      aria-label={label}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.track}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle
          className={styles.progress}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
};

Spinner.displayName = 'Spinner';
