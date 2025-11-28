let us_index = 0; //유저 프로필 스프라이트를 위한 인덱스
//스프라이트 버튼을 눌렀을때 동작
sprite_button_right.addEventListener('click', function() {
    us_index++;
    if(us_index > user_sprites.length-1) { //인덱스를 넘어가면 인덱스 초기화
        us_index = 0;
    }
    if(!user_sprites[us_index]){ //기본 스프라이트만 있으면 넘어가지 않음
        return;  
    } 
    current_sprite = user_sprites[us_index];
    console.log(current_sprite);
    loadUserSprite();
})

sprite_button_left.addEventListener('click', function() {
    us_index--;
    if(us_index < 0) { //인덱스가 음수가 되면 인덱스 최대
        us_index = user_sprites.length-1;
    }
    if(!user_sprites[us_index]) return;
    current_sprite = user_sprites[us_index];
    console.log(current_sprite);
    loadUserSprite();
});

profile_check.addEventListener('click', function() {
    uic.showWindow(mask);
    uic.showWindow(profile_window);
    pwindow_id.textContent = profile_id.textContent;
    pwindow_hs.textContent = profile_hs.textContent;
    pwindow_cr.textContent = profile_cr.textContent;

});

pwindow_back.addEventListener('click', function() {
    uic.hideWindow(profile_window);
    uic.hideWindow(mask);
});