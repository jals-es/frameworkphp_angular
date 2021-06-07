<?php 

class controller_general{
    function locales(){
        echo common::accessModel('general_model', 'locales') -> getResolve();
    }
    function search(){
        $search = $_POST['search'];

        if(isset($search)){
            echo common::accessModel('general_model', 'search', [$search]) -> getResolve();
        }else{
            echo "error";
        }
    }
    function checksession(){
        if(isset($_POST['token'])){
            $user = common::accessModel('general_model', 'checksession', [$_POST['token']]);
            // print_r($user);
            if($user){
                if($user[0]['estado'] == 1){
                    $return['result'] = "true";
                }else{
                    $return['result'] = "false";
                }
            }else{
                $return['result'] = "false";
            }
        }else{
            $return['result'] = "false";
        }

        echo json_encode($return);
    }
    function get_cart(){
        if(isset($_POST['token'])){
            $token = $_POST['token'];
            require JWT_PATH . 'middleware.php';

            $user = jwt_decode($token);

            if($user){
                $id_user = $user -> name;

                $get_cart = common::accessModel("general_model", "get_cart", [$id_user]);

                if($get_cart -> getResult() -> num_rows > 0){
                    echo json_encode($get_cart -> getResolve());
                }else{
                    echo "false";
                }
            }
        }
    }
    function addto_cart(){
        // $_POST['token'] = "eyJ0eXAiOiJKV1QiLCAiYWxnIjoiSFMyNTYifQ.eyJpYXQiOiAiMTYyMjcyMDg0NCIsImV4cCI6ICIxNjIyNzI0NDQ0IiwibmFtZSI6ICJmZTg2ODhlMWVlOTBiMjVkOTdmMzI2YTBiOWEwYWY1YTBkYzE5NWQyMWUxYWU3MGJkZDIxMzk4YzI2NjYxZDlkIn0.D9tOd1Rru90al1R0rObtR-jkv7ENAta-EIcVuDNbjic";
        // $_POST['id_prod'] = 1;
        if(isset($_POST['token']) && isset($_POST['id_prod'])){
            $token = $_POST['token'];
            $id_prod = $_POST['id_prod'];

            require JWT_PATH . 'middleware.php';

            $user = jwt_decode($token);

            if($user){
                $id_user = $user -> name;

                $check_cart = common::accessModel("general_model", "check_cart", [$id_user, $id_prod]);

                $addto_cart = false;
                if($check_cart -> getResult() -> num_rows == 1){
                    //Sumar 1
                    $addto_cart = common::accessModel("general_model", "addto_cart", [$id_user, $id_prod, false]);
                }else if($check_cart -> getResult() -> num_rows == 0){
                    //añadir
                    $addto_cart = common::accessModel("general_model", "addto_cart", [$id_user, $id_prod, true]);
                }

                if($addto_cart){
                    echo "true";
                }
            }
        }
    }

    function change_cart(){
        // $_POST['token'] = "eyJ0eXAiOiJKV1QiLCAiYWxnIjoiSFMyNTYifQ.eyJpYXQiOiAiMTYyMjc0NDc0MCIsImV4cCI6ICIxNjIyNzQ4MzQwIiwibmFtZSI6ICJmZTg2ODhlMWVlOTBiMjVkOTdmMzI2YTBiOWEwYWY1YTBkYzE5NWQyMWUxYWU3MGJkZDIxMzk4YzI2NjYxZDlkIn0.D6yNjMAR6i8N0emSsOzJ8vudL2sppdokztP9Dk9U5P0";
        // $_POST['id_prod'] = "2";
        // $_POST['type'] = "menos";
        if(isset($_POST['token']) && isset($_POST['type']) && isset($_POST['id_prod'])){
            $token = $_POST['token'];
            $type = $_POST['type'];
            $id_prod = $_POST['id_prod'];

            require JWT_PATH . 'middleware.php';

            $user = jwt_decode($token);

            if($user){
                $id_user = $user -> name;

                $check_cart = common::accessModel("general_model", "check_cart", [$id_user, $id_prod]);
                // print_r($check_cart);
                if($type === "mas"){
                    $type = "mas";
                }else{
                    $cart = json_decode($check_cart -> getResolve());
                    // print_r($cart);
                    $restcant = $cart[0] -> cantidad - 1;
                    // echo $restcant;
                    if($restcant <= 0){
                        $type = "delete";
                    }else{
                        $type = "menos";
                    }
                }
                $change_cart = common::accessModel("general_model", "change_cart", [$id_user, $id_prod, $type]);
                if($change_cart){
                    echo "true";
                }
            }
        }
    }
    function checkout(){
        $_POST['token'] = "eyJ0eXAiOiJKV1QiLCAiYWxnIjoiSFMyNTYifQ.eyJpYXQiOiAiMTYyMzA2NTE4NyIsImV4cCI6ICIxNjIzMDY4Nzg3IiwibmFtZSI6ICJmZTg2ODhlMWVlOTBiMjVkOTdmMzI2YTBiOWEwYWY1YTBkYzE5NWQyMWUxYWU3MGJkZDIxMzk4YzI2NjYxZDlkIn0.wgpYFo9oUiOr-6tHDULSr7pEgccOJY95f8RSQXLb4dg";
        $_POST['name'] = "Juan Antonio";
        $_POST['email'] = "narzano.nar@gmail.com";
        $_POST['address'] = "AV Comte Torrefiel nº 39";
        $_POST['city'] = "Ontinyent";
        $_POST['country'] = "spain";
        $_POST['zip'] = "46870";
        if(isset($_POST['token']) && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['address']) && isset($_POST['city']) && isset($_POST['country']) && isset($_POST['zip'])){
            $token = $_POST['token'];
            $name = $_POST['name'];
            $email = $_POST['email'];
            $address = $_POST['address'];
            $city = $_POST['city'];
            $country = $_POST['country'];
            $zip = $_POST['zip'];

            require JWT_PATH . 'middleware.php';

            $user = jwt_decode($token);

            if($user){
                $id_user = $user -> name;
                $ini_file = parse_ini_file(MODEL_PATH.'credentials.ini');
                $secret = $ini_file['secret'];
                $fecha = time();
                $rand = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 5);
                $id_order = hash_hmac("sha256", $fecha . "_" . $rand, $secret);

                $set_order = common::accessModel("general_model", "set_order", [$id_order, $id_user, $name, $email, $address, $city, $country, $zip]);
                if($set_order){
                    echo "true";
                }else{
                    echo "false";
                }
            }else{
                echo "error2";
            }
        }else{
            echo "error1";
        }
    }
}