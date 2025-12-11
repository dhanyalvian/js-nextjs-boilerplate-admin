//- components/core/login-form.tsx

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-xl shadow-xs">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
                  placeholder="emilys"
                  required
                  className="rounded-full"
                />
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
                <Input
                  id="password"
                  type="password"
                  required
                  className="rounded-full"
                />
              </Field>
              <Field>
                <Button type="submit" className="rounded-full">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
