function animateOnScroll(params) {

    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {

        entries.forEach(entry => {
            console.log(entry);
        })

    }, options);

    params.elements.forEach(elem => {

        observer.observe(elem);

    })
}