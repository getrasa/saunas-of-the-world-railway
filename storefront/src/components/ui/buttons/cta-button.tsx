"use client";

import type { JSX } from "react";
import { Button } from "~/components/ui/buttons/button";
import { cn } from "~/lib/utils";

type ButtonBaseProps = Omit<
  React.ComponentProps<typeof Button>,
  "size" | "variant"
>;

interface CtaButtonProps extends ButtonBaseProps {
  ctaSize?: "lg" | "xl";
}

export const CtaButton = (props: CtaButtonProps): JSX.Element => {
  const { className, ctaSize = "lg", ...rest } = props;

  const sizeClasses =
    ctaSize === "xl"
      ? "h-auto px-8 py-4 text-[14px] lg:px-14"
      : "h-auto px-8 py-2 text-[12px] sm:px-14 sm:py-4 sm:text-[14px]";
  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto cursor-pointer rounded-full border border-black bg-white font-semibold text-black drop-shadow-lg transition-colors duration-300 hover:bg-black hover:text-white",
        sizeClasses,
        className,
      )}
      {...rest}
    />
  );
};
