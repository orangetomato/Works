export default class MenuListeners {
    constructor(model, menuView) {
        this.model = model;
        this.menuView = menuView;

        const startButton = document.querySelector('.menu__button--start');
        const rulesButton = document.querySelector('.menu__button--rules');
        const highScoreButton = document.querySelector('.menu__button--high-score');
        const settingsButton = document.querySelector('.menu__button--settings');
        startButton.addEventListener('click', this.model.startGame.bind(this.model));
        rulesButton.addEventListener('click', this.menuView.showRules.bind(this.menuView));
        highScoreButton.addEventListener('click', this.menuView.showHighScore.bind(this.menuView));
        settingsButton.addEventListener('click', this.menuView.showSettings.bind(this.menuView));

        const settingsVibrationButton = document.querySelector('.settings__button--vibration');
        settingsVibrationButton.addEventListener('click', this.model.switchVibration.bind(this.model, settingsVibrationButton));

        const settingsSoundsButton = document.querySelector('.settings__button--sounds');
        settingsSoundsButton.addEventListener('click', this.model.switchSounds.bind(this.model, settingsSoundsButton));
        
        const menuButtonsList = document.querySelectorAll('.back-to-menu-button');
        for (let button of menuButtonsList) {
            button.addEventListener('click', this.menuView.showMenu.bind(this.menuView));
        }

        document.addEventListener('keydown', this.model.keydownHandler.bind(this.model));
    }
}