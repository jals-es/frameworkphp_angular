<?php
class general_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = general_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance
    public function locales_BLL(){
        return $this -> dao -> locales();
    }
    public function search_BLL($search) {
        return $this -> dao -> search($search[0]);
    }
    public function checksession_BLL($args){
        return $this -> dao -> checksession($args[0]);
    }
    public function check_cart_BLL($args){
        return $this -> dao -> check_cart($args[0], $args[1]);
    }
    public function addto_cart_BLL($args){

        if($args[2]){
            return $this -> dao -> addto_cart($args[0], $args[1]);
        }else{
            return $this -> dao -> sumto_cart($args[0], $args[1]);
        }
    }
    public function get_cart_BLL($args){
        return $this -> dao -> get_cart($args[0]);
    }
    public function change_cart_BLL($args){
        if($args[2] === "mas"){
            //suma
            return $this -> dao -> sumto_cart($args[0], $args[1]);
        }else if($args[2] === "menos"){
            //resta
            return $this -> dao -> rest_cart($args[0], $args[1]);
        }else if($args[2] === "delete"){
            return $this -> dao -> quit_cart($args[0], $args[1]);
        }
    }
    public function set_order_BLL($args){
        $set_order = $this -> dao -> set_order($args[0], $args[1], $args[2], $args[3], $args[4], $args[5], $args[6], $args[7]);
        // echo $set_order;
        if($set_order){
            $set_order_prods = $this -> dao -> set_order_prods($args[0], $args[1]);
            if($set_order_prods){
                $delete_all_cart = $this -> dao -> delete_all_cart($args[1]);
                if($delete_all_cart){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        } 
    }
    public function user_info_BLL($args){
        return $this -> dao -> user_info($args[0]);
    }
    public function user_orders_BLL($args){
        return $this -> dao -> user_orders($args[0]);
    }
}