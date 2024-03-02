// 各アーティスト5枚画像用意する


const startButton = document.getElementById("startButton");
const mainImage = document.getElementById("mainImage");

const closeButton = document.getElementById("closeButton");

const artistButton = document.querySelectorAll(".artistButton");
const lastComment = document.getElementById("lastComment");

let img = document.getElementById("mainImage-image");

// 画像のファイル名
let num =0;
// アーティストのインデックス番号
let artistNo =0;
// 回数カウンター
let counter = 0;
// 所要時間(秒数)
let result = 0;
// 得点
let point = 0;
// 得点の合計値
let pointAll =0;

//スタートボタンを押したらfalseに
//アーティストボタンを押したらtrueに
let flag = true;

// 開始時間
let beforeTime = 0;


startButton.addEventListener("click", () => {
    // 前回の色付けのリセット
    artistButton.forEach((arButton) => {
        arButton.classList.remove("miss");
        arButton.classList.remove("ok");
    });
    // スタートボタンの中身を「START」から「次へ」に変える
    startButton.innerHTML = "次へ";
    // 本処理
    if(flag) {
        // 値のリセット
        // 5回目以降のクリック時に5回目のartistNoの値を保持しないようにするため
        artistNo =0;
        if(counter <5) {
            num = Math.floor( Math.random() * 60) + 1;
            img.src = `img/${num}.png`;
            // スタートの時間計測開始
            beforeTime = Date.now();
            // カウンターの更新
            counter++;
            // フラグの更新
            flag = false;

            // 画像の番号によってアーティストごとに番号を割り振る
            if(num <=5) {
                // まふまふ
                artistNo = 1;
            }else if(num <=10) {
                // そらる
                artistNo = 2;
            }else if(num <=15) {
                // うらたぬき
                artistNo = 3;
            }else if(num <=20) {
                // となりの坂田
                artistNo = 4;
            }else if(num <=25) {
                // 天月-あまつき-
                artistNo = 5;
            }else if(num <=30) {
                // luz
                artistNo = 6;
            }else if(num <=35) {
                // 志麻
                artistNo = 7;
            }else if(num <=40) {
                // センラ
                artistNo = 8;
            }else if(num <=45) {
                // ウォルピスカーター
                artistNo = 9;
            }else if(num <=50) {
                // Gero
                artistNo = 10;
            }else if(num <=55) {
                // ＋α／あるふぁきゅん。
                artistNo = 11;
            }else{
                // けーぽん
                artistNo = 12;
            }
        }else {
            // 終了を知らせる画像を表示する
            img.src = `img/1000.png`;
        }
    }
});

artistButton.forEach((arButton) => {
    arButton.addEventListener("click", () => {
        if(arButton.value != artistNo) {
            arButton.classList.add("miss");
        }
        if(flag == false && arButton.value == artistNo) {
            arButton.classList.add("ok");
            let afterTime = Date.now();
            // resultが秒数
            result = (afterTime - beforeTime)/1000;
            // 以下に秒数ごとに評価をつける（0~20点で）
            // 1回5問で100点満点にする
            if(result <= 1.3) {
                point = 20;
            }else if (result <= 2.3) {
                point = 15;
            }else if (result <= 3.3) {
                point = 10;
            }else if (result <= 4.3) {
                point = 5;
            }else {
                point = 1;
            }
            // 得点(point)を結果テーブルに入力する
            let pointBoard = document.getElementById(`pointBoard${counter}`);
            pointBoard.innerHTML = point;
            // 特典の合算
            pointAll += point;
            // 合計点の代入
            let pointBoardAll = document.getElementById("pointBoardAll");
            pointBoardAll.innerHTML = pointAll;

            // 5回目が終わったらシェアしてコメントを表示する
            if(counter == 5) {
                lastComment.insertAdjacentHTML('afterbegin', `<p>あなたの得点は<span class="red-word">${pointAll}</span>/100点です‼︎</p>`);
                lastComment.classList.remove("none");
            }
            // フラグの更新
            flag = true;
        }
    });
});

// ポップアップの閉じるボタン
closeButton.addEventListener("click", () => {
    lastComment.classList.add("none");
});
