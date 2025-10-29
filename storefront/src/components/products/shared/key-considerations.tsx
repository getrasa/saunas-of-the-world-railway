import type { ReactNode } from "react";
import { DrinkWaterIcon, ListenToBodyIcon, HealthConditionIcon } from "~/components/custom-icons";

interface KeyConsiderationData {
  title: string;
  content: string;
}

interface KeyConsiderationsProps {
  introText: string;
  hydration: KeyConsiderationData;
  listenToBody: KeyConsiderationData;
  healthConditions: KeyConsiderationData;
}

export const KeyConsiderations = ({
  introText,
  hydration,
  listenToBody,
  healthConditions,
}: KeyConsiderationsProps) => {
  const getConsideration = (
    icon: ReactNode,
    title: string,
    content: string,
  ) => (
    <div className="mt-[16px] md:mt-[64px] flex w-full flex-col gap-2 md:gap-3">
      <div className="h-[56px] w-[56px] md:h-[75px] md:w-[75px]">
        {icon}
      </div>
      <span className="mt-[16px] text-[18px] sm:text-[20px] font-semibold">{title}</span>
      <span className="mt-[10px] leading-8">{content}</span>
    </div>
  );

  return (
    <section className="flex justify-center">
      <div className="container flex flex-col">
        <span className="f-title">
          Key Considerations
        </span>
        <span className="mt-[12px]">
          {introText}
        </span>
        <div className="flex w-full gap-6 md:gap-12 lg:gap-[85px] md:flex-row flex-col">
          {getConsideration(
            <DrinkWaterIcon />,
            hydration.title,
            hydration.content,
          )}
          {getConsideration(
            <ListenToBodyIcon />,
            listenToBody.title,
            listenToBody.content,
          )}
          {getConsideration(
            <HealthConditionIcon />,
            healthConditions.title,
            healthConditions.content,
          )}
        </div>
      </div>
    </section>
  );
};