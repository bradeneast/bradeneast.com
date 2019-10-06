function animateOnScroll(params) {

    const children = Array.from(params.parent.children);
    const options = {};
    const observer = new IntersectionObserver(function (entries, observer) {
        console.log(entries);
        entries.forEach(entry => {
            entry.isIntersecting ? entry.target.classList.add('scrolled') : entry.target.classList.remove('scrolled');
        })

    }, options);

    children.forEach(child => {

        observer.observe(child);

    })
}