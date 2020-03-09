export default class GameControls {
    constructor(model) {
        this.model = model;  
        this.addListeners();
    }

    addListeners() {
        const startButton = document.querySelector('.start-button');
        startButton.addEventListener('click', this.model.start.bind(this.model));
        document.addEventListener('keydown', this.model.keydownHandler.bind(this.model));
        document.addEventListener('keyup', this.model.keyupHandler.bind(this.model));
    }
}