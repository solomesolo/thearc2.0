"use client";

import React from "react";
import { ArcButton } from "./ui/ArcButton";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  supportingLine?: string;
  primaryCTA?: { label: string; href?: string; onClick?: () => void };
  secondaryCTA?: { label: string; href?: string; onClick?: () => void };
  image?: { src: string; alt: string };
}

export function HeroSection({
  title,
  subtitle,
  supportingLine,
  primaryCTA,
  secondaryCTA,
  image,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {subtitle}
            </p>
            {supportingLine && (
              <p className="text-sm md:text-base text-gray-400">
                {supportingLine}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {primaryCTA && (
                <ArcButton
                  href={primaryCTA.href}
                  onClick={primaryCTA.onClick}
                >
                  {primaryCTA.label}
                </ArcButton>
              )}
              {secondaryCTA && (
                <ArcButton
                  href={secondaryCTA.href}
                  onClick={secondaryCTA.onClick}
                  className="border border-white/30 text-[#4DEECD] bg-transparent"
                >
                  {secondaryCTA.label}
                </ArcButton>
              )}
            </div>
          </div>
          {image && (
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

