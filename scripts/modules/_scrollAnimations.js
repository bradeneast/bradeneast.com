function animateOnScroll(element, threshold) {

    const scrollAttr = 'data-scroll';
    const options = {
        threshold: threshold
    };
    const observer = new IntersectionObserver(entries => {

        entries.map(entry => entry.target.setAttribute(scrollAttr, entry.isIntersecting))

    }, options);

    observer.observe(element);
}