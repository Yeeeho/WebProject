<?php
include('dbconn.php');

//제이손(사람이름아님)을 위한 헤더설정
header('Content-Type: application/json; charset=utf-8');
//세션시작으로 전역 세션변수를 냠냠함
session_start();

//게임오버 버튼 감지
if(isset($_POST['confirmButton_gameover']) && $_POST['confirmButton_gameover']) {

    //html에서 현재 점수와 다잉메시지를 가져옴
    $score = $_POST['score_gameover'];
    $d_message = $_POST['dyingMessage'];
    //다잉메시지가 비었을 경우 임의의 메시지를 넣음
    if ($d_message == null) {
        $d_message = "왜 죽은걸까요";
    }

    //user_record 테이블에 기록 추가
    $sql = "INSERT INTO user_record(id, score, d_message, timestamp) VALUES(?, ?, ?, NOW())";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute([$_SESSION['id'], $score, $d_message]);

    //user 테이블에 크레딧 추가
    $sql = "UPDATE user SET credit = credit + ? WHERE id = ?";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute([$score, $_SESSION['id']]);

    //db에서 hi_score 을 불러옴
    $stmt = $pdo ->prepare("SELECT hi_score FROM user WHERE id = ?");
    $stmt ->execute([$_SESSION['id']]);
    $user = $stmt ->fetch();
    //$user['hi_score'] 가 없거나 $score 가 $user['hi_score'] 보다 높을 때 db로 점수를 보냄
    $isNewRecord = false;
    if($user['hi_score'] == null || $score > $user['hi_score']) {
        $stmt = $pdo ->prepare("UPDATE user SET hi_score = ? WHERE id = ?");
        $stmt ->execute([$score, $_SESSION['id']]);
        $isNewRecord = true;
    }
    //db에서 id, hi_score, credit 을 불러옴
    $stmt = $pdo ->prepare("SELECT id, hi_score, credit FROM user WHERE id = ?");
    $stmt ->execute([$_SESSION['id']]);
    $user = $stmt ->fetch();

    echo json_encode([
        'isNewRecord' => $isNewRecord,
        'd_message' => $d_message,
        'id' => $user['id'],
        'hs' => $user['hi_score'],
        'cr' => $user['credit']
    ]);
    exit;

}

function debug() {

    echo json_encode([
        'message' => 'ddd'
    ]);
    exit;
}

?>