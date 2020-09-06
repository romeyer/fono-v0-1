<?php

if(!defined("BANNER_IMAGES_FOLDER")) define("BANNER_IMAGES_FOLDER", "var/banner_images");

class Home extends Page {

    public function banners(){
        $obj = [];
        $img = IO::scan(BANNER_IMAGES_FOLDER);
        foreach($img as $i) $obj[] = [ "image" => BANNER_IMAGES_FOLDER . DS . $i ];
        return Convert::json($obj);
    }

    public function categories(){
        $obj = [];
        Vector::iterate(0, 6, function($i) use (&$obj){
            $obj[] = [
                "image" => $i%2 ? "img/icons/hashtag.svg" : "img/icons/fingerprint.svg"
                , "label" =>  $i%2 ? "complex big dog" : "simple cat"
            ];
        });
        return Convert::json($obj);
    }

    public function opencourses(){
        $obj = Mysql::connect()->select()->from("modulo_banner")->query();
        // $obj = array_slice($obj, sizeof($obj)-2, 2);//array_merge(array_slice($obj, sizeof($obj)-2, 2), array_slice($obj, 2));
        return Convert::json($obj);
    }

    public function postdegrees(){
        $obj = Mysql::connect()->select()->from("fono_curso")->where("curso_externo=1")->query();
        return Convert::json($obj);
    }

    public function stats(){
        $n = [];
        $m = Mysql::connect();
        $n["pupils"] = $m->select("count(*)")->from("fono_aluno")->query()[0]["count(*)"];
        $n["courses"] = $m->select("count(*)")->from("fono_curso")->query()[0]["count(*)"];
        $n["professionals"] = $m->select("count(*)")->from("modulo_cadastroprofissionais")->query()[0]["count(*)"];
        $n["passdegrees"] = $m->select("count(*)")->from("fono_aluno")->query()[0]["count(*)"];
        return Convert::json($n);
    }

}