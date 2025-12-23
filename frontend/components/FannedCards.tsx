"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardItem {
  id: number;
  image: string;
  alt: string;
}

interface FannedCardsProps {
  cards?: CardItem[];
  className?: string;
}

const defaultCards: CardItem[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400", alt: "Card 1" },
  { id: 2, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400", alt: "Card 2" },
  { id: 3, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400", alt: "Card 3" },
  { id: 4, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400", alt: "Card 4" },
  { id: 5, image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400", alt: "Card 5" },
  { id: 6, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", alt: "Card 6" },
  { id: 7, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", alt: "Card 7" },
];

export default function FannedCards({ cards = defaultCards, className }: FannedCardsProps) {
  const getRotation = (index: number, total: number) => {
    const maxRotation = 15;
    const step = (maxRotation * 2) / (total - 1);
    return -maxRotation + step * index;
  };

  const getZIndex = (index: number) => index + 1;

  return (
    <div className={cn("relative w-[320px] h-[420px]", className)}>
      {cards.map((card, index) => {
        const rotation = getRotation(index, cards.length);
        const translateY = index * -8;
        const translateX = index * 3;

        return (
          <div
            key={card.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105"
            style={{
              transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
              zIndex: getZIndex(index),
            }}
          >
            <div className="w-[260px] h-[340px] rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-700">
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
