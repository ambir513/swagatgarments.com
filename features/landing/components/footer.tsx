"use client";
import { Logo } from "@/components/utils/logo";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  Crafted?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQs", href: "/faq" },
      { name: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "/help" },
      { name: "Sales", href: "/sales" },
      { name: "Advertise", href: "/advertise" },
      { name: "Privacy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms and Conditions", href: "/terms-condition" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Advertise", href: "/advertise" },
    ],
  },
];

const defaultSocialLinks = [
  {
    icon: <FaWhatsapp className="size-5" />,
    href: "https://wa.me/+919833784528",
    label: "Whatsapp",
  },
  {
    icon: <FaFacebook className="size-5" />,
    href: "https://www.facebook.com/vishwanathc.biradar",
    label: "Facebook",
  },
];

export const Footer = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  sections = defaultSections,
  description = "Your trusted destination for premium garments and fashion essentials across India.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2025 swagatgarments.com All rights reserved.",
  Crafted = "Crafted by Amar Biradar",
}: FooterProps) => {
  const { theme } = useTheme();
  return (
    <section className="sm:px-32 px-10 sm:py-10 py-5">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6  lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <button className="cursor-pointer overflow-hidden rounded-xl border ">
                <Logo theme={theme} />
              </button>
            </div>
            <p className="sm:w-[70%] w-full text-sm text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-4 grid-cols-2 lg:gap-20 mb-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            <p> Design & Developed by Amar Biradar</p>
          </ul>
        </div>
      </div>
    </section>
  );
};
