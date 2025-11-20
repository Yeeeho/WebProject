let us_index = 0;
//스프라이트 버튼을 눌렀을때 동작
sprite_button_right.addEventListener('click', function() {
    us_index++;
    if(us_index > user_sprites.length-1) {
        us_index = 0;
    }
    if(!user_sprites[us_index]){
        return;  
    } 
    current_sprite = user_sprites[us_index];
    loadUserSprite();
})

sprite_button_left.addEventListener('click', function() {
    us_index--;
    if(us_index < 0) {
        us_index = user_sprites.length-1;
    }
    if(!user_sprites[us_index]) return;
    current_sprite = user_sprites[us_index];
    loadUserSprite();
})