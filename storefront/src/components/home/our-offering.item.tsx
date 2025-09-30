import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";

export interface ProductItemProps {
  label: string;
  imgPath: string;
  href: string;
}

export const ProductItem = (props: ProductItemProps): JSX.Element => {
  const { label, imgPath, href } = props;

  return (
    <div className="col-span-12 cursor-pointer sm:col-span-6 lg:col-span-4">
      <Link href={href}>
        <div className="relative aspect-[412/360] overflow-hidden">
          <Image
            src={imgPath}
            alt={label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover brightness-[0.7] transition-all duration-300 hover:brightness-[0.6]"
          />
          <div className="absolute inset-0 flex items-center justify-center px-16 text-[26px] transition-all duration-300 hover:text-[30px]">
            <span
              className="text-center font-semibold text-white"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {label.toUpperCase()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
