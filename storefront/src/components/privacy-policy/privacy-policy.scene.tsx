"use client";

import React from "react";

export interface PrivacyPolicySceneProps {}

export const PrivacyPolicyScene: React.FC<PrivacyPolicySceneProps> = () => {
  return (
    <main className="flex h-screen w-screen justify-center overflow-y-scroll bg-[#f2f2f2] p-10">
      <div className="flex min-h-[1100px] w-[800px] flex-col gap-4 rounded-md bg-white p-12 font-extralight shadow-sm">
        <h1 className=" f-title">Privacy Policy</h1>
        <p>We Value Your Privacy</p>
        <p>
          When you visit Saunas of the World website, certain information is
          automatically collected for statistical purposes, including:
        </p>
        <ul className=" list-disc pl-4">
          <li> Your server address (IP)</li>
          <li> Your top-level domain name (e.g., .com, .net, .org, etc.)</li>
          <li> The pages you accessed and documents downloaded</li>
          <li> The previous site you visited</li>
          <li> The type of browser you are using</li>
        </ul>
        <p>
          Additional information may be voluntarily provided through online
          forms and email for specific purposes.
        </p>
        <p>
          Saunas of the World will only utilize such information for the purpose
          for which you provided it. This information will not be disclosed to
          any third party without your consent, except as required by law.
        </p>
        <p>
          While this site provides facilities for secure information
          transmission over the Internet, users should be aware of inherent
          risks. Although we do not supply or sell personal information to third
          parties, Saunas of the World assumes no responsibility for any
          unauthorized dealings with personal information, including email
          addresses, conducted over the Internet.
        </p>
      </div>
    </main>
  );
};
