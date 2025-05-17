# Supabase MCP Integration

This project has been integrated with Supabase Management Console Proxy (MCP) for easier database management directly from the Cursor IDE.

## What is Supabase MCP?

The Supabase Management Console Proxy (MCP) allows you to access and manage your Supabase project directly from your IDE without having to switch to a browser. This integration makes it easier to:

- View and edit your database tables
- Run SQL queries
- Manage authentication
- Access storage
- View logs and more

## Configuration

The MCP configuration is stored in the `.cursor/mcp.json` file. This file contains the necessary settings to connect to your Supabase project using your access token.

```json
{
  "mcpServers": {
    "supabase": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "sbp_e5f1bbf882c7d57d68c5896b3fde737395c8058e"
      ]
    }
  }
}
```

## Using Supabase MCP in Cursor

To use Supabase MCP in Cursor:

1. Open Cursor IDE
2. The MCP server will start automatically when you open the project
3. Access the Supabase dashboard through the Cursor interface
4. Manage your database, authentication, storage, and other Supabase features directly from Cursor

## Security Note

The access token in the MCP configuration file provides access to your Supabase project. Ensure that:

1. The `.cursor` directory is included in your `.gitignore` file to prevent accidentally committing the token
2. The access token is kept secure and not shared publicly
3. If you suspect your token has been compromised, regenerate it from the Supabase dashboard

## Troubleshooting

If you encounter issues with the MCP connection:

1. Ensure Cursor is up to date
2. Check that the access token is valid and has not expired
3. Restart Cursor to reinitialize the MCP server
4. Check for any error messages in the Cursor console

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Cursor IDE Documentation](https://cursor.sh/docs)
- [Supabase MCP GitHub Repository](https://github.com/supabase/mcp-server-supabase) 