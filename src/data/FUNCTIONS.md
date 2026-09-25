# Data function inventory

Named top-level functions and named arrow-function helpers defined directly in `src/data/`, excluding `src/data/archive/`. Overloaded functions are listed once. Anonymous inline callbacks are omitted because they do not have stable function names.

**Occurrence-count method:** exact function-name matches found by text search across repository `.ts`, `.tsx`, and `.astro` files. Markdown files are excluded. Counts include definitions, imports, comments, and call/reference sites; they are textual matches, not symbol-aware usage counts, so same-named functions also contribute to a count.

| Current signature and return type | File | Rename applied | Occurrences |
| --- | --- | --- | ---: |
| `formatLabeledValue(value: string \| null, labels: Record<string, string>): string \| null` | `person-directory.ts` | `displayValue` → `formatLabeledValue` | 5 |
| `buildPersonDirectoryCardData(person: Person, image?: PersonDirectoryCardImage, profile?: NaturalProfile): PersonDirectoryCardItem` | `person-directory.ts` | `personDirectoryCardData` → `buildPersonDirectoryCardData` | 5 |
| `getHairstyleMediaById(id: string): ImageMedia \| undefined` | `media.ts` | `getMedia` → `getHairstyleMediaById` | 9 |
| `createAiPrefillProvenance(note: string): NaturalProfileProvenance` | `natural-profiles.ts` | `aiPrefill` → `createAiPrefillProvenance` | 7 |
| `createNotDocumentedProvenance(note: string): NaturalProfileProvenance` | `natural-profiles.ts` | `notDocumented` → `createNotDocumentedProvenance` | 7 |
| `getNaturalProfileForPerson(personId: string): NaturalProfile \| undefined` | `natural-profiles.ts` | `naturalProfileForPerson` → `getNaturalProfileForPerson` | 5 |
| `getHairTypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairType["id"]>): HairType \| undefined` | `natural-profiles.ts` | `hairTypeForNaturalProfileTrait` → `getHairTypeForNaturalProfileTrait` | 3 |
| `getHairSubtypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairSubtype["id"]>): HairSubtype \| undefined` | `natural-profiles.ts` | `hairSubtypeForNaturalProfileTrait` → `getHairSubtypeForNaturalProfileTrait` | 3 |
| `naturalProfileHasValidHairTypeHierarchy(profile: NaturalProfile): boolean` | `natural-profiles.ts` | Kept as-is | 3 |
| `resolveHairTypeForNaturalProfile(profile: NaturalProfile): HairType \| undefined` | `natural-profiles.ts` | `resolvedHairTypeForNaturalProfile` → `resolveHairTypeForNaturalProfile` | 5 |
| `naturalProfileMatchesHairTypeId(profile: NaturalProfile, hairTypeOrSubtypeId: string): boolean` | `natural-profiles.ts` | `naturalProfileMatchesHairType` → `naturalProfileMatchesHairTypeId` | 3 |
| `getHairstyleCompatibility(styleId: string, hairTypeId: string): HairstyleCompatibility \| undefined` | `hairstyle-compatibility.ts` | `compatibilityForHairstyle` → `getHairstyleCompatibility` | 7 |
| `getCompatibleHairstylesForHairType(hairTypeId: string): Hairstyle[]` | `hairstyle-compatibility.ts` | `compatibleHairstylesForHairType` → `getCompatibleHairstylesForHairType` | 5 |
| `getCompatibleSubtypeCodesForHairstyleInMajorType(styleId: string, hairTypeId: string): string[]` | `hairstyle-compatibility.ts` | `subtypeLabelsForHairstyleInMajorType` → `getCompatibleSubtypeCodesForHairstyleInMajorType` | 6 |
| `getCompatibleHairTypeLabelsForHairstyle(styleId: string): string[]` | `hairstyle-compatibility.ts` | `compatibilityLabelsForHairstyle` → `getCompatibleHairTypeLabelsForHairstyle` | 5 |
| `getHairstyleBySlug(slug: string): Hairstyle \| undefined` | `hairstyle-queries.ts` | `getHairstyle` → `getHairstyleBySlug` | 3 |
| `getStyleExamplesForHairstyle(id: string): StyleExample[]` | `hairstyle-queries.ts` | `getExamplesForHairstyle` → `getStyleExamplesForHairstyle` | 9 |
| `isPublishedHairstyleGuide(hairstyle: Pick<Hairstyle, "guidePublicationStatus">): boolean` | `hairstyle-queries.ts` | `isPublishedGuide` → `isPublishedHairstyleGuide` | 2 |
| `getCompatibleHairstylesForHairTypeSlug(slug: string): Hairstyle[]` | `hair-type-discovery.ts` | `stylesForHairTypeSlug` → `getCompatibleHairstylesForHairTypeSlug` | 5 |
| `getPeopleForHairTypeSlug(slug: string): HairTypePersonWithPhoto[];<br>getPeopleForHairTypeSlug(slug: string, options: PeopleForHairTypeOptions & { requireHeroImage: false }): HairTypePerson[];<br>getPeopleForHairTypeSlug(slug: string, options: PeopleForHairTypeOptions & { requireHeroImage?: true }): HairTypePersonWithPhoto[]` | `hair-type-discovery.ts` | `peopleForHairTypeSlug` → `getPeopleForHairTypeSlug` | 8 |
| `getPublishedHairstylesByIds(ids: string[]): Hairstyle[]` | `hairstyle-queries.ts` | `publishedRelatedHairstyles` → `getPublishedHairstylesByIds` | 7 |
| `getRepresentativeHairstyleMedia(hairstyleId: string): { example: StyleExample; media: ImageMedia } \| undefined` | `hairstyle-representative-media.ts` | `representativeHairstyleMedia` → `getRepresentativeHairstyleMedia` | 7 |
| `getAppearancesForPerson(personId: string): Appearance[]` | `people-relations.ts` | `appearancesForPerson` → `getAppearancesForPerson` | 5 |
| `getResolvedHairstyleObservationsForAppearance(appearanceId: string): { observation: AppearanceObservation; style: Hairstyle }[]` | `people-relations.ts` | `observedStylesForAppearance` → `getResolvedHairstyleObservationsForAppearance` | 5 |
| `getAppearancesForHairstyle(styleId: string): Appearance[]` | `people-relations.ts` | `appearancesForStyle` → `getAppearancesForHairstyle` | 5 |
| `getAppearancesForPersonAndHairstyle(personId: string, styleId: string): Appearance[]` | `people-relations.ts` | `appearancesForPersonStyle` → `getAppearancesForPersonAndHairstyle` | 4 |
| `getHairstyleAppearancesForPerson(personId: string): { style: Hairstyle; appearances: Appearance[] }[]` | `people-relations.ts` | `hairstylesForPerson` → `getHairstyleAppearancesForPerson` | 9 |
| `getPersonForAppearance(appearanceId: string): Person \| undefined` | `people-relations.ts` | `personForAppearance` → `getPersonForAppearance` | 3 |
