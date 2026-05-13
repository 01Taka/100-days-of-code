"use client";

import { Score, Color } from "@/src/projects/day001/types/main.types";

interface ScoreBoardProps {
  score: Score;
  currentTurn: Color;
  winner: Color | "DRAW" | null;
}

export const ScoreBoard = ({ score, currentTurn, winner }: ScoreBoardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-100 rounded-xl shadow-inner">
      <div className="flex justify-around w-full max-w-xs">
        <div
          className={`flex flex-col items-center p-3 rounded-lg ${currentTurn === "BLACK" ? "bg-zinc-800 text-white ring-4 ring-emerald-400" : "bg-white"}`}
        >
          <span className="text-xs font-bold">BLACK</span>
          <span className="text-3xl font-black">{score.BLACK}</span>
        </div>

        <div className="flex items-center text-xl font-bold text-slate-400">
          VS
        </div>

        <div
          className={`flex flex-col items-center p-3 rounded-lg ${currentTurn === "WHITE" ? "bg-white text-zinc-800 ring-4 ring-emerald-400 shadow-md" : "bg-zinc-200 shadow-inner"}`}
        >
          <span className="text-xs font-bold text-slate-500">WHITE</span>
          <span className="text-3xl font-black">{score.WHITE}</span>
        </div>
      </div>

      {winner && (
        <div className="animate-bounce text-xl font-black text-emerald-600 bg-white px-6 py-2 rounded-full shadow-lg border-2 border-emerald-400">
          {winner === "DRAW" ? "DRAW!" : `WINNER: ${winner}!`}
        </div>
      )}
    </div>
  );
};
