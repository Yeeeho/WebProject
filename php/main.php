<?php
include('dbconn.php');

header('Content-Type: application/json; charset=utf-8');
//세션 시작
session_start();

if(isset($_POST['loadPage']) && $_POST['loadPage'] == 'true') {
    
    //this time, fetch data for leaderboard
    $hi_scores = []; $users_hs = [];

    $stmt = $pdo ->prepare("SELECT hi_score, id FROM user ORDER BY hi_score DESC LIMIT 10");
    $stmt ->execute();
    //extract data from fetched table
    $index = 0;
    while($data = $stmt ->fetch()) {
        $hi_scores[$index] = $data['hi_score'];
        $users_hs[$index] = $data['id'];
        $index++;
    } $index = 0;

    //now, fetch data for graveyard
    $d_messages = []; $users_rc = []; $timestamps = [];

    $sql = "SELECT id, d_message, timestamp FROM user_record ORDER BY timestamp DESC LIMIT 10";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute();
    while($data = $stmt ->fetch()) {
        $users_rc[$index] = $data['id'];
        $d_messages[$index] = $data['d_message'];
        $timestamps[$index] = $data['timestamp'];
        $index++;
    } $index = 0;

    //now, fetch data for shop_icons

    $sql = "SELECT item_name, idx FROM item_dic ORDER BY idx";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute();
    while($data = $stmt ->fetch()) {
        $item_names[$index] = $data['item_name'];
        $shop_idxs[$index] = $data['idx'];
        $index++;
    } $index = 0;

    echo json_encode([
        //메인페이지
        'message' => '페이지를 db와 연동하기 시작',
        'hi_scores' => $hi_scores,
        'users' => $users_hs,
        'users_rc' => $users_rc,
        'd_messages' => $d_messages,
        'timestamps' => $timestamps,
        //상점
        'item_names' => $item_names,
        'shop_idx' => $shop_idxs
    ]);
    exit;
}


?>