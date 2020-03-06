import ButtonController from './controller/button_controller.js';
import ClockModel from './model/clock_model.js';

const mainWrapper = document.createElement('div');
mainWrapper.classList.add('main-wrapper');
document.body.prepend(mainWrapper);

function createClock(nodeType, nodeSize, city, timezone) {
    const model = new ClockModel(nodeType, nodeSize, city, timezone);
    const controller = new ButtonController(model, city);
    controller.addListeners();
    model.startClock();
}

createClock('svg', 200, 'London', 0);
createClock('canvas', 400, 'Minsk', 3);
createClock('svg', 300, 'New-York', -5);
createClock('canvas', 500, 'Tokio', 9);