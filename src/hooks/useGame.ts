import { useState, useCallback } from 'react';
import type { GameState, Player } from '../types/game';
import {
  rollDice,
  checkWinCondition,
  canRollAgain as canRollAgainLogic,
  createGameMove,
  getNextPlayerIndex,
  initializeGame,
  animatePlayerMovement,
  findSnakeAtPosition,
  findLadderAtPosition
} from '../utils/gameLogic';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => 
    initializeGame(['Player 1', 'Player 2'])
  );
  const [flashingSquares, setFlashingSquares] = useState<{ [key: number]: 'snake' | 'ladder' }>({});

  const startGame = useCallback((playerNames: string[]) => {
    const newGameState = initializeGame(playerNames);
    newGameState.gameStatus = 'playing';
    setGameState(newGameState);
  }, []);

  const rollDiceAction = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.isRolling || gameState.isAnimating) {
      return;
    }

    setGameState(prev => ({ ...prev, isRolling: true }));

    // Simulate dice rolling animation
    setTimeout(() => {
      const diceValue = rollDice();
      const currentPlayer = gameState.players[gameState.currentPlayerIndex];
      const startPosition = currentPlayer.position;
      const targetPosition = Math.min(startPosition + diceValue, 100);
      
      // If dice roll would exceed 100, don't move
      if (startPosition + diceValue > 100) {
        setGameState(prev => ({
          ...prev,
          diceValue,
          isRolling: false
        }));
        return;
      }

      setGameState(prev => ({
        ...prev,
        diceValue,
        isRolling: false,
        isAnimating: true,
        players: prev.players.map(player =>
          player.id === currentPlayer.id
            ? { ...player, animatedPosition: startPosition }
            : player
        )
      }));

      // Animate step-by-step movement
      animatePlayerMovement(
        startPosition,
        targetPosition,
        (currentAnimatedPosition) => {
          // Update animated position during movement
          setGameState(prev => ({
            ...prev,
            players: prev.players.map(player =>
              player.id === currentPlayer.id
                ? { ...player, animatedPosition: currentAnimatedPosition }
                : player
            )
          }));
        },
        () => {
          // Animation complete - now check for snakes/ladders and finalize
          const snake = findSnakeAtPosition(targetPosition);
          const ladder = findLadderAtPosition(targetPosition);
          
          let finalPosition = targetPosition;
          let specialMove: 'snake' | 'ladder' | undefined;
          let specialMessage = '';
          
          if (snake) {
            finalPosition = snake.tail;
            specialMove = 'snake';
            specialMessage = `Snake bite! Down to ${finalPosition}`;
          } else if (ladder) {
            finalPosition = ladder.top;
            specialMove = 'ladder';
            specialMessage = `Ladder climb! Up to ${finalPosition}`;
          }
          
          const gameMove = createGameMove(
            currentPlayer,
            diceValue,
            startPosition,
            finalPosition,
            specialMove
          );

          // If there's a snake or ladder, show dramatic animation
          if (specialMove && finalPosition !== targetPosition) {
            // Start special animation on player piece
            setGameState(prev => ({
              ...prev,
              players: prev.players.map(player =>
                player.id === currentPlayer.id
                  ? { ...player, specialAnimation: specialMove, animatedPosition: targetPosition }
                  : player
              ),
              specialMoveMessage: specialMessage
            }));

            // Flash the square
            setFlashingSquares({ [targetPosition]: specialMove });

            // After animation delay, move to final position
            setTimeout(() => {
              const updatedPlayers = gameState.players.map(player =>
                player.id === currentPlayer.id
                  ? { ...player, position: finalPosition, animatedPosition: undefined, specialAnimation: undefined }
                  : player
              );

              const isWinner = checkWinCondition(finalPosition);
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
                isAnimating: false,
                canRollAgain,
                winner: isWinner ? currentPlayer : null,
                gameStatus: isWinner ? 'finished' : 'playing',
                gameHistory: [...prev.gameHistory, gameMove],
                specialMoveMessage: undefined
              }));

              // Clear flashing squares
              setFlashingSquares({});
            }, 2000); // 2 seconds for special animation
          } else {
            // No special move, just finish normally
            const updatedPlayers = gameState.players.map(player =>
              player.id === currentPlayer.id
                ? { ...player, position: finalPosition, animatedPosition: undefined }
                : player
            );

            const isWinner = checkWinCondition(finalPosition);
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
              isAnimating: false,
              canRollAgain,
              winner: isWinner ? currentPlayer : null,
              gameStatus: isWinner ? 'finished' : 'playing',
              gameHistory: [...prev.gameHistory, gameMove]
            }));
          }
        }
      );
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
    getCurrentPlayer,
    flashingSquares
  };
};
