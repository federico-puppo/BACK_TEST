import z from "zod";
const noteSchema = z.object({
  title: z.string({
    invalid_type_error: "Note title must be a string",
    required_error: "Note title is required",
  }),
  content: z.string({
    invalid_type_error: "Note content must be a string",
    required_error: "Note content is required",
  }),
  archived: z
    .boolean({
      invalid_type_error: "Note archived must be a boolean",
      required_error: "Note archived is required",
    })
    .default(false),
  created_at: z
    .number({
      invalid_type_error: "Note created_at must be a string",
      required_error: "Note created_at is required",
    })
    .default(Date.now()),
  updated_at: z
    .string({
      invalid_type_error: "Note created_at must be a string",
    })
    .default(""),
  categories: z.array(z.enum(["Tareas", "Lista", "Personal"])),
  user_id: z
    .string({
      invalid_type_error: "Note user_id must be a string",
    })
    .default(""),
});

export function validateNote(object) {
  return noteSchema.safeParse(object);
}

export function validatePartialNote(object) {
  return noteSchema.partial().safeParse(object);
}