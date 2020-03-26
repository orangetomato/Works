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
            button.addEventListener('click', this.model.clickHandler.bind(this.model, button));
        }

        const submitButton = document.querySelector('.form__button');
        submitButton.addEventListener('click', this.model.addResult.bind(this.model));
    }
}