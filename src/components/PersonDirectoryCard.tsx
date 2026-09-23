import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export interface PersonDirectoryCardItem {
  href: string;
  name: string;
  subtitle?: string;
  imageSrc: string;
  imageSrcSet?: string;
  imageSizes?: string;
  imageAlt: string;
  profileValues: { hair: string[]; color: string; skin: string };
  description: string;
  profileRows: { label: string; value: string; href?: string }[];
}

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
          <img
            src={person.imageSrc}
            srcSet={person.imageSrcSet}
            sizes={person.imageSizes}
            alt={person.imageAlt}
            loading="lazy"
            className="aspect-[4/5] w-full border border-ink/25 object-cover transition group-hover:border-orange"
          />
          <h2 className="mt-2 truncate font-display text-xl tracking-[-.03em] group-hover:text-orange">
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
                      <a className="text-orange underline underline-offset-2" href={row.href}>
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
