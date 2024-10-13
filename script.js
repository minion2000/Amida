const canvas = document.getElementById("amidaCanvas");
const ctx = canvas.getContext("2d");
const cols = 5; // あみだの縦列の数（スタート・結果は5つに固定）
const rows = 10; // あみだの横線の数
const colWidth = canvas.width / cols;
const rowHeight = canvas.height / rows;
let lines = [];

// あみだくじの横線をランダムに生成
function generateAmida() {
  lines = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (Math.random() > 0.5) {
        lines.push({ x1: j, x2: j + 1, y: i });
      }
    }
  }
}

// あみだくじを描画
function drawAmida() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 縦線を描く
  for (let i = 0; i < cols; i++) {
    ctx.beginPath();
    ctx.moveTo(i * colWidth, 0);
    ctx.lineTo(i * colWidth, canvas.height);
    ctx.stroke();
  }

  // 横線を描く
  lines.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(line.x1 * colWidth, line.y * rowHeight);
    ctx.lineTo(line.x2 * colWidth, line.y * rowHeight);
    ctx.stroke();
  });
}

// スタートから結果への経路をたどる
function traceAmida(startPos) {
  let x = startPos;
  for (let i = 0; i < rows; i++) {
    lines.forEach((line) => {
      if (line.y === i) {
        if (line.x1 === x) {
          x = line.x2;
        } else if (line.x2 === x) {
          x = line.x1;
        }
      }
    });
  }
  return x;
}

// 実行ボタンを押したときの処理
document.getElementById("runButton").addEventListener("click", function () {
  const startInput = document.getElementById("start").value.split(",");
  const resultInput = document.getElementById("result").value.split(",");

  if (startInput.length !== cols || resultInput.length !== cols) {
    alert(`スタートと結果の項目は${cols}個ずつ入力してください。`);
    return;
  }

  generateAmida();
  drawAmida();

  // 結果を表示
  let resultHTML = "<h2>結果</h2><ul>";
  for (let i = 0; i < cols; i++) {
    const resultPos = traceAmida(i);
    resultHTML += `<li>${startInput[i]} → ${resultInput[resultPos]}</li>`;
  }
  resultHTML += "</ul>";
  document.getElementById("resultArea").innerHTML = resultHTML;
});

// 初期描画
drawAmida();
