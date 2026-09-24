import type { PersonDirectoryCardItem } from "../../data/person-directory";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export default function PersonDirectoryCard({
  person,
  subtitle,
}: {
  person: PersonDirectoryCardItem;
  subtitle?: string;
}) {
  return (
    <HoverCard openDelay={180} closeDelay={120}>
      <HoverCardTrigger asChild>
        <a
          href={person.href}
          className="focus-ring group block min-w-0"
          data-person-card
          data-profile-hair={person.profileValues.hair.join(",")}
          data-profile-color={person.profileValues.color}
          data-profile-skin={person.profileValues.skin}
        >
          {person.imageSrc ? (
            <img
              src={person.imageSrc}
              srcSet={person.imageSrcSet}
              sizes={person.imageSizes}
              alt={person.imageAlt ?? ""}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition"
            />
          ) : (
            <div
              className="flex aspect-[4/5] w-full items-center justify-center bg-taupe/30 font-display text-5xl"
              aria-hidden="true"
            >
              {person.name.charAt(0)}
            </div>
          )}
          <h2 className="mt-1 truncate font-display text-xl tracking-[-.03em] group-hover:text-orange">
            {person.name}
          </h2>
          {subtitle && <p className="mt-1 text-xs text-ink/60">{subtitle}</p>}
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="font-display text-xl">{person.name}</p>
        <p className="mt-2 text-sm leading-5">{person.description}</p>
        {person.profileRows.length > 0 && (
          <section className="mt-4 border-t border-ink/20 pt-3" aria-label={`${person.name} natural profile`}>
            <h3 className="text-xs font-black tracking-[.12em] text-orange uppercase">Natural profile</h3>
            <dl className="mt-2 space-y-2">
              {person.profileRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[1fr_auto] gap-3 text-xs">
                  <dt className="font-bold tracking-[.08em] uppercase opacity-65">{row.label}</dt>
                  <dd className="text-right font-semibold">
                    {row.href ? (
                      <a className="text-ink underline decoration-ink underline-offset-2" href={row.href}>
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
