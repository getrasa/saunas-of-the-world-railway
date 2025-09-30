"use client";

import { useState } from "react";
import { Facebook, Youtube, Instagram } from "lucide-react";

export const FollowUs = () => {
  const socialMediaLinks = [
    { href: "https://www.facebook.com/saunasworld.au", icon: Facebook },
    { href: "https://www.youtube.com/@saunasoftheworld557", icon: Youtube },
    { href: "https://www.instagram.com/saunasworld/?hl=en", icon: Instagram },
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
              Icon={link.icon}
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
        className="transition-all duration-200 ease-in-out cursor-pointer"
      />
    </a>
  );
};
