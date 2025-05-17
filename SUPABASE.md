# Supabase Integration

This project has been integrated with Supabase for backend services. Below is a guide on how to use Supabase in this project.

## Setup

The project is already connected to a Supabase instance with the following credentials:
- URL: https://kgfddzfudfkzqxtyhozt.supabase.co
- Anon Key: [Check .env.local file]

## Environment Variables

The Supabase credentials are stored in `.env.local`. Make sure this file is not committed to the repository as it contains sensitive information.

```
NEXT_PUBLIC_SUPABASE_URL=https://kgfddzfudfkzqxtyhozt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```

## Instruments Table

The project includes an example implementation that displays data from the `instruments` table in Supabase. This table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id     | int8 | Primary key |
| name   | text | Instrument name |

You can view the instruments data by visiting the `/instruments` page in the application. A link to this page is available on the homepage.

## Usage

### Using the Supabase Client

You can use the Supabase client directly in your components:

```typescript
import { supabase } from '~/utils/supabase';

// Example query
const { data, error } = await supabase
  .from('your_table')
  .select('*')
  .limit(10);
```

### Using the Supabase Hook

For React components, you can use the provided hook:

```typescript
import { useSupabase } from '~/hooks/useSupabase';

function YourComponent() {
  const { supabase } = useSupabase();
  
  // Use supabase client in your component
}
```

### Using the Supabase Service

For more structured data access, use the provided service:

```typescript
import { supabaseService } from '~/utils/services/supabaseService';

// Fetch data
const { data, error } = await supabaseService.fetch('your_table', {
  limit: 10,
  orderBy: { column: 'created_at', ascending: false }
});

// Insert data
const result = await supabaseService.insert('your_table', {
  name: 'New Item',
  description: 'Description'
});

// Update data
const updated = await supabaseService.update('your_table', 
  { name: 'Updated Name' },
  { column: 'id', value: '123' }
);

// Delete data
const deleted = await supabaseService.delete('your_table', 
  { column: 'id', value: '123' }
);
```

## Type Safety

TypeScript types for your Supabase tables are defined in `src/types/supabase.ts`. Update this file as you create new tables in your Supabase project.

## Cursor MCP Integration

This project has also been integrated with Supabase Management Console Proxy (MCP) for Cursor IDE. This allows you to manage your Supabase project directly from the IDE.

For more information about the MCP integration, see [SUPABASE_MCP.md](./SUPABASE_MCP.md).

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Dashboard](https://supabase.com/dashboard/project/kgfddzfudfkzqxtyhozt) 