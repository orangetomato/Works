import MenuView from './views/menu_view.js';
import GameView from './views/game_view.js';
import Game from './model/game.js';
import GameControls from './controllers/game_controls.js';
import MenuListeners from './controllers/menu_listeners.js';

const canvasWidth = 600;
const canvasHeight = 600;

const menuView = new MenuView();
const view = new GameView(canvasWidth, canvasHeight);
const model = new Game(menuView, view, canvasWidth, canvasHeight);
const controller = new GameControls(model);
const menuListeners = new MenuListeners(model, menuView);




//Работа с сетью: таблица рекордов
//Логика:добавить таймер и очки, зависящие от затраченного времени

//Мобильная версия: кнопки, адаптив, тачскрин, виброотклик 
//Отображение html-разметки: позиционирование и адаптив

//Подключение аудио
//Детали отрисовки: закруглённые брёвна, разметка на дороге, картинка лягушки

//Доп. функционал: разные карты(темы) для новых раундов, разные лягушки
//Доп функционал: пауза, продолжить игру, возобновить игру после выхода