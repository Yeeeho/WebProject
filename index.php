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
            <img src="Images/DoomLogo.png">
        </div>

        <div class="logo_small">
            <img src="Images/DoomLogo.png">
        </div>

        <!-- 중앙화면 -->
        <div class="center_window">

            <!-- 로그인화면 -->
            <div class="login">
                <h2>관등성명을 대라 아쎄이!!!</h2>
                <form method="post" action="index.php">    
                    <input type="text" placeholder="군번을 적어라 아쎄이!!" name="id"><br>
                    <input type="password" placeholder="Password" name="pw"><br>
                    <button class="loginButton" type="submit" name="loginButton">악!!</button><br>
                </form>
                <button class="signupButton" type="button">자진입대</button>
            </div>

            <!-- 회원가입화면 -->
            <div class="signup">
                <h2>자진입대를 환영한다 아쎄이!!!</h2>
                <form method="post" action="index.php">
                    <input type="text" placeholder="군번을 적어라 아쎄이!!" name="id_signup"><br>
                    <input type="password" placeholder="Password" name="pw_signup"><br>
                    <button class="confirmButton" name="confirmButton">입대한다</button><br>
                    <button class="backButton" type="button">난 집이 좋다.</button>    
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

        <button class="startButton">해병의 시간이다!!!!!</button>

        <!-- 사이드바 -->

        <div class="leaderboard">
            <h2>명예의 전당</h2>
        </div>

        <div class="death_log">
            <h2>단말마들</h2>
        </div>  

        <div class="notice">
            <h2>공지사항</h2>
        </div>

        <div class="bulletin_board">
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

$id = $_POST['id'];
$pw = $_POST['pw'];

if (isset($_POST['loginButton'])) {
    
    if ($id == '' || $pw == '') {
        echo "<script>alert('해병을 기만하지 마라 아쎄이')</script>";
        echo "<script>window.location.href = 'index.php';</script>";
        exit;
    }   
    echo "<script>alert('로그인 기능은 아직 구현이 안되었다요')</script>";
}

?>