class _Router_Traits {

    /*
     *
     *
     *
     *
     */
    _Routes = {

        /* VIEW */
        home: "views/home.htm"

        /* COMPONENTS */
        , head: "views/components/header.htm"
        , footer: "views/components/footer.htm"
        , banner: "views/components/banner.htm"
        , searchbar: "views/components/search-bar.htm"
        , categories: "views/components/categories.htm"
        , opencourses: "views/components/open-courses.htm"
        , postdegree: "views/components/post-degrees.htm"
        , maincourses: "views/components/main-courses.htm"
        , newsletter: "views/components/newsletter.htm"

        /* TEMPLATES */
        , bannertemplate: "views/templates/banners/home.htm"
        , categorytile: "views/templates/tiles/category.htm"
        , opencoursestile: "views/templates/tiles/open-course.htm"
        , maincoursestile: "views/templates/tiles/main-courses.htm"

        /* API CALLS */
        , theme: API_PREFIX + "themes/get/fono"
        , mailcheck: API_PREFIX + "auth/mailcheck"
        , signup: API_PREFIX + "sign/up"
        
        /* LEGACY CALLS */
        , bannerdata: API_PREFIX + "home/banners"
        , categoriesdata: API_PREFIX + "home/categories"
        , opencoursesdata: API_PREFIX + "home/opencourses"
        , maincoursesdata: API_PREFIX + "home/maincourses"
        , stats: API_PREFIX + "home/stats"

    }
    /*
     *
     *
     *
     *
     */
    async load(name, args=null, container=null, bind = null){
        if(this._Routes[name]) name = this._Routes[name];
        if(!container) container = $("#app").at();
        return app.load(name, args, container, bind)
    }

    async call(name, args=null, method="GET"){
        if(this._Routes[name]) name = this._Routes[name];
        return app.call(name, args, method)
    }
    
    async post(name, args=null){
        if(this._Routes[name]) name = this._Routes[name];
        return app.post(name, args)
    }

}; 

const Router = new _Router_Traits();