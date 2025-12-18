//- app/login/validation.ts

import z from "zod"

const minChar = 3;

export const LoginFormSchema = z.object({
  username: z.string().min(minChar),
  password: z.string().min(minChar),
})

export type LoginFormData = z.infer<typeof LoginFormSchema>
