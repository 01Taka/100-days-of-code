import {
  BOARD_SIZE,
  DIRECTIONS,
} from "@/src/projects/day001/constants/main.constants";
import {
  BoardState,
  Color,
  Point,
  Score,
} from "@/src/projects/day001/types/main.types";

/**
 * 盤面の初期化
 * 中央に黒・白を2つずつ配置
 */
export const initializeBoard = (): BoardState => {
  const board: BoardState = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));

  const mid = BOARD_SIZE / 2;
  board[mid - 1][mid - 1] = "WHITE";
  board[mid][mid] = "WHITE";
  board[mid - 1][mid] = "BLACK";
  board[mid][mid - 1] = "BLACK";

  return board;
};

/**
 * 特定の場所に石を置いたときに裏返せる石のリストを取得する
 */
export const getFlippablePieces = (
  board: BoardState,
  x: number,
  y: number,
  color: Color,
): Point[] => {
  if (board[y][x] !== null) return [];

  const opponent: Color = color === "BLACK" ? "WHITE" : "BLACK";
  const flippable: Point[] = [];

  for (const dir of DIRECTIONS) {
    let currentX = x + dir.x;
    let currentY = y + dir.y;
    const tempFlippable: Point[] = [];

    // 隣が相手の石である間、突き進む
    while (
      currentX >= 0 &&
      currentX < BOARD_SIZE &&
      currentY >= 0 &&
      currentY < BOARD_SIZE &&
      board[currentY][currentX] === opponent
    ) {
      tempFlippable.push({ x: currentX, y: currentY });
      currentX += dir.x;
      currentY += dir.y;
    }

    // 突き進んだ先が自分の石であれば、その間の石は裏返せる
    if (
      currentX >= 0 &&
      currentX < BOARD_SIZE &&
      currentY >= 0 &&
      currentY < BOARD_SIZE &&
      board[currentY][currentX] === color
    ) {
      flippable.push(...tempFlippable);
    }
  }

  return flippable;
};

/**
 * その場所に石が置けるか判定
 */
export const isValidMove = (
  board: BoardState,
  x: number,
  y: number,
  color: Color,
): boolean => {
  return getFlippablePieces(board, x, y, color).length > 0;
};

/**
 * 全ての有効な手をリストアップする
 */
export const getValidMoves = (board: BoardState, color: Color): Point[] => {
  const moves: Point[] = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (isValidMove(board, x, y, color)) {
        moves.push({ x, y });
      }
    }
  }
  return moves;
};

/**
 * 石を配置し、裏返した新しい盤面を返す
 */
export const applyMove = (
  board: BoardState,
  x: number,
  y: number,
  color: Color,
): BoardState => {
  const flippable = getFlippablePieces(board, x, y, color);
  if (flippable.length === 0) return board;

  // 盤面のディープコピー
  const newBoard = board.map((row) => [...row]);

  // 新しい石を置く
  newBoard[y][x] = color;

  // 石を裏返す
  flippable.forEach((p) => {
    newBoard[p.y][p.x] = color;
  });

  return newBoard;
};

/**
 * スコア計算
 */
export const calculateScore = (board: BoardState): Score => {
  let black = 0;
  let white = 0;
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "BLACK") black++;
      if (cell === "WHITE") white++;
    });
  });
  return { BLACK: black, WHITE: white };
};

/**
 * ゲーム終了判定（両者ともに打てる場所がない場合終了）
 */
export const checkGameOver = (board: BoardState): boolean => {
  const blackMoves = getValidMoves(board, "BLACK");
  const whiteMoves = getValidMoves(board, "WHITE");
  return blackMoves.length === 0 && whiteMoves.length === 0;
};
