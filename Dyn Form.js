'use strict';

function buildForm(arr) {
    let form = document.createElement('form');
    form.method = 'post';
    form.action = 'https://fe.it-academy.by/TestForm.php';
    document.body.prepend(form);
    
    let table = document.createElement('table');
    form.append(table);

    for (let item of arr) {
        let tr = document.createElement('tr');
        table.append(tr);

        let td1 = document.createElement('td');
        tr.append(td1);

        let td2 = document.createElement('td');
        tr.append(td2);
        
        let label = document.createElement('label');
        label.append(item.label);
        let id = item.name;
        label.htmlFor = id;
        td1.append(label);

        if (item.kind === 'longtext') {
            let newEl = document.createElement('input');
            newEl.type = 'text';
            newEl.name = item.name;
            newEl.id = id;
            newEl.style.width = `${400}px`;
            td2.append(newEl);            
        }

        if (item.kind === 'number') {
            let newEl = document.createElement('input');
            newEl.type = 'number';
            newEl.name = item.name;
            newEl.id = id;
            newEl.style.width = `${100}px`;
            td2.append(newEl);            
        }
                
        if (item.kind === 'shorttext') {
            let newEl = document.createElement('input');
            newEl.type = 'email';
            newEl.name = item.name;
            newEl.id = id;
            newEl.style.width = `${200}px`;
            td2.append(newEl);            
        }
            
        if (item.kind === 'combo') {
            let newEl = document.createElement('select');
            newEl.name = item.name;
            newEl.id = id;
            newEl.style.width = `${200}px`;
            td2.append(newEl);
            for (let selectItem of item.variants) {
                let option = document.createElement('option');
                option.value = selectItem.value;
                option.append(selectItem.text);
                newEl.append(option);
            }
            newEl.lastElementChild.selected = true;
        }

        if (item.kind === 'radio') {
            for (let radioItem of item.variants) {
                let newEl = document.createElement('input');
                newEl.type = 'radio';
                newEl.name = item.name;
                newEl.id = radioItem.value;
                newEl.value = radioItem.value;
                td2.append(newEl);
                
                let label = document.createElement('label');
                label.append(radioItem.text);
                label.htmlFor = newEl.id;
                td2.append(label);
            }
        }

        if (item.kind === 'check') {
            let newEl = document.createElement('input');
            newEl.type = 'checkbox';
            newEl.name = item.name;
            newEl.id = id;         
            newEl.checked = true;
            td2.append(newEl);
        }
        
        if (item.kind === 'memo') {
            let br = document.createElement('br');
            td1.append(br);

            let newEl = document.createElement('textarea');
            newEl.name = item.name;
            newEl.id = id;
            newEl.style.width = `${550}px`;
            newEl.style.height = `${50}px`;
            td1.colSpan = '2';
            td1.append(newEl);
        }
        
        if (item.kind === 'submit') {
            let newEl = document.createElement('input');
            newEl.type = 'submit';
            newEl.value = item.label;
            newEl.style.marginBottom = `${20}px`;
            td1.colSpan = '2';
            td1.append(newEl);
            label.remove();
        }
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