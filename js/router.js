class _Router_Traits {

    /*
     *
     *
     *
     *
     */
    _Routes_ = {

        /* VIEW */
        home: "views/home.htm"

        /* COMPONENTS */
        , head: "views/components/header.htm"
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
    async load(name, args=null, container=null){
        if(this._Routes_[name]) name = this._Routes_[name];
        if(!container) container = $("#app").at();
        return app.load(name, args, container)
    }

    async call(name, args=null){
        if(this._Routes_[name]) name = this._Routes_[name];
        return app.call(name, args)
    }

    async post(name, args=null){
        if(this._Routes_[name]) name = this._Routes_[name];
        return app.post(name, args)
    }

}; 

const Router = new _Router_Traits();