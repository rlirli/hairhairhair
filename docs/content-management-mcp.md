# Local content MCP

The local stdio MCP exposes the Git-tracked content model in `src/content/`. It runs as a child process on the same machine as ChatGPT desktop or Codex; it does not host a public endpoint or write to a database.

## Connect it

In the ChatGPT desktop app, open **Settings → MCP servers → Add server**, select **STDIO**, and configure:

```text
Name: hairhairhair-content
Command: node
Arguments: <repository-path>/scripts/mcp-server.mjs
Working directory: <repository-path>
```

Replace the repository path if your checkout is elsewhere. Restart the app after saving. Codex CLI and the desktop app can also use the same entry in `~/.codex/config.toml`:

```toml
[mcp_servers.hairhairhair-content]
command = "node"
args = ["scripts/mcp-server.mjs"]
cwd = "/path/to/hairhairhair"
```

Use Node.js and the repository's installed dependencies (`npm install`) before connecting.

## Available tools

- `content_list`, `content_get`, and `content_search` read entities and their ID-based relationships.
- `content_validate` checks all JSON Schemas, cross-record references, compatibility entries, and media asset files.
- `content_write_record` creates or updates one record. `content_write_records` applies up to 50 related records as one validated change set.
- `content_add_image` copies a local JPG, PNG, or WebP into `src/content/assets/` and adds its media record.
- `content_import_package` previews or imports one package from `inbox-hairstyles/` or `inbox-people/`, including linked records and images.

Write and import tools default to `apply: false`. Review the returned dry-run first, then call again with `apply: true` to change files. Writes are schema- and relationship-validated before they are committed; failed post-write validation rolls back the record and image files. Package imports keep using the existing importer and archive workflow.

All changes remain ordinary Git-tracked JSON and image files. Review and commit them with the normal Git workflow. The MCP does not commit or push.
