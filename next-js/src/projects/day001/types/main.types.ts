// 石の色、およびマスの状態
export type Color = "BLACK" | "WHITE";
export type CellState = Color | null; // null は石がない空マス

// 座標
export interface Point {
  x: number;
  y: number;
}

// ゲームの状態
export type GameStatus = "PLAYING" | "SKIPPED" | "FINISHED";

// 盤面 (8x8の2次元配列)
export type BoardState = CellState[][];

// 石を置いた結果のシミュレーションや確定データ
export interface MoveResult {
  pos: Point;
  flippedPieces: Point[]; // 裏返る石の座標リスト
  newBoard: BoardState; // 更新後の盤面
}

// スコア
export interface Score {
  BLACK: number;
  WHITE: number;
}

// Square (マス目) コンポーネント
export interface SquareProps {
  x: number;
  y: number;
  value: CellState;
  isValidMove: boolean; // 次に置ける場所かどうかの強調表示用
  onClick: (x: number, y: number) => void;
}

// Piece (石) コンポーネント
export interface PieceProps {
  color: Color;
  isLastMove?: boolean; // 最後に置かれた石に印をつける場合
}

// Board (盤面) コンポーネント
export interface BoardProps {
  board: BoardState;
  validMoves: Point[];
  onSquareClick: (x: number, y: number) => void;
}

// ScoreBoard コンポーネント
export interface ScoreBoardProps {
  score: Score;
  currentTurn: Color;
  winner: Color | "DRAW" | null;
}

export interface UseOthelloReturn {
  board: BoardState;
  currentTurn: Color;
  score: Score;
  status: GameStatus;
  winner: Color | "DRAW" | null;
  validMoves: Point[]; // 現在のターンで置ける場所のリスト
  placePiece: (x: number, y: number) => void;
  resetGame: () => void;
  undo: () => void; // 待った機能（オプション）
  canUndo: boolean;
}

export interface GameHistory {
  board: BoardState;
  turn: Color;
}
