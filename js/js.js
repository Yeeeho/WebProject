// let prevWindow = null;
let currentWindow = null;

let isLoggedIn = false;

//센터 윈도우 객체화
const center_window = document.querySelector('.center_window');
const login_window = document.querySelector('.login');
const signup_window = document.querySelector('.signup');
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
    // alert('아쎄이! 아직 입대하기엔 기합이 부족하다!!');
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

    e.preventDefault(e);

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












// //이벤트 리스너
// window.addEventListener("DOMContentLoaded", function() {
//     // const params = new URLSearchParams(window.location.search)
//     // console.log(params);

//     // if (params.get("start") == "1") {
//     //     alert("로그인이 성공했드아");
//     // }
// })




