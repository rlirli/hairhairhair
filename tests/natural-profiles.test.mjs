import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  hairTypeForNaturalProfileTrait,
  naturalProfileForPerson,
  naturalProfiles,
} from "../src/data/natural-profiles.ts";

test("Will Smith has a provisional natural profile with trait-level provenance", () => {
  const profile = naturalProfileForPerson("person-will-smith");
  assert.ok(profile);
  assert.equal(profile.hairTypeId.value, "hair-type-4");
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
  for (const trait of [profile.hairThickness, profile.hairDensity]) {
    assert.equal(trait.provenance.source, "not-documented");
    assert.equal(trait.provenance.status, "unverified");
    assert.equal(trait.provenance.note, "No reliable public documentation found.");
  }
});

test("natural profile hair types resolve to the existing hair-type route", () => {
  const profile = naturalProfiles[0];
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

test("NaturalProfile documents the compact product name and provenance display", () => {
  const source = readFileSync(new URL("../src/components/NaturalProfile.astro", import.meta.url), "utf8");
  assert.match(source, /Natural profile/);
  assert.match(source, /AI prefill/);
  assert.match(source, /Community correction/);
  assert.match(source, /href={`\/hair-types\/\$\{hairType\.slug\}\/`}/);
});
