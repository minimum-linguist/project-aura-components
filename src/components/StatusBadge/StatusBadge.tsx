import React from 'react';
import { Badge, BadgeProps } from '../Badge';

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  /** HTTP status code to display */
  statusCode: number;
}

/**
 * StatusBadge component for displaying HTTP status codes with appropriate styling.
 * Automatically maps status codes to colors (2xx=success, 4xx=warning, 5xx=danger).
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ statusCode, ...props }) => {
  const getVariant = (code: number): BadgeProps['variant'] => {
    if (code >= 200 && code < 300) return 'success';
    if (code >= 300 && code < 400) return 'info';
    if (code >= 400 && code < 500) return 'warning';
    if (code >= 500) return 'danger';
    return 'default';
  };

  return (
    <Badge variant={getVariant(statusCode)} {...props}>
      {statusCode}
    </Badge>
  );
};

StatusBadge.displayName = 'StatusBadge';
