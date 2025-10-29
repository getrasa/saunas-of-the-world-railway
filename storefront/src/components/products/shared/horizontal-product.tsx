"use client";

import { type FC, type JSX } from "react";
import { useRouter } from "next/navigation";
import SquareButton from "~/components/ui/buttons/square-button";
import Image from "next/image";

type ProductSideType = "left" | "right";

interface HorizontalProductProps {
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  buttonHref?: string;
  variant?: ProductSideType;
  stretchHorizontally?: boolean;
  onClick?: () => void;
}

// Export ProductSide as a plain object (not const)
export const ProductSide = {
  Left: "left",
  Right: "right",
} as const;

const HorizontalProduct: FC<HorizontalProductProps> = ({
  title,
  description,
  imagePath,
  imageAlt,
  buttonHref,
  variant = "left",
  stretchHorizontally = false,
  onClick,
}): JSX.Element => {
  const router = useRouter();
  const isLeft = variant === "left";

  const ProductImage = (
    <div className="h-fit w-full md:w-1/2">
      <div className="flex aspect-[628/480] w-full items-center justify-center">
        <Image
          src={imagePath}
          alt={imageAlt}
          width={628}
          height={480}
          className={`${!stretchHorizontally ? "h-full" : ""} w-full object-cover`}
        />
      </div>
    </div>
  );

  const ProductDetails = (
    <div className="flex flex-col justify-center text-black md:aspect-square md:flex-1">
      <span className="f-title">{title}</span>
      <span className="py-6 leading-7 sm:leading-9">{description}</span>
      {(buttonHref || onClick) && (
        <div>
          <SquareButton
            text="Explore"
            black
            onClick={
              onClick
                ? onClick
                : () => buttonHref && router.push(buttonHref)
            }
          />
        </div>
      )}
    </div>
  );

  return (
    <section className="pb-4 md:pb-0">
      <div className="flex w-full justify-center gap-4 pb-8 pt-6 md:py-16">
        <div
          className={`container flex flex-col items-center gap-8 lg:gap-32 ${
            isLeft ? "md:flex-row " : "md:flex-row-reverse"
          }`}
        >
          {ProductImage}
          {ProductDetails}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProduct;
