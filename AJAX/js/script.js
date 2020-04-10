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


const path1 = 'json/formDef1.json';
const path2 = 'json/formDef2.json';
const pathList = [path1, path2];

function dataLoaded(data) {
    console.log('Recieved data:', data);
    buildForm(data);
}

function errorHandler(jqXHR, statusStr, errorStr) {
    console.log(`${jqXHR.status} ${statusStr} ${errorStr}`);
}

function getDescription(paths) {
    paths.forEach(path => {
        $.ajax(path, {
            type: 'GET',
            dataType: 'json',
            success: dataLoaded,
            error: errorHandler
        });
    });
};

getDescription(pathList);