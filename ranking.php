<?php

//DB prep
$host = 'localhost';
$db_name = 'project';
$db_user = 'root';
$db_pass = null;
$charset = 'utf8mb4';

$dsn = "mysql:host=$host; dbname=$db_name; charset=$charset";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];


try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    //PDO 클래스에 정보를 전달하여 DB연결 객체를 생성
} catch (\PDOException $e) {
    echo json_encode(['message' => '데이터베이스에 연결할 수 없습니다.']);
    exit;
}
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

    //db에서 hi_score를 불러옴
    $stmt = $pdo ->prepare("SELECT hi_score FROM user WHERE id = ?");
    $stmt ->execute([$_SESSION['id']]);
    $user = $stmt ->fetch();
    //$user['hi_score'] 가 없거나 $score 가 $user['hi_score'] 보다 높을 때 db로 점수를 보냄
    if($user['hi_score'] = null || $score > $user['hi_score']) {

        $stmt = $pdo ->prepare("UPDATE user SET hi_score = ? WHERE id = ?");
        $stmt ->execute([$score, $_SESSION['id']]);

        echo json_encode([
            'message' => '최고 점수를 갱신함',
            'd_message' => $d_message
        ]);
        exit;
    }
    else {
        echo json_encode([
            'message' => '점수 갱신 실패. 더 분발하십시오.',
            'd_message' => $d_message
        ]);
        exit;
    }
}

function debug() {

    echo json_encode([
        'message' => 'ddd'
    ]);
    exit;
}

?>