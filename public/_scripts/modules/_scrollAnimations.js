function initScrollAnimations() {

    const upDownArrow = document.getElementById('up-down');
    const nav = document.getElementById('nav');
    const bodyHeight = document.body.getBoundingClientRect().height;
    const footerHeight = document.querySelector('footer').getBoundingClientRect().height;
    console.log(bodyHeight, footerHeight);
    let lastScrollTop = window.scrollY;

    function addClassIfScrolled({ element, className, threshold }) {
        let y = Math.round(window.scrollY);
        y > threshold ? element.classList.add(className) : element.classList.remove(className);
    }

    function scroll() {

        addClassIfScrolled({
            element: nav,
            className: 'compact',
            threshold: 600
        });

        addClassIfScrolled({
            element: upDownArrow,
            className: 'up',
            threshold: 600
        });

        addClassIfScrolled({
            element: upDownArrow,
            className: 'invisible',
            threshold: bodyHeight - footerHeight - window.innerHeight
        });
    }

    function loop() {
        let scrollTop = window.scrollY;
        if (lastScrollTop === scrollTop) {
            requestAnimationFrame(loop);
            return
        } else {
            lastScrollTop = scrollTop;
            scroll();
            requestAnimationFrame(loop);
        }
    }

    requestAnimationFrame ? loop() : null;
}