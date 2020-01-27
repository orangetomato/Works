'use strict';

function getName(request, defaultValue) {
    let nameValue;
    do {
        nameValue = prompt(request, defaultValue);
      } while (!nameValue || nameValue.match(/[0-9]/));
    return nameValue;
}

let lastName = getName('Введите вашу фамилию', 'Иванов');
let firstName = getName('Введите ваше имя', 'Иван');
let patronymicName = getName('Введите ваше отчество', 'Иванович');

let now = new Date();
let currentYear = now.getFullYear();
let currentMonth = now.getMonth() + 1;
let currentDay = now.getDate();

let birthYear;
do {
  birthYear = Number( prompt('Введите год вашего рождения', '2000') );
} while (birthYear > currentYear || birthYear < 1900);

let birthMonth;
do {
  birthMonth = Number( prompt('Введите месяц вашего рождения', '1') );
} while (birthMonth > 12 || birthMonth < 1 
  || birthYear === currentYear && birthMonth > currentMonth);

let birthDay;
do {
  birthDay = Number( prompt('Введите день вашего рождения', '1') );
} while (birthDay > 31 || birthDay < 1 
  || birthYear === currentYear && birthMonth === currentMonth && birthDay > currentDay);

let years = currentYear - birthYear;
let months = currentMonth - birthMonth;

if (currentMonth < birthMonth) {
  years -= 1;
  months += 12;
}

if (currentDay < birthDay) {
  months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
}

let gender;
do {
  gender = prompt('Укажите ваш пол', 'М или Ж');
} while (gender !=='М' && gender !=='Ж');

let kids = confirm('У вас есть дети?');
let kidsNumber;
if (kids) {
  do {
    kidsNumber = Number( prompt('Сколько у вас детей?', 'Введите число') );
  } while (!kidsNumber);
} else {
  kidsNumber = 0;
}

let whoYouAre = (years >= 18) ? (gender === 'М') ? 'совершеннолетний' : 'совершеннолетняя' 
: (gender === 'М') ? 'несовершеннолетний' : 'несовершеннолетняя';

alert(`
  ${lastName} ${firstName} ${patronymicName}, 
  вам ${years} лет и ${months} месяцев, 
  вы ${whoYouAre},
  у вас ${kidsNumber} детей.
`);