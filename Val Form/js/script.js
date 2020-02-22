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
let numberInputs = document.forms[0].querySelectorAll('[type=number]');
let emailInputs = document.forms[0].querySelectorAll('[type=email]');
let radioInputs = document.forms[0].querySelectorAll('[type=radio]');
let textareas = document.forms[0].querySelectorAll('textarea');
let fieldsList = [...textInputs, ...numberInputs, ...emailInputs, ...radioInputs, ...textareas];
let isValid;
let message;

function validate(field) {
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
    validate(field);
}

function checkNumberInput(field) {
    if (field.type === 'number' && (field.value < 0 || field.value === '')) {
        isValid = false;
        message = 'Cannot be < 0';
    } else {
        isValid = true;
    }
    numberInputs.forEach(function(input) {
        validate(input);
    });
}

function checkEmailInput(field) {
    if (field.type === 'email' && !field.value.match(/@\w/)) {
        isValid = false;
        message = 'Must include @ and domain part';
    } else {
        isValid = true;
    }
    emailInputs.forEach(function(input) {
        validate(input);
    });
}

function checkRadioInput(field) {
    let checkedItems = document.forms[0].querySelectorAll('input[type=radio]:checked');
    if (field.type === 'radio' && !checkedItems.length) {
        isValid = false;
        message = 'Choose an option';
    } else {
        isValid = true;
    }
    let radioSection = document.forms[0].querySelector('.radio-section');
    validate(radioSection);
}

function checkAllfields(field) {
    checkLength(field);
    switch (field.type) {
        case 'number':
            checkNumberInput(field);
            break;
        case 'email':
            checkEmailInput(field);
            break;
        case 'radio':
            checkRadioInput(field);
            break;
    }
}

fieldsList.forEach(function(field) {
    field.addEventListener('blur', function() {
        checkAllfields(field);
    });
});

let submit = document.forms[0].querySelector('[type=submit]');
submit.addEventListener('click', function(evt) {
    fieldsList.forEach(function(field) {
        checkAllfields(field);
        if (!isValid) {
           evt.preventDefault();
           document.querySelector('.invalid').focus();
        }
    });
});