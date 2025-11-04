// let prevWindow = null;
let currentWindow = null;

let isLoggedIn = false;

//센터 윈도우 객체화
const center_window = document.querySelector('.center_window');
const login_window = document.querySelector('.login');
const signup_window = document.querySelector('.signup');
const gameover_window = document.querySelector('.gameover')
const startButton = document.querySelector('.startButton');


//사이드바 윈도우 객체화
const leaderboard = document.querySelector('.leaderboard');
const death_log = document.querySelector('.death_log');
const notice = document.querySelector('.notice');
const bulletin_board = document.querySelector('.bulletin_board');

//로고 객체화
const logo_main = document.querySelector('.logo_main');

//Ui 동작 클래스
class UiController {

    showWindow(window) {
        window.style.display = 'block';
        window.style.opacity = 1;
        currentWindow = window;
    }

    hideWindow(window) {
        window.style.display = 'none';
        window.style.opacity = 0;
    }

    fadeInWindow(window) {
    window.style.transition = 'opacity 1s ease-in-out';
    window.style.opacity = 0;
    window.style.display = 'block'; 
    setTimeout(() => {
        window.style.opacity = 1;
    }, 20);
    currentWindow = window;
    }

    fadeOutWindow(window) {
    window.style.transition = 'opacity 1s ease-in-out';
    window.style.opacity = 0;
    setTimeout(() => {
        window.style.display = 'none';
    }, 1000);
    }   


    slide(window, axis, distance) {

        window.style.display = 'block';
        window.style.transition = 'transform 1s cubic-bezier(0.77,0,0.175,1)';

        if (axis === 'x') {
            window.style.transform = `translateX(${distance}px)`;
        }
        else if (axis === 'y') {
            window.style.transform = `translateY(${distance}px)`;
        }
    }

    slideWindowsOut() {
        uic.slide(leaderboard, 'x', -300);
        uic.slide(death_log, 'x', -300);
        uic.slide(notice, 'x', 300);
        uic.slide(bulletin_board, 'x', 300);
        uic.slide(logo_main, 'y', -300);
    }

    slideWindowsIn() {
        uic.slide(leaderboard, 'x', 0);
        uic.slide(death_log, 'x', 0);
        uic.slide(notice, 'x', 0);
        uic.slide(bulletin_board, 'x', 0);
        uic.slide(logo_main, 'y', 0);
    }

}

const uic = new UiController();

// 시작 버튼
document.querySelector('.startButton').addEventListener('click', function() {

    if (isLoggedIn == false) {
        uic.fadeOutWindow(startButton);
        uic.showWindow(center_window);
        uic.fadeInWindow(login_window);
    }
    else {
        uic.slideWindowsOut();
        uic.hideWindow(startButton);
    }

});

// 로그인 동작
document.querySelector('.loginButton').addEventListener('click', function() {
    
})

// 회원가입 동작
document.querySelector('.signupButton').addEventListener('click', function() {
    const signup = document.querySelector('.signup');
    uic.hideWindow(currentWindow);
    uic.showWindow(signup);
})

//취소버튼
document.querySelector('.backButton_signup').addEventListener('click', function() {
    uic.hideWindow(currentWindow);
    uic.showWindow(document.querySelector('.login'));
})

//AJAX
//로그인 
document.querySelector('.loginButton').addEventListener('click', function(e) {
    //기존 submit방식을 차단해서 새로고침 방지
    e.preventDefault(e);

    let id = document.querySelector('#loginForm').id.value;
    let pw = document.querySelector('#loginForm').pw.value;
    //유효성검사 함수가 거짓을 반환하면 함수를 실행하지 않음
    if (!validate(id, pw)) {
        alert("Eventlistener -> invalid");
        return;
    }

    let formData = new FormData(document.querySelector('#loginForm'));
    formData.append('loginButton','1');

    fetch('login.php', {
        method: 'POST',
        body: formData
    }) 
    .then(res => res.json())
    .then(
        data => {
            alert(data.message);
            console.log(data);
            //로그인 성공
            if (data.loginSuccess == 'true') {
                uic.fadeOutWindow(login_window);
                uic.fadeOutWindow(center_window);
                uic.showWindow(startButton)
                isLoggedIn = true;
            }
        })
    .catch(err => {
        alert(err);
        console.log(err);
    });

});

// 회원가입 파트
document.querySelector('.confirmButton_signup').addEventListener('click', function(e) {

    e.preventDefault(e);

    let id = document.signupForm.id_signup.value;
    let pw = document.signupForm.pw_signup.value;
    //유효성 검사 
    if (!validate(id, pw)) {
        alert("Eventlistener -> invalid");
        return;
    }
 

    let formData = new FormData(document.querySelector('#signupForm'));
    formData.append('confirmButton_signup','1');

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        //회원가입 성공시
        if (data.signupSuccess) {
            uic.hideWindow(signup_window);
            uic.showWindow(login_window);
        }
    })
    .catch(err => {
        alert(err);
        console.log(err);
    });

});

//다잉메시지와 점수 submit
document.querySelector('.confirmButton_gameover').addEventListener('click', function(e) {

    e.preventDefault();

    let formData = new FormData(document.querySelector('#gameoverForm'));
    formData.append('confirmButton_gameover', '1');

    fetch('ranking.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log("다잉메시지: " + data.message);
        uic.fadeOutWindow(gameover_window);
        uic.fadeOutWindow(center_window);
        uic.fadeInWindow(startButton);
    })
    .catch(err => {
        alert(err);
    })

});

//게임오버 이벤트리스너(jslib에서 가져옴) 함수
function gameOver(unityInstance) {
    document.addEventListener("unityGameStatus", function() {
    
        console.log("eventListener -> unityGameStatus read");
        if (window.isGameOver == true) {
            console.log("eventListener -> Game Over");
            unityInstance.Quit();
            uic.slideWindowsIn();
            //게임오버 화면 출력
            uic.fadeInWindow(center_window);
            uic.fadeInWindow(gameover_window);
            //현재점수 출력
            let score_go = document.querySelector('#score_gameover');
            score_go.textContent = window.gameScore;


            window.isGameOver == false;
        }
    });
}

//유효성 검사 함수
function validate(id, pw) {
    
    if (id.length == 0 || pw.length == 0) {
        alert("입력란이 비었습니다.");
        return false;
    }

    if (id.length > 12 || id.length < 4) {
        alert("아이디는 4자 이상 12자 이내로 작성해야 합니다.");
        return false;       
    }

    if (!isNaN(id[0])) {
        alert("아이디는 숫자로 시작해선 안됩니다.");
        return false;
    }

    //check if id[i] is number or alphabet
    for (i = 0; i < id.length; i++) {
        if (id[i] >= 'a' && id[i] <= 'z') {} //pass
        else if (id[i] >= 'A' && id[i] <= 'Z') {} //pass
        else if (id[i] >= '0' && id[i] <= '9') {} //pass
        else {
            alert("아이디는 영문 대소문자나 숫자로 이루어져야 합니다.");
            return false;
        }
    }

    if (pw.length > 20 || pw.length < 10) {
        alert("비밀번호는 10자 이상 20자 이하로 작성해야 합니다.")
        return false;
    }

    //모든 조건을 통과시 참을 반환
    return true;
}










// //이벤트 리스너
// window.addEventListener("DOMContentLoaded", function() {
//     // const params = new URLSearchParams(window.location.search)
//     // console.log(params);

//     // if (params.get("start") == "1") {
//     //     alert("로그인이 성공했드아");
//     // }
// })




