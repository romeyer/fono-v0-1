<?php
class Home extends Page {

    public function banners(){
        $obj = (array)IO::jout("var/banners.json");
        // echo Convert::json($obj[0]); die;
        $img = IO::scan("var/banner_images");
        // echo Convert::json($img); die;
        $id = -1;
        Vector::each($img, function($i) use (&$id, &$obj) {
            if(++$id<sizeof($obj)) $obj[$id]->image = "var/banner_images/" . $i;
        });
        return Convert::json($obj);
    }

    public function categories(){       
        return IO::read("var/categories.json");
    }

    public function opencourses(){
        // echo date("Y-m-d"); die;
        $obj = Mysql::connect()->select()->from("fono_curso")->where("curso_inativo=FALSE")->query();
        //print_r($obj); die;
        $date = date("Ymd")*1;
        $final = [];
        Vector::each($obj, function($o) use($date, &$final){
            $tmp = preg_replace("/\-/i", "", explode(" ",$o["curso_datainicio"])[0])*1;
            if($tmp >= $date) $final[] = $o;
        });
        // $obj = array_slice($obj, sizeof($obj)-2, 2);//array_merge(array_slice($obj, sizeof($obj)-2, 2), array_slice($obj, 2));
        $iter=0;
        if(sizeof($final)) while(sizeof($final)<5) $final[] = $final[$iter++%sizeof($final)];
        return Convert::json($final);
    }

    public function maincourses(){
        $obj = Mysql::connect()->select()->from("modulo_banner")->query();
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