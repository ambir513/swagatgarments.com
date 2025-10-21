"use client";

import Link from "next/link";
import * as React from "react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface MenuItem {
  title: string;
  href?: string;
  isLink?: boolean;
  content?: ReactNode;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  logo?: ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  logoHref?: string;
  introItems?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export default function Navigation({
  menuItems = [
    {
      title: "Categories",
      content: "components",
    },
    {
      title: "About",
      isLink: true,
      href: "https://www.launchuicomponents.com/",
    },
  ],
  components = [
    {
      title: "Men's Wear",
      href: "/shop/mens-wear",
      description:
        "Trendy and comfortable clothing for men including shirts, pants, jackets, and more.",
    },
    {
      title: "Women's Wear",
      href: "/shop/womens-wear",
      description:
        "Stylish and modern outfits for women including dresses, tops, skirts, and accessories.",
    },
    {
      title: "Kids",
      href: "/shop/kids",
      description:
        "Fun and comfortable clothing for children of all ages, from casual to party wear.",
    },
    {
      title: "Footwear",
      href: "/shop/footwear",
      description:
        "A wide range of shoes and sandals for men, women, and kids to complete your outfit.",
    },
    {
      title: "Outerwear",
      href: "/shop/outerwear",
      description:
        "Jackets, coats, and hoodies to keep you stylish and warm in every season.",
    },
    {
      title: "Ethnic Wear",
      href: "/shop/ethnic-wear",
      description:
        "Traditional and festive garments including sarees, kurtas, and more for special occasions.",
    },
    {
      title: "Activewear",
      href: "/shop/activewear",
      description:
        "Comfortable and functional clothing for workouts, yoga, and casual sports activities.",
    },
    {
      title: "Loungewear",
      href: "/shop/loungewear",
      description:
        "Relaxed and cozy clothing for home or casual outings, combining comfort with style.",
    },
  ],
  logo = <h1>Hii</h1>,
  logoTitle = "Swagat Garments",
  logoDescription = "Landing page template built with React, Shadcn/ui and Tailwind that you can copy/paste into your project.",
  logoHref = "https://www.launchuicomponents.com/",
  introItems = [
    {
      title: "Introduction",
      href: "https://www.launchuicomponents.com/",
      description:
        "Re-usable components built using Radix UI and Tailwind CSS.",
    },
    {
      title: "Installation",
      href: "https://www.launchuicomponents.com/",
      description: "How to install dependencies and structure your app.",
    },
    {
      title: "Typography",
      href: "https://www.launchuicomponents.com/",
      description: "Styles for headings, paragraphs, lists...etc",
    },
  ],
}: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      New Arrivals
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Discover the styles in our latest collection
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Summar Collection">
                Lightweight essential wear for everyday comfort and style.
              </ListItem>
              <ListItem href="/docs/installation" title="Accessories">
                Complete your look with our trendy accessories.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Sales">
                Grab the best deals on our top-selling items.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.isLink ? (
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={item.href || ""}>{item.title}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.content === "default" ? (
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/30 to-muted/10 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            href={logoHref}
                          >
                            {logo}
                            <div className="mt-4 mb-2 text-lg font-medium">
                              {logoTitle}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              {logoDescription}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {introItems.map((intro, i) => (
                        <ListItem key={i} href={intro.href} title={intro.title}>
                          {intro.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : item.content === "components" ? (
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : (
                    item.content
                  )}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          data-slot="list-item"
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
