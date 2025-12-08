import React from 'react';
import styles from './Alert.module.css';

export interface AlertProps {
  /** Alert content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Optional title displayed above content */
  title?: string;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Alert component for displaying feedback messages.
 * Supports info, success, warning, and error variants with optional close button.
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  onClose,
  className,
}) => {
  const classNames = [styles.alert, styles[variant], className || '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert">
      <div className={styles.iconContainer} aria-hidden="true">
        {variant === 'info' && <InfoIcon />}
        {variant === 'success' && <SuccessIcon />}
        {variant === 'warning' && <WarningIcon />}
        {variant === 'error' && <ErrorIcon />}
      </div>
      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        <div className={styles.message}>{children}</div>
      </div>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close alert"
          type="button"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';

// Icon components
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);
