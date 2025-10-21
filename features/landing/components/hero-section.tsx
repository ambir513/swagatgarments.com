"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative  bg-background overflow-hidden ">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-36 py-12 sm:py-20 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3 sm:px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
              <span className="text-xs sm:text-sm font-medium text-primary">
                Premium Wholesale
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Premium Garments, Wholesale Prices
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Premium quality garments available at wholesale prices. Wide
                selection, competitive rates, and fast delivery.
              </p>
            </div>

            {/* Location Info */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border w-fit">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground tracking-tight">
                  No. 1 in Hallikhed – Swagat Garments
                </p>
                <p className="text-xs text-muted-foreground">
                  Hallikhed {"(B)"}, Bidar, karnataka.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="rounded-lg group text-white">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg bg-transparent"
              >
                Browse Garments
              </Button>
            </div>
          </div>

          {/* Right Visual - Product Showcase */}
          <div className="relative h-96 sm:h-[500px] lg:h-[520px] hidden lg:flex items-center justify-center">
            {/* Floating cards mockup */}
            <div className="relative w-full h-full">
              {/* Main card */}
              <div className="absolute inset-0 bg-card rounded-2xl border border-border backdrop-blur-sm transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary/30 mb-4">
                    👕
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Premium Garments
                  </p>
                </div>
              </div>

              {/* Floating accent card 1 */}
              <div className="absolute top-12 right-12 w-48 h-32 bg-secondary rounded-xl border border-border backdrop-blur-sm p-4 transform hover:translate-y-2 transition-transform">
                <div className="text-primary text-sm font-semibold mb-2">
                  Quality Assured
                </div>
                <p className="text-foreground text-sm">
                  Premium fabric & craftsmanship
                </p>
              </div>

              {/* Floating accent card 2 */}
              <div className="absolute bottom-12 left-12 w-48 h-32 bg-secondary rounded-xl border border-border backdrop-blur-sm p-4 transform hover:translate-y-2 transition-transform">
                <div className="text-primary text-sm font-semibold mb-2">
                  Bulk Pricing
                </div>
                <p className="text-foreground text-sm">Best wholesale rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
