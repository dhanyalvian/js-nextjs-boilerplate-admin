//- src/components/core/button.tsx

import Link from "next/link"
import { Button } from "../ui/button"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"

const defaultClass = "mt-6 card-button-shadow"

interface ButtonProps {
  label: string,
  href?: string,
  func?: () => void,
  variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive",
  size?: "default" | "xs" | "sm" | "lg" | "icon",
  iconLeft?: IconSvgElement | null,
  iconRight?: IconSvgElement | null,
  className?: string,
  disabled?: boolean,
  type?: "button" | "submit" | "reset",
}

export const ButtonLink = ({
  label,
  href = "#",
  variant = "default",
  size = "lg",
  iconLeft,
  iconRight,
  className,
}: ButtonProps) => {
  const variantClass = (variant == "outline") ? "text-muted-foreground" : ""

  return (
    <Link href={href}>
      <Button
        variant={variant}
        size={size}
        className={cn(
          defaultClass,
          variantClass,
          className,
        )}
      >
        <ButtonContent
          label={label}
          size={size}
          iconLeft={iconLeft}
          iconRight={iconRight}
        />
      </Button>
    </Link>
  )
}

export const ButtonFunc = ({
  label,
  func,
  variant = "default",
  size = "lg",
  iconLeft,
  iconRight,
  className,
  disabled,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={func}
      disabled={disabled}
      type={type}
      className={cn(
        defaultClass,
        className,
      )}
    >
      <ButtonContent
        label={label}
        size={size}
        iconLeft={iconLeft}
        iconRight={iconRight}
      />
    </Button>
  )
}

export const ButtonSubmit = ({
  label,
  variant = "default",
  size = "lg",
  iconLeft,
  iconRight,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        defaultClass,
        className,
      )}
    >
      <ButtonContent
        label={label}
        size={size}
        iconLeft={iconLeft}
        iconRight={iconRight}
      />
    </Button>
  )
}

export const ButtonContent = ({ label, size, iconLeft, iconRight }: ButtonProps) => {
  let iconSize = "size-4"
  if (size == "lg") {
    iconSize = "size-5"
  }

  return (
    <>
      {iconLeft && <HugeiconsIcon icon={iconLeft} className={iconSize} strokeWidth={2} />}
      <span className={`${!iconLeft ? "ml-0.5" : ""} ${!iconRight ? "mr-0.5" : ""}`}>{label}</span>
      {iconRight && <HugeiconsIcon icon={iconRight} className={iconSize} strokeWidth={2} />}
    </>
  )
}
