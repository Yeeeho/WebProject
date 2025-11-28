

//게시판에 처음 들어감
pb_button.addEventListener('click', async function() {
    uic.showWindow(pb_window);
    await loadPboard();
})

pb_back.addEventListener('click', function() {
    uic.hideWindow(pb_window);
})

pb_write.addEventListener('click', function() {
    let title = pb_post.querySelector('#pb_post_title');
    let content = pb_post.querySelector('#pb_post_content');

    title.value = "";
    content.textContent = "";

    uic.showWindow(pb_post);
})

//검색하기
pb_window.querySelector('#pb_search').addEventListener('click', async function() {
    let input = pb_window.querySelector('#pb_input').value;
    console.log(input);

    const formData = new FormData();
    //일반 로더
    formData.append('loadPboard', 'true');
    //검색 데이터
    formData.append('search', 'true');
    formData.append('input', input);

    const res = await fetch('php/public_board.php', {
        method: 'POST',
        body: formData
    })
    const data = await res.json();
    await loadPbTable(data);

})

//임시변수
let temp_idx = null; //게시글 인덱스
let temp_title = null; //게시글 제목
let temp_content = null; //게시글 내용
let isEdit = false; //수정 버튼을 통해 글을 쓰고 있는가?

//글쓰기
pb_post.querySelector('#pb_post_confirm').addEventListener('click', async function() {

    let title = pb_post.querySelector('#pb_post_title').value;
    let content = pb_post.querySelector('#pb_post_content').value;

    if(content == '' || title == '') {
        alert('입력란이 비었습니다.');
        return;
    }

    const formData = new FormData();
    if(isEdit == true) { //수정 모드일때 폼데이터에 플래그 추가
        formData.append('edit', 'true');
    }
    formData.append('pb_post', 'true');
    formData.append('title', title);
    formData.append('content', content);
    formData.append('idx', temp_idx);

    const res = await fetch('php/public_board.php', {
        method: 'POST',
        body: formData
    }) 
    const data = await res.json();
    console.log(data);
    alert('게시글을 올렸습니다.');

    isEdit = false;
    uic.hideWindow(pb_post);
    uic.hideWindow(pb_read);
    loadPboard();
})
//글쓰기-> 뒤로버튼
pb_post.querySelector('#pb_post_back').addEventListener('click',async function() {
    isEdit = false;
    uic.hideWindow(pb_post);
    await loadPboard();
})

//본문 -> 뒤로 버튼
pb_read.querySelector('#pb_read_back').addEventListener('click', async function() {
    await loadPboard();
    uic.hideWindow(pb_read);
})

const table = pb_window.querySelector('table');

//게시판 테이블에 이벤트리스너 추가
//게시판 제목 클릭-> 본문
table.addEventListener('click', async function(e) {
    // console.log(e.target.id);
    if(e.target.id == '') {
        console.log('뭐함');
        return;
    }

    let id = pb_read.querySelector('#pb_read_id');
    let title = pb_read.querySelector('#pb_read_title');
    let content = pb_read.querySelector('#pb_read_content');
    let time = pb_read.querySelector('#pb_read_time');

    const editBtn = pb_read.querySelector('#pb_read_edit');
    const delBtn = pb_read.querySelector('#pb_read_delete');

    const idNum = e.target.id.replace('pb_c','');
    temp_idx = idNum; //임시변수에 인덱스를 저장
    console.log("idx: " + idNum);

    const formData = new FormData();
    formData.append('loadPbContent', 'true');
    formData.append('idx', idNum);

    const res = await fetch('php/public_board.php', {
        method: 'POST',
        body: formData
    })
    const data = await res.json();
    console.log(data);
    
    //수정삭제보탄 보일락말락
    editBtn.style.display = 'none';
    delBtn.style.display = 'none';
    if(data.sid == data.id) {
        editBtn.style.display = 'block';
        delBtn.style.display = 'block';
    }

    id.textContent = data.id;
    title.textContent = data.title;
    content.textContent = data.content;
    time.textContent = data.timestamp;

    temp_title = data.title;
    temp_content = data.content;
    console.log(temp_title);

    uic.showWindow(pb_read);
})
//본문-> 삭제버튼
pb_read.querySelector('#pb_read_delete').addEventListener('click', async function(e) {

    console.log(temp_idx);

    const formData = new FormData();
    formData.append('pb_delete', 'true');
    formData.append('idx', temp_idx);

    const res = await fetch('php/public_board.php', {
        method:'POST',
        body: formData
    })
    const data = await res.json();

    console.log(data);

    await loadPboard();
    uic.hideWindow(pb_read);
})
//본문 -> 수정버튼
pb_read.querySelector('#pb_read_edit').addEventListener('click', async function() {

    let title = pb_post.querySelector('#pb_post_title');
    let content = pb_post.querySelector('#pb_post_content');

    uic.showWindow(pb_post);
    title.value = temp_title;
    content.textContent = temp_content;
    isEdit = true;
})