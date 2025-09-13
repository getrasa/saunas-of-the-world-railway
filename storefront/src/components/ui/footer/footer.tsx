"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { Briefcase, Mail, Phone, Clock } from "lucide-react";
import { CtaButton } from "~/components/ui/buttons/cta-button";

export const Footer = () => {
  return (
    <footer className="flex w-full justify-center bg-black py-16 text-white">
      <div className="container grid grid-cols-12 justify-between gap-4 gap-y-16 px-4 xl:gap-16">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <Section title="Get in touch" gap={24}>
            <IconText
              icon={<Briefcase size={18} />}
              text="PO Box 249 Nerang QLD 4211"
            />
            <IconText
              icon={<Mail size={18} />}
              email
              text="saunasworld.au@gmail.com"
            />
            <IconText icon={<Phone size={18} />} text="+61 422-062-294" />
            <IconText
              icon={<Clock size={18} />}
              text="Mon-Sat by appointment only"
            />
          </Section>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <Section title="Categories" gap={8}>
            <LinkPage href="/products/saunas">Saunas</LinkPage>
            <LinkPage href="/products/baths">Ice Baths & Hot Tubs</LinkPage>
            <LinkPage href="/products/infrared">Infrared</LinkPage>
            <LinkPage href="/products/equipment">Equipment</LinkPage>
            <LinkPage href="/products/materials">Materials & Accessories</LinkPage>
            <LinkPage href="/services">Services</LinkPage>
          </Section>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <Section title="About" gap={8}>
            <LinkPage href="/about">About us</LinkPage>
            <LinkPage href="/terms/privacy-policy">Privacy Policy</LinkPage>
            <LinkPage href="/products/terms/disclaimer">Disclaimer</LinkPage>
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

const LinkPage = (props: { children: ReactNode; href: string }) => {
  const { children, href } = props;
  return (
    <Link
      className="decoration-1 underline-offset-2 hover:underline"
      href={href || "#"}
    >
      {children}
    </Link>
  );
};
