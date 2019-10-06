function animateOnScroll(element) {

    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {

        entries.map(entry => {

            if (entry.isIntersecting) {

                entry.target.setAttribute('data-scroll', 0);
                console.log(entry.intersectionRatio);

            }
        });

    }, options);

    observer.observe(element);
}