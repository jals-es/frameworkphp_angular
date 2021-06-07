<?php

class general_dao {
    static $_instance;
    //////
    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance
    public function locales(){
        return db::query() -> select(['*'], 'locales') -> execute() -> queryToArray(true) -> toJSON();
    }
    public function search($search) {
        return db::query() -> manual("SELECT p.cod_prod, p.name, p.precio
                                FROM productos p LEFT JOIN (
                                    SELECT v.id_prod, COUNT(v.id) veces
                                    FROM visitas_prod v
                                    GROUP BY v.id_prod
                                ) k
                                ON p.cod_prod = k.id_prod
                                WHERE p.name LIKE '%$search%' OR p.descripcion LIKE '%$search%'
                                ORDER BY k.veces DESC, RAND() 
                                LIMIT 8") -> execute() -> queryToArray(true) -> toJSON();
    }

    public function checksession($token){
        require JWT_PATH . 'middleware.php';

        $token = jwt_decode($token);
        if($token){
            $id_user = $token -> name;
            return db::query() -> select(['*'], 'users') -> where(['id' => [$id_user]]) -> execute() -> queryToArray(true) -> getResolve();
        }
        return false;
    }
    function check_cart($id_user, $id_prod){
        return db::query() -> select(['*'], 'cart') -> where(['id_user' => [$id_user], 'id_prod' => [$id_prod]]) -> execute() -> queryToArray(true) -> toJSON();
    }
    function addto_cart($id_user, $id_prod){
        return db::query() -> insert([['id' => NULL, 'id_user' => $id_user, 'id_prod' => $id_prod, 'cantidad' => 1]], 'cart') -> execute() -> toJSON() -> getResolve();
    }
    function sumto_cart($id_user, $id_prod){
        return db::query() -> manual("UPDATE cart SET cantidad=cantidad+1 WHERE id_user='$id_user' AND id_prod='$id_prod'") -> execute() -> toJSON() -> getResolve();
    }
    function get_cart($id_user){
        return db::query() -> manual("SELECT p.cod_prod AS id_prod, p.name AS name, p.precio AS precio, c.cantidad AS cantidad FROM cart c, productos p WHERE c.id_user = '$id_user' AND c.id_prod = p.cod_prod") -> execute() -> queryToArray(true);
    }
    function rest_cart($id_user, $id_prod){
        return db::query() -> manual("UPDATE cart SET cantidad=cantidad-1 WHERE id_user='$id_user' AND id_prod='$id_prod'") -> execute() -> toJSON() -> getResolve();
    }
    function quit_cart($id_user, $id_prod){
        return db::query() -> delete('cart') -> where(['id_user' => [$id_user], 'id_prod' => [$id_prod]]) -> execute() -> toJSON() -> getResolve();
    }
    function set_order($id_order, $id_user, $name, $email, $address, $city, $country, $zip){
        return db::query() -> insert([['id_order' => $id_order, 'id_user' => $id_user, 'name' => $name, 'email' => $email, 'address' => $address, 'city' => $city, 'country' => $country, 'zip' => $zip, 'estado' => 1]], 'orders') -> execute() -> toJSON() -> getResolve();
    }
    function set_order_prods($id_order, $id_user){
        return db::query() -> manual("INSERT INTO orders_prod SELECT NULL, '$id_order', c.id_prod, p.precio, c.cantidad FROM cart c, productos p WHERE c.id_user = '$id_user' AND c.id_prod = p.cod_prod") -> execute() -> toJSON() -> getResolve();
    }
    function delete_all_cart($id_user){
        return db::query() -> delete('cart') -> where(['id_user' => [$id_user]]) -> execute() -> toJSON() -> getResolve();
    }
    function user_info($id_user){
        return db::query() -> select(['user', 'email', 'avatar'], 'users') -> where(['id' => [$id_user]]) -> execute() -> queryToArray(true);
    }
    function user_orders($id_user){
        return db::query() -> manual("SELECT o.*, SUM(p.cantidad) total_items, SUM(p.precio) total_precio FROM orders o, orders_prod p WHERE o.id_user='$id_user' AND o.id_order = p.id_order GROUP BY o.id_order") -> execute() -> queryToArray(true);
    }
}