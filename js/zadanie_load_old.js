/*Пробуем найти элемент по имени указанного у iframe*/
//console.log(document.getElementsByName("content-labs"));


//Сколько заданий в каждой ЛР
maxZadaniy = [0,5,4,5,4,4,4,4,4,1];
//ЛР 1 - 5 заданий
//ЛР2 - 4 задания и т.д.

//console.log("Мой массив:", maxZadaniy);

currentLab = 1; // по умолчанию ЛР1

//Заносим переменные для кнопок
const z1 = document.getElementById("z1");
const z2 = document.getElementById("z2");
const z3 = document.getElementById("z3");
const z4 = document.getElementById("z4");
const z5 = document.getElementById("z5");

function load_zadanie_modi(num) {
  //console.log("fc_modi:", currentLab);
  //console.log("fc_modi:", total);
  zadanie = `labs/lr${currentLab}/zadanie_${num}.html`; //путь до файла с задание
  //console.log("fc_modi:", zadanie);
  //console.log("Переменная ", zadanie);
  document.getElementsByName("content-labs")[0].removeAttribute("srcdoc"); // обязательно очищать srcdoc параметр без этого не загрузиться страница 
  document.getElementsByName("content-labs")[0].src = zadanie;
  //console.log("Переменная", num);
}

function selectLab(labnumber){
  currentLab = labnumber; //текущей работе призваевываем номер новой работы
  document.getElementById("txtlabNum").textContent = currentLab; //ставим номер открытой лабы
  total = maxZadaniy[labnumber]; //заданий в лабе
  //Если задания нет то отключаем кнопку
  z1.disabled = total < 1;
  z2.disabled = total < 2;
  z3.disabled = total < 3;
  z4.disabled = total < 4;
  z5.disabled = total < 5;
  //назначаем клик кнопок
  z1.onclick = () => load_zadanie_modi(1);
  z2.onclick = () => load_zadanie_modi(2);
  z3.onclick = () => load_zadanie_modi(3);
  z4.onclick = () => load_zadanie_modi(4);
  z5.onclick = () => load_zadanie_modi(5);
  //console.log(z1.click);
  //console.log(z1.onclick.toString());
}

selectLab(1); //по умолчанию ЛР1 