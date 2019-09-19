export function initScrollAnimations() {

    // change element classes if window is scrolled past a given threshold (in pixels)
    function addClassIfScrolled(element, className, threshold) {
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
        const threshold = 600;
        addClassIfScrolled(nav, 'compact', threshold);
        addClassIfScrolled(upDownArrow, 'up', threshold);
        waveOverlays ? waveOverlays.forEach(e => { e.style.setProperty('--overlay-position', Math.round(window.scrollY) + 'px') }) : null;
        if (window.scrollY >= (document.body.offsetHeight - document.querySelector('footer').offsetHeight - window.innerHeight)) {
            upDownArrow.classList.remove('up');
        }
    }

    const upDownArrow = document.getElementById('up-down');
    const waveOverlays = document.querySelectorAll('.wave-overlay');
    let raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    let lastScrollTop = window.scrollY;
    raf ? loop() : null;

    setTimeout(() => {
        ScrollOut({
            once: true,
            threshold: .1
        })
    }, 1000);
}