const
ScrollPool = new Pool()
, ScrollHandler = new Throttle(NULL => ScrollPool.fire(), 100)
;

app.hash = app.storage("hash") || null;
app.initial_pragma = START;

bootloader.loaders = { 
	pass: 1
};

bootloader.loadComponents.add(function(){ 
	setTimeout(NULL => {
		Router.call("theme").then(theme => {
			theme = theme.data.json();
			if(theme) bind(app.color_pallete, theme);
			
			Router.load("home").then(nil => {
				Router.load("head", null, $("#app > header")[0]);
				Router.load("footer", null, $("#app > footer")[0]);
				Router.load("banner", null, $(".--banner")[0]);
				Router.load("searchbar", null, $(".--search-bar")[0]);
				Router.load("categories", null, $(".--categories")[0]);
				Router.load("opencourses", null, $(".--open-courses")[0]);
				Router.load("postdegree", null, $(".--post-degrees")[0]);
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
	switch (x) {
		case START: 		/**/ 
		;
		break;
	}
});

__scroll.up(()=>{ 	 /**/ });
__scroll.down(()=>{  /**/ });
__scroll.right(()=>{ /**/ });
__scroll.left(()=>{  /**/ });
__scroll.fire();

window.onscroll = NULL => ScrollHandler.fire();