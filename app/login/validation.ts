//- app/login/validation.ts

import z from "zod"

const minChar = 1;

export const LoginFormSchema = z.object({
  username: z.string().min(minChar, "Please fill out this field"),
  password: z.string().min(minChar, "Please fill out this field"),
})

export type LoginFormData = z.infer<typeof LoginFormSchema>
