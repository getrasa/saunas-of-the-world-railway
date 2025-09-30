import type { ReactNode } from "react";
import { DrinkWaterIcon, ListenToBodyIcon, HealthConditionIcon } from "~/components/custom-icons";

export const KeyConsiderations = () => {
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
          Here are some key considerations for you to take into account when
          using sauna.
        </span>
        <div className="flex w-full gap-6 md:gap-12 lg:gap-[85px] md:flex-row flex-col">
          {getConsideration(
            <DrinkWaterIcon />,
            "Hydration",
            "Stay well-hydrated before, during, and after your sauna session. Drink water or electrolyte-rich beverages to replenish fluids lost through sweating.",
          )}
          {getConsideration(
            <ListenToBodyIcon />,
            "Listen to Your Body",
            "Pay attention to how your body responds to the heat. If you start to feel dizzy, lightheaded, or uncomfortable, exit the sauna immediately. Always prioritize your comfort and well-being.",
          )}
          {getConsideration(
            <HealthConditionIcon />,
            "Health Conditions",
            "If you have underlying health conditions or concerns, consult with a healthcare professional before using a sauna regularly. Sauna use may not be suitable for everyone, especially those with cardiovascular issues, high blood pressure, or certain skin conditions.",
          )}
        </div>
      </div>
    </section>
  );
};