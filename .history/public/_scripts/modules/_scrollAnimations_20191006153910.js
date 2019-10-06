function animateOnScroll(params) {

    const children = Array.from(params.parent.children);
    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {

        entries.map(entry => entry.isIntersecting ? entry.target.classList.add('scrolled') : entry.target.classList.remove('scrolled'));

    }, options);

    children.map(child => observer.observe(child));
}