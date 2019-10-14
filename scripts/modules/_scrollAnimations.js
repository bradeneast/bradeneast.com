function animateOnScroll(element, {
    threshold: threshold,
    rootMargin: rootMargin,
    root: root
}) {

    const scrollAttr = 'data-scroll';
    const observer = new IntersectionObserver(entries => {

        entries.map(entry => entry.target.setAttribute(scrollAttr, entry.isIntersecting))

    }, {
        threshold: threshold,
        rootMargin: rootMargin,
        root: root,
    });

    observer.observe(element);
}