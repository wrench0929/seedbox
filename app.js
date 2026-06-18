const data = {
  situation: ["開店前","閉店後","帰り道","雨宿り","待ち時間","掃除中","模様替え","散歩中","買い物帰り","留守番","朝支度","朝食中","昼休み","夕食後","夜更かし","寝る前","寝起き","休憩中","読書中","書き物中","片付け中","整理整頓","洗濯中","洗濯物を干す","洗濯物を取り込む","料理中","お菓子作り","食器洗い","庭の手入れ","水やり","模写中","落書き中","編み物中","工作中","修理中","探し物中","荷ほどき","引っ越し準備","衣替え","買い出し","寄り道","遠回り","道に迷う","電車待ち","バス待ち","乗り過ごし","通りがかり","待ち合わせ","見送り","出迎え","留守の間","おつかい中","昼寝の後","休日の朝","休日の午後","休日の夕方","閉店間際","開店直後","帰宅直後","外出前","ポストを確認する","本を返しに行く","図書館帰り","古本屋帰り","喫茶店にいる","喫茶店に立ち寄る","店番中","仕込み中","棚の整理","在庫確認","レジ締め","窓を開ける","窓を閉める","手紙を書く","日記を書く","写真を整理する","アルバムを見る","荷物を受け取る","忘れ物に気づく","鍵を探す"],
  object: ["手紙","傘","古い写真","鍵","レシート","本","マグカップ","花","紙袋","腕時計","しおり","メモ帳","便箋","ポストカード","切手","封筒","日記帳","ノート","アルバム","地図","チケット","回数券","整理券","会員カード","ポイントカード","名刺","学生証","社員証","診察券","乗車券","栞紐","ブックカバー","万年筆","ボールペン","インク瓶","スタンプ","印鑑","消しゴム","付箋","クリップ","コーヒー豆","ティーバッグ","空き瓶","弁当箱","お菓子の箱","クッキー缶","ジャム瓶","箸","スプーン","ランチョンマット","エコバッグ","買い物かご","財布","小銭","お釣り","商品タグ","包装紙","リボン","紙箱","段ボール","ハンカチ","マフラー","手袋","帽子","コート","ブローチ","髪留め","ボタン","靴","靴紐","観葉植物","植木鉢","種袋","押し花","風鈴","うちわ","古切符","フィルム","使いかけのノート","読みかけの本","借りた本","返し忘れた本","編みかけのマフラー","古いメモ","落とし物","忘れ物","予備の鍵","懐中時計","エアメール","カセットテープ","眼鏡","サングラス","ピアス(イヤリング)","指輪","ネクタイ","手袋"],
  emotion: ["安心","気まずい","懐かしい","誇らしい","寂しい","嬉しい","焦り","戸惑い","期待","申し訳なさ","名残惜しい","安堵","拍子抜け","照れくさい","恥ずかしい","不思議","違和感","もどかしい","惜しい","羨ましい","感心","尊敬","親しみ","愛着","微笑ましい","頼もしい","心強い","ありがたい","温かい","切ない","物悲しい","やるせない","空しい","落胆","がっかり","不安","緊張","警戒","困惑","疑問","納得","感慨深い","しみじみ","懐疑的","意外","驚き","興味","好奇心","わくわく","高揚感","なんとなく嬉しい","なんとなく寂しい","少し誇らしい","少し後悔","少し気になる","言い出せない","言いそびれる","気にかかる","ほっとする","肩の力が抜ける","気持ちが軽くなる","吹っ切れる","腑に落ちる","気が付く","思い出す"],
  theme: ["優しさ","距離感","習慣","変化","成長","気付き","信頼","約束","憧れ","すれ違い","思い出","記憶","日常","居場所","つながり","選択","継承","きっかけ","偶然","再会","別れ","出会い","受け継ぐもの","残るもの","失くしたもの","待つこと","続けること","始まり","終わり","寄り道","自分らしさ","役割","秘密","本音","勘違い","遠慮","感謝","後悔","挑戦","折り合い","変わらないもの","手放すこと","帰る場所","誰かのため","一人の時間","分かち合うこと","見守ること","受け入れること","小さな幸せ","季節の移ろい"],
  season: ["春","初夏","真夏","秋","冬","小雨","曇り","快晴","初雪","強風","台風","大雨","ゲリラ豪雨","夕立","大雪","晴れ","霧"],
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

■制約
・日常系
・派手な事件なし
・恋愛は必須ではない
・静かな余韻を重視

■お題
${enabledData}
`;

  await navigator.clipboard.writeText(prompt);
});

loadSaved();
rollAll();
renderSaved();