"use client";

import { Board } from "@/src/projects/day001/components/Board";
import { ScoreBoard } from "@/src/projects/day001/components/ScoreBoard";
import { useOthello } from "@/src/projects/day001/hooks/useOthello";

export default function OthelloPage() {
  const {
    board,
    turn,
    score,
    validMoves,
    winner,
    placePiece,
    resetGame,
    undo,
    canUndo,
  } = useOthello();

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
        NEXT.REVERSI
      </h1>

      <ScoreBoard score={score} currentTurn={turn} winner={winner} />

      <Board board={board} validMoves={validMoves} onSquareClick={placePiece} />

      <div className="flex gap-4">
        <button
          onClick={undo}
          disabled={!canUndo || !!winner}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg font-bold disabled:opacity-30 hover:bg-slate-700 transition-colors"
        >
          UNDO
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          NEW GAME
        </button>
      </div>
    </main>
  );
}
