import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable, Column } from './DataTable';

interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const testData: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer' },
];

const testColumns: Column<TestUser>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const sortableColumns: Column<TestUser>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: false },
];

describe('DataTable', () => {
  describe('rendering', () => {
    it('renders table with data', () => {
      render(<DataTable data={testData} columns={testColumns} keyField="id" />);

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Viewer')).toBeInTheDocument();
    });

    it('renders column headers', () => {
      render(<DataTable data={testData} columns={testColumns} keyField="id" />);

      expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Email' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    });

    it('renders correct number of rows', () => {
      render(<DataTable data={testData} columns={testColumns} keyField="id" />);

      const rows = screen.getAllByRole('row');
      // Header row + 3 data rows
      expect(rows).toHaveLength(4);
    });

    it('applies custom className', () => {
      const { container } = render(
        <DataTable data={testData} columns={testColumns} keyField="id" className="custom-class" />
      );

      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('renders with aria-label', () => {
      render(
        <DataTable data={testData} columns={testColumns} keyField="id" ariaLabel="User list" />
      );

      expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'User list');
    });
  });

  describe('custom rendering', () => {
    it('uses custom render function for columns', () => {
      const columnsWithRender: Column<TestUser>[] = [
        { key: 'name', header: 'Name' },
        {
          key: 'role',
          header: 'Role',
          render: (value) => <span data-testid="custom-role">Role: {String(value)}</span>,
        },
      ];

      render(<DataTable data={testData} columns={columnsWithRender} keyField="id" />);

      expect(screen.getAllByTestId('custom-role')).toHaveLength(3);
      expect(screen.getByText('Role: Admin')).toBeInTheDocument();
    });

    it('handles undefined values gracefully', () => {
      const dataWithUndefined = [{ id: 1, name: 'John', email: undefined, role: 'Admin' }];

      render(
        <DataTable
          data={dataWithUndefined as unknown as TestUser[]}
          columns={testColumns}
          keyField="id"
        />
      );

      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });

  describe('sorting', () => {
    it('renders sort indicators for sortable columns', () => {
      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          sortBy="name"
          sortOrder="asc"
        />
      );

      const nameHeader = screen.getByRole('columnheader', { name: /Name/ });
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('calls onSort when sortable header is clicked', async () => {
      const handleSort = vi.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          onSort={handleSort}
        />
      );

      await user.click(screen.getByRole('columnheader', { name: /Name/ }));

      expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('toggles sort order on second click', async () => {
      const handleSort = vi.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          sortBy="name"
          sortOrder="asc"
          onSort={handleSort}
        />
      );

      await user.click(screen.getByRole('columnheader', { name: /Name/ }));

      expect(handleSort).toHaveBeenCalledWith('name', 'desc');
    });

    it('does not call onSort for non-sortable columns', async () => {
      const handleSort = vi.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          onSort={handleSort}
        />
      );

      await user.click(screen.getByRole('columnheader', { name: 'Role' }));

      expect(handleSort).not.toHaveBeenCalled();
    });

    it('shows descending indicator when sortOrder is desc', () => {
      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          sortBy="name"
          sortOrder="desc"
        />
      );

      const nameHeader = screen.getByRole('columnheader', { name: /Name/ });
      expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    });
  });

  describe('expandable rows', () => {
    it('renders expand toggle when expandable is true', () => {
      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div>Details for {row.name}</div>}
        />
      );

      // Should have expand column header + all headers
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(4); // 3 columns + 1 expand column
    });

    it('expands row when clicked', async () => {
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div data-testid="expanded">Details for {row.name}</div>}
        />
      );

      // Click on first data row
      const rows = screen.getAllByRole('row');
      await user.click(rows[1]); // First data row (index 0 is header)

      expect(screen.getByText('Details for John Doe')).toBeInTheDocument();
    });

    it('collapses row when clicked again', async () => {
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div data-testid="expanded">Details for {row.name}</div>}
        />
      );

      const rows = screen.getAllByRole('row');

      // Expand
      await user.click(rows[1]);
      expect(screen.getByText('Details for John Doe')).toBeInTheDocument();

      // Collapse
      await user.click(rows[1]);
      expect(screen.queryByText('Details for John Doe')).not.toBeInTheDocument();
    });

    it('can expand multiple rows', async () => {
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div>Details for {row.name}</div>}
        />
      );

      const rows = screen.getAllByRole('row');

      await user.click(rows[1]);
      await user.click(rows[2]);

      expect(screen.getByText('Details for John Doe')).toBeInTheDocument();
      expect(screen.getByText('Details for Jane Smith')).toBeInTheDocument();
    });

    it('sets aria-expanded attribute on expandable rows', async () => {
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div>Details for {row.name}</div>}
        />
      );

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1];

      expect(dataRow).toHaveAttribute('aria-expanded', 'false');

      await user.click(dataRow);

      expect(dataRow).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('loading state', () => {
    it('shows loading indicator when isLoading is true', () => {
      render(<DataTable data={[]} columns={testColumns} keyField="id" isLoading />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('does not render table when loading', () => {
      render(<DataTable data={testData} columns={testColumns} keyField="id" isLoading />);

      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('shows empty message when data is empty', () => {
      render(<DataTable data={[]} columns={testColumns} keyField="id" />);

      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('shows custom empty message', () => {
      render(
        <DataTable
          data={[]}
          columns={testColumns}
          keyField="id"
          emptyMessage="No users found"
        />
      );

      expect(screen.getByText('No users found')).toBeInTheDocument();
    });

    it('does not render table when empty', () => {
      render(<DataTable data={[]} columns={testColumns} keyField="id" />);

      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('column alignment', () => {
    it('applies alignment classes to cells', () => {
      const alignedColumns: Column<TestUser>[] = [
        { key: 'name', header: 'Name', align: 'left' },
        { key: 'email', header: 'Email', align: 'center' },
        { key: 'role', header: 'Role', align: 'right' },
      ];

      render(<DataTable data={testData} columns={alignedColumns} keyField="id" />);

      const table = screen.getByRole('table');
      const cells = within(table).getAllByRole('cell');

      // Check that alignment classes are applied (checking first row cells)
      expect(cells[0].className).toContain('alignLeft');
      expect(cells[1].className).toContain('alignCenter');
      expect(cells[2].className).toContain('alignRight');
    });
  });

  describe('column width', () => {
    it('applies custom width to columns', () => {
      const widthColumns: Column<TestUser>[] = [
        { key: 'name', header: 'Name', width: '200px' },
        { key: 'email', header: 'Email', width: '300px' },
        { key: 'role', header: 'Role' },
      ];

      render(<DataTable data={testData} columns={widthColumns} keyField="id" />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers[0]).toHaveStyle({ width: '200px' });
      expect(headers[1]).toHaveStyle({ width: '300px' });
    });
  });

  describe('accessibility', () => {
    it('sortable headers are focusable', () => {
      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          onSort={vi.fn()}
        />
      );

      const sortableHeader = screen.getByRole('columnheader', { name: /Name/ });
      expect(sortableHeader).toHaveAttribute('tabIndex', '0');
    });

    it('sortable headers can be activated with Enter key', async () => {
      const handleSort = vi.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          onSort={handleSort}
        />
      );

      const sortableHeader = screen.getByRole('columnheader', { name: /Name/ });
      sortableHeader.focus();
      await user.keyboard('{Enter}');

      expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('sortable headers can be activated with Space key', async () => {
      const handleSort = vi.fn();
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={sortableColumns}
          keyField="id"
          onSort={handleSort}
        />
      );

      const sortableHeader = screen.getByRole('columnheader', { name: /Name/ });
      sortableHeader.focus();
      await user.keyboard(' ');

      expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('expandable rows are focusable', () => {
      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div>Details for {row.name}</div>}
        />
      );

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1];
      expect(dataRow).toHaveAttribute('tabIndex', '0');
    });

    it('expandable rows can be toggled with Enter key', async () => {
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div>Details for {row.name}</div>}
        />
      );

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1];

      dataRow.focus();
      await user.keyboard('{Enter}');

      expect(screen.getByText('Details for John Doe')).toBeInTheDocument();
    });

    it('expandable rows can be toggled with Space key', async () => {
      const user = userEvent.setup();

      render(
        <DataTable
          data={testData}
          columns={testColumns}
          keyField="id"
          expandable
          renderExpanded={(row) => <div>Details for {row.name}</div>}
        />
      );

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1];

      dataRow.focus();
      await user.keyboard(' ');

      expect(screen.getByText('Details for John Doe')).toBeInTheDocument();
    });
  });
});
