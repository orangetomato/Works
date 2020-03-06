export default class ButtonController {
    constructor(model, city) {
        this.model = model;
        this.city = city;
    }

    addListeners() {
        const buttonStop = document.querySelector(`.button-stop-${this.city}`);
        const buttonStart = document.querySelector(`.button-start-${this.city}`);
        buttonStop.addEventListener('click', this.model.stopClock.bind(this.model));
        buttonStart.addEventListener('click', this.model.startClock.bind(this.model));
    }
}