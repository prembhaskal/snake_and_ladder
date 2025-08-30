import React from 'react';
import './Dice.css';

interface DiceProps {
  value: number;
  isRolling: boolean;
  onRoll: () => void;
  disabled?: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, isRolling, onRoll, disabled = false }) => {
  const getDiceFace = (num: number) => {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return faces[num - 1] || '⚀';
  };

  return (
    <div className="dice-container">
      <div 
        className={`dice ${isRolling ? 'rolling' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={!disabled && !isRolling ? onRoll : undefined}
      >
        <div className="dice-face">
          {isRolling ? '🎲' : getDiceFace(value)}
        </div>
      </div>
      <button 
        className="roll-button"
        onClick={onRoll}
        disabled={disabled || isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default Dice;
