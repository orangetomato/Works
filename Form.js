'use strict';

let lastName = prompt('Введите вашу фамилию', 'Иванов');
while (!lastName || lastName.match(/[0-9]/)) {
  alert('Ошибка');
  lastName = prompt('Введите вашу фамилию', 'Иванов');
}
let firstName = prompt('Введите ваше имя', 'Иван');
while (!firstName || firstName.match(/[0-9]/)) {
  alert('Ошибка');
  firstName = prompt('Введите ваше имя', 'Иван');
}
let patronymicName = prompt('Введите ваше отчество', 'Иванович');
while (!patronymicName || patronymicName.match(/[0-9]/)) {
  alert('Ошибка');
  patronymicName = prompt('Введите ваше отчество', 'Иванович');
}

let birthYear = Number( prompt('Введите год вашего рождения', '2000') );
let now = new Date();
while (birthYear > now.getFullYear() || birthYear < 1900) {
  alert('Ошибка');
  birthYear = Number( prompt('Введите год вашего рождения', '2000') );
}
let birthMonth = Number( prompt('Введите месяц вашего рождения', '1') );
while (birthMonth > 12 || birthMonth < 1 
  || birthYear === now.getFullYear() && birthMonth > now.getMonth() + 1) {
  alert('Ошибка');
  birthMonth = Number( prompt('Введите месяц вашего рождения', '1') );
}
let birthDay = Number( prompt('Введите день вашего рождения', '1') );
while (birthDay > 31 || birthDay < 1 
  || birthYear === now.getFullYear() && birthMonth === now.getMonth() + 1 && birthDay > now.getDate()) {
  alert('Ошибка');
  birthDay = Number( prompt('Введите день вашего рождения', '1') );
}

let birthDate = new Date(birthYear, birthMonth - 1, birthDay);
let years = now.getFullYear() - birthDate.getFullYear();
let months = now.getMonth() - birthDate.getMonth();

if (now.getMonth() < birthDate.getMonth()) {
  years -= 1;
  months += 12;
}

if (now.getDate() < birthDate.getDate()) {
  months -= 1;
  if (months < 0) {
  years -= 1;
  months += 12;
  }
}

let gender = prompt('Укажите ваш пол', 'М или Ж');
while (gender !=='М' && gender !=='Ж') {
  alert('Ошибка');
  gender = prompt('Укажите ваш пол', 'М или Ж');
}

let kids = confirm('У вас есть дети?');

let kidsNumber;
if (kids) {
  kidsNumber = Number( prompt('Сколько у вас детей?', 'Введите число') );
} else {
  kidsNumber = 0;
}
while (isNaN(kidsNumber)) {
  alert('Ошибка');
  kidsNumber = Number( prompt('Сколько у вас детей?', 'Введите число') );
}

let whoYouAre;
if (years >= 18) {
  if (gender === 'М') {
    whoYouAre = 'совершеннолетний';
  } else {
    whoYouAre = 'совершеннолетняя';
  }
} else {
  if (gender === 'М') {
    whoYouAre = 'несовершеннолетний';
  } else {
  whoYouAre = 'несовершеннолетняя';
  }
}

alert(`
  ${lastName} ${firstName} ${patronymicName}, 
  вам ${years} лет и ${months} месяцев, 
  вы ${whoYouAre},
  у вас ${kidsNumber} детей.
`);