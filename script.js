const canvas = document.getElementById("amidaCanvas");
const ctx = canvas.getContext("2d");
let cols, rows;
let colWidth, rowHeight;
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

// アニメーション付きであみだくじをたどる
async function traceAmidaAnimated(startPos) {
  let x = startPos;
  for (let i = 0; i < rows; i++) {
    drawAmida(); // 毎回あみだくじを再描画
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x * colWidth, i * rowHeight, 5, 0, 2 * Math.PI);
    ctx.fill();

    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待機

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
document
  .getElementById("runButton")
  .addEventListener("click", async function () {
    const startInput = document.getElementById("start").value.split(",");
    const resultInput = document.getElementById("result").value.split(",");

    if (startInput.length !== resultInput.length) {
      alert(`スタートと結果の項目の数を一致させてください。`);
      return;
    }

    cols = startInput.length;
    rows = 10; // 行数は固定
    colWidth = canvas.width / cols;
    rowHeight = canvas.height / rows;

    generateAmida();
    drawAmida();

    // 結果を表示
    let resultHTML = "<h2>結果</h2><ul>";
    for (let i = 0; i < cols; i++) {
      const resultPos = await traceAmidaAnimated(i); // アニメーション付きで辿る
      resultHTML += `<li>${startInput[i]} → ${resultInput[resultPos]}</li>`;
    }
    resultHTML += "</ul>";
    document.getElementById("resultArea").innerHTML = resultHTML;
  });

// 初期描画
drawAmida();
