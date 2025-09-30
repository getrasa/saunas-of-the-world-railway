import Image from "next/image";
import Link from "next/link";
import SquareButton from "~/components/ui/buttons/square-button";

export enum ProductSide {
  Left = "left",
  Right = "right",
}

interface ProductShowcaseProps {
  variant?: ProductSide;
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  buttonHref: string;
}

export const ProductShowcase = ({
  variant = ProductSide.Left,
  title,
  description,
  imagePath,
  imageAlt,
  buttonHref,
}: ProductShowcaseProps) => {
  const isLeft = variant === ProductSide.Left;

  const ProductImage = (
    <div className="h-fit w-full bg-black md:w-1/2">
      <div className="relative aspect-[628/480] w-full bg-slate-500">
        <Image
          src={imagePath}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );

  const ProductDetails = (
    <div className="flex flex-col justify-center text-black md:aspect-square md:flex-1">
      <span className="f-title">{title}</span>
      <span className="py-6 leading-7 sm:leading-9">
        {description}
      </span>
      <div>
        <Link href={buttonHref}>
          <SquareButton text="Explore" black />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="md:pb-0 pb-4">
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