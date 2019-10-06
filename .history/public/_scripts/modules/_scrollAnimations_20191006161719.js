function animateOnScroll(element) {

    const scrollAttr = 'data-scroll';
    const options = {};

    const observer = new IntersectionObserver(function (entries, observer) {

        entries.map(entry => entry.target.setAttribute(scrollAttr, entry.isIntersecting));

    }, options);

    observer.observe(element);
}