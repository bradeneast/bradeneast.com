function animateOnScroll(params) {

    const children = Array.from(params.parent.children);
    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {

        entries.forEach(entry => {
            console.log(entry);
        })

    }, options);

    children.forEach(child => {

        observer.observe(child);

    })
}