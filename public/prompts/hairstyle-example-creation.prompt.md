# Hairstyle example creation

**Task ID.** `hairstyle-example-creation`

**Goal.** Describe one supplied, already-generated image as an example of an existing hairstyle.

**Input.** Hairstyle ID and visual target, actual image, and its Media ID/record.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json) with one proposed `style-examples` record. Include the hairstyle and image IDs, title, caption, pattern description, and length description required by the [style-example schema](https://hairhairhair.hair/schemas/style-example.schema.json). State whether the image matches the target and note any uncertainty.

**Limit.** Do not generate another image or duplicate its Media record. Do not create an example for a stub or a hairstyle without a clear visual target. Do not infer natural hair traits from the image.
