"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { Briefcase, Mail, Phone, Clock } from "lucide-react";
import { CtaButton } from "~/components/ui/buttons/cta-button";
import type { FooterData } from "~/lib/data/footer";

interface FooterProps {
  data: FooterData | null;
}

export const Footer = ({ data }: FooterProps) => {
  // Provide fallback defaults if CMS data is not available
  const getInTouch = data?.getInTouch || {
    address: "PO Box 249 Nerang QLD 4211",
    email: "saunasworld.au@gmail.com",
    phone: "+61 422-062-294",
    businessHours: "Mon-Sat by appointment only",
  };
  
  const categories = data?.categories && data.categories.length > 0 
    ? data.categories 
    : [
        { label: "Saunas", href: "/products/saunas", openInNewTab: false },
        { label: "Ice Baths & Hot Tubs", href: "/products/baths", openInNewTab: false },
        { label: "Infrared", href: "/products/infrared", openInNewTab: false },
        { label: "Equipment", href: "/products/equipment", openInNewTab: false },
        { label: "Materials & Accessories", href: "/products/materials", openInNewTab: false },
        { label: "Services", href: "/services", openInNewTab: false },
      ];
  
  const aboutLinks = data?.aboutLinks && data.aboutLinks.length > 0
    ? data.aboutLinks
    : [
        { label: "About us", href: "/about", openInNewTab: false },
        { label: "Privacy Policy", href: "/terms/privacy-policy", openInNewTab: false },
        { label: "Disclaimer", href: "/products/terms/disclaimer", openInNewTab: false },
      ];

  return (
    <footer className="flex w-full justify-center bg-black py-16 text-white">
      <div className="container grid grid-cols-12 justify-between gap-4 gap-y-16 px-4 xl:gap-16">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <Section title="Get in touch" gap={24}>
            {getInTouch && (
              <>
                <IconText
                  icon={<Briefcase size={18} />}
                  text={getInTouch.address}
                />
                <IconText
                  icon={<Mail size={18} />}
                  email
                  text={getInTouch.email}
                />
                <IconText icon={<Phone size={18} />} text={getInTouch.phone} />
                <IconText
                  icon={<Clock size={18} />}
                  text={getInTouch.businessHours}
                />
              </>
            )}
          </Section>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <Section title="Categories" gap={8}>
            {categories.map((link, index) => (
              <LinkPage 
                key={index} 
                href={link.href}
                openInNewTab={link.openInNewTab}
              >
                {link.label}
              </LinkPage>
            ))}
          </Section>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <Section title="About" gap={8}>
            {aboutLinks.map((link, index) => (
              <LinkPage 
                key={index} 
                href={link.href}
                openInNewTab={link.openInNewTab}
              >
                {link.label}
              </LinkPage>
            ))}
          </Section>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <Section title="Need to contact us?" gap={0}>
            <CtaButton ctaSize="lg">REQUEST CALLBACK</CtaButton>
          </Section>
        </div>
      </div>
      {/* TODO: Implement RequestCallbackModal when needed */}
    </footer>
  );
};

type SectionProps = {
  title: string;
  children: ReactNode;
  gap: number;
};

const Section: React.FC<SectionProps> = (props) => {
  const { title, children, gap } = props;
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[16px] font-semibold md:text-[18px]">{title}</h3>
      <ul>
        {React.Children.map(children, (child, i) => (
          <li key={i} style={{ marginBottom: `${gap}px` }}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};

const IconText = (props: {
  icon: ReactNode;
  text: string;
  email?: boolean;
}) => {
  const { icon, text, email } = props;
  return (
    <div className="flex items-center gap-4">
      {icon}
      {email ? (
        <a className="underline" href={`mailto:${text}`}>
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

const LinkPage = (props: { children: ReactNode; href: string; openInNewTab?: boolean }) => {
  const { children, href, openInNewTab } = props;
  return (
    <Link
      className="decoration-1 underline-offset-2 hover:underline"
      href={href || "#"}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
};
