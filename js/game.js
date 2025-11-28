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
        // choose player sprite
        let sprite = spriteReader(current_sprite);
        unitySpriteSelect(unityInstance, sprite);
        console.log(sprite);
        gameOver(unityInstance);

    }).catch((message) => {
    console.error(message);
    });
}

//function to choose user sprite 
function unitySpriteSelect(unityInstance, index) {
    unityInstance.SendMessage(
        'Player', //name of the game object
        'SpriteSelect', // name of the function
        index // value to send
    );
    console.log(index);
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

//게임오버 버튼 이벤트리스너-> 다잉메시지와 점수 submit
document.querySelector('.confirmButton_gameover').addEventListener('click', async function(e) {
    e.preventDefault();

    let formData = new FormData(document.querySelector('#gameoverForm'));
    formData.append('confirmButton_gameover', '1');
    formData.append('score_gameover', window.gameScore);

    await fetch('php/ranking.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.isNewRecord) {
            alert("기록을 갱신함");
        }
        else alert("기록을 갱신하지 못함");
        console.log(data);
        loadSidebars(data);
        uic.fadeOutWindow(gameover_window);
        uic.fadeOutWindow(center_window);
        uic.fadeInWindow(startButton);
    })
    .catch(err => {
        alert(err);
    })

    await loadPage(); //update page
});

const SPRITE_MAP = {
    'melundago' : 0,
    'ultang': 1,
    'shungjwak': 2,
    'elena': 3,
    'risty': 4   
}

//user_sprite를 unity에서 읽을 수 있는 index로 반환하는 함수
function spriteReader(name) {
    let res = SPRITE_MAP[name] || 0;
    console.log(res);
    return res;
}