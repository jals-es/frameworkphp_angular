<?php

class general_model {
    private $bll;
    static $_instance;
    //////
    function __construct() {
        $this -> bll = general_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance
    public function locales(){
        return $this -> bll -> locales_BLL();
    }
    public function search($search) {
        return $this -> bll -> search_BLL($search);
    }
    public function checksession($args) {
        return $this -> bll -> checksession_BLL($args);
    }
    public function check_cart($args){
        return $this -> bll -> check_cart_BLL($args);
    }
    public function addto_cart($args){
        return $this -> bll -> addto_cart_BLL($args);
    }
    public function get_cart($args){
        return $this -> bll -> get_cart_BLL($args);
    }
    public function change_cart($args){
        return $this -> bll -> change_cart_BLL($args);
    }
}