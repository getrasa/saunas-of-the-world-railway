import { Check } from "lucide-react";

interface HealthWellbeingProps {
  title: string;
  points: string[]; // HTML strings
}

export const HealthWellbeing = ({ title, points }: HealthWellbeingProps) => {
  const getPoint = (htmlContent: string) => (
    <li className="mt-6 flex gap-3">
      <div className="h-[22px] w-[22px] md:h-[30px] md:w-[30px] rounded-full bg-[#3FC73D] flex justify-center items-center">
        <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
      </div>
      <span 
        className="flex-1 leading-7"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </li>
  );

  return (
    <section className="flex justify-center">
      <div className="container w-full">
        <div className="flex w-full flex-col bg-[#f2f2f2] p-4 md:px-[56px] md:py-[50px]">
          <span className="f-title">
            Health and Wellness Benefits
          </span>
          <span className="mt-[12px]">{title}</span>
          <ul>{points.map((p, index) => <div key={index}>{getPoint(p)}</div>)}</ul>
        </div>
      </div>
    </section>
  );
};