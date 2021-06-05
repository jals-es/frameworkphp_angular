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
}