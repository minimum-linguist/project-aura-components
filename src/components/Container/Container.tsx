import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Maximum width variant */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Center the container horizontally */
  centered?: boolean;
  /** Horizontal padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** HTML element to render as */
  as?: 'div' | 'section' | 'article' | 'main';
}

/**
 * Container component for controlling content width and centering.
 * Provides responsive max-width constraints for layout control.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  centered = true,
  padding = 'md',
  className,
  as: Component = 'div',
}) => {
  const classNames = [
    styles.container,
    styles[`maxWidth-${maxWidth}`],
    centered ? styles.centered : '',
    styles[`padding-${padding}`],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames}>{children}</Component>;
};

Container.displayName = 'Container';
