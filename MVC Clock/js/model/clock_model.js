export default class ClockModel {
    constructor(view, timezone) {
        this.view = view;
        this._timezone = timezone;
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