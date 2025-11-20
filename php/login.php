<?php
include('dbconn.php');

//세션 시작
session_start();
//헤더설정 
header('Content-Type: application/json; charset=utf-8');

//로그인과 회원가입용 php
//디버깅용 변수들 모음
$id_temp = 'temp';
$pw_temp = 'temp';
$hs_temp = 666;


//세션 확인
if (isset($_POST['startButton']) || isset($_POST['checkSession'])) {
    
    if(isset($_SESSION['id'])) {

        $stmt = $pdo ->prepare("SELECT hi_score, credit FROM user WHERE id = ?");
        $stmt ->execute([$_SESSION['id']]);
        $user = $stmt ->fetch();

        echo json_encode([
            'message' => '이미 로그인되어 있습니다.',
            'loginSuccess' => 'true',
            'id' => $_SESSION['id'],
            'hs' => $user['hi_score'],
            'cr' => $user['credit']
        ]);
        exit;
    }
    else {
        echo json_encode([
            'message' => '로그인이 안되어있어요잉',
            'loginSuccess' => 'false'
        ]);
        exit;
    }
}


//로그인
if(isset($_POST['loginButton']) && $_POST['loginButton'] == 1) {

    $id = $_POST['id'];
    $pw = $_POST['pw'];
    
    //입력란에 무언가 있을 경우
    if ($id != '' && $pw != '') {
    
        //데이터베이스에서 정보 대조
        $stmt = $pdo -> prepare("SELECT id, pw, hi_score, credit FROM user WHERE id = ?");
        $stmt -> execute([$id]);
        $user = $stmt -> fetch(); 
        //$user는 정보가 있을 때는 배열이고, 없는 경우 false
        //false[i] 같은 형태가 되면 즉시 오류 발생
        
        if (!$user) {
            echo json_encode([
                'message' => '아이디가 존재하지 않습니다.',
                'loginSuccess' => 'false',
                'debugUser' => 'None'
            ]);
            exit;
        }

        //Login Success
        if ($user['id'] == $id && $user['pw'] == $pw) {
            //session 
            $_SESSION['id'] = $user['id'];
            //login log
            $stmt = $pdo -> prepare("INSERT INTO log_login(id, timestamp, ip) VALUES(?, NOW(), ?)");
            $stmt ->execute([$_SESSION['id'], $_SERVER['REMOTE_ADDR']]);

            echo json_encode([
                'message' => '로그인에 성공했다.',
                'loginSuccess' => 'true',
                'id' => $_SESSION['id'],
                'hs' => $user['hi_score'],
                'cr' => $user['credit']
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
        $sql = "INSERT INTO user(id, pw, timestamp, ip) values(?, ?, NOW(), ?)";
        $stmt = $pdo -> prepare($sql);
        $stmt -> execute([$id_signup, $pw_signup, $_SERVER['REMOTE_ADDR']]);
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










// 세션 플래그 관리
// if (isset($_SESSION['game_start']) && $_SESSION['game_start'] == true) {
//     echo "<script>
//         window.addEventListener('DOMContentLoaded', function() {
//             gameStart();    
//         })
//     </scrip>";
//     $_SESSION['game_start'] = false;
// }

//쿼리 파라미터 방식
// echo "<script>window.location.href = 'index.html?start=1';</script>"
?>
