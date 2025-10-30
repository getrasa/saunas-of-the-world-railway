import Image from "next/image";

interface ProductHeroProps {
  title: string;
  imagePath: string;
  brightness?: number;
}

export const ProductHero = ({ title, imagePath, brightness = 70 }: ProductHeroProps) => {
  const brightnessValue = brightness / 100;

  return (
    <div
      className="aspect-[18/8] w-screen bg-slate-300 sm:aspect-[16/8] lg:aspect-[20/8] xl:aspect-[24/8]"
      style={{ overflowX: "hidden", overflowY: "hidden", position: "relative" }}
    >
      <div className="flex flex-col text-white w-full h-full">
        <Image
          src={imagePath}
          alt={title}
          fill
          priority
          className="w-full h-full object-cover object-center"
          style={{ filter: `brightness(${brightnessValue})` }}
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <span className="text-center text-[24px] font-medium drop-shadow-lg sm:text-[32px] md:text-[48px] lg:text-[52px] xl:text-[64px]">
            {title.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;