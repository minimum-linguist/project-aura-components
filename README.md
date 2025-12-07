# @project-aura/components

React component library for Project Aura - a collection of reusable UI components built with React, TypeScript, and CSS Modules.

## Installation

```bash
npm install @project-aura/components
```

## Usage

```tsx
import { Button, Input, Card } from '@project-aura/components';
import '@project-aura/components/style.css';

function App() {
  return (
    <Card title="Welcome">
      <Input label="Email" placeholder="Enter your email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Available Components

### Form Elements
- `Button` - Primary, secondary, danger, outline, ghost variants
- `Input` - Text input with validation states and icons
- `TextArea` - Multiline text input
- `Select` - Dropdown selection
- `Checkbox` - Checkbox with label support

### Layout
- `Card` - Container with header, content, footer sections
- `Container` - Responsive wrapper

### Data Display
- `DataTable` - Sortable, expandable data table
- `Pagination` - Page navigation controls
- `Badge` - Status indicators
- `StatusBadge` - HTTP status-specific badges

### Feedback
- `Alert` - Message boxes (info, success, warning, error)
- `Spinner` - Loading indicators

### Search
- `SearchBar` - Text search with debounce
- `DateRangePicker` - Date range selection

## Development

```bash
# Install dependencies
npm install

# Start Storybook for component development
npm run storybook

# Run tests
npm test

# Build library
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (library mode)
- **CSS Modules** - Scoped styling
- **Storybook** - Component documentation
- **Vitest** - Testing framework

## Architecture Decisions

- [ADR-0036: Component Library Repository Structure](../project-aura-docs/adr/0036-component-library-repository.md)
- [ADR-0037: CSS Strategy](../project-aura-docs/adr/0037-css-strategy-component-library.md)

## Contributing

1. Create a feature branch
2. Add component in `src/components/ComponentName/`
3. Include TypeScript types, CSS Module, tests, and Storybook story
4. Ensure all tests pass: `npm test`
5. Submit a pull request

## License

MIT
