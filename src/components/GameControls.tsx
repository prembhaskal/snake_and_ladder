import React from 'react';
import type { Player, GameState } from '../types/game';
import Dice from './Dice';
import './GameControls.css';

interface GameControlsProps {
  gameState: GameState;
  currentPlayer: Player;
  onRollDice: () => void;
  onResetGame: () => void;
  onStartGame: (playerNames: string[]) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  currentPlayer,
  onRollDice,
  onResetGame,
  onStartGame
}) => {
  const [player1Name, setPlayer1Name] = React.useState('Player 1');
  const [player2Name, setPlayer2Name] = React.useState('Player 2');

  const handleStartGame = () => {
    onStartGame([player1Name, player2Name]);
  };

  if (gameState.gameStatus === 'setup') {
    return (
      <div className="game-controls setup">
        <h2>Snake and Ladder Game</h2>
        <div className="player-setup">
          <div className="player-input">
            <label htmlFor="player1">Player 1 Name:</label>
            <input
              id="player1"
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder="Enter player 1 name"
            />
          </div>
          <div className="player-input">
            <label htmlFor="player2">Player 2 Name:</label>
            <input
              id="player2"
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Enter player 2 name"
            />
          </div>
          <button className="start-button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-controls playing">
      <div className="game-status">
        {gameState.gameStatus === 'finished' && gameState.winner ? (
          <div className="winner-announcement">
            <h2>🎉 {gameState.winner.name} Wins! 🎉</h2>
            <button className="reset-button" onClick={onResetGame}>
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="current-player">
              <h3>Current Player:</h3>
              <div 
                className="player-indicator"
                style={{ backgroundColor: currentPlayer.color }}
              >
                {currentPlayer.name}
              </div>
              <div className="player-position">
                Position: {currentPlayer.position}
              </div>
            </div>
            
            <Dice
              value={gameState.diceValue}
              isRolling={gameState.isRolling}
              onRoll={onRollDice}
              disabled={gameState.gameStatus !== 'playing'}
            />
            
            {gameState.canRollAgain && (
              <div className="extra-turn-message">
                🎲 You rolled a 6! Roll again!
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="players-info">
        <h4>Players:</h4>
        {gameState.players.map(player => (
          <div 
            key={player.id} 
            className={`player-info ${player.id === currentPlayer.id ? 'active' : ''}`}
          >
            <div 
              className="player-color"
              style={{ backgroundColor: player.color }}
            ></div>
            <span className="player-name">{player.name}</span>
            <span className="player-pos">Pos: {player.position}</span>
          </div>
        ))}
      </div>
      
      <button className="reset-button" onClick={onResetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default GameControls;
