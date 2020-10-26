<?php
class Sign extends Activity
{
    public static function up()
    {
        $form = Convert::atoo(Request::in());
        $conn = Mysql::connect("fonov2");
        
        if(!isset($form->mail)) return Core::response(-1, "No mail given");
        // echo "<pre>" . PHP_EOL . "exixts? " . $form->mail . " = " . $conn->exists("users", "mail='" . $form->mail. "'"); die;
        if($conn->exists("users", "mail='" . $form->mail. "'")) return Core::response(-2, "Email already in use");

        if(!$form || ($form->pass != $form->passcheck)) return Core::response(-3, "Passwords mismatches");

        $date = date("YmdHi");
        $uuid = Hash::word($form->mail, MD5);
        $pass = Hash::word($uuid . $form->pass);

        $result = $conn->insert("users", [
            "uuid"              => $uuid
            , "mail"            => $form->mail
            , "mail_lastchange" => $date
            , "mail_checked"    => 0
            , "pass"            => $pass
            , "pass_lastchange" => $date
            , "created_at"      => $date
            , "status"          => 0
            , "access"          => 0
        ])->query();

        unset($form->pass);
        unset($form->passcheck);
        unset($form->mail);

        if($result) IO::jin("var/users/$uuid", $form);

        return $result ? $uuid : 0;
    }

    public static function in()
    {

    }
}