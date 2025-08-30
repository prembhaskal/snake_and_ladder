export interface Player {
  id: string;
  name: string;
  color: string;
  position: number;
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
