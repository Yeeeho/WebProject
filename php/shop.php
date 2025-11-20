<?php
include('dbconn.php');
//헤더설정
header('Content-Type: application/json; charset=utf-8');
//세션시작으로 전역 세션변수를 가져옴
session_start();

//상점에 진입함
if(isset($_POST['shop_button']) && $_POST['shop_button'] == 'true') {

    //db아이템 사전에서 아이템 정보를 전송함
    $sql="SELECT idx, item_name, price FROM item_dic ORDER BY idx";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute();
    while($data = $stmt ->fetch()) {
        $item_names[$data['idx']-1] = $data['item_name'];
        $prices[$data['idx']-1] = $data['price'];
    } 
    //db인벤토리와 대조해서 구매한 항목은 제외함
    $sql = "SELECT item_name FROM inventory WHERE id = ?";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute([$_SESSION['id']]);
    $index = 0; $bought_items = [];
    while($data = $stmt ->fetch()) {
        if(!$data) break;
        $bought_items[$index] = $data['item_name'];
        $index++;
    }$index = 0;

    echo json_encode([
        'message' => 'shop connected',
        'bought_items' => $bought_items,
        'item_names' => $item_names,
        'prices' => $prices
    ]);
    exit;
}

//아이콘을 선택함
if(isset($_POST['shop_icon'])) {
    $icon = $_POST['shop_icon'];

    //아이템 정보 전송
    $sql = "SELECT item_name, price FROM item_dic WHERE item_name = ?";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute([$icon]);
    $item = $stmt ->fetch();

    echo json_encode([
        'item_name' => $item['item_name'],
        'price' => $item['price']   
    ]);
    exit;
}

//구매 버튼을 누름
if(isset($_POST['shop_buy']) && $_POST['shop_buy'] == 'true') {

    $item_name = $_POST['item_name'];
    $price = $_POST['price'];

    //데이터베이스에서 크레딧 차감
    $sql = "UPDATE user SET credit = credit - ? WHERE id = ?";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute([$price, $_SESSION['id']]);

    //데이터베이스 인벤토리에 아이템 추가
    $sql = "INSERT INTO inventory(id, item_name, timestamp) VALUES(?, ?, NOW())";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute([$_SESSION['id'], $item_name]);

    echo json_encode([
        'message' => '꺼억'
    ]);
    exit;
}

//loadShop을 감지함
if(isset($_POST['loadShop']) && $_POST['loadShop']) {

    //로그아웃 상태인 경우 무의미한 값을 전달함
    $id = 0;
    if(isset($_SESSION['id'])) {
        $id = $_SESSION['id'];
    }
   
    //db아이템 사전에서 아이템 정보를 전송함
    $sql="SELECT idx, item_name, price FROM item_dic ORDER BY idx";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute();
    while($data = $stmt ->fetch()) {
        $item_names[$data['idx']-1] = $data['item_name'];
        $prices[$data['idx']-1] = $data['price'];
    } 

    //db인벤토리와 대조해서 구매한 항목 배열을 반환함
    $sql = "SELECT item_name FROM inventory WHERE id = ?";
    $stmt = $pdo ->prepare($sql);
    $stmt ->execute([$id]);
    $index = 0; $bought_items = [];
    while($data = $stmt ->fetch()) {
        if(!$data) break;
        $bought_items[$index] = $data['item_name'];
        $index++;
    }$index = 0;

    echo json_encode([
        'bought_items' => $bought_items,
        'item_names' => $item_names,
        'prices' => $prices
    ]);
    exit;
}
?>