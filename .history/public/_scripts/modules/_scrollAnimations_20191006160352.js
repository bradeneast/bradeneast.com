function animateOnScroll(element) {

    const scrollAttr = 'data-scroll';
    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {

        entries.map(entry => {

            if (entry.isIntersecting) {

                let y = entry.intersectionRect.y;
                y < 1 ? entry.target.setAttribute(scrollAttr, 'up') : entry.target.setAttribute(scrollAttr, 'down');

            } else {

                entry.target.setAttribute(scrollAttr, 'none');

            }
        });

    }, options);

    observer.observe(element);
}