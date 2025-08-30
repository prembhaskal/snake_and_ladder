import React from 'react';
import type { Player } from '../types/game';
import './Square.css';

interface SquareProps {
  number: number;
  players: Player[];
  hasSnake?: boolean;
  hasLadder?: boolean;
  isHighlighted?: boolean;
}

const Square: React.FC<SquareProps> = ({ 
  number, 
  players, 
  hasSnake = false, 
  hasLadder = false,
  isHighlighted = false 
}) => {
  const playersOnSquare = players.filter(player => player.position === number);

  return (
    <div 
      className={`square ${hasSnake ? 'has-snake' : ''} ${hasLadder ? 'has-ladder' : ''} ${isHighlighted ? 'highlighted' : ''}`}
    >
      <div className="square-number">{number}</div>
      
      {playersOnSquare.length > 0 && (
        <div className="players-container">
          {playersOnSquare.map(player => (
            <div
              key={player.id}
              className="player-piece"
              style={{ backgroundColor: player.color }}
              title={player.name}
            >
              {player.name.charAt(0)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Square;
