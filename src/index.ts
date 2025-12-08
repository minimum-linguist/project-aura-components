// Project Aura Component Library
// Entry point - exports all components

// Import global styles
import './styles/variables.css';

// Form Components (Step 3.3)
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';

export { TextArea } from './components/TextArea';
export type { TextAreaProps } from './components/TextArea';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

// Layout Components (Step 3.4)
export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';

// Data Display Components (Step 3.4 - Badge/StatusBadge, Step 4.1 - DataTable/Pagination)
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

export { StatusBadge } from './components/StatusBadge';
export type { StatusBadgeProps } from './components/StatusBadge';

// export { DataTable } from './components/DataTable';
// export type { DataTableProps, Column } from './components/DataTable';

// export { Pagination } from './components/Pagination';
// export type { PaginationProps } from './components/Pagination';

// Feedback Components (Step 3.4)
export { Alert } from './components/Alert';
export type { AlertProps } from './components/Alert';

export { Spinner } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';

// Search Components (to be implemented in Step 4.2)
// export { SearchBar } from './components/SearchBar';
// export type { SearchBarProps } from './components/SearchBar';

// export { DateRangePicker } from './components/DateRangePicker';
// export type { DateRangePickerProps } from './components/DateRangePicker';
