import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from './DataTable';
import { Badge } from '../Badge';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

interface HttpEvent {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  statusCode: number;
  responseTime: number;
  details: {
    userAgent: string;
    ip: string;
  };
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', createdAt: '2024-02-20' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', createdAt: '2024-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending', createdAt: '2024-04-05' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'active', createdAt: '2024-05-12' },
];

const sampleEvents: HttpEvent[] = [
  { id: 'evt-001', timestamp: '2024-12-09T10:30:00Z', method: 'GET', endpoint: '/api/users', statusCode: 200, responseTime: 45, details: { userAgent: 'Mozilla/5.0', ip: '192.168.1.1' } },
  { id: 'evt-002', timestamp: '2024-12-09T10:31:00Z', method: 'POST', endpoint: '/api/users', statusCode: 201, responseTime: 120, details: { userAgent: 'Mozilla/5.0', ip: '192.168.1.2' } },
  { id: 'evt-003', timestamp: '2024-12-09T10:32:00Z', method: 'GET', endpoint: '/api/users/1', statusCode: 404, responseTime: 15, details: { userAgent: 'Chrome/120.0', ip: '192.168.1.3' } },
  { id: 'evt-004', timestamp: '2024-12-09T10:33:00Z', method: 'PUT', endpoint: '/api/users/2', statusCode: 500, responseTime: 250, details: { userAgent: 'Safari/17.0', ip: '192.168.1.4' } },
  { id: 'evt-005', timestamp: '2024-12-09T10:34:00Z', method: 'DELETE', endpoint: '/api/users/3', statusCode: 204, responseTime: 80, details: { userAgent: 'Firefox/120.0', ip: '192.168.1.5' } },
];

// Column configurations
const userColumns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value) => {
      const variant = value === 'active' ? 'success' : value === 'inactive' ? 'danger' : 'warning';
      return <Badge variant={variant}>{String(value)}</Badge>;
    },
  },
  { key: 'createdAt', header: 'Created', sortable: true },
];

const eventColumns: Column<HttpEvent>[] = [
  {
    key: 'timestamp',
    header: 'Time',
    sortable: true,
    render: (value) => new Date(String(value)).toLocaleTimeString(),
  },
  {
    key: 'method',
    header: 'Method',
    sortable: true,
    render: (value) => <Badge variant="info">{String(value)}</Badge>,
  },
  { key: 'endpoint', header: 'Endpoint', sortable: true },
  {
    key: 'statusCode',
    header: 'Status',
    sortable: true,
    align: 'center',
    render: (value) => {
      const code = Number(value);
      const variant = code < 300 ? 'success' : code < 500 ? 'warning' : 'danger';
      return <Badge variant={variant}>{code}</Badge>;
    },
  },
  {
    key: 'responseTime',
    header: 'Response (ms)',
    sortable: true,
    align: 'right',
    render: (value) => `${value}ms`,
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of data objects to display',
    },
    columns: {
      description: 'Column configuration array',
    },
    keyField: {
      description: 'Property to use as unique key for each row',
    },
    sortBy: {
      control: 'text',
      description: 'Currently sorted column key',
    },
    sortOrder: {
      control: 'select',
      options: ['asc', 'desc'],
      description: 'Sort direction',
    },
    expandable: {
      control: 'boolean',
      description: 'Enable expandable rows',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when data is empty',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// Basic table
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    keyField: 'id',
  },
};

// With sorting
export const Sortable: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: string, order: 'asc' | 'desc') => {
      setSortBy(column);
      setSortOrder(order);
    };

    const sortedData = [...sampleUsers].sort((a, b) => {
      const aVal = a[sortBy as keyof User];
      const bVal = b[sortBy as keyof User];
      const compare = String(aVal).localeCompare(String(bVal));
      return sortOrder === 'asc' ? compare : -compare;
    });

    return (
      <DataTable
        data={sortedData}
        columns={userColumns}
        keyField="id"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    );
  },
};

// Expandable rows
export const Expandable: Story = {
  args: {
    data: sampleEvents,
    columns: eventColumns,
    keyField: 'id',
    expandable: true,
    renderExpanded: (row: HttpEvent) => (
      <div style={{ padding: '1rem', backgroundColor: '#f9f9f9' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Event Details</h4>
        <p><strong>Event ID:</strong> {row.id}</p>
        <p><strong>Full Timestamp:</strong> {row.timestamp}</p>
        <p><strong>User Agent:</strong> {row.details.userAgent}</p>
        <p><strong>IP Address:</strong> {row.details.ip}</p>
      </div>
    ),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    keyField: 'id',
    isLoading: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    keyField: 'id',
    emptyMessage: 'No users found. Try adjusting your search criteria.',
  },
};

// Custom empty message
export const CustomEmptyMessage: Story = {
  args: {
    data: [],
    columns: userColumns,
    keyField: 'id',
    emptyMessage: 'No data to display',
  },
};

// HTTP Events table (like EventsTable)
export const HttpEventsTable: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState<string>('timestamp');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleSort = (column: string, order: 'asc' | 'desc') => {
      setSortBy(column);
      setSortOrder(order);
    };

    return (
      <DataTable
        data={sampleEvents}
        columns={eventColumns}
        keyField="id"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        expandable
        renderExpanded={(row: HttpEvent) => (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Request Info</h4>
              <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>Event ID:</strong> {row.id}</p>
              <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>Endpoint:</strong> {row.endpoint}</p>
              <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>Method:</strong> {row.method}</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Client Info</h4>
              <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>User Agent:</strong> {row.details.userAgent}</p>
              <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>IP Address:</strong> {row.details.ip}</p>
            </div>
          </div>
        )}
        ariaLabel="HTTP Events table"
      />
    );
  },
};

// All features combined
export const AllFeatures: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: string, order: 'asc' | 'desc') => {
      setSortBy(column);
      setSortOrder(order);
    };

    const sortedData = [...sampleUsers].sort((a, b) => {
      const aVal = a[sortBy as keyof User];
      const bVal = b[sortBy as keyof User];
      const compare = String(aVal).localeCompare(String(bVal));
      return sortOrder === 'asc' ? compare : -compare;
    });

    return (
      <DataTable
        data={sortedData}
        columns={userColumns}
        keyField="id"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        expandable
        renderExpanded={(row: User) => (
          <div style={{ padding: '0.5rem 0' }}>
            <p style={{ margin: '0.25rem 0' }}><strong>Full Details:</strong></p>
            <pre style={{ margin: '0.5rem 0', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(row, null, 2)}
            </pre>
          </div>
        )}
        ariaLabel="Users table with all features"
      />
    );
  },
};
