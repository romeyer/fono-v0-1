var inPage = function(el) {
    let
    e = el.getBoundingClientRect()
    , y = e.top + e.height;
    return window.scrollY <= y ? { top: y} : false
}
