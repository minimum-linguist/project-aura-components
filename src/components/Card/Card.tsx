import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional title displayed in header */
  title?: string;
  /** Optional subtitle displayed below title */
  subtitle?: string;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Visual style variant */
  variant?: 'default' | 'outlined' | 'elevated';
  /** Content padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
}

/**
 * Card component for grouping related content.
 * Supports header with title/subtitle, main content, and footer sections.
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  padding = 'md',
  className,
}) => {
  const classNames = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

Card.displayName = 'Card';
