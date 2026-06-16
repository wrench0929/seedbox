const data = {
  situation: ["開店前","閉店後","帰り道","雨宿り","待ち時間","掃除中","模様替え","散歩中","買い物帰り","留守番"],
  object: ["手紙","傘","古い写真","鍵","レシート","本","マグカップ","花","紙袋","腕時計"],
  emotion: ["安心","気まずい","懐かしい","誇らしい","寂しい","嬉しい","焦り","戸惑い","期待","申し訳なさ"],
  theme: ["優しさ","距離感","習慣","変化","成長","気付き","信頼","約束","憧れ","すれ違い"],
  season: ["春","初夏","真夏","秋","冬","小雨","曇り","快晴","初雪","強風"],
  time: ["早朝","朝","昼前","昼下がり","夕方","日暮れ","夜","深夜","明け方","正午"]
};

const state = {
  situation: { enabled: true, locked: false, value: "" },
  object: { enabled: true, locked: false, value: "" },
  emotion: { enabled: true, locked: false, value: "" },
  theme: { enabled: true, locked: false, value: "" },
  season: { enabled: true, locked: false, value: "" },
  time: { enabled: true, locked: false, value: "" }
};

let saved = [];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollAll() {
  Object.keys(state).forEach(k => {
    if (!state[k].locked) {
      state[k].value = random(data[k]);
    }
  });

  render();
  renderResult();
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  Object.keys(state).forEach(key => {
    const row = document.createElement("div");
    row.className = "card";

    if (!state[key].enabled) row.classList.add("off");
    if (state[key].locked) row.classList.add("locked");

    row.innerHTML = `
      <input type="checkbox" ${state[key].enabled ? "checked" : ""}
        onchange="toggleEnable('${key}')">

      <div class="label">${key}</div>

      <div class="value">${state[key].value || "—"}</div>

      <div class="actions">
        <button onclick="roll('${key}')">🔄</button>
        <button onclick="toggleLock('${key}')">
          ${state[key].locked ? "🔒" : "🔓"}
        </button>
      </div>
    `;

    app.appendChild(row);
  });
}

function roll(key) {
  if (state[key].locked) return;
  state[key].value = random(data[key]);
  render();
  renderResult();
}

function toggleLock(key) {
  state[key].locked = !state[key].locked;
  render();
}

function toggleEnable(key) {
  state[key].enabled = !state[key].enabled;
  render();
  renderResult();
}

function renderResult() {
  let text = "";

  Object.keys(state).forEach(k => {
    if (state[k].enabled && state[k].value) {
      text += `${k}：${state[k].value}\n`;
    }
  });

  document.getElementById("result").textContent = text;
}

function restoreEntry(entry) {
  Object.keys(entry).forEach(k => {
    if (state[k]) {
      state[k].value = entry[k];
    }
  });

  render();
  renderResult();
}

function saveCurrent() {
  const entry = {};

  Object.keys(state).forEach(k => {
    if (state[k].enabled && state[k].value) {
      entry[k] = state[k].value;
    }
  });

  const name = document.getElementById("save-name").value || "無題";
  const memo = document.getElementById("save-memo").value || "";

  saved.push({
    name,
    memo,
    data: entry
  });

  localStorage.setItem("seedbox_saved", JSON.stringify(saved));
  renderSaved();
}

function loadSaved() {
  const d = localStorage.getItem("seedbox_saved");
  saved = d ? JSON.parse(d) : [];
}

function deleteSave(i) {
  saved.splice(i, 1);
  localStorage.setItem("seedbox_saved", JSON.stringify(saved));
  renderSaved();
}

function rerollFromSave(i) {
  const entry = saved[i].data;

  Object.keys(entry).forEach(k => {
    state[k].value = random(data[k]);
  });

  render();
  renderResult();
}

function renderSaved() {
  const box = document.getElementById("saved");
  box.innerHTML = "";

  saved.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "saved-item";

    const text = document.createElement("div");
    text.className = "saved-text";

    text.innerHTML = `
      <strong>${s.name}</strong><br>
      <small>${Object.values(s.data).join(" / ")}</small><br>
      <small>${s.memo || ""}</small>
    `;

    const buttons = document.createElement("div");
    buttons.className = "saved-buttons";

    const restoreBtn = document.createElement("button");
    restoreBtn.textContent = "↩";
    restoreBtn.onclick = () => restoreEntry(s.data);

    const rerollBtn = document.createElement("button");
    rerollBtn.textContent = "🔁";
    rerollBtn.onclick = () => rerollFromSave(i);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = () => deleteSave(i);

    buttons.appendChild(restoreBtn);
    buttons.appendChild(rerollBtn);
    buttons.appendChild(delBtn);

    div.appendChild(text);
    div.appendChild(buttons);
    box.appendChild(div);
  });
}

document.getElementById("reroll").addEventListener("click", rollAll);

document.getElementById("copy").addEventListener("click", () => {
  navigator.clipboard.writeText(document.getElementById("result").textContent);
});

document.getElementById("save-btn").addEventListener("click", saveCurrent);

document.getElementById("ai-generate").addEventListener("click", async () => {
  const enabledData = Object.keys(state)
    .filter(k => state[k].enabled && state[k].value)
    .map(k => `${k}：${state[k].value}`)
    .join("\n");

  const prompt =
`あなたは日常系漫画の脚本家です。

以下の要素から短編漫画のネタを3案作ってください。

■お題
${enabledData}
`;

  await navigator.clipboard.writeText(prompt);
});

loadSaved();
rollAll();
renderSaved();