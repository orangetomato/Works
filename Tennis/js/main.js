import Game from './model/game.js';
import GameControls from './controller/game_controls.js';

const mainWrapper = document.createElement('div');
mainWrapper.classList.add('main-wrapper');
document.body.prepend(mainWrapper);

const canvasWidth = 1000;
const canvasHeight = 500;

const model = new Game(canvasWidth, canvasHeight);
const controller = new GameControls(model);
controller.addListeners();