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

header('Content-Type: application/json; charset=utf-8');

if(isset($_POST['confirmButton_gameover']) && $_POST['confirmButton_gameover']) {

    $message = $_POST['dyingMessage'];
    //js로 메시지를 보내 확인
    echo json_encode([
        'message' => $message
    ]);

    
    exit;
}

?>