let temp_item;
let temp_price;

//버튼을 눌러서 상점을 염
document.querySelector('#shop_button').addEventListener('click', async function (e) {
    let warning_main = misc_board.querySelector('.warning');
    let warning = shop_window.querySelector('.warning');

    if (!isLoggedIn) {
        warning_main.textContent = "로그인을 해주세요!";
        return;
    }

    warning.textContent = "인플레이션이 오기 전에 사세요!";
    uic.fadeInWindow(mask);
    uic.fadeInWindow(shop_window);
    
    loadShop();
});

//상점 아이콘 누름
for (let i = 0; i < shop_icons.length; i++) {
    shop_icons[i].addEventListener('click', function() {
        console.log(shop_icons[i].id);
        shop_buy.style.display = 'block';
        temp_item = shop_icons[i].id
        let warning = shop_window.querySelector('.warning');
        //이미 구매한 아이템이면 구매 불가
        if(shop_icons[i].style.filter == 'grayscale(100%)') {
            warning.textContent = "이미 가지고 있어요!";
            return;
        }

        let formData = new FormData();
        formData.append('shop_icon', shop_iconref[i]);

        fetch('php/shop.php', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
        .then(data => { //php에서 db대조까지 끝남
            console.log(data.item_name + data.price);
            let warning = shop_window.querySelector('.warning');
            warning.textContent = "구매하시겠습니까? 가격은" + data.price + "C 입니다.";
            temp_item = data.item_name;
            temp_price = data.price; //임시변수에 가격 전달
            console.log("temp_price:"+ temp_price);
        })
    })
}

//구매 확인 버튼
document.querySelector('#shop_buy').addEventListener('click', async function() {
    if(!temp_price) return;
    let warning = shop_window.querySelector('.warning');
    let icon = shop_window.querySelector('#' + temp_item);
    console.log(icon);
    //이미 구매한 항목이면 리턴함
    if(icon.style.filter == 'grayscale(100%)') {
        warning.textContent = "이미 구매했습니다!";
        return
    }

    let formData = new FormData();
    formData.append('shop_buy', 'true');
    formData.append('price', temp_price);
    formData.append('item_name', temp_item);
    //돈이 부족하면 빠꾸
    if(currentcr < temp_price) {
        warning.textContent = "돈이 부족합니다!";
        return;
    }

    //데이터베이스에서 유저 돈을 가져감
    await fetch('php/shop.php', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
    .then(data => {
        console.log(data.message);
        warning.textContent = "잘 쓰겠습니다!\n 또 살 건 없나요?"
        currentcr = currentcr-temp_price;
        profile_cr.textContent = 'CREDIT: ' + currentcr;
    })

    loadShop();
})

//상점 닫는 버튼
document.querySelector('#shop_exit').addEventListener('click', function() {
    //임시변수 초기화
    temp_price = null; temp_item = null;

    let warning = shop_window.querySelector('.warning');
    warning.textContent = "살아서 봅시다";
    uic.fadeOutWindow(shop_window);
    uic.fadeOutWindow(mask);
});
