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

- `content_list` returns compact summaries by default; choose `detail: "standard"` or `"full"` for more. It supports cursor pagination, defaults to `limit: 300` (maximum 300), and can expand hairstyle relations one level with `includeRelations: "summaries"`.
- `hairstyle_generation_context` finds existing hairstyle candidates from a proposed description and includes summaries of their directly related styles. Matching is lexical; when no terms match, it returns a compact catalog fallback.
- `content_get` reads one full entity by ID. `content_search` searches record text and returns compact matches by default; full detail is opt-in.
- `content_validate` checks all JSON Schemas, cross-record references, compatibility entries, and media asset files. An Appearance observation without `hairstyleId` produces a warning but does not fail validation; a supplied unresolved ID remains an error.
- `content_write_record` creates or updates one record. `content_write_records` applies up to 50 related records as one validated change set.
- `content_add_image` copies a local JPG, PNG, or WebP into `src/content/assets/` and adds its media record.
- `content_import_package` previews or imports one package from `inbox-hairstyles/` or `inbox-people/`, including linked records and images.

The MCP operates on the checkout containing its `scripts/mcp-server.mjs`; treat that active checkout as the authority for local reads and writes. Write and import tools default to `apply: false`. Review the returned dry-run first, then call again with `apply: true` to change files. Writes are schema- and relationship-validated before they are applied; failed post-write validation rolls back the record and image files. Package imports keep using the existing importer and archive workflow. Hairstyle records expose `guidePublicationStatus` values `stub`, `draft`, and `published`; all may be read for editorial work, while only published guides are public-facing.

The LLM tasks under `public/prompts/` return `{task,status,records,assets,findings?}`; workflows under `public/workflows/` compose them. Use the local MCP rooted in the active checkout for local persistence. Public references are read-only and hairstyle data is published-only, so they cannot expose drafts or stubs; reconcile proposed concepts against the full local catalog before applying local changes. Public hairstyle JSON is a projection and can omit private links or optional fields; reread full local records and merge only intended changes, preserving unrelated fields and remapping reused IDs. Carry records already produced in a workflow as a working overlay. The image-observation task returns an image-only observation fragment; the orchestrator merges it into the target Appearance. Web-only runs return proposed records and assets in chat without claiming repository writes.

All changes remain ordinary Git-tracked JSON and image files. Review and commit them with the normal Git workflow. The MCP does not commit or push.
