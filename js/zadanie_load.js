let currentkurs = 1;

// Получаем кнопки для открытия материалов
// z1 – презентация
// z2 – лекция
// z3 – практическое задание
const z1 = document.getElementById("z1");
const z2 = document.getElementById("z2");
const z3 = document.getElementById("z3");
// Получаем iframe, в котором будет отображаться контент
const iframe = document.getElementsByName("content-kurss")[0];
// Элемент, в котором выводится номер текущей темы
const txtkursNum = document.getElementById("txtkursNum");

// Объект с файлами материалов курса
// 1 – презентация
// 2 – лекция
// 3 – практическое задание
// Для каждой темы указывается ссылка на материал
//При добавление материала можно дописать
const kursFiles = {
  1: {
    1: "https://docs.google.com/presentation/d/1Ctr83CsGmNqos_v0d66E_FZvEy2TwLdEK3iZRDTjwgI/preview",
    2: "https://docs.google.com/document/d/1X7XJ2LxRzfT6BaZ3HzfQSqwtPQaCzeJHB61Sr8uh1SE/preview",
    3: "https://docs.google.com/forms/d/e/1FAIpQLSd8Wdj3XonKyciQlW1k42sqASFi7lVRaN4Z2MkFP913T7yX6w/viewform?embedded=true"
  },
  2: {
    1: "",
    2: "",
    3: ""
  },
  3: {
    1: "",
    2: "",
    3: ""
  }
};

// Функция отображения сообщения в iframe
// Используется если материал для темы ещё не добавлен
function showMessage(text) {
  iframe.removeAttribute("src");
  iframe.srcdoc = `
    <div style="font-family: Arial, sans-serif; padding: 24px;">
      <h2>${text}</h2>
    </div>
  `;
}

function load_zadanie_modi(num) {
	 // Получаем ссылку на нужный материал
  const url = kursFiles[currentkurs]?.[num];
	// Если ссылка отсутствует — выводим сообщение
  if (!url) {
    showMessage(`Для темы №${currentkurs} материал пока не добавлен`);
    return;
  }

  iframe.removeAttribute("srcdoc");
  // Загружаем материал в iframe
  iframe.src = url;
}

function selectkurs(kursnumber) {
  currentkurs = kursnumber;
  txtkursNum.textContent = currentkurs;
  // Устанавливаем текущую тему
  const current = kursFiles[kursnumber] || {};
  
  // Если материал отсутствует — кнопки блокируются
  z1.disabled = !current[1];
  z2.disabled = !current[2];
  z3.disabled = !current[3];
  // Назначаем обработчики кнопок
  z1.onclick = () => load_zadanie_modi(1);
  z2.onclick = () => load_zadanie_modi(2);
  z3.onclick = () => load_zadanie_modi(3);
// Автоматически загружаем первый доступный материал
  if (current[1]) {
    load_zadanie_modi(1);
  } else if (current[2]) {
    load_zadanie_modi(2);
  } else if (current[3]) {
    load_zadanie_modi(3);
  } else {
    showMessage(`Для темы №${currentkurs} материалы пока не добавлены`);
  }
}
// При загрузке страницы автоматически открывается тема №1
window.selectkurs = selectkurs;

selectkurs(1);
