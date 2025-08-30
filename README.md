# 🐍 Snake and Ladder Game 🪜

A classic Snake and Ladder board game built with React, TypeScript, and Vite. Play with friends and experience the timeless fun of this traditional game!

## 🎮 Game Features

- **Two-Player Mode**: Take turns with a friend
- **Interactive Dice**: Click to roll with smooth animations
- **Classic Rules**: 
  - Roll a 6 to get an extra turn
  - Snakes slide you down
  - Ladders boost you up
  - First to reach 100 wins!
- **Beautiful UI**: Modern design with smooth animations
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: See player positions and game status instantly

## 🚀 Live Demo

Play the game online: [https://prembhaskal.github.io/snake_and_ladder](https://prembhaskal.github.io/snake_and_ladder)

## 🛠️ Technologies Used

- **React 19** with TypeScript
- **Vite** for fast development and building
- **CSS3** with modern styling and animations
- **GitHub Pages** for deployment

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # 10x10 game board
│   ├── Square.tsx      # Individual board squares
│   ├── Dice.tsx        # Interactive dice component
│   └── GameControls.tsx # Game controls and player info
├── hooks/              # Custom React hooks
│   └── useGame.ts      # Game state management
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related types
├── utils/              # Utility functions
│   ├── gameConfig.ts   # Board configuration
│   └── gameLogic.ts    # Game rules and logic
└── styles/             # CSS files
```

## 🎯 Game Rules

1. **Setup**: Enter player names and start the game
2. **Turns**: Players take turns rolling the dice
3. **Movement**: Move your piece forward by the dice value
4. **Snakes**: Landing on a snake head slides you down to its tail
5. **Ladders**: Landing on a ladder bottom climbs you up to its top
6. **Extra Turn**: Rolling a 6 gives you another turn
7. **Winning**: First player to reach exactly square 100 wins
8. **Overflow**: If your dice roll would take you past 100, you stay in place

## 🚀 Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/prembhaskal/snake_and_ladder.git
cd snake_and_ladder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Deployment to GitHub Pages

The project is configured for easy deployment to GitHub Pages:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## 🎨 Customization

### Adding More Snakes and Ladders

Edit `src/utils/gameConfig.ts` to modify the snake and ladder positions:

```typescript
export const SNAKES: Snake[] = [
  { head: 99, tail: 54 },
  // Add more snakes...
];

export const LADDERS: Ladder[] = [
  { bottom: 1, top: 38 },
  // Add more ladders...
];
```

### Changing Player Colors

Modify the `PLAYER_COLORS` array in `gameConfig.ts`:

```typescript
export const PLAYER_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  // Add more colors...
];
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Classic Snake and Ladder game rules
- React and TypeScript communities
- Vite for the amazing development experience