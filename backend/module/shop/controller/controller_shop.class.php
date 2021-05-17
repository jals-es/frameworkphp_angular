<?php 

class controller_shop{
    function list(){
        common::loadView(VIEW_PATH_SHOP, 'shop.html');
    }
    function catego(){
        $id_prod = $_POST['id_prod'];
        if(isset($id_prod)){
            echo common::accessModel('shop_model', 'get_catego', [$id_prod]) -> getResolve();
        }else{
            echo json_encode("error");
        }
    }
    function prod(){
        if(isset($_POST['id'])){
            $id_prod = $_POST['id'];

            echo common::accessModel('shop_model', 'get_prod', [$id_prod]) -> getResolve();

        }else{
            echo json_encode("error");
        }
    }
    function all_prod(){
        $offset = $_POST['offset'];
        $limit = $_POST['limit'];
        // $offset = 0;
        // $limit = 12;
        // $_POST['catego'] = "hamburguesa";
        // $_POST['price_min'] = "0";
        // $_POST['price_max'] = "11";
        // $_POST['ingredientes'] = "";
        if(isset($offset) && isset($limit)){
            if(isset($_POST['catego']) && isset($_POST['price_min']) && isset($_POST['price_max'])){
                $catego = $_POST['catego'];
                $price_min = $_POST['price_min'];
                $price_max = $_POST['price_max'];
            }else{
                $catego = "";
                $price_min = "";
                $price_max = "";
            }
            if($_POST['ingredientes'] === "no"){
                $ingredientes = "no";
            }else if(!empty($_POST['ingredientes'])){
                $ingredientes = explode(":", $_POST['ingredientes']);
            }else{
                $ingredientes = "";
            }


            $where = false;
            $sentencia = "";
            if(empty($catego)){
                $sql_catego = "";
            }else if($catego === "all"){
                $sql_catego = "type LIKE '%%'";
                $where = true;
            }else{
                $sql_catego = "type LIKE '%$catego%'";
                $where = true;
            }
            $sentencia = $sentencia.$sql_catego;

            $sql_price = "";
            if(!empty($price_max)){
                $sql_price = "precio BETWEEN $price_min AND $price_max";
                $where = true;
                $sentencia = $sentencia." AND ".$sql_price;
            }
            
            $i = 0;
            if($ingredientes === "no"){
                $sentencia = "$sentencia AND ingredientes = 'no'";
            }else if(!empty($ingredientes)){
                $sql_ingredientes = "";
                foreach($ingredientes as $ing){
                    if($i == 0){
                        $where = true;
                        $sql_ingredientes = "$sentencia AND ingredientes LIKE '%$ing%'";
                    }else{
                        $sql_ingredientes .= " OR $sentencia AND ingredientes LIKE '%$ing%'";
                    }
                    $i++;
                }
                $sentencia = $sql_ingredientes;
            }
            if($where == true){
                $where = "WHERE $sentencia";
            }else{
                $where = "";
            }

            // echo $where;
            
            $all_prods = common::accessModel('shop_model', 'get_all_prods', [$offset, $limit, $where]) -> getResolve();
            $count_prods = common::accessModel('shop_model', 'count_prods', [$where]) -> getResolve();
            // print_r($all_prods);
            // print_r($count_prods);
            $result = $all_prods;
            $result2 = $count_prods;
            // echo "<br>";
            if($result && $result2){
                $return = array($result2[0]);
                $i = 1;
                foreach($result as $row){
                    $return[$i] = $row;
                    $i++;
                }
            }else{
                $return = false;
            }

            echo json_encode($return);
        }
    }
    function visit_prod(){
        if(isset($_POST['id_prod'])){
            echo common::accessModel('shop_model', 'visit_prod', [$_POST['id_prod']]);
        }else{
            echo $_POST['id_prod'];
        }
    }
    function get_range_prices(){
        // echo json_encode(common::accessModel('shop_model', 'get_range_prices') -> getResolve());
        $return = common::accessModel('shop_model', 'get_range_prices') -> getResolve();
        foreach($return[0] as $index => $valor){
            $decimales = explode(".", $valor);
            if($decimales[1] == 00){
                $return[0][$index] = round($return[0][$index]);
            }else if($decimales[1] < 50 && $index === "max"){
                $return[0][$index] = round($return[0][$index]) + 1;
            }else if($decimales[1] >= 50 && $index === "max"){
                $return[0][$index] = round($return[0][$index]);
            }else if($decimales[1] < 50 && $index === "min"){
                $return[0][$index] = round($return[0][$index]);
            }else if($decimales[1] >= 50 && $index === "min"){
                $return[0][$index] = round($return[0][$index]) - 1;
            }
        }

        echo json_encode($return);
    }
    function search(){
        // $_POST['content'] = "hola";

        if(isset($_POST['content'])){
            $search = common::accessModel('shop_model', 'search', [$_POST['content']]) -> getResolve();
            if($search){
                echo json_encode($search);
            }else{
                echo "false";
            }
        }else{
            echo "false";
        }
    }
    function get_catego(){
        echo common::accessModel('shop_model', 'get_catego_names') -> getResolve();
    }
    function get_ingredientes(){
        $result = common::accessModel('shop_model', 'get_ingredientes') -> getResolve();

        $return = array();
        foreach($result as $row){
            $line = explode(":", $row['ingredientes']);
            foreach($line as $ing){
                $return = array_unique($return);
                $return[] = $ing;
            }
        }
        $return = array_unique($return);

        echo json_encode($return);
    }
    function fav(){
        
    }
    function get_favs(){
        
    }
}