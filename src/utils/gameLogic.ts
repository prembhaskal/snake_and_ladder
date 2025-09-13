import type { Player, GameState, GameMove, Snake, Ladder } from '../types/game';
import { SNAKES, LADDERS } from './gameConfig';

export const rollDice = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

export const findSnakeAtPosition = (position: number): Snake | null => {
  return SNAKES.find(snake => snake.head === position) || null;
};

export const findLadderAtPosition = (position: number): Ladder | null => {
  return LADDERS.find(ladder => ladder.bottom === position) || null;
};

export const calculateNewPosition = (
  currentPosition: number, 
  diceValue: number
): { newPosition: number; specialMove?: 'snake' | 'ladder' } => {
  let newPosition = currentPosition + diceValue;
  
  // Can't go beyond 100
  if (newPosition > 100) {
    newPosition = currentPosition; // Stay in place if dice roll would exceed 100
  }
  
  // Check for snake
  const snake = findSnakeAtPosition(newPosition);
  if (snake) {
    return { newPosition: snake.tail, specialMove: 'snake' };
  }
  
  // Check for ladder
  const ladder = findLadderAtPosition(newPosition);
  if (ladder) {
    return { newPosition: ladder.top, specialMove: 'ladder' };
  }
  
  return { newPosition };
};

export const checkWinCondition = (position: number): boolean => {
  return position === 100;
};

export const canRollAgain = (diceValue: number): boolean => {
  return diceValue === 6;
};

export const createGameMove = (
  player: Player,
  diceValue: number,
  fromPosition: number,
  toPosition: number,
  specialMove?: 'snake' | 'ladder' | 'extra-turn'
): GameMove => {
  return {
    playerId: player.id,
    playerName: player.name,
    diceValue,
    fromPosition,
    toPosition,
    specialMove,
    timestamp: new Date()
  };
};

export const getNextPlayerIndex = (
  currentIndex: number, 
  totalPlayers: number, 
  canRollAgain: boolean
): number => {
  if (canRollAgain) {
    return currentIndex; // Same player rolls again
  }
  return (currentIndex + 1) % totalPlayers;
};

export const initializeGame = (playerNames: string[]): GameState => {
  const players: Player[] = playerNames.map((name, index) => ({
    id: `player-${index + 1}`,
    name,
    color: getPlayerColor(index),
    position: 0
  }));

  return {
    players,
    currentPlayerIndex: 0,
    gameStatus: 'setup',
    winner: null,
    diceValue: 0,
    isRolling: false,
    canRollAgain: false,
    gameHistory: []
  };
};

const getPlayerColor = (index: number): string => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  return colors[index % colors.length];
};

// Animation utility for step-by-step movement
export const animatePlayerMovement = (
  fromPosition: number,
  toPosition: number,
  onStep: (currentPosition: number) => void,
  onComplete: () => void,
  stepDelay: number = 200
): void => {
  if (fromPosition === toPosition) {
    onComplete();
    return;
  }

  let currentPos = fromPosition;
  const direction = toPosition > fromPosition ? 1 : -1;
  
  const moveStep = () => {
    currentPos += direction;
    onStep(currentPos);
    
    if (currentPos === toPosition) {
      onComplete();
    } else {
      setTimeout(moveStep, stepDelay);
    }
  };
  
  setTimeout(moveStep, stepDelay);
};
