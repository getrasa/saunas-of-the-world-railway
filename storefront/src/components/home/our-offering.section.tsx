import type { JSX } from "react";
import { ProductItem } from "./our-offering.item";
import type { OurOfferingData } from "~/lib/data/homepage";

interface OurOfferingProps {
  data: OurOfferingData | null;
}

export const OurOffering = ({ data }: OurOfferingProps): JSX.Element => {
  if (!data || !data.tiles || data.tiles.length === 0) {
    return <></>;
  }

  return (
    <section className="flex w-full justify-center gap-4 bg-white py-[92px] text-[16px]">
      <div className="container flex flex-col pb-12">
        <span className="py-4 text-[20px]">{data.title.toUpperCase()}</span>
        <div className="grid w-full grid-cols-12 gap-2">
          {data.tiles.map((tile, index) => (
            <ProductItem
              key={index}
              label={tile.label}
              imgPath={tile.imageUrl}
              href={tile.href}
              brightness={tile.brightness}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
