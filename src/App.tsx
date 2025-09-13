
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import SpecialMoveMessage from './components/SpecialMoveMessage';
import { useGame } from './hooks/useGame';
import './App.css';

function App() {
  const { gameState, startGame, rollDice, resetGame, getCurrentPlayer, flashingSquares } = useGame();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐍 Snake and Ladder Game 🪜</h1>
      </header>
      
      <main className="app-main">
        <div className="game-container">
          <div className="board-section">
            <GameBoard 
              players={gameState.players}
              currentPlayerPosition={getCurrentPlayer().position}
              flashingSquares={flashingSquares}
            />
          </div>
          
          <div className="controls-section">
            <GameControls
              gameState={gameState}
              currentPlayer={getCurrentPlayer()}
              onRollDice={rollDice}
              onResetGame={resetGame}
              onStartGame={startGame}
            />
          </div>
        </div>
      </main>
      
      {gameState.specialMoveMessage && (
        <SpecialMoveMessage
          message={gameState.specialMoveMessage}
          type={gameState.specialMoveMessage.includes('Snake') ? 'snake' : 'ladder'}
          onAnimationEnd={() => {}}
        />
      )}
      
      <footer className="app-footer">
        <p>Built with React & TypeScript | Deploy with GitHub Pages</p>
      </footer>
    </div>
  );
}

export default App
