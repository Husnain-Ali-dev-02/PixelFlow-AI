"use client";

import React, { useMemo, useState } from "react";
import Header from "./Header";
import PromptInput from "@/components/PromptInput";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { useCreateProject } from "@/features/use-project";

const LandingSection = () => {
  const [promptText, setPromptText] = useState("");
  const { mutate, isPending } = useCreateProject();

  const suggestions = [
    {
      label: "Finance Tracker",
      icon: "💸",
      value: `Finance app statistics screen. Current balance at top with dollar amount, bar chart showing spending over months (Oct-Mar) with month selector pills below, transaction list with app icons, amounts, and categories. Bottom navigation bar. Mobile app, single screen. Style: Dark theme, chunky rounded cards, playful but professional, modern sans-serif typography, Gen Z fintech vibe. Fun and fresh, not corporate.`,
    },
    {
      label: "Fitness Activity",
      icon: "🔥",
      value: `Fitness tracker summary screen. Large central circular progress ring showing steps and calories with neon glow. Line graph showing heart rate over time. Bottom section with grid of health metrics (Sleep, Water, SpO2). Mobile app, single screen. Style: Deep Dark Mode (OLED friendly). Pitch black background with electric neon green and vibrant blue accents. High contrast, data-heavy but organized, sleek and sporty aesthetic.`,
    },
    {
      label: "Food Delivery",
      icon: "🍔",
      value: `Food delivery home feed. Top search bar with location pin. Horizontal scrolling hero carousel of daily deals. Vertical list of restaurants with large delicious food thumbnails, delivery time badges, and rating stars. Floating Action Button (FAB) for cart. Mobile app, single screen. Style: Vibrant and Appetizing. Warm colors (orange, red, yellow), rounded card corners, subtle drop shadows to create depth. Friendly and inviting UI.`,
    },
    {
      label: "Travel Booking",
      icon: "✈️",
      value: `Travel destination detail screen. Full-screen immersive photography of a tropical beach. Bottom sheet overlay with rounded top corners containing hotel title, star rating, price per night, and a large "Book Now" button. Horizontal scroll of amenity icons. Mobile app, single screen. Style: Minimalist Luxury. ample whitespace, elegant serif typography for headings, clean sans-serif for body text. Sophisticated, airy, high-end travel vibe.`,
    },
    {
      label: "E-Commerce",
      icon: "👟",
      value: `Sneaker product page. Large high-quality product image on a light gray background. Color selector swatches, size selector grid, and a sticky "Add to Cart" button at the bottom. Title and price in bold, oversized typography. Mobile app, single screen. Style: Neo-Brutalism. High contrast, thick black outlines on buttons and cards, hard shadows (no blur), unrefined geometry, bold solid colors (yellow and black). Trendy streetwear aesthetic.`,
    },
    {
      label: "Meditation",
      icon: "🧘",
      value: `Meditation player screen. Central focus is a soft, abstract breathing bubble animation. Play/Pause controls and a time slider below. Background is a soothing solid pastel sage green. Mobile app, single screen. Style: Soft Minimal. Rounded corners on everything, low contrast text for relaxation, pastel color palette, very little UI clutter. Zen, calming, and therapeutic atmosphere.`,
    },
  ];

  const handleSuggestionClick = (val: string) => {
    setPromptText(val);
  };

  const handleSubmit = () => {
    if (!promptText) return;
    mutate(promptText);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center text-center">
          <h1 className="font-semibold tracking-tight text-3xl sm:text-4xl md:text-5xl">
            Design mobile apps <br className="md:hidden" />
            <span className="text-primary"> in minutes</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg font-medium text-foreground leading-relaxed">
            Go from idea to beautiful app mockups in minutes by chatting with
            AI.
          </p>

          {/* Prompt + Suggestions */}
          <div className="relative z-50 mt-8 w-full max-w-3xl flex flex-col items-center gap-6">
            <PromptInput
              className="ring-2 ring-primary"
              promptText={promptText}
              setPromptText={setPromptText}
              isLoading={isPending}
              onSubmit={handleSubmit}
            />

            <div className="flex flex-wrap justify-center gap-2 px-4">
              <Suggestions>
                {suggestions.map((s) => (
                  <Suggestion
                    key={s.label}
                    suggestion={s.value}
                    aria-label={`Use ${s.label} template`}
                    className="h-7 px-2.5 pt-1 text-xs"
                    onClick={(value) => setPromptText(value)}
                  >
                    <span aria-hidden="true">{s.icon}</span>
                    <span>{s.label}</span>
                  </Suggestion>
                ))}
              </Suggestions>
            </div>
          </div>
        </div>

        {/* Background Glow */}
        <div
          className="absolute -translate-x-1/2
             left-1/2 w-[5000px] h-[3000px] top-[80%]
             -z-10"
        >
          <div
            className="-translate-x-1/2 absolute
               bottom-[calc(100%-300px)] left-1/2
               h-[2000px] w-[2000px]
               opacity-20 bg-radial-primary"
          ></div>
          <div
            className="absolute -mt-2.5
              size-full rounded-[50%]
               bg-primary/20 opacity-70
               [box-shadow:0_-15px_24.8px_var(--primary)]"
          ></div>
          <div
            className="absolute z-0 size-full
               rounded-[50%] bg-background"
          ></div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="w-full py-10">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-medium tracking-tight">
            Recent Projects
          </h2>
        </div>
      </section>
    </div>
  );
};

export default LandingSection;
