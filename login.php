<?php

session_start();

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'user';

$id_temp = '1234';
$pw_temp = '1234';

header('Content-Type: application/json; charset=utf-8');

//로그인
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if(isset($_POST['loginButton']) && $_POST['loginButton'] == 1) {
        
        $id = $_POST['id'];
        $pw = $_POST['pw'];

        if ($id == '' || $pw == '') {
            
            echo json_encode(['message' => '입력란이 비었습니다.']);
            exit;
        }   
    
        else if ($id == $id_temp && $pw == $pw_temp) {
            
            echo json_encode(['message' => '로그인 기능은 준비중입니다.']);
            exit;
        }
    
        else {
            echo json_encode(['message' => '로그인 정보가 일치하지 않습니다.']);
            exit;
        }
    
        echo json_encode(['message' => '로그인 정보를 받지 못했습니다.']);
        exit;
    }
    
    //회원가입
    else if(isset($_POST['confirmButton_signup']) && $_POST['confirmButton_signup'] == 1) {

        $id_signup = $_POST['id_signup'];
        $pw_signup = $_POST['pw_signup'];

        echo json_encode(['message' => '1234']);
        exit;
    }
    
    else {
        echo json_encode(['message' => '정보를 받지 못했습니다.']);
        exit;
    }
}

echo json_encode(['message' => '유효한 전송 방식이 아닙니다.']);
exit;










// 세션 플래그 관리
// if (isset($_SESSION['game_start']) && $_SESSION['game_start'] == true) {
//     echo "<script>
//         window.addEventListener('DOMContentLoaded', function() {
//             gameStart();    
//         })
//     </script>";
//     $_SESSION['game_start'] = false;
// }

//쿼리 파라미터 방식
// echo "<script>window.location.href = 'index.html?start=1';</script>"
?>
