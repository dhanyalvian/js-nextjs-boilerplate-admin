//- app/login/form.tsx

// "use client"

import { LoginData, LoginResp } from "./type"
import { useRouter, useSearchParams } from "next/navigation"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { LoginFormData, LoginFormSchema } from "./validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"

const PostLogin = async (loginData: LoginData): Promise<LoginResp> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  })

  if (!res.ok) throw new Error("Login failed")

  return res.json()
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema) as Resolver<LoginFormData>,
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData: LoginData) => PostLogin(loginData),
    onSuccess: () => {
      if (from) {
        router.push(from)
        return
      }

      router.push("/")
    },
    onError: (error: Error) => {
      console.error("Error login:", error)
      alert("Failed to login. Please try again.")
      reset()
    }
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    mutateAsync(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Hint
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Username: emilys</p>
                <p>Password: emilyspass</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            className={`rounded-md ${errors.username?.message ? "border-red-500" : ""}`}
            {...register("username")}
          />
          {errors.username?.message && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="#"
              className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <InputGroup className="relative">
            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              className={`rounded-md ${errors.password?.message ? "border-red-500" : ""}`}
              {...register("password")}
            />
            <InputGroupAddon align={null}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full pr-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {errors.password?.message && (
            <FieldDescription className="text-sm text-red-500">
              {errors.password.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button
            type="submit"
            className="rounded-md"
            disabled={isPending}
          >
            Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
