function animateOnScroll(element) {

    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {

        entries.map(entry => entry.isIntersecting ? entry.target.classList.add('scrolled') : entry.target.classList.remove('scrolled'));

    }, options);

    observer.observe(element);
}