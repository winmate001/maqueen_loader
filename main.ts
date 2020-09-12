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
        case MODE.ledOn:
            maqueen.writeLED(maqueen.LED.LEDLeft,  maqueen.LEDswitch.turnOn);
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn);
            break;
        case MODE.ledOff:
            maqueen.writeLED(maqueen.LED.LEDLeft,  maqueen.LEDswitch.turnOff);
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff);
            break;
    }
    mode = message
})
// ---------------------------------------------------------------------
// サーボモータ動作処理
// ・モード変数に従いサーボモータを動作させる。
// ---------------------------------------------------------------------
function doServo () {
    switch (mode) {
        case MODE.up:
            maqueen.servoRun(maqueen.Servos.S1, 0);
            break;
        case MODE.down:
            maqueen.servoRun(maqueen.Servos.S1, 130);
            break;
        case MODE.center:
            maqueen.servoRun(maqueen.Servos.S1, 90);
            break;
    }
    basic.pause(1000)
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
/**
 * 初期処理
 * 
 * ・変数定義
 * 
 * ・アイコン表示
 */
let mode  = 0  // 動作モード
let speed = 50 // 走行速度
enum MODE {
    advance =  2, // 前進
    back    =  8, // 後進
    left    =  4, // 左カーブ
    right   =  6, // 右カーブ
    stop    =  5, // 停止
    up      = 10, // シャベル上
    center  = 11, // シャベル中
    down    = 12, // シャベル下
    ledOn   =  1, // LED ON
    ledOff  =  3, // LED OFF
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
