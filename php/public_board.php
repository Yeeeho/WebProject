<?php
include('dbconn.php');
//세션 시작
session_start();
//헤더설정 
header('Content-Type: application/json; charset=utf-8');

//글 올리기
if(isset($_POST['pb_post']) && $_POST['pb_post'] == 'true') {

    $edit = $_POST['edit'] ?? "";
    if($edit == 'true') { //수정버튼을 눌렀을 경우다
        $sql = "UPDATE post SET title = ?, content = ?, timestamp = NOW() WHERE idx = ?";
        $stmt = $pdo ->prepare($sql);
        $stmt ->execute([$_POST['title'], $_POST['content'], $_POST['idx']]);
    }
    else {
        $sql = "INSERT INTO post(id, title, content, timestamp) VALUES(?,?,?,NOW())";
        $stmt = $pdo ->prepare($sql);
        $stmt ->execute([$_SESSION['id'], $_POST['title'], $_POST['content']]);
    }

    echo json_encode([
        'message' => 'Posted'
    ]);
    exit;
}

//글 로드하기
if(isset($_POST['loadPboard']) && $_POST['loadPboard'] == 'true') {

    //검색버튼을 눌렀을 경우
    $input = $_POST['input'] ?? "";
    if(isset($_POST['search']) && $_POST['search'] == 'true' && $input != "") {
        $sql = "SELECT * FROM post WHERE id = '$input' ORDER BY timestamp DESC";
        $stmt = $pdo ->prepare($sql);
        $stmt ->execute();
    }
    else {
        $sql = "SELECT * FROM post ORDER BY timestamp DESC";
        $stmt = $pdo ->prepare($sql);
        $stmt ->execute();
    }    

    $idxs = [];
    $ids = [];
    $titles = [];
    $timestamps = [];


    while($data = $stmt->fetch()) {
        $idxs[] = $data['idx'];
        $ids[] = $data['id'];
        $titles[] = $data['title'];
        $timestamps[] = $data['timestamp'];
    } 

    echo json_encode([
        'idxs' => $idxs,
        'ids' => $ids,
        'titles' => $titles,
        'timestamps' => $timestamps
    ]);
    exit;
}

//제목 클릭-> 본문 로드
if(isset($_POST['loadPbContent']) && $_POST['loadPbContent'] == 'true') {

    $idx = $_POST['idx'];

    $sql = "SELECT * FROM post WHERE idx = $idx";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute();
    $data = $stmt ->fetch();

    echo json_encode([
        'message' => $data,
        'id' => $data['id'],
        'title' => $data['title'],
        'content' => $data['content'],
        'timestamp' => $data['timestamp'],
        'sid' => $_SESSION['id']
    ]);
    exit;
}

//본문 -> 삭제버튼 클릭
if(isset($_POST['pb_delete']) && $_POST['pb_delete'] == 'true') {

    $idx = $_POST['idx'];

    $sql = "DELETE FROM post WHERE idx = $idx";
    $stmt = $pdo -> prepare($sql);
    $stmt ->execute();
    
    echo json_encode([
        'message' => 'deleted'    
    ]);
    exit;
}


?>