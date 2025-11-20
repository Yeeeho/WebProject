<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

if(isset($_POST['logoutButton'])) {
    
    //세션 변수 해제
    session_unset();

    //쿠키 제거
    if(ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(), '', time() - 42000,
            $params['path'], $params['domain'],
            $params['secure'], $params['httponly']
        );
    } 

    //session_destroy() 함수는 세션 파일을 삭제하지만,
    //  세션 ID 값이 있는 쿠키는 여전히 남아있다.
    // 그래서 setcookie()함수를 사용해 세션 ID가 저장된 쿠키를 강제로 만료시켜 삭제한다.

    //세션 파괴
    session_destroy();

    echo json_encode([
        'message' => '로그아웃'
    ]);
    exit;
}


?>