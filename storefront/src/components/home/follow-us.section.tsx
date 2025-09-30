"use client";

import { useState } from "react";
import { FacebookIcon, YoutubeIcon, InstagramIcon } from "~/components/custom-icons";

export const FollowUs = () => {
  const socialMediaLinks = [
    { href: "https://www.facebook.com/saunasworld.au", Icon: FacebookIcon },
    { href: "https://www.youtube.com/@saunasoftheworld557", Icon: YoutubeIcon },
    { href: "https://www.instagram.com/saunasworld/?hl=en", Icon: InstagramIcon },
  ];

  return (
    <div className="flex w-full justify-center bg-white py-8 text-[16px]">
      <div className="flex flex-col items-center text-black">
        <span className="py-2 font-medium">FOLLOW US ON</span>
        <div className="flex justify-center gap-8 sm:gap-16">
          {socialMediaLinks.map((link, index) => (
            <EnlargingIcon
              key={index}
              href={link.href}
              Icon={link.Icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const EnlargingIcon = ({ href, Icon }: { href: string; Icon: React.ComponentType<any> }) => {
  const [hover, setHover] = useState(false);
  const size = hover ? 56 : 48;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative p-5 transition-transform duration-200 ease-in-out"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon 
        size={size} 
      />
    </a>
  );
};
