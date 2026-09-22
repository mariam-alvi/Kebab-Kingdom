import { Game } from './game/Game';

// The <div id="app"> element from index.html is where our 3D canvas will be mounted.
const container = document.querySelector<HTMLDivElement>('#app')!;

const game = new Game(container);
game.start();
