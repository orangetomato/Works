export default class GameControls {
    constructor(model) {
        this.model = model;  
        this.addListeners();
    }

    addListeners() {
        document.addEventListener('keydown', this.model.keydownHandler.bind(this.model));
        document.addEventListener('keyup', this.model.keyupHandler.bind(this.model));
    }
}