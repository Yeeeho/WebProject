// let prevWindow = null;
let currentWindow = null;

//js에서 로그인 여부를 확인하기 위한 플래그 변수
let isLoggedIn = false;

//센터 윈도우 객체화
const center_window = document.querySelector('.center_window');
const login_window = document.querySelector('.login');
const signup_window = document.querySelector('.signup');
const gameover_window = document.querySelector('.gameover');
const startButton = document.querySelector('.startButton');
const logoutButton = document.querySelector('#logout');

//사이드바 윈도우 객체화
const leaderboard = document.querySelector('.leaderboard');
const death_log = document.querySelector('.death_log');
const notice = document.querySelector('.notice');
const misc_board = document.querySelector('.misc_board');
const site_card = document.querySelector('.site_card');
//동적 할당 텍스트
const profile_id = document.querySelector('#profile_id');
const profile_hs = document.querySelector('#profile_hs');

//로고 객체화
const logo_main = document.querySelector('.logo_main');

//기타 친구들
const message1 = document.querySelector('#message_main');

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
        uic.slide(leaderboard, 'x', 300);
        uic.slide(death_log, 'y', 300);
        uic.slide(notice, 'x', -300);
        uic.slide(misc_board, 'x', 300);
        uic.slide(site_card, 'x', 300);
        uic.slide(logo_main, 'y', -300);
    }

    slideWindowsIn() {
        uic.slide(leaderboard, 'x', 0);
        uic.slide(death_log, 'y', 0);
        uic.slide(notice, 'x', 0);
        uic.slide(misc_board, 'x', 0);
        uic.slide(site_card, 'x', 0);
        uic.slide(logo_main, 'y', 0);
    }

}

const uic = new UiController();

//페이지 로드후 실행되는 부분
checkSession();

// 시작 버튼 클릭
startButton.addEventListener('click', function() {

    const formData = new FormData();
    formData.append('startButton', 'true');

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.message);
        if(data.loginSuccess == 'true') {
            isLoggedIn = true;
        }
        if (isLoggedIn == false) {
            uic.fadeOutWindow(startButton);
            uic.showWindow(center_window);
            uic.fadeInWindow(login_window);
        }
        else {
            uic.slideWindowsOut();
            uic.hideWindow(startButton);
            startGame();
        }
    })


});



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
                profile_id.textContent = "사용자: " + data.id;
                profile_id.style.display = 'block';
                profile_hs.textContent = "HISCORE: " + data.hs;
                profile_hs.style.display = 'block';
                isLoggedIn = true;
            }
        })
    .catch(err => {
        alert(err);
        console.log(err);
    });
});

//세션을 검사하는 함수
function checkSession() {
    let formData = new FormData();
    formData.append('checkSession','true'); 

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.message);
        if(data.loginSuccess == 'true') {
            isLoggedIn = true;
            profile_id.textContent = "사용자: " + data.id;
            profile_id.style.display = 'block';
            profile_hs.textContent = "HISCORE: " + data.hs;
            profile_hs.style.display = 'block';
        }
    });
}

//로그아웃
logoutButton.addEventListener('click', function(e) {

    const formData = new FormData();
    formData.append('logoutButton', 'true');

    fetch('logout.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        location.href = 'index_main';
    })
    .catch(err => {
        alert(err);
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
        //회원가입 성공시
        alert(data.message);
        if (data.signupSuccess) {
            uic.hideWindow(signup_window);
            uic.showWindow(login_window);
            document.getElementById('loginForm').id.value = "";
            document.getElementById('loginForm').pw.value = "";
            document.getElementById('signupForm').id_signup.value = "";
            document.getElementById('signupForm').pw_signup.value = "";

        }
    })
    .catch(err => {
        alert(err);
        console.log(err);
    });
});

//게임오버 버튼 이벤트리스너-> 다잉메시지와 점수 submit
document.querySelector('.confirmButton_gameover').addEventListener('click', function(e) {

    e.preventDefault();

    let formData = new FormData(document.querySelector('#gameoverForm'));
    formData.append('confirmButton_gameover', '1');
    formData.append('score_gameover', window.gameScore);

    fetch('ranking.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        // console.log("다잉메시지: " + data.d_message);
        uic.fadeOutWindow(gameover_window);
        uic.fadeOutWindow(center_window);
        uic.fadeInWindow(startButton);
    })
    .catch(err => {
        alert(err);
    })

    loadPage(); //update page

});

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
            alert("아이디는 영문 대소문자나 숫자로 이루어져야 하며, 공백이 없어야 합니다.");
            return false;
        }
    }

    //check pw[i]
    for (i = 0; i < pw.length; i++) {
        if(pw[i] == " ") {
            alert("비밀번호에 공백이 들어가면 안됩니다.");
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

//게임 시작 함수
function startGame() {
    createUnityInstance(document.querySelector("#gameCanvas"), {
    dataUrl: "JumpGame_build/Build/JumpGame_build.data",
    frameworkUrl: "JumpGame_build/Build/JumpGame_build.framework.js",
    codeUrl: "JumpGame_build/Build/JumpGame_build.wasm",
    streamingAssetsUrl: "StreamingAssets", // StreamingAssets가 있다면 이것도 경로 수정
    companyName: "Yihos",
    productName: "Yiho",
    productVersion: "1.0",
    }).then((unityInstance) => {
        // 게임 로딩 완료 후 실행할 코드 (선택 사항)
        unitySpriteSelect(unityInstance, 1);
        gameOver(unityInstance);

    }).catch((message) => {
    console.error(message);
    });
}

//게임오버 감지 함수(jslib에서 가져옴)
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








// //이벤트 리스너
// window.addEventListener("DOMContentLoaded", function() {
//     // const params = new URLSearchParams(window.location.search)
//     // console.log(params);

//     // if (params.get("start") == "1") {
//     //     alert("로그인이 성공했드아");
//     // }
// })




