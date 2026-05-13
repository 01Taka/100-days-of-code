import { BoardState, Color } from "@/src/projects/day001/types/main.types";
import {
  initializeBoard,
  getValidMoves,
  calculateScore,
  applyMove,
  checkGameOver,
} from "@/src/projects/day001/utils/othelloLogic";
import { useState, useMemo } from "react";

export const useOthello = () => {
  const [board, setBoard] = useState<BoardState>(initializeBoard());
  const [turn, setTurn] = useState<Color>("BLACK");
  const [history, setHistory] = useState<BoardState[]>([]);

  // 1. 現在のターンで置ける場所を算出（メモ化してパフォーマンス最適化）
  const validMoves = useMemo(() => getValidMoves(board, turn), [board, turn]);

  // 2. スコアの計算
  const score = useMemo(() => calculateScore(board), [board]);

  // 3. 石を置く処理
  const placePiece = (x: number, y: number) => {
    // 置けない場所なら何もしない
    const move = validMoves.find((m) => m.x === x && m.y === y);
    if (!move) return;

    // 履歴を保存
    setHistory((prev) => [...prev, board]);

    // 盤面を更新
    const nextBoard = applyMove(board, x, y, turn);
    setBoard(nextBoard);

    // 次のターンの判定
    const nextTurn = turn === "BLACK" ? "WHITE" : "BLACK";
    const nextValidMoves = getValidMoves(nextBoard, nextTurn);

    if (nextValidMoves.length > 0) {
      setTurn(nextTurn); // 通常の交代
    } else {
      // 次の人が置けない場合
      const againValidMoves = getValidMoves(nextBoard, turn);
      if (againValidMoves.length > 0) {
        // パス（同じ人のターンが続く）通知処理などをここに入れる
        console.log(`${nextTurn} passes.`);
      } else {
        // 両者置けないので終了
        console.log("Game Over");
      }
    }
  };

  // 4. ゲームリセット
  const resetGame = () => {
    setBoard(initializeBoard());
    setTurn("BLACK");
    setHistory([]);
  };

  // 5. 待った（Undo）
  const undo = () => {
    if (history.length === 0) return;
    const previousBoard = history[history.length - 1];
    setBoard(previousBoard);
    setHistory(history.slice(0, -1));
    setTurn(turn === "BLACK" ? "WHITE" : "BLACK");
  };

  // 勝敗判定
  const winner: Color | "DRAW" | null = useMemo(() => {
    const isOver = checkGameOver(board);
    if (!isOver) return null;
    if (score.BLACK > score.WHITE) return "BLACK";
    if (score.WHITE > score.BLACK) return "WHITE";
    return "DRAW";
  }, [board, score]);

  return {
    board,
    turn,
    score,
    validMoves,
    winner,
    placePiece,
    resetGame,
    undo,
    canUndo: history.length > 0,
  };
};
