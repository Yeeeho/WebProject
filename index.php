<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JUMPGAME</title>
    <link rel="stylesheet" type="text/css" href="css/css.css">
    <script src="js/js.js" defer="defer" type="text/javascript"></script>
</head>
<body>
    <div class="uiContainer">

        <!-- 로고 -->
        <div class="logo_main">
            <img src="Images/isaygames_logo.png">
        </div>

        <div class="logo_small">
            <img src="Images/DoomLogo.png">
        </div>

        <!-- 중앙화면 -->
        <div class="center_window">

            <!-- 로그인화면 -->
            <div class="login box">
                <h2>로그인</h2><br>
                <form method="post" action="index.php">    
                    <input type="text" placeholder="아이디를 입력해보거라" name="id" class="inputBox"><br>
                    <input type="password" placeholder="비밀번호가 뭐였더라" name="pw" class="inputBox"><br>
                    <button class="loginButton" type="submit" name="loginButton">로그인</button><br>
                </form>
                <button class="signupButton" type="button">자진입대.. 아 아니 회원가입</button>
            </div>

            <!-- 회원가입화면 -->
            <div class="signup box">
                <h2>회원가입</h2><br>
                <form method="post" action="index.php">
                    <input type="text" placeholder="아이디를 입력하거라 아이야." name="id_signup" class="inputBox"><br>
                    <input type="password" placeholder="비밀번호를 입력하거라." name="pw_signup" class="inputBox"><br>
                    <button class="confirmButton" name="confirmButton">확인</button><br>
                    <button class="backButton" type="button">뒤로가기</button>    
                </form> 
            </div>

            <div class="gameover">
                <h2>GAME OVER</h2>
                <button onclick="restartGame()">Restart</button>
            </div>

            <div class="settings">
                <h2>SETTINGS</h2>
            </div>

        </div>

        <!-- 시작버튼 -->
        <button class="startButton">PLAY</button>

        <!-- 사이드바 -->

        <div class="leaderboard box">
            <h2>명예의 전당</h2>
        </div>

        <div class="death_log box">
            <h2>단말마들</h2>
        </div>  

        <div class="notice box box">
            <h2>공지사항</h2>
        </div>

        <div class="bulletin_board box">
            <h2>자유게시판</h2>
        </div>

        

    </div>
        
    <div class="gameContainer">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
    </div>
        
    <footer>
        <p>© 2024 JUMPGAME. All rights reserved.</p>
        <p>Contact: 01049003347</p>
        <p>Address: 어딘가</p>
    </footer>
</body>
</html>

<?php

session_start();

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'user';

$id_temp = '1234';
$pw_temp = '1234';

$id = $_POST['id'];
$pw = $_POST['pw'];

//로그인버튼을 눌렀을 경우
if (isset($_POST['loginButton'])) {
    
    if ($id == '' || $pw == '') {
        echo "<script>alert('입력란이 비었습니다')</script>";
        echo "<script>window.location.href = 'index.php';</script>";
        exit;
    }   
    else if ($id == $id_temp && $pw == $pw_temp) {

        //쿼리 파라미터 방식
        // echo "<script>window.location.href = 'index.php?start=1';</script>";

        //세션 플래그 방식
        $_SESSION['game_start'] = true;
        
    }
}

// 세션 플래그 관리
if (isset($_SESSION['game_start']) && $_SESSION['game_start'] == true) {
    echo "<script>
        window.addEventListener('DOMContentLoaded', function() {
            gameStart();    
        })
    </script>";
    $_SESSION['game_start'] = false;
}

?>
