export default class GameControls {
    constructor(model) {
        this.model = model;  
        this.addListeners();
    }

    addListeners() {
        document.addEventListener('keydown', this.model.keydownHandler.bind(this.model));
        document.addEventListener('keyup', this.model.keyupHandler.bind(this.model));

        const gameButtonList = document.querySelectorAll('.game__button');
        for (let button of gameButtonList) {
            button.addEventListener('touchstart', this.model.touchstartHandler.bind(this.model, button));
        }
    }
}
