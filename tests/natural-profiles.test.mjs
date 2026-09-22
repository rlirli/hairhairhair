import assert from "node:assert/strict";
import test from "node:test";

import {
  aiPrefill,
  hairTypeForNaturalProfileTrait,
  naturalProfileForPerson,
  naturalProfileHasValidHairTypeHierarchy,
  naturalProfileMatchesHairType,
  naturalProfiles,
  naturalProfilesForHairType,
  resolvedHairTypeForNaturalProfile,
} from "../src/data/natural-profiles.ts";
import { page } from "./helpers/site.mjs";

test("Will Smith has a provisional natural profile with trait-level provenance", () => {
  const profile = naturalProfileForPerson("person-will-smith");
  assert.ok(profile);
  assert.equal(profile.hairTypeId.value, "hair-type-4");
  assert.equal(profile.hairSubtypeId.value, null);
  assert.equal(profile.naturalHairColor.value, "black");
  assert.equal(profile.naturalSkinTone.value, "deep-brown");
  assert.equal(profile.hairThickness.value, null);
  assert.equal(profile.hairDensity.value, null);

  for (const trait of Object.values(profile)) {
    if (trait && typeof trait === "object" && "provenance" in trait) {
      assert.ok(trait.provenance.source);
      assert.ok(trait.provenance.status);
      assert.ok(trait.provenance.confidence);
    }
  }
  for (const trait of [profile.hairTypeId, profile.naturalHairColor, profile.naturalSkinTone]) {
    assert.equal(trait.provenance.source, "ai-prefill");
    assert.equal(trait.provenance.status, "unverified");
    assert.equal(trait.provenance.confidence, "low");
  }
  for (const trait of [profile.hairSubtypeId, profile.hairThickness, profile.hairDensity]) {
    assert.equal(trait.provenance.source, "not-documented");
    assert.equal(trait.provenance.status, "unverified");
    assert.ok(trait.provenance.note);
  }
});

test("natural profile hair types resolve to the existing hair-type route", () => {
  const profile = naturalProfileForPerson("person-will-smith");
  assert.ok(profile);
  const hairType = hairTypeForNaturalProfileTrait(profile.hairTypeId);
  assert.ok(hairType);
  assert.equal(hairType.code, "4");
  assert.equal(hairType.slug, "4");
  assert.equal(`/hair-types/${hairType.slug}/`, "/hair-types/4/");
});

test("natural profile records remain uniquely addressable", () => {
  assert.equal(new Set(naturalProfiles.map((profile) => profile.id)).size, naturalProfiles.length);
  assert.equal(new Set(naturalProfiles.map((profile) => profile.personId)).size, naturalProfiles.length);
});

test("Mario Balotelli has the same explicitly unverified natural profile scheme", () => {
  const profile = naturalProfileForPerson("person-mario-balotelli");
  assert.ok(profile);
  assert.equal(profile.hairTypeId.value, "hair-type-4");
  assert.equal(profile.hairSubtypeId.value, null);
  assert.equal(profile.naturalHairColor.value, "black");
  assert.equal(profile.naturalSkinTone.value, "deep-brown");
  assert.equal(profile.hairThickness.value, null);
  assert.equal(profile.hairDensity.value, null);
  for (const trait of [profile.hairTypeId, profile.naturalHairColor, profile.naturalSkinTone]) {
    assert.equal(trait.provenance.source, "ai-prefill");
    assert.equal(trait.provenance.status, "unverified");
  }
});

test("AI prefill provenance is reusable across people and traits", () => {
  assert.deepEqual(aiPrefill("Editorial note"), {
    source: "ai-prefill",
    status: "unverified",
    confidence: "low",
    note: "Editorial note",
  });
});

test("broad-only profiles match their major type but no invented subtype", () => {
  assert.ok(naturalProfiles.every(naturalProfileHasValidHairTypeHierarchy));
  assert.deepEqual(
    naturalProfilesForHairType("hair-type-4").map((profile) => profile.id),
    naturalProfiles.map((profile) => profile.id),
  );
  assert.deepEqual(naturalProfilesForHairType("hair-type-4a"), []);
  for (const profile of naturalProfiles) {
    assert.equal(naturalProfileMatchesHairType(profile, "hair-type-4"), true);
    assert.equal(naturalProfileMatchesHairType(profile, "hair-type-4a"), false);
  }
});

test("a documented subtype matches its exact subtype and parent major type", () => {
  const profile = naturalProfileForPerson("person-will-smith");
  assert.ok(profile);
  const profileWithSubtype = structuredClone(profile);
  profileWithSubtype.hairSubtypeId = {
    value: "hair-type-4a",
    provenance: aiPrefill("Synthetic test fixture"),
  };

  assert.equal(naturalProfileHasValidHairTypeHierarchy(profileWithSubtype), true);
  assert.equal(naturalProfileMatchesHairType(profileWithSubtype, "hair-type-4"), true);
  assert.equal(naturalProfileMatchesHairType(profileWithSubtype, "hair-type-4a"), true);
  assert.equal(naturalProfileMatchesHairType(profileWithSubtype, "hair-type-4b"), false);
  assert.equal(resolvedHairTypeForNaturalProfile(profileWithSubtype)?.code, "4A");
  assert.equal(resolvedHairTypeForNaturalProfile(profileWithSubtype)?.slug, "4a");
});

test("a subtype from another major type is rejected", () => {
  const profile = naturalProfileForPerson("person-will-smith");
  assert.ok(profile);
  const mismatchedProfile = structuredClone(profile);
  mismatchedProfile.hairSubtypeId = {
    value: "hair-type-3a",
    provenance: aiPrefill("Synthetic test fixture"),
  };

  assert.equal(naturalProfileHasValidHairTypeHierarchy(mismatchedProfile), false);
  assert.equal(naturalProfileMatchesHairType(mismatchedProfile, "hair-type-4"), false);
  assert.equal(naturalProfileMatchesHairType(mismatchedProfile, "hair-type-3a"), false);
  assert.equal(resolvedHairTypeForNaturalProfile(mismatchedProfile), undefined);
});

test("NaturalProfile renders documented traits and hides null traits", () => {
  const markup = page("/people/will-smith/");
  assert.match(markup, /Natural profile/);
  assert.match(markup, /Hair type/);
  assert.match(markup, /Hair color/);
  assert.match(markup, /Skin tone/);
  assert.doesNotMatch(markup, /Hair thickness/);
  assert.doesNotMatch(markup, /Hair density/);
  assert.match(markup, /href="\/hair-types\/4\/"/);
  assert.doesNotMatch(markup, /AI prefill|Low Confidence|Editable record/);
});
