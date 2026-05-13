"use client";

import { Color } from "@/src/projects/day001/types/main.types";

interface PieceProps {
  color: Color;
}

export const Piece = ({ color }: PieceProps) => {
  return (
    <div
      className={`
        w-4/5 h-4/5 rounded-full shadow-md transition-all duration-500 transform
        ${color === "BLACK" ? "bg-zinc-900 rotate-0" : "bg-white rotate-180"}
      `}
    />
  );
};
