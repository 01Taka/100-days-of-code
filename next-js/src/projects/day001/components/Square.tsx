"use client";
import { CellState } from "@/src/projects/day001/types/main.types";
import { Piece } from "./Piece";

interface SquareProps {
  x: number;
  y: number;
  value: CellState;
  isValidMove: boolean;
  onClick: (x: number, y: number) => void;
}

export const Square = ({ x, y, value, isValidMove, onClick }: SquareProps) => {
  return (
    <div
      onClick={() => onClick(x, y)}
      className={`
        relative flex items-center justify-center border border-emerald-700
        w-full aspect-square cursor-pointer transition-colors
        ${isValidMove ? "bg-emerald-500 hover:bg-emerald-400" : "bg-emerald-600"}
      `}
    >
      {/* 石がある場合表示 */}
      {value && <Piece color={value} />}

      {/* 置ける場所のガイド（小さな点） */}
      {isValidMove && !value && (
        <div className="w-3 h-3 bg-black/20 rounded-full" />
      )}
    </div>
  );
};
