import { useState, useCallback } from 'react';
import type { GameState, Player } from '../types/game';
import {
  rollDice,
  calculateNewPosition,
  checkWinCondition,
  canRollAgain as canRollAgainLogic,
  createGameMove,
  getNextPlayerIndex,
  initializeGame
} from '../utils/gameLogic';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => 
    initializeGame(['Player 1', 'Player 2'])
  );

  const startGame = useCallback((playerNames: string[]) => {
    const newGameState = initializeGame(playerNames);
    newGameState.gameStatus = 'playing';
    setGameState(newGameState);
  }, []);

  const rollDiceAction = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.isRolling) {
      return;
    }

    setGameState(prev => ({ ...prev, isRolling: true }));

    // Simulate dice rolling animation
    setTimeout(() => {
      const diceValue = rollDice();
      const currentPlayer = gameState.players[gameState.currentPlayerIndex];
      const { newPosition, specialMove } = calculateNewPosition(
        currentPlayer.position,
        diceValue
      );

      const gameMove = createGameMove(
        currentPlayer,
        diceValue,
        currentPlayer.position,
        newPosition,
        specialMove
      );

      const updatedPlayers = gameState.players.map(player =>
        player.id === currentPlayer.id
          ? { ...player, position: newPosition }
          : player
      );

      const isWinner = checkWinCondition(newPosition);
      const canRollAgain = canRollAgainLogic(diceValue) && !isWinner;
      const nextPlayerIndex = getNextPlayerIndex(
        gameState.currentPlayerIndex,
        gameState.players.length,
        canRollAgain
      );

      setGameState(prev => ({
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: nextPlayerIndex,
        diceValue,
        isRolling: false,
        canRollAgain,
        winner: isWinner ? currentPlayer : null,
        gameStatus: isWinner ? 'finished' : 'playing',
        gameHistory: [...prev.gameHistory, gameMove]
      }));
    }, 1000); // 1 second dice roll animation
  }, [gameState]);

  const resetGame = useCallback(() => {
    const playerNames = gameState.players.map(player => player.name);
    setGameState(initializeGame(playerNames));
  }, [gameState.players]);

  const getCurrentPlayer = useCallback((): Player => {
    return gameState.players[gameState.currentPlayerIndex];
  }, [gameState.players, gameState.currentPlayerIndex]);

  return {
    gameState,
    startGame,
    rollDice: rollDiceAction,
    resetGame,
    getCurrentPlayer
  };
};
