import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Use pill shape (fully rounded) */
  pill?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Badge component for displaying status indicators and labels.
 * Supports multiple variants, sizes, and pill shape.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  pill = false,
  className,
}) => {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    pill ? styles.pill : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children}</span>;
};

Badge.displayName = 'Badge';
