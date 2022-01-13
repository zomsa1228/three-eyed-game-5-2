// 先攻のマーク
const FIRST_MARK = 'o';

// 後攻のマーク
const NEXT_MARK = 'x';

// ターン数
let count = 1;

// マス目のIDリスト
const IDS = [
    ['b1', 'b2', 'b3'],
    ['b4', 'b5', 'b6'],
    ['b7', 'b8', 'b9']
];

// IDからオブジェクトを取得する
function $(id)
{
    return document.getElementById(id);
}

// 先攻のターンかどうかを判定する
function isFirstMove() {
    let isFirst = count % 2;
    return isFirst == 1;
}

// ターン表示を切り替える
function changeDisplayCount() {
    if (isFirstMove()) {
        // 先攻のターンを表示する
        $('display-count').innerHTML = FIRST_MARK + 'の番！';
    } else if(count < 9) {
        // 後攻のターンを表示する
        $('display-count').innerHTML = NEXT_MARK + 'の番！';
    } else {
        $('display-count').innerHTML = "終了しました";
    }
}

// 試合終了を判定する
function judgeEnd() {

    let isEnd = false;

    // 横3マスが同じマークかを判定する
    for (let row=0; row < 3; row++) {
        // 勝敗を判定する
        isEnd = isWin(IDS[row][0], IDS[row][1], IDS[row][2]);
        if (isEnd) {
            displayResult($(IDS[row][0]).value + 'の勝ち!');
            var win = ture;
            return true;
        }
    }

    // 縦3マスが同じマークかを判定する
    for (let col=0; col < 3; col++) {
        // 勝敗を判定する
        isEnd = isWin(IDS[0][col], IDS[1][col], IDS[2][col]);
        if (isEnd) {
            displayResult($(IDS[0][col]).value + 'の勝ち!');
            var win = ture;
            return true;
        }
    }
    
    // 斜め3マスが同じマークかを判定する(右下がり)
        // 勝敗を判定する
        isEnd = isWin(IDS[0][0], IDS[1][1], IDS[2][2]);
        if (isEnd) {
            displayResult($(IDS[0][0]).value + 'の勝ち!');
            var win = ture;
            return true;
        }


    // 斜め3マスが同じマークかを判定する(左下がり)
         // 勝敗を判定する
         isEnd = isWin(IDS[0][2], IDS[1][1], IDS[2][0]);
         if (isEnd) {
             displayResult($(IDS[0][2]).value + 'の勝ち!');
             var win = ture;
             return true;
         }

    // ゲームが続行する場合はfalseを返す
    return false;
}

// 勝利を判定する
function isWin(firstId, secondId, thirdId) {
    // 1つ目のマス目が空の場合は終了する
    if ($(firstId).value == '') {
        return false;
    }

    // 2つ目のマス目が空の場合は終了する
    if ($(secondId).value == '') {
        return false;
    }

    // 3つ目のマス目が空の場合は終了する
    if ($(thirdId).value == '') {
        return false;
    }

    // 3つのマス目が同じマークである場合は勝利
    if (
        ($(firstId).value == $(secondId).value)
        && ($(secondId).value == $(thirdId).value)
    ) {
        return true;
    }

    // 3つのマス目が同じマークじゃない場合は勝利ではない
    return false;
}

// 勝敗の結果を表示する
function displayResult(message) {
    $('display-result').innerHTML = message;
}

// マスを選択するアクション
function clickAction(event) {
    
    if(win == false)
{
    // イベントからクリックされたボタンのIDを取得する
    let id = event.target.id;

    // IDからオブジェクトを取得する
    let object = $(id);

    // 既にマークが設定されている場合はスキップ
    if (object.value !== '') {
        return;
    }

    // マス目にマークを設定する
    if (isFirstMove()) {
        object.value = FIRST_MARK;
    } else {
        object.value = NEXT_MARK;
    }

    // ゲーム終了を判定する
    if (judgeEnd()) {
        return;
    }

    // ターンを+1する
    count = count + 1;

    // ターン表示を切り替える
    changeDisplayCount();
}else {
    console.log("else");
}
}

// 画面を読み込んだ時の処理
function onloadAction() {
    // ボタンにイベントを設定する
    for(let row=0; row < 3; row++) {
        for(let col=0; col < 3; col++) {
            $(IDS[row][col]).onclick = clickAction;
        }
    }
}

function re_load() {  
    document.location.reload()}


// 画面読み込み時のイベントを設定
window.onload = onloadAction;