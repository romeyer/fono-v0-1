<?php
class Auth extends Activity {
	
	public function mailcheck()
	{
		$args = Convert::atoo(Request::in());
		// echo "<pre>"; print_r($args); die;
		if(!isset($args->mail)) return Core::Response(-1, "No mail given");
		return Mysql::connect("fonov2")->exists("users", "mail='".$args->mail."' AND status!=0");
	}

	public function allow(String $hash=null)
	{
		if(!$hash) $hash = Request::in("hash");
		// echo "allow " . $hash . "?";
		if($hash&&Mysql::connect("dash")->exists("users","hash='".$hash."'")) return true;
		return false;
	}

	public function exchangeKeys(String $hash=null)
	{
		if(!$hash) $hash = Request::in("hash");
		if(!$hash) return 0;
		$args = json_decode(base64_decode($hash));
		$user = Mysql::connect("fono")
			->select()
			->from(["users"])
			->where("email='".$args->user."' AND active='1'")
			->query(__OBJECT__);

		if($user==[]) return 0;
		
		$hash = hash(SHA256,$user->email.$user->password);
		if($args->user==$user->email && hash(SHA1, $args->passwd)==$user->password)
		{ 
			if(!$user->hash)
			{
				Mysql::connect("dash")
					->update("users")
					->set(["hash"=>$hash])
					->where("id='".$user->id."'")
					->query(__OBJECT__);
			}
			return $hash;
		}
		return 0;
	}

}