import SvgClockView from './views/svg_view.js';
import CanvasClockView from './views/canvas_view.js';
import ClockModel from './model/clock_model.js';
import ButtonController from './controller/button_controller.js';

const mainWrapper = document.createElement('div');
mainWrapper.classList.add('main-wrapper');
document.body.prepend(mainWrapper);

function createClock(nodeType, nodeSize, city, timezone) {
    let view;
    switch(nodeType) {
        case 'svg':
            view = new SvgClockView(nodeSize, city, timezone);
            break;
        case 'canvas':
            view = new CanvasClockView(nodeSize, city, timezone);
            break;
    }
    const model = new ClockModel(view, timezone);
    const controller = new ButtonController(model, city);
    controller.addListeners();
    model.startClock();
}

createClock('svg', 200, 'London', 0);
createClock('canvas', 400, 'Minsk', 3);
createClock('svg', 300, 'New-York', -5);
createClock('canvas', 500, 'Tokio', 9);