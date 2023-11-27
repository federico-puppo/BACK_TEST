import z from "zod";
const categorySchema = z.object({
  name: z.string({
    invalid_type_error: "Category must be a string",
    required_error: "Category name is required",
  })
});

export function validateCategory(object) {
  return categorySchema.safeParse(object);
}
