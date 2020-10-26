app.cook("SameSite", "Lax", 365)

const
ScrollPool = new Pool()
, ScrollHandler = new Throttle(NULL => ScrollPool.fire(), 100)
, checkPragma = function(PragmaIndex){
	const
	o = new Promise(function(ok){
		if(app.components[PragmaIndex]) return ok(app.components[PragmaIndex]);
		else {
			Router.call(PragmaIndex).then(Pragma => {
				app.components[PragmaIndex] = Pragma.data;
				return ok(app.components[PragmaIndex])
			})
		}
	});
	return o;
}
;

Router._Routes[WHOWEARE] 		= "views/components/whoweare.htm";
Router._Routes[HOWDOESITWORKS] 	= "views/components/faq.htm";
Router._Routes[POINTS]			= "views/components/points.htm";
Router._Routes[COURSES] 		= "";
Router._Routes[POSTDEGREE] 		= "";
Router._Routes[VIDEOCLASSES] 	= "";
Router._Routes[CONTACT] 		= "";
Router._Routes[LOGIN] 			= "";
Router._Routes[SIGNUP] 			= "views/components/signup.htm";

app.hash = app.storage("hash") || null;
app.initial_pragma = START;

bootloader.loaders = { 
	pass: 1
};

bootloader.loadComponents.add(function(){ 
	setTimeout(NULL => {
		Router.call("theme").then(theme => {
			theme = theme.data.json();
			if(theme) _Bind(app.color_pallete, theme);
			
			Router.load("home").then(nil => {
				Router.load("head", null, $("#app > header")[0]);
				Router.load("footer", null, $("#app > footer")[0]);
				Router.load("banner", null, $(".--banner")[0]);
				Router.load("searchbar", null, $(".--search-bar")[0]);
				Router.load("categories", null, $(".--categories")[0]);
				Router.load("opencourses", null, $(".--open-courses")[0]);
				Router.load("postdegree", null, $(".--post-degrees")[0], { API_HOSTNAME: API_HOSTNAME });
				Router.load("maincourses", null, $(".--main-courses")[0]);
				Router.load("newsletter", null, $(".--newsletter")[0]);
			})
		})
	}, 200)

});

bootloader.onFinishLoading.add(function(){ 
	/**/
	tileClickEffectSelector(".-tile") 
});

app.initPool.add(nil => {
	/**/
	bootloader.loadComponents.fire()
});

app.onPragmaChange.add(x => {
	//app.loading(true);
	var
	StringPragmaPage;

	$('.--hintifyied,.--hintifyied-sp').desappear(AL, true);

	switch (x) {
		case START: 		
			window.scroll({ top:0, behavior:'smooth' })
			//app.loading(false);
		; break;
		default: {
			// window.scroll({ top:1024, behavior:'smooth' })
			checkPragma(x).then(Page => {
				StringPragmaPage = Page.prepare(app.color_pallete).morph();
				app.window(StringPragmaPage);
				StringPragmaPage.evalute();
				//app.loading(false);
			})
		}
	}
});

__scroll.up(()=>{ 	 /**/ });
__scroll.down(()=>{  /**/ });
__scroll.right(()=>{ /**/ });
__scroll.left(()=>{  /**/ });
__scroll.fire();

window.onscroll = NULL => ScrollHandler.fire();