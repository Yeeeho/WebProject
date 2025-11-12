<?php
//로그인과 회원가입용 php
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
header('Content-Type: application/json; charset=utf-8');
//세션 시작
session_start();



if($_POST['loadPage'] == 'true') {
    
    //this time, fetch data for leaderboard
    $hi_scores = []; $users_hs = [];

    $stmt = $pdo ->prepare("SELECT hi_score, id FROM user ORDER BY hi_score DESC LIMIT 10");
    $stmt ->execute();
    //extract data from fetched table
    $index = 0;
    while($data = $stmt ->fetch()) {
        $hi_scores[$index] = $data['hi_score'];
        $users_hs[$index] = $data['id'];
        $index++;
    } $index = 0;

    //now, fetch data for graveyard
    $d_messages = []; $users_rc = []; $timestamps = [];

    $sql = "SELECT id, d_message, timestamp FROM user_record ORDER BY timestamp DESC LIMIT 10";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute();
    while($data = $stmt ->fetch()) {
        $users_rc[$index] = $data['id'];
        $d_messages[$index] = $data['d_message'];
        $timestamps[$index] = $data['timestamp'];
        $index++;
    } $index = 0;

    echo json_encode([
        'message' => '페이지를 db와 연동하기 시작',
        'hi_scores' => $hi_scores,
        'users' => $users_hs,
        'users_rc' => $users_rc,
        'd_messages' => $d_messages,
        'timestamps' => $timestamps
    ]);
    exit;
}


?>