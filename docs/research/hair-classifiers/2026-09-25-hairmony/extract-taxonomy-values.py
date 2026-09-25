#!/usr/bin/env python3
"""List every distinct CSV cell value, per column, for both Hairmony taxonomy tables."""

import csv
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
INPUTS = (HERE / "fairface_taxonomy.csv", HERE / "sx_taxonomy.csv")
OUTPUT = HERE / "taxonomy_unique_values.json"


def unique_values(path: Path) -> dict:
    with path.open("r", encoding="utf-8-sig", newline="") as source:
        reader = csv.DictReader(source)
        if reader.fieldnames is None:
            raise ValueError(f"No CSV header found in {path}")

        values = {name: set() for name in reader.fieldnames}
        row_count = 0
        for row in reader:
            row_count += 1
            for name in reader.fieldnames:
                # Keep every column, including image_name, and preserve empty cells.
                values[name].add(row[name] if row[name] is not None else "")

    return {
        "rows": row_count,
        "columns": {name: sorted(found) for name, found in values.items()},
    }


def main() -> None:
    result = {
        "note": "Complete distinct CSV cell values per column. Empty strings are retained.",
        "tables": {path.name: unique_values(path) for path in INPUTS},
    }
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for name, table in result["tables"].items():
        print(f"{name}: {table['rows']} rows, {len(table['columns'])} columns")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
