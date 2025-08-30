import type { Snake, Ladder, BoardConfig } from '../types/game';

// Classic Snake and Ladder positions (1-100 numbering)
export const SNAKES: Snake[] = [
  { head: 99, tail: 54 },
  { head: 90, tail: 48 },
  { head: 76, tail: 18 },
  { head: 64, tail: 59 },
  { head: 49, tail: 23 },
  { head: 37, tail: 2 },
  { head: 28, tail: 10 },
  { head: 16, tail: 3 }
];

export const LADDERS: Ladder[] = [
  { bottom: 1, top: 38 },
  { bottom: 4, top: 14 },
  { bottom: 9, top: 31 },
  { bottom: 21, top: 42 },
  { bottom: 28, top: 84 },
  { bottom: 36, top: 44 },
  { bottom: 51, top: 67 },
  { bottom: 71, top: 91 },
  { bottom: 80, top: 100 }
];

export const BOARD_CONFIG: BoardConfig = {
  size: 10,
  snakes: SNAKES,
  ladders: LADDERS
};

// Default player colors
export const PLAYER_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4'  // Green
];

// Board numbering pattern (zigzag, 1-100 starting from bottom-right)
export const getBoardNumber = (row: number, col: number): number => {
  const boardSize = BOARD_CONFIG.size;
  
  if (row % 2 === 0) {
    // Even rows (bottom): right to left (1-10, 21-30, etc.)
    return (boardSize - row) * boardSize - col;
  } else {
    // Odd rows: left to right (11-20, 31-40, etc.)
    return (boardSize - row) * boardSize - (boardSize - 1 - col);
  }
};

// Get row and column from board number (1-100, starting from bottom-right)
export const getPositionFromNumber = (num: number): { row: number; col: number } => {
  const boardSize = BOARD_CONFIG.size;
  const row = boardSize - Math.ceil(num / boardSize);
  const col = ((num - 1) % boardSize);
  
  // Adjust for zigzag pattern (bottom row is right-to-left)
  if (Math.floor((num - 1) / boardSize) % 2 === 0) {
    return { row, col: boardSize - 1 - col };
  }
  
  return { row, col };
};
