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
        // $_POST['token'] = "eyJ0eXAiOiJKV1QiLCAiYWxnIjoiSFMyNTYifQ.eyJpYXQiOiAiMTYyMDA1NTE1NiIsImV4cCI6ICIxNjIwMDU4NzU2IiwibmFtZSI6ICI0MDczMGQwZjRlOGQwODBiMDc0OWU0ZGIwNzYwZGFjMzk2YmNlN2UxM2RmNWIyOTFmMjA0MDgwOTEwMzRhZTllIn0.qtGvGjUBh8V-DW0zlKqHnQkT8yNmwHfIGK4TE2GoHi8";
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
}