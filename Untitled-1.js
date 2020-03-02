class Model {
    constructor(view) {
        this.view = view;
        let intervalId = null;
    }

    updateView() {
        this.view.update();
    }
    
    startClock() {
        intervalId = setInterval(updateView, 1000);
    }

    stopClock() {
        clearInterval(intervalId);
    }
}

class Controller {
    constructor(model, field) {
        this.model = model;
        this.field = field;
        buttonStop.addEventListener('click', stopClock);
        buttonStart.addEventListener('click', startClock);
    }
}

class View {
    constructor(model, field) {
        this.model = model;
        this.field = field;
    }

    update();//render()
}