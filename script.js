const canvas = document.getElementById("amidaCanvas");
const ctx = canvas.getContext("2d");
const cols = 5; // あみだの縦列の数
const rows = 10; // あみだの横線の数
const colWidth = canvas.width / cols;
const rowHeight = canvas.height / rows;
let lines = [];

// あみだくじの横線をランダムに生成
function generateAmida() {
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
    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1 * colWidth, line.y * rowHeight);
        ctx.lineTo(line.x2 * colWidth, line.y * rowHeight);
        ctx.stroke();
    });
}

// スタートボタンを押したときの処理
document.getElementById("startButton").addEventListener("click", function () {
    lines = [];
    generateAmida();
    drawAmida();
});

// 初期描画
drawAmida();
