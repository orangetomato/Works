export default class MenuView {
    constructor() {
        this._result = document.querySelector('.result');
        this._menu = document.querySelector('.menu');
        this._gameSection = document.querySelector('.game');
        this._rules = document.querySelector('.rules');
        this._highScore = document.querySelector('.high-score');
        this._settings = document.querySelector('.settings');
    }

    showResult(points) {
        const resultText = document.querySelector('.result__text');
        resultText.textContent = points;
        document.forms[0].reset();
        this._result.classList.remove('section--closed');
    }

    showMenu(requestId) {
        this.hideSection(requestId);
        this._menu.classList.remove('section--closed');
    }

    showGame() {
        this._gameSection.classList.remove('section--closed');
    }

    showRules() {
        this.hideSection();
        this._rules.classList.remove('section--closed');
    }

    showHighScore() {
        this.hideSection();
        this._highScore.classList.remove('section--closed');
    }

    showSettings() {
        this.hideSection();
        this._settings.classList.remove('section--closed');
    }

    hideSection(requestId) {
        if (!this._result.classList.contains('section--closed')) {
            this._result.classList.add('section--closed');
            return;
        }

        if (!this._menu.classList.contains('section--closed')) {
            this._menu.classList.add('section--closed');
            return;
        }

        if (!this._gameSection.classList.contains('section--closed')) {
            cancelAnimationFrame(requestId);
            this._gameSection.classList.add('section--closed');
            return;
        }

        if (!this._rules.classList.contains('section--closed')) {
            this._rules.classList.add('section--closed');
            return;
        }

        if (!this._highScore.classList.contains('section--closed')) {
            this._highScore.classList.add('section--closed');
            return;
        }

        if (!this._settings.classList.contains('section--closed')) {
            this._settings.classList.add('section--closed');
            return;
        }
    }
}