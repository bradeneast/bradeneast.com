function animateOnScroll(element) {

    const scrollAttr = 'data-scroll';
    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {

        entries.map(entry => {

            if (entry.isIntersecting) {

                let y = entry.intersectionRect.y;
                y < 1 ? entry.target.setAttribute(scrollAttr, -1) : entry.target.setAttribute(scrollAttr, 1);

            } else {

                entry.target.setAttribute(scrollAttr, 0);

            }
        });

    }, options);

    observer.observe(element);
}