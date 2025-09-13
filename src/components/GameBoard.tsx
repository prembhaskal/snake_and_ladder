import React from 'react';
import Square from './Square';
import type { Player } from '../types/game';
import { BOARD_CONFIG, getBoardNumber } from '../utils/gameConfig';
import { findSnakeAtPosition, findLadderAtPosition } from '../utils/gameLogic';
import './GameBoard.css';

interface GameBoardProps {
  players: Player[];
  currentPlayerPosition?: number;
  flashingSquares?: { [key: number]: 'snake' | 'ladder' };
}

const GameBoard: React.FC<GameBoardProps> = ({ players, currentPlayerPosition, flashingSquares = {} }) => {
  const boardSize = BOARD_CONFIG.size;
  
  const renderBoard = () => {
    const rows = [];
    
    for (let row = 0; row < boardSize; row++) {
      const squares = [];
      
      for (let col = 0; col < boardSize; col++) {
        const squareNumber = getBoardNumber(row, col);
        const hasSnake = !!findSnakeAtPosition(squareNumber);
        const hasLadder = !!findLadderAtPosition(squareNumber);
        const isHighlighted = currentPlayerPosition === squareNumber;
        const flashType = flashingSquares[squareNumber];
        
        squares.push(
          <Square
            key={squareNumber}
            number={squareNumber}
            players={players}
            hasSnake={hasSnake}
            hasLadder={hasLadder}
            isHighlighted={isHighlighted}
            isSnakeFlashing={flashType === 'snake'}
            isLadderFlashing={flashType === 'ladder'}
          />
        );
      }
      
      rows.push(
        <div key={row} className="board-row">
          {squares}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="game-board">
      <div className="board-container">
        <div className="board-wrapper">
          <div className="board-grid">
            {renderBoard()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
