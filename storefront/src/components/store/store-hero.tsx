import Image from "next/image";
import Link from "next/link";

interface StoreHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText?: string;
  ctaHref?: string;
  features?: string[];
}

export function StoreHero({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText = "EXPLORE NOW",
  ctaHref = "#products",
  features = [],
}: StoreHeroProps) {
  return (
    <div className="flex flex-col">
      <div className="relative h-[400px] w-full overflow-hidden md:h-[500px] lg:h-[674px]">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
          <div className="flex max-w-2xl flex-col gap-4 text-white">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
              {title}
            </h1>
            <p className="text-lg font-medium text-[#C5AF71] md:text-xl lg:text-2xl">
              {subtitle}
            </p>
            <p className="text-sm md:text-base lg:text-lg">{description}</p>
            
            <Link
              href={ctaHref}
              className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-[#C5AF71] px-6 py-3 font-semibold text-black transition-colors hover:bg-[#b39f61]"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
      
      {features.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 bg-[#C5AF71] px-6 py-4 text-center text-sm font-normal text-black md:gap-8 md:text-base lg:gap-12 lg:px-12 lg:text-lg">
          {features.map((feature, index) => (
            <span key={index} className="flex-shrink-0">
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}