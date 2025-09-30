"use client";

import React from "react";

export interface DisclaimerSceneProps {}

export const DisclaimerScene: React.FC<DisclaimerSceneProps> = () => {
  return (
    <main className="flex h-screen w-screen justify-center overflow-y-scroll bg-[#f2f2f2] p-10">
      <div className="flex min-h-[1100px] w-[800px] flex-col gap-4 rounded-md bg-white p-12 shadow-sm font-extralight">
        <h1 className=" f-title">Disclaimer</h1>
        <p>
          The information, designs, and images presented on this website are
          protected by copyright. The Saunas of the World name and logo, along
          with all related product and service names, are service marks and may
          not be used by any other party without prior express written
          permission.
        </p>
        <p>
          Saunas of the World, emphasizes that the information provided on this
          website, as well as any links included, may not always be current,
          accurate, or complete. We take no responsibility for errors or
          omissions in the content.
        </p>
        <p>
          Users assume full responsibility and risk associated with utilizing
          the material on this website, regardless of its intended purpose or
          resulting outcomes.
        </p>
        <p>
          Saunas of the World cannot be held liable for any special, indirect,
          or consequential damages, including loss of data or profits, arising
          from the use or performance of materials on this website, whether due
          to contract, negligence, or any other legal theory.
        </p>
      </div>
    </main>
  );
};
