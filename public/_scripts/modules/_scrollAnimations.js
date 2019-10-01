function initScrollAnimations() {

    // change element classes if window is scrolled past a given threshold (in pixels)
    function addClassIfScrolled({ element, className, threshold }) {
        let y = Math.round(window.scrollY);
        y > threshold ? element.classList.add(className) : element.classList.remove(className);
    }

    function loop() {
        let scrollTop = window.scrollY;
        if (lastScrollTop === scrollTop) {
            raf(loop);
            return
        } else {
            lastScrollTop = scrollTop;
            scroll();
            raf(loop);
        }
    }

    function scroll() {
        addClassIfScrolled({ element: nav, className: 'compact', threshold: 600 });
        addClassIfScrolled({ element: upDownArrow, className: 'up', threshold: 600 });
    }

    const upDownArrow = document.getElementById('up-down');
    let raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    let lastScrollTop = window.scrollY;
    raf ? loop() : null;
}