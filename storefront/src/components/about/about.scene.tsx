import React from "react";
import { getAboutPageData } from "~/lib/data/about-page";

export const AboutScene = async () => {
  const { mission, teamPhoto, teamMembers, footerText } = await getAboutPageData();

  return (
    <div className="flex flex-col gap-8 py-16">
      {mission && (
        <div className="flex flex-col justify-center text-black container text-center">
          <span className="f-title">{mission.title}</span>
          <span className="py-6 leading-7 sm:leading-9">
            {mission.content}
          </span>
        </div>
      )}
      
      {teamPhoto && (
        <div className="flex w-full flex-col items-center gap-4 bg-[#f2f2f2] pb-16 pt-12">
          <span className="f-title">{teamPhoto.title}</span>
          <img src={teamPhoto.imageUrl} alt={teamPhoto.title} className="w-full max-w-[600px]" />
        </div>
      )}

      {teamMembers.length > 0 && (
        <div className="flex w-full gap-4 container pt-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="basis-1/2 text-center">
              <label className="f-title">{member.name}</label>
              <p className="px-16 py-4">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {footerText && (
        <p className="text-center underline">
          {footerText}
        </p>
      )}
    </div>
  );
};
