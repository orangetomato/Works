'use strict';

function buildForm(arr) {
    let form = document.createElement('form');
    form.method = 'post';
    form.action = 'https://fe.it-academy.by/TestForm.php';
    document.body.prepend(form);

    for (let item of arr) {
        let div = document.createElement('div');
        div.classList.add('form-section');

        let label = document.createElement('label');
        label.append(item.label);

        function addInput(kind) {
            let input = document.createElement('input');
            input.name = item.name;
            input.type = kind;
            div.append(label, input);
        }

        function addSelect() {
            let select = document.createElement('select');
            select.name = item.name;
            div.append(label, select);
            select.append(new Option('Сделайте выбор', 0));
            for (let selectItem of item.variants) {
                let option = new Option(selectItem.text, selectItem.value);
                select.append(option);
            }
        }

        function addRadio() {       
            div.append(label);
            let radioDiv = document.createElement('div');
            radioDiv.classList.add('radio-section');
            for (let radioItem of item.variants) {
                let input = document.createElement('input');
                input.type = item.kind;
                input.name = item.name;
                input.value = radioItem.value;

                label = document.createElement('label');
                label.append(input, radioItem.text);
                radioDiv.append(label);
            }
            div.append(radioDiv);
        }

        function addTextarea() {
            let textarea = document.createElement('textarea');
            textarea.name = item.name;
            div.append(label, textarea);
        }

        function addSubmit() {
            let input = document.createElement('input');
            input.type = 'submit';
            input.value = item.label;
            div.append(input);
        }

        switch (item.kind) {
            case 'longtext':
                addInput('text');
                break;

            case 'number':
                addInput('number');
                break;

            case 'shorttext':
                addInput('email');
                break;

            case 'check':
                addInput('checkbox');
                break;

            case 'combo':
                addSelect();
                break;

            case 'radio':
                addRadio();
                break;

            case 'memo':
                addTextarea();
                break;

            case 'submit':
                addSubmit();
                break;
        }
        form.append(div);
    }
}

let formDef1 = [
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {label:'Опубликовать',kind:'submit'},
];

let formDef2 = [
    {label:'Фамилия:',kind:'longtext',name:'lastname'},
    {label:'Имя:',kind:'longtext',name:'firstname'},
    {label:'Отчество:',kind:'longtext',name:'secondname'},
    {label:'Возраст:',kind:'number',name:'age'},
    {label:'Зарегистрироваться',kind:'submit'},
];

buildForm(formDef2);
buildForm(formDef1);


let textInputs = document.forms[0].querySelectorAll('[type=text]');
let numberInput = document.forms[0].querySelector('[type=number]');
let emailInput = document.forms[0].querySelector('[type=email]');
let select = document.forms[0].querySelector('select');
let radioButtons = [...document.forms[0].querySelectorAll('[type=radio]')];
let checkbox = document.forms[0].querySelector('[type=checkbox]');
let textarea = document.forms[0].querySelector('textarea');

let textElements = [...textInputs, numberInput, emailInput, textarea];
let selectElements = [select, ...radioButtons, checkbox];
let fieldsList = [...textElements, ...selectElements];
let radioSection = document.forms[0].querySelector('.radio-section');
let isValid;
let message;

function switchMessage(field) {
    if (!isValid) {
        field.classList.add('invalid');
        if (!field.nextElementSibling) {
            field.insertAdjacentHTML('afterend', `<p class="error-message">${message}</p>`);
        }
    } else {
        field.classList.remove('invalid');
        if (field.nextElementSibling) {
            field.nextElementSibling.remove();
        }
    }
}

function checkLength(field) {
    if (!field.value) {
        isValid = false;
        message = 'Must contain at least 1 character';
    } else {
        isValid = true;
    }
}

function checkNumbers(field) {
    if (field.value < 0 || field.value === '') {
        isValid = false;
        message = 'Should be a positive number or 0';
    } else {
        isValid = true;
    }
}

function checkEmail(field) {
    if (!field.value.match(/@\w/)) {
        isValid = false;
        message = 'Must include @ and a domain part';
    } else {
        isValid = true;
    }
}

function checkOptions(field) {
    let isChecked = radioButtons.some(button => button.checked);
    if ( (field.type === 'select-one' && !field.options.selectedIndex) || 
         (field.type === 'radio' && !isChecked) || 
         (field.type === 'checkbox' && !field.checked) ) {
        isValid = false;
        message = 'Choose an option';
    } else {
        isValid = true;
    }
}

function validate(field) {
        
    switch (field.type) {
        case 'text':
        case 'textarea':
            checkLength(field);
            break;
        case 'number':
            checkNumbers(field);
            break;
        case 'email':
            checkEmail(field);
            break;
        case 'select-one':
        case 'radio':
        case 'checkbox':
            checkOptions(field);
            break;
    }
    
    switchMessage(field.type === 'radio' ? radioSection : field);
}

function clickHandler(evt) {
    fieldsList.forEach(field => {
        validate(field);
        if (!isValid) {
           evt.preventDefault();
           document.querySelector('.invalid').focus();
        }
    });
}

let submit = document.forms[0].querySelector('[type=submit]');
submit.addEventListener('click', clickHandler);

textElements.forEach(field => field.addEventListener('blur', () => validate(field)));
selectElements.forEach(field => field.addEventListener('change', () => validate(field)));