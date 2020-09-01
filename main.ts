// ---------------------------------------------------------------------
// リモコン受信処理
// ・受信メッセージを動作モードとする。
// ---------------------------------------------------------------------
maqueen.IR_callbackUser(function (message) {
    switch (message) {
        case MODE.advance:
        case MODE.back:
        case MODE.left:
        case MODE.right:
            basic.showIcon(IconNames.Happy, 0);
            break;
        case MODE.down:
        case MODE.up:
        case MODE.center:
            basic.showIcon(IconNames.Surprised, 0);
            break;
        case MODE.stop:
            basic.showIcon(IconNames.Asleep, 0);
            break;
    }
    mode = message;
})
// ---------------------------------------------------------------------
// サーボモータ動作処理
// ・モード変数に従いサーボモータを動作させる。
// ---------------------------------------------------------------------
function doServo () {
    switch (mode) {
        case MODE.down:
            maqueen.servoRun(maqueen.Servos.S1, 0);
            break;
        case MODE.up:
            maqueen.servoRun(maqueen.Servos.S1, 180);
            break;
        case MODE.center:
            maqueen.servoRun(maqueen.Servos.S1, 90);
            break;
    }
    basic.pause(1000);
}
// ---------------------------------------------------------------------
// モータ動作処理（引数は回転速度）
// ・モード変数に従いモーターを動作させる。
// ---------------------------------------------------------------------
function doDrive (speed: number) {
    switch (mode) {
        case MODE.advance:
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed);
            break;
        case MODE.back:
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speed);
            break;
        case MODE.left:
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed);
            maqueen.motorStop(maqueen.Motors.M2);
            break;
        case MODE.right:
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed);
            maqueen.motorStop(maqueen.Motors.M1);
            break;
    }
}
// ---------------------------------------------------------------------
// 初期処理
// ・変数定義
// ・アイコン表示
// ---------------------------------------------------------------------
let mode = 0;
let speed = 50;
enum MODE {
    advance = 1, 
    back = 2,
    left = 3,
    right = 4,
    down = 5,
    up = 6,
    center = 7,
    stop = 8,
}
basic.showIcon(IconNames.Asleep, 0);
// ---------------------------------------------------------------------
// メインループ処理
// ・モード変数に従い処理関数の呼び出しを行う。
// ---------------------------------------------------------------------
basic.forever(function () {
    switch (mode) {
        case MODE.advance:
        case MODE.back:
        case MODE.left:
        case MODE.right:
            doDrive(speed);
            break;
        case MODE.down:
        case MODE.up:
        case MODE.center:
            doServo();
            break;
        case MODE.stop:
            maqueen.motorStop(maqueen.Motors.All);
            break;
    }
})
