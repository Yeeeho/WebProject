
//메인
document.addEventListener('DOMContentLoaded',async function(e) {   
    await checkSession();
    loadThings();
})

//이것저것 로드 함수
async function loadThings() {
    await loadPage();
    loadShop();
    loadUserSprite();
}

//페이지 로드 함수
async function loadPage() {
    console.log('loadPage');

    // 로그인될때만 보이는 DOM
    if(isLoggedIn) {
        pb_button.style.display = 'block';
        logoutButton.style.display = 'block';
    }

    let formData = new FormData();
    formData.append('loadPage', 'true');
    
    const res = await fetch('php/main.php', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    console.log(data.message);
    const lb_table = document.querySelector('#lb_table');
    const dl_table = document.querySelector('#dl_table');
    // td에 db데이터를 하나씩 넣음
    //리더보드
    for (i = 0; i < 8; i++) {
        if (data.users[i] == null) break; //break when there's no data
        td = lb_table.querySelector(`tr:nth-child(${i + 1}) td:nth-child(2)`);
        td.textContent = data.users[i];
        td = lb_table.querySelector(`tr:nth-child(${i + 1}) td:nth-child(3)`);
        td.textContent = data.hi_scores[i];
    }
    //데스로그
    for (i = 0; i < 10; i++) {
        if (data.users_rc[i] == null) break;
        td = dl_table.querySelector(`tr:nth-child(${i + 1}) td`);
        td.textContent = data.users_rc[i] + ":" + "\"" + data.d_messages[i] + "\"";
    }
    //상점
    for (i = 0; i < data.item_names.length; i++) {
        shop_iconref[i] = data.item_names[i];
        shop_icons[i].src = "sprites/" + data.item_names[i] + ".png";
    }
}

//사이드바 로드 함수. fetch와 같이 쓰시오.
function loadSidebars(data) {
    let warning = misc_board.querySelector('.warning');
    let warning2 = misc_board2.querySelector('.warning');
    warning.textContent = null;
    warning2.textContent = null;
    profile_id.textContent = data.id;
    profile_id.style.display = 'block';
    profile_hs.textContent = "HISCORE: " + data.hs;
    profile_hs.style.display = 'block';
    // profile_check.style.display = 'block';
    profile_cr.style.display = 'block';
    profile_cr.textContent = 'CREDIT: ' + data.cr;
    currentcr = data.cr;
}

//세션을 검사하는 함수
async function checkSession() {
    let formData = new FormData();
    formData.append('checkSession','true'); 

    const res = await fetch('php/login.php', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    console.log(data.message);
    if (data.loginSuccess == 'true') {
        isLoggedIn = true;
        loadSidebars(data);
    }
}

//상점 로드 함수
function loadShop() {
    console.log('loadShop');
    let icons = shop_window.querySelectorAll('img');
    let ps = shop_window.querySelectorAll('p');

    let formData = new FormData();
    formData.append('loadShop', true);

    fetch('php/shop.php', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
    .then(data => {
        //구매한 데이터가 있으면 이미지를 흑백 처리함.
        let i = 0;
        while (true) {
            if (data.item_names[i] == null) break;
            icons[i].setAttribute('id', data.item_names[i]);
            ps[i].textContent = data.prices[i] + "C";
            i++;
        } i = 0;

        //구매한 데이터를 저장함.
        user_sprites = ['melundago'];
        let us_index = 1; 
        for (i = 0; i < data.item_names.length; i++) {
            for (let k = 0; k < data.bought_items.length; k++) {
                if (icons[i].id == data.bought_items[k]) {
                    icons[i].style.filter = 'grayscale(100%)';
                    ps[i].style.marginTop = '2px';
                    ps[i].textContent = "-구매함-";
                    //보유 확인 배열에 추가함
                    user_sprites[us_index] = data.bought_items[k];
                    console.log(user_sprites);
                    us_index++;
                }
            }
        }
    });
}

//유저 스프라이트 로드 함수
function loadUserSprite() {
    let canvas = document.querySelector('#us_canvas');
    let context = canvas.getContext('2d');
    let img = new Image();

    img.src = 'sprites/'+ current_sprite +'.png';
    let angle = 0;
    img.onload = function() {
        function animate() {
            context.clearRect(0,0,canvas.width, canvas.height); 
            context.save();
            context.translate(75,75);
            context.rotate((Math.PI/180)*angle);
            context.drawImage(img, -75, -75);
            context.restore();
            angle = angle + 0.5;    
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
}

//게시판 로드함수
async function loadPboard() {

    const formData = new FormData();
    formData.append('loadPboard', 'true') 

    const res = await fetch('php/public_board.php', {
        method: 'POST',
        body: formData
    })
    const data = await res.json();

    console.log(data);
    await loadPbTable(data);

}
//게시판 로드-테이블 로드함수
async function loadPbTable(data) {
    // 테이블 날리기
    for(let i = 2; i<= 11; i++) {
        let td1 = pb_window.querySelector(`tr:nth-child(${i}) td:nth-child(1)`);
        let td2 = pb_window.querySelector(`tr:nth-child(${i}) td:nth-child(2)`);
        let td3 = pb_window.querySelector(`tr:nth-child(${i}) td:nth-child(3)`);
        td1.textContent = null;
        td2.textContent = null;
        td3.textContent = null;
    }
    
    //테이블 불러오기
    for(let i = 2; i<= data.ids.length+1; i++) {
        let td1 = pb_window.querySelector(`tr:nth-child(${i}) td:nth-child(1)`);
        let td2 = pb_window.querySelector(`tr:nth-child(${i}) td:nth-child(2)`);
        let td3 = pb_window.querySelector(`tr:nth-child(${i}) td:nth-child(3)`);
        if (i == 12) break;
        td1.textContent = data.ids[i-2];
        td2.textContent = data.titles[i-2];
        td2.setAttribute('id', 'pb_c'+data.idxs[i-2]);
        td3.textContent = data.timestamps[i-2];        
    }
}



