function animateOnScroll(element) {

    const scrollAttr = 'data-scroll';
    const options = {};
    const observer = new IntersectionObserver(entries => {

        entries.map(entry => entry.target.setAttribute(scrollAttr, entry.isIntersecting))

    }, options);

    observer.observe(element);
}