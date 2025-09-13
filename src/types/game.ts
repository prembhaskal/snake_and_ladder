export interface Player {
  id: string;
  name: string;
  color: string;
  position: number;
  animatedPosition?: number; // Current position during animation
  specialAnimation?: 'snake' | 'ladder'; // Track special animation state
}

export interface Snake {
  head: number;
  tail: number;
}

export interface Ladder {
  bottom: number;
  top: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  gameStatus: 'setup' | 'playing' | 'finished';
  winner: Player | null;
  diceValue: number;
  isRolling: boolean;
  canRollAgain: boolean;
  gameHistory: GameMove[];
  isAnimating?: boolean; // Track if player movement animation is in progress
  specialMoveMessage?: string; // Message to display for special moves
}

export interface GameMove {
  playerId: string;
  playerName: string;
  diceValue: number;
  fromPosition: number;
  toPosition: number;
  specialMove?: 'snake' | 'ladder' | 'extra-turn';
  timestamp: Date;
}

export interface BoardConfig {
  size: number; // 10 for 10x10 board
  snakes: Snake[];
  ladders: Ladder[];
}
