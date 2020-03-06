import SvgClockView from '../views/svg_view.js';
import CanvasClockView from '../views/canvas_view.js';

export default class ClockModel {
    constructor(nodeType, nodeSize, city, timezone) {
        this._timezone = timezone;
        
        switch(nodeType) {
            case 'svg':
                this.view = new SvgClockView(nodeSize, city, timezone);
                break;
            case 'canvas':
                this.view = new CanvasClockView(nodeSize, city, timezone);
                break;
        }
    }

    updateTime() {
        const now = new Date();
        this.view.update(now, this._timezone);
    }

    stopClock() {
        clearInterval(this._intervalId);
    }

    startClock() {     
        if (this._intervalId) {
            clearInterval(this._intervalId);
        }

        this.updateTime();
        this._intervalId = setInterval(this.updateTime.bind(this), 1000);
    }
}