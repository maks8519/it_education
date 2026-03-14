let currentLab = 1;

const z1 = document.getElementById("z1");
const z2 = document.getElementById("z2");
const z3 = document.getElementById("z3");

const iframe = document.getElementsByName("content-labs")[0];
const txtLabNum = document.getElementById("txtlabNum");

const labFiles = {
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

function showMessage(text) {
  iframe.removeAttribute("src");
  iframe.srcdoc = `
    <div style="font-family: Arial, sans-serif; padding: 24px;">
      <h2>${text}</h2>
    </div>
  `;
}

function load_zadanie_modi(num) {
  const url = labFiles[currentLab]?.[num];

  if (!url) {
    showMessage(`Для темы №${currentLab} материал пока не добавлен`);
    return;
  }

  iframe.removeAttribute("srcdoc");
  iframe.src = url;
}

function selectLab(labnumber) {
  currentLab = labnumber;
  txtLabNum.textContent = currentLab;

  const current = labFiles[labnumber] || {};

  z1.disabled = !current[1];
  z2.disabled = !current[2];
  z3.disabled = !current[3];

  z1.onclick = () => load_zadanie_modi(1);
  z2.onclick = () => load_zadanie_modi(2);
  z3.onclick = () => load_zadanie_modi(3);

  if (current[1]) {
    load_zadanie_modi(1);
  } else if (current[2]) {
    load_zadanie_modi(2);
  } else if (current[3]) {
    load_zadanie_modi(3);
  } else {
    showMessage(`Для темы №${currentLab} материалы пока не добавлены`);
  }
}

window.selectLab = selectLab;

selectLab(1);