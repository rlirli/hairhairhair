# Hair discovery

A shared vocabulary for exploring hair patterns and hairstyles, with examples that help people discuss a look with a barber or stylist.

## Language

**Hair sub-type**:
A lettered category of visible natural hair pattern within a numbered hair type. It does not determine strand thickness, density, porosity, or which styles a person may wear.
_Avoid_: Hair quality, suitability score

**Hair type**:
One of the four numbered Walker-inspired pattern categories: straight, wavy, curly, or coily. Each contains three lettered sub-types.

**Hairstyle**:
A named look or styling concept someone can explore and discuss with a practitioner. The catalog includes cuts, finishing techniques, and ways of arranging hair; these are distinguished rather than treated as identical services.
Optional invention date and inventor claims are recorded only when each claim cites an editorial source. Missing origin information is omitted rather than inferred.

**Variation**:
A named interpretation of a hairstyle that changes a meaningful feature, such as length or the placement of a taper.

**Style example**:
A particular visual interpretation of one or more hairstyles. An example can combine a cut and a finishing technique without making those concepts synonymous.
_Avoid_: Person, hairstyle definition

**Reference image**:
A visual asset used to illustrate a style example, with its origin and attribution recorded. A generated reference is a fictional illustration, not evidence of a real person's hair or a verified haircut result.

**Hairstyle–hair-type compatibility**:
An editorial estimate of how fully a hairstyle's defining features can be achieved on a hair type through ordinary cutting and styling while keeping its natural curl pattern. Scores run from 0 (not achievable) to 1, with unknown represented separately by `null`. A subtype inherits a major type score unless explicitly overridden. Only scores at or above `MIN_COMPATIBILITY_FOR_LISTING` create public hair-type listings; scores are not popularity measurements or promised results. A hairstyle may be published with all scores unknown.

**Hair-type-specific hairstyle advice (archived)**:
The former `PatternGuidance` notes about approaches within major hair types are parked as `HairTypeSpecificHairstyleAdvice`. They are not displayed, do not determine compatibility, and do not drive hairstyle listings. They may be revisited as editorial material later.

**Person**:
A real individual whose documented hairstyles can be explored. A person is not assigned a permanent hair type merely from styled photographs.

**Natural profile**:
A separate, optional record of a person's broad natural hair type, optional exact hair sub-type, natural hair color, natural skin tone, hair thickness, and hair density. Each trait carries its own source, status, and confidence so provisional AI-prefills can be replaced by community corrections. A sub-type must belong to the recorded broad type; when it is unknown, it stays `null` rather than being inferred. A broad-only profile belongs on the major type page only, while a profile with a documented sub-type belongs on both that exact sub-type page and its parent major type page.

**Appearance**:
A dated photographic record of a person at a particular event or moment. Its capture date is distinct from when the image was published or uploaded.

**Hairstyle observation**:
An editorial description of the hairstyle visible in an appearance. It can connect an appearance to several style concepts without claiming the person's stylist used those names.

**Person photograph**:
A locally stored, source-attributed photograph used as evidence for a dated appearance. Its creator, source/original URLs, license, attribution, jurisdiction or license evidence, and crop/derivative status are recorded. Copyright permission does not imply endorsement or erase personality rights.
