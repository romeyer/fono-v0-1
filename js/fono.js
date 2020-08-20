var inPage = function(el) {
            return (window.scrollY <= el.getBoundingClientRect().top && el.getBoundingClientRect().top >= 0) 
        }
