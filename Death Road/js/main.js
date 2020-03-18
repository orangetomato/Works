import MenuView from './views/menu_view.js';
import GameView from './views/game_view.js';
import Game from './model/game.js';
import GameControls from './controllers/game_controls.js';
import MenuListeners from './controllers/menu_listeners.js';

const canvasWidth = 600;
const canvasHeight = 600;

const menuView = new MenuView(canvasWidth, canvasHeight);
const view = new GameView();
const model = new Game(menuView, view, canvasWidth, canvasHeight);
const controller = new GameControls(model);
const menuListeners = new MenuListeners(model, menuView);