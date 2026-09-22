const shortDateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });
const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function parseAppearanceDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

export function appearanceTitle(event: string) {
  return event.split(",")[0];
}

export function formatAppearanceDate(value: string, format: "short" | "long" = "long") {
  const date = parseAppearanceDate(value);
  return (format === "short" ? shortDateFormatter : longDateFormatter).format(date);
}
