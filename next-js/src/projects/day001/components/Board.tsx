"use client";
import { BoardState, Point } from "@/src/projects/day001/types/main.types";
import { Square } from "./Square";

interface BoardProps {
  board: BoardState;
  validMoves: Point[];
  onSquareClick: (x: number, y: number) => void;
}

export const Board = ({ board, validMoves, onSquareClick }: BoardProps) => {
  return (
    <div className="grid grid-cols-8 grid-rows-8 border-4 border-emerald-800 w-full max-w-[500px] mx-auto shadow-2xl">
      {board.map((row, y) =>
        row.map((cell, x) => (
          <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            value={cell}
            isValidMove={validMoves.some((m) => m.x === x && m.y === y)}
            onClick={onSquareClick}
          />
        )),
      )}
    </div>
  );
};
