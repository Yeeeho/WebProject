<?php

session_start();

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

$id_temp = 'temp';
$pw_temp = 'temp';

header('Content-Type: application/json; charset=utf-8');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //로그인
    if(isset($_POST['loginButton']) && $_POST['loginButton'] == 1) {
        
        $id = $_POST['id'];
        $pw = $_POST['pw'];

        //입력란이 공란일 경우
        if ($id == '' || $pw == '') {
            
            echo json_encode(['message' => '입력란이 비었습니다.']);
            exit;
        }   
        
        //입력란에 무언가 있을 경우
        else if ($id != '' && $pw != '') {
        
            //데이터베이스에서 정보 대조
            $stmt = $pdo -> prepare("select id, pw from user where id = ?");
            $stmt -> execute([$id]);
            $user = $stmt -> fetch(); 
            //$user는 정보가 있을 때는 배열이고, 없는 경우 false
            //false[i] 같은 형태가 되면 즉시 오류 발생
            
            //
            if (!$user) {
                echo json_encode([
                    'message' => '아이디가 존재하지 않습니다.',
                    'loginSuccess' => 'false',
                    'debugUser' => 'None'
                ]);
                exit;
            }

            if ($user['id'] == $id && $user['pw'] == $pw) {
                echo json_encode([
                    'message' => '로그인에 성공했다.',
                    'loginSuccess' => 'true',
                    'debugUser' => $user
                ]);
                exit;
            }
            else {
                echo json_encode ([
                    'message' => '비밀번호가 일치하지 않습니다.',
                    'loginSuccess' => 'false',
                    'debugUser' => $user['id']
                ]);
                exit;
            }
            
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
        
        if($id_signup == '' || $pw_signup == '') {
            echo json_encode(['message' => '입력란이 비었습니다.']);
            exit;
        }
        //입력란에 뭐라도 있으면 pass하고 db와의 데이터 대조 시작

        //아이디가 중복될 경우 취소하는 로직
        try {
            $stmt = $pdo -> prepare("select id from user where id = ?");
            $stmt -> execute([$id_signup]);
            $user = $stmt -> fetch();
        } catch (\PDOException $e){
            echo json_encode([
                'message' => $e->getMessage()
            ]);
            exit;
        }

        //db에 아이디가 있다면
        if ($user) {
            echo json_encode([
                'message' => '동일한 아이디가 존재합니다.'
            ]);
            exit;
        }


        //데이터베이스에 정보 등록
        try {

            $sql = "insert into user(id, pw) values(?, ?)";
            $stmt = $pdo -> prepare($sql);
            $stmt -> execute([$id_signup, $pw_signup]);
            echo json_encode([
                'message' => '회원가입에 성공했습니다.',
                'signupSuccess' => 'true'
            ]);
            exit;

        } catch(\PDOException $e) {
            echo json_encode(['message' => $e->getMessage()]);
            exit;
        }


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
