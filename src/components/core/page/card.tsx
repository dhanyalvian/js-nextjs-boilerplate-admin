//- src/components/core/card/form.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import { ReactNode, Suspense } from "react"
import { AppFooter } from "../app-layout"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { UseFormRegisterReturn } from "react-hook-form"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useState } from "react"
import { AppConfig } from "@/lib/app"
import { HugeiconsIcon } from "@hugeicons/react"
import { GalleryVerticalEndIcon } from "@hugeicons/core-free-icons"

interface PageCardProps {
  title: string,
  description: string,
  children: ReactNode,
}
const PageCard = ({
  title,
  description,
  children,
}: PageCardProps) => {
  return (
    <div className="bg-sidebar flex min-h-svh flex-col items-center justify-center gap-4 p-4 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex items-center gap-3 self-center">
          <div>
            <HugeiconsIcon
              icon={GalleryVerticalEndIcon}
              strokeWidth={2}
              className="size-5.5! text-logo"
            />
          </div>
          <span className="text-xl font-semibold">
            {AppConfig.appName}
          </span>
        </div>

        <Card className="bg-main py-0 pt-4 rounded-2xl shadow-xs">
          <CardHeader className="gap-0">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>

          <Suspense>
            {children}
          </Suspense>
        </Card>
      </div>

      <AppFooter />
    </div>
  )
}

interface PageCardContentProps {
  className?: string,
  children?: ReactNode,
}
const PageCardContent = ({ className, children }: PageCardContentProps) => {
  return (
    <CardContent className={cn("p-4", className)}>
      <FieldGroup className="gap-4">
        {children}
      </FieldGroup>
    </CardContent>
  )
}

interface PageCardContentFieldTextProps {
  id: string,
  label: string,
  type: "text" | "email",
  placeholder?: string,
  className?: string,
  errMessage?: string,
  optLink?: string,
  optLabel?: string,
  registration?: UseFormRegisterReturn,
  isLoading?: boolean,
}
const PageCardContentFieldText = ({
  id,
  label,
  type,
  placeholder = "",
  className,
  errMessage = "",
  optLink = "",
  optLabel = "",
  registration,
  isLoading = false,
}: PageCardContentFieldTextProps) => {
  return (
    <Field className="flex items-center gap-2">
      <div className="flex items-center">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {optLink && (
          <Link
            href={optLink}
            className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
          >
            {optLabel}
          </Link>
        )}
      </div>

      <div className="flex items-center flex-1">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={isLoading}
          aria-invalid={!!errMessage}
          className={cn(
            "h-8 w-full text-sm leading-tight rounded-full",
            className,
          )}
          {...registration}
        />
      </div>
      {errMessage && (
        <p className="text-sm text-red-500">{errMessage}</p>
      )}
    </Field>
  )
}

interface PageCardContentFieldPasswordProps {
  id: string,
  label: string,
  placeholder?: string,
  className?: string,
  errMessage?: string,
  optLink?: string,
  optLabel?: string,
  registration?: UseFormRegisterReturn,
  isLoading?: boolean,
}
const PageCardContentFieldPassword = ({
  id,
  label,
  placeholder = "",
  className,
  errMessage = "",
  optLink = "",
  optLabel = "",
  registration,
  isLoading = false,
}: PageCardContentFieldPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field className="gap-2">
      <div className="flex items-center">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {optLink && (
          <Link
            href={optLink}
            className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
          >
            {optLabel}
          </Link>
        )}
      </div>

      <InputGroup className="relative h-8 rounded-full">
        <InputGroupInput
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={isLoading}
          aria-invalid={!!errMessage}
          className={cn(
            "h-8 rounded-full",
            className,
          )}
          {...registration}
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
      {errMessage && (
        <FieldDescription className="text-sm text-red-500">
          {errMessage}
        </FieldDescription>
      )}
    </Field>
  )
}

interface PageCardFooterProps {
  submitLabel: string,
  isLoading: boolean,
  children?: ReactNode,
}
const PageCardFooter = ({
  submitLabel,
  isLoading,
  children,
}: PageCardFooterProps) => {
  return (
    <CardFooter className="flex-col gap-2 bg-card-footer border-t p-4 rounded-b-2xl">
      <Button
        type="submit"
        size="sm"
        className="w-full rounded-full shadow-none"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoaderCircleIcon className="animate-spin" />
            Proses...
          </>
        ) : submitLabel}
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full rounded-full shadow-none hidden"
        disabled={isLoading}
      >
        Login with Google
      </Button>

      {children && (
        <Field>
          <FieldDescription className="text-center">
            {children}
          </FieldDescription>
        </Field>
      )}
    </CardFooter>
  )
}

export {
  PageCard,
  PageCardContent,
  PageCardContentFieldText,
  PageCardContentFieldPassword,
  PageCardFooter,
}
