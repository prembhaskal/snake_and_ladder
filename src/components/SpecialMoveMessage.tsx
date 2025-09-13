import React from 'react';
import './SpecialMoveMessage.css';

interface SpecialMoveMessageProps {
  message: string;
  type: 'snake' | 'ladder';
  onAnimationEnd: () => void;
}

const SpecialMoveMessage: React.FC<SpecialMoveMessageProps> = ({ 
  message, 
  type, 
  onAnimationEnd 
}) => {
  return (
    <div 
      className={`special-move-message ${type}`}
      onAnimationEnd={onAnimationEnd}
    >
      <div className="message-content">
        <div className="message-icon">
          {type === 'snake' ? '🐍' : '🪜'}
        </div>
        <div className="message-text">{message}</div>
      </div>
    </div>
  );
};

export default SpecialMoveMessage;
