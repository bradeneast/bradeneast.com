function animateOnScroll(element) {

    const scrollAttr = 'data-scroll';
    const options = {};
    const observer = new IntersectionObserver(animate(entries), options);

    function animate(entries) {
        entries.map(entry => entry.target.setAttribute(scrollAttr, entry.isIntersecting));
    }

    observer.observe(element);
}