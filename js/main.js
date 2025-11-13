
document.addEventListener('DOMContentLoaded', function(e) {
    loadPage();
})

//page loader function
function loadPage() {

    let formData = new FormData();
    formData.append('loadPage', 'true');
    
    fetch('main.php', {
        method : 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.message);
        const lb_table = document.querySelector('#lb_table');
        const dl_table = document.querySelector('#dl_table');
        // td에 db데이터를 하나씩 넣음
        //리더보드
        for(i=0; i<8; i++) {
            if(data.users[i] == null) break; //break when there's no data
            td = lb_table.querySelector(`tr:nth-child(${i+1}) td:nth-child(2)`);
            td.textContent = data.users[i];
            td = lb_table.querySelector(`tr:nth-child(${i+1}) td:nth-child(3)`);
            td.textContent = data.hi_scores[i];
        }
        //데스로그
        for(i=0; i<10; i++) {
            if(data.users_rc[i] == null) break;
            td = dl_table.querySelector(`tr:nth-child(${i+1}) td`);
            td.textContent = data.users_rc[i] + ":" + "\"" + data.d_messages[i] +"\"";
        }
    
    })
}

//send message to unity
function unitySpriteSelect(unityInstance, index) {
    unityInstance.SendMessage(
        'Player', //name of the game object
        'SpriteSelect', // name of the function
        index // value to send
    );
}
