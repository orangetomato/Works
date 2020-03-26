import Sounds from './sounds/sounds.js';
import MenuView from './views/menu_view.js';
import GameView from './views/game_view.js';
import Game from './model/game.js';
import GameControls from './controllers/game_controls.js';
import MenuListeners from './controllers/menu_listeners.js';

const firebaseConfig = {
    apiKey: 'AIzaSyCy3SVStNwd_xnJEUnMmdIkktmNIgXqAjE',
    authDomain: 'death-road-game.firebaseapp.com',
    databaseURL: 'https://death-road-game.firebaseio.com',
    projectId: 'death-road-game',
    storageBucket: 'death-road-game.appspot.com',
    messagingSenderId: '156431789143',
    appId: '1:156431789143:web:f745ff9c51de7c64fb4712'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const ref = database.ref('scores');

const canvasWidth = 600;
const canvasHeight = 600;

const sounds = new Sounds(); 
const menuView = new MenuView();
const view = new GameView(canvasWidth, canvasHeight);
const model = new Game(menuView, view, sounds, canvasWidth, canvasHeight, ref);
const controller = new GameControls(model);
const menuListeners = new MenuListeners(model, menuView);